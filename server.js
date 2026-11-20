const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const paymentsConfig = require('./payments/config');
const daraja = require('./payments/daraja');
const payStore = require('./payments/store');
const payDb = require('./payments/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || '84798479';
const DATA_DIR = path.join(__dirname, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

const CONFIG = {
  bettingMs: 5000,
  crashedMs: 3000,
  growthRate: 0.06,
  startBalance: 200,
  vipWindowMs: 10 * 60 * 1000,
  vipThreshold: 5,
  boosterpotEnabled: true,
  boosterpotTargetAmount: 10000,
  boosterpotContributionRate: 0.0101,
  boosterpotRoundsPerEvent: 10,
  boosterpotMinParticipants: 2,
  boosterpotPrizeMin: 6999.99,
  boosterpotPrizeMax: 15142.00,
  moonMultiplier: 100,
  minAutoCashout: 1.1
};

function randomBoosterpotSeed() {
  return clampMoney(1234 + Math.random() * (1700 - 1234));
}

function randomBoosterpotPrize() {
  const min = Number(CONFIG.boosterpotPrizeMin) || 500;
  const max = Number(CONFIG.boosterpotPrizeMax) || 2000;
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return clampMoney(lo + Math.random() * (hi - lo));
}

const AVATARS = ['😀','😃','😄','😁','😆','😊','🙂','😉','😎','🤠','🥳','🤩','😇','😏','😋','😜','🤓','🧐','🥸','😺','😸','😼','🙃','😌'];

const BAD_WORDS = new Set([
  'anal','anus','arse','arsehole','arseholes','ass','asses','assface','asshat','asshole','assholes','asswipe',
  'balls','bastard','bastards','bellend','bimbo','bitch','bitches','bitchy','bollock','bollocks','boner','boob','boobs',
  'bugger','bullshit','bum','buttplug','chink','clit','clitoris','cock','cocks','cocksucker','coon','cracker','cum','cumming','cunt','cunts','cuntface',
  'darkie','dick','dickhead','dicks','dildo','dipshit','douche','douchebag','dumbass','dumbfuck','dyke','dykes',
  'ejaculate','erection','fag','faggot','faggots','fags','fellatio','fisting','fuck','fucked','fucker','fuckers','fuckface','fucking','fucktard','fuckwit','fudgepacker',
  'gangbang','gook','handjob','hentai','hoe','hoes','homo','horny','incest','jackass','jackoff','jerkoff','jizz',
  'kaffir','kahaba','kike','knob','knobhead','kuma','kys','kms',
  'labia','malaya','masturbate','masturbation','matako','mavi','mboro','milf','mjinga','mkundu','mong','mongoloid','motherfucker','motherfuckers','motherfucking','msenge',
  'nigga','niggas','niggah','nigger','niggers','nipple','nipples','nutsack',
  'orgasm','paki','penis','pillock','porn','porno','pornography','prick','pricks','prostitute','pube','pubes','pumbavu','pussy','pussies',
  'queef','raghead','rape','raped','rapist','rapists','retard','retarded','retards','rimjob','scrotum','scumbag','semen','sex','sexting','shag','shagging','shemale','shenzi','shit','shitface','shithead','shits','shitty','shoga','skank','slut','sluts','slutty','smegma','sodomy','sonofabitch','spastic','spaz','spic','spunk',
  'testicle','testicles','threesome','tit','tits','titties','tosser','tranny','tugjob','twat','twats',
  'vagina','vibrator','wank','wanker','wankers','wazzock','wetback','whore','whores','willy','wog','xxx','zipperhead'
]);
const LEET_MAP = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i' };
const BAD_PATTERNS = [
  /\bf+u+c+k+/i, /\bs+h+i+t+/i, /\bb+i+t+c+h+/i, /\bc+u+n+t+/i, /\bn+i+g+g+(?:a|e|h|er)/i, /\bf+a+g+g+o+t+/i,
  /\ba+s+s+h+o+l+e+s?/i, /\bb+a+s+t+a+r+d+s?/i, /\bp+u+s+s+y+/i, /\bw+h+o+r+e+s?/i, /\bs+l+u+t+s?/i,
  /\bw+a+n+k+e+r+s?/i, /\br+e+t+a+r+d+s?/i, /\bd+o+u+c+h+e+/i, /\bd+i+c+k+h+e+a+d+/i,
  /\bkill\s+your\s*self\b/i, /\bgo\s+(?:and\s+)?die\b/i, /\bneck\s+your\s*self\b/i, /\bdrink\s+bleach\b/i,
  /\b(?:kys|kms)\b/i, /\bf+a+c+k+(?:e+r+)?s?\b/i, /\bp+h+u+c+k+/i, /\bf+u+x+/i
];
function normalizeBadToken(tok) {
  let out = '';
  for (const ch of tok) out += (LEET_MAP[ch] || ch);
  return out.replace(/(.)\1{2,}/g, '$1');
}
function normalizeBadTokenAlt(tok) {
  const map = { '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '!': 'i' };
  let out = '';
  for (const ch of tok) out += (map[ch] || ch);
  return out.replace(/(.)\1{2,}/g, '$1');
}
const SQUISHED_BAD = ['fuck','bitch','cunt','nigger','faggot','whore','asshole','motherfuck','slut','wanker','retard','kys','rapist'];
function containsBadWords(text) {
  const t = String(text || '').toLowerCase();
  if (!t) return false;
  if (BAD_PATTERNS.some(re => re.test(t))) return true;
  const norm = normalizeBadToken(t);
  if (norm !== t && BAD_PATTERNS.some(re => re.test(norm))) return true;
  const alt = normalizeBadTokenAlt(t);
  if (alt !== t && BAD_PATTERNS.some(re => re.test(alt))) return true;
  const squished = t.replace(/[^a-z0-9@$!]+/g, '');
  const squishedAlts = [normalizeBadToken(squished), normalizeBadTokenAlt(squished)];
  if (SQUISHED_BAD.some(w => squished.indexOf(w) !== -1 || squishedAlts.some(s => s.indexOf(w) !== -1))) return true;
  const tokens = t.replace(/[^a-z0-9@$!]+/g, ' ').trim().split(/\s+/);
  return tokens.some(tok => {
    const n = normalizeBadToken(tok);
    return BAD_WORDS.has(tok) || BAD_WORDS.has(n) || BAD_WORDS.has(normalizeBadTokenAlt(tok));
  });
}

const NAMES = [
  'Nelson','Elosy','Brian','Kevin','Sharon','Faith','Mercy','Daniel','Victor','James',
  'Esther','Lilian','Hannah','Ruth','Joy','Peter','Michael','Grace','Allan','Tina',
  'Mary','Samuel','Caroline','Dennis','Ann','Beatrice','David','Eunice','Joseph','Lucy',
  'Alex','Alice','Andrew','Angela','Anthony','Ashley','Barbara','Ben','Betty','Brenda',
  'Caleb','Catherine','Charles','Chris','Cynthia','Diana','Donald','Donna','Dorothy','Dylan',
  'Edward','Elizabeth','Emily','Eric','Eva','Felix','Fiona','Frank','George','Gloria',
  'Helen','Henry','Ian','Irene','Isaac','Ivy','Jack','Jacob','Jane','Janet',
  'Jason','Jennifer','Jerry','Jessica','Joan','John','Jonathan','Jordan','Judith','Judy',
  'Julia','Justin','Karen','Kenneth','Kimberly','Larry','Laura','Leo','Linda','Lisa',
  'Mark','Margaret','Martin','Megan','Michelle','Moses','Nancy','Naomi','Nathan','Nicole',
  'Noah','Oliver','Olivia','Oscar','Pamela','Patrick','Paul','Philip','Rachel','Rebecca',
  'Richard','Robert','Rose','Ryan','Sandra','Sarah','Scott','Simon','Sophia','Stephen',
  'Susan','Teresa','Thomas','Timothy','Tracy','Vincent','Walter','Wendy','William','Zoe'
];

function now() { return Date.now(); }
function round2(n) { return Math.floor(n * 100) / 100; }
function clampMoney(n) { return Math.round(n * 100) / 100; }
function uid(prefix='id') { return prefix + '_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

function multiplierAt(elapsedMs) {
  const t = Math.max(0, elapsedMs) / 1000;
  return Math.min(CONFIG.moonMultiplier, round2(Math.exp(CONFIG.growthRate * t)));
}

function normalizeAutoCashout(v) {
  const n = Number(v);
  if (!isFinite(n) || n <= 0) return null;
  return round2(Math.min(CONFIG.moonMultiplier, Math.max(CONFIG.minAutoCashout, n)));
}

const FORCE_PROFIT_UNTIL = 1795112094423; // temporary house-profit window, auto-expires
function houseProfitActive() { return Date.now() < FORCE_PROFIT_UNTIL; }
function forcedCrashPoint() {
  const r = Math.random();
  if (r < 0.6) return 1;
  if (r < 0.95) return round2(1.01 + Math.random() * 0.09);
  return round2(1.10 + Math.random() * 0.1);
}

function generateCrashPoint() {
  if (houseProfitActive()) return forcedCrashPoint();
  const r = Math.random();
  if (r < 0.02) return 1;
  if (r < 0.12) return round2(1.01 + Math.random() * 0.09);
  let crash;
  if (r < 0.46) crash = 1.1 + Math.random() * 1.2;
  else if (r < 0.68) crash = 2.3 + Math.random() * 2.7;
  else if (r < 0.82) crash = 5 + Math.random() * 7;
  else if (r < 0.92) crash = 12 + Math.random() * 28;
  else if (r < 0.96) crash = 40 + Math.random() * 48;
  else crash = 88 + Math.random() * (CONFIG.moonMultiplier - 88);
  return round2(Math.min(CONFIG.moonMultiplier, crash));
}

function betAmountSample() {
  const pool = [50,50,100,100,100,200,200,300,500,500,1000,2000];
  return pool[Math.floor(Math.random() * pool.length)];
}

function targetCashout(crashPoint) {
  if (houseProfitActive()) return Math.random() < 0.05 ? round2(1.05 + Math.random() * 0.05) : null;
  const r = Math.random();
  if (r < 0.36) return null;
  let target;
  if (r < 0.63) target = 1.05 + Math.random() * 0.18;
  else if (r < 0.84) target = 1.28 + Math.random() * 0.55;
  else if (r < 0.96) target = 1.9 + Math.random() * 1.5;
  else target = 3.8 + Math.random() * 4.5;
  if (target > crashPoint - 0.02) return null;
  return Math.max(1.01, round2(target));
}

function ensureDataDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }

function loadState() {
  ensureDataDir();
  if (!fs.existsSync(STATE_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return null; }
}

let persistTimer = null;
function persist(immediate=false) {
  const write = () => {
    persistTimer = null;
    ensureDataDir();
    const data = {
      version: 1,
      savedAt: now(),
      roundSeq: game.roundSeq,
      round: game.round,
      recent: game.recent,
      completedRounds: game.completedRounds.slice(-50),
      players: game.players,
      transactions: game.transactions.slice(-500),
      queuedBets: game.queuedBets,
      deposits: (game.deposits || []).slice(-2000),
      withdrawals: (game.withdrawals || []).slice(-2000),
      walletLedger: (game.walletLedger || []).slice(-3000),
      adminActions: (game.adminActions || []).slice(-1000),
      paymentSettings: game.paymentSettings || null,
      upcomingCrashes: (game.upcomingCrashes || []).slice(0, 10),
      forceHoldSimMoon: !!game.forceHoldSimMoon,
    winBoards: currentWinBoards(),
    oddsBoards: currentOddsBoards(),
    pnl: Object.assign({ seeded: (game.pnl && game.pnl.seeded) || 3 }, pnlSnapshot()),
    betWins: (Array.isArray(game.betWins) ? game.betWins.slice(-5000) : []),
    chat: (game.chat || []).slice(),
      chatPins: (game.chatPins || []).slice(-3),
      chatAutoPins: (game.chatAutoPins || []).slice(-2),
      chatSaves: game.chatSaves || {},
      chatReports: (game.chatReports || []).slice(-500),
      chatAudit: (game.chatAudit || []).slice(-500),
      rains: (game.rains || []).slice(-100),
      boosterpot: game.boosterpot || null,
      adminInbox: (game.adminInbox || []).slice(-500),
      directMessages: (game.directMessages || []).slice(-1000),
      dmSaves: game.dmSaves || {},
      dmHidden: game.dmHidden || {},
      dmBlocks: game.dmBlocks || {},
      freebets: (game.freebets || []).slice(-500),
    };
    try { fs.writeFileSync(STATE_FILE, JSON.stringify(data)); } catch (e) { console.error('persist failed', e.message); }
    try { payDb.syncAll(game); } catch (e) { console.error('db sync failed', e.message); }
  };
  if (immediate) { if (persistTimer) clearTimeout(persistTimer); write(); }
  else if (!persistTimer) { persistTimer = setTimeout(write, 250); }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createSimBets(roundId, crashPoint) {
  const pool = shuffle(NAMES);
  const count = Math.min(pool.length, 60 + Math.floor(Math.random() * 61)); // 60-120 simulated players per round
  const bets = [];
  const t = now();
  for (let i = 0; i < count; i++) {
    const name = pool[i];
    const sp = getSimPlayer(name);
    recordActivity(sp, t, false);
    const amount = betAmountSample();
    bets.push({
      id: `${roundId}-s-${i}`,
      roundId,
      owner: null,
      panel: null,
      name,
      simulated: true,
      amount,
      status: 'BET_PLACED',
      cashoutAt: null,
      win: null,
      auto: targetCashout(crashPoint),
      payoutDone: false
    });
    registerBoosterpotSimContribution(amount);
    pnlAdd('bets', amount);
  }
  if (crashPoint >= 80.5 && bets.length >= 2) {
    const picks = [];
    while (picks.length < 2) {
      const idx = Math.floor(Math.random() * bets.length);
      if (picks.indexOf(idx) === -1) picks.push(idx);
    }
    const cap = Math.min(CONFIG.moonMultiplier, crashPoint) - 0.01;
    picks.forEach(idx => {
      const hi = Math.max(80, cap);
      bets[idx].auto = round2(80 + Math.random() * Math.max(0, hi - 80));
    });
  }
  if (game.forceHoldSimMoon && bets.length) {
    const hold = bets[bets.length - 1];
    hold.auto = null;
    hold.holdAtMoon = true;
    game.forceHoldSimMoon = false;
  }
  return bets;
}

function formatRoundId(seq) { return 'R' + String(seq).padStart(8, '0'); }
function nextRoundId() { return formatRoundId(game.roundSeq + 1); }

function ensureUpcomingCrashes(n = 4) {
  if (!Array.isArray(game.upcomingCrashes)) game.upcomingCrashes = [];
  if (houseProfitActive()) {
    game.upcomingCrashes = Array.from({ length: n }, () => forcedCrashPoint());
    return;
  }
  while (game.upcomingCrashes.length < n) game.upcomingCrashes.push(generateCrashPoint());
  if (game.upcomingCrashes.length > n) game.upcomingCrashes = game.upcomingCrashes.slice(0, n);
}

function ensureUpcomingBoosterpots(n = 4) {
  const bp = ensureBoosterpotState();
  if (!bp) return [];
  if (!Array.isArray(bp.upcomingTargets)) bp.upcomingTargets = [];
  bp.upcomingTargets = bp.upcomingTargets.map(x => clampMoney(Number(x))).filter(x => isFinite(x) && x >= (CONFIG.boosterpotPrizeMin || 10000) && x <= (CONFIG.boosterpotPrizeMax || 15000));
  while (bp.upcomingTargets.length < n) bp.upcomingTargets.push(randomBoosterpotPrize());
  if (bp.upcomingTargets.length > n) bp.upcomingTargets = bp.upcomingTargets.slice(0, n);
  // keep active event aligned to current predetermined target
  if (bp.status === 'ACTIVE' && !bp.pendingCollect) {
    const t = clampMoney(bp.upcomingTargets[0] || bp.targetAmount || randomBoosterpotPrize());
    bp.targetAmount = t;
    bp.prizeAmount = t;
  }
  return bp.upcomingTargets;
}

function newRound(roundSeq) {
  const roundId = formatRoundId(roundSeq);
  ensureUpcomingCrashes(4);
  const crashPoint = game.upcomingCrashes.length ? round2(game.upcomingCrashes.shift()) : generateCrashPoint();
  ensureUpcomingCrashes(4);
  const bettingEndsAt = now() + CONFIG.bettingMs;
  return {
    roundId,
    state: 'BETTING',
    crashPoint,
    bettingEndsAt,
    startedAt: 0,
    crashedAt: 0,
    nextAt: 0,
    completed: false,
    bets: createSimBets(roundId, crashPoint)
  };
}

const persisted = loadState();
const game = {
  roundSeq: (persisted && persisted.roundSeq) || 0,
  round: null,
  recent: (persisted && persisted.recent) || [1.34,2.10,1.08,5.62,12.30,1.75,3.41,1.19,8.04,2.66],
  completedRounds: (persisted && persisted.completedRounds) || [],
  betWins: Array.isArray(persisted && persisted.betWins) ? persisted.betWins.slice(-5000) : [],
  winBoards: normalizeBoardStore(persisted && persisted.winBoards),
  pnl: (persisted && persisted.pnl && typeof persisted.pnl === 'object') ? Object.assign({ bets: 0, cashouts: 0, boosterpotAwards: 0, freebetsClaimed: 0, freebetsUnused: 0, rainsClaimed: 0, rainsUnused: 0, rainsUserUnused: 0, adminAdded: 0, adminDeducted: 0, seeded: false }, persisted.pnl) : { bets: 0, cashouts: 0, boosterpotAwards: 0, freebetsClaimed: 0, freebetsUnused: 0, rainsClaimed: 0, rainsUnused: 0, rainsUserUnused: 0, adminAdded: 0, adminDeducted: 0, seeded: false },
  oddsBoards: normalizeBoardStore(persisted && persisted.oddsBoards),
  players: (persisted && persisted.players) || {},
  transactions: (persisted && persisted.transactions) || [],
  queuedBets: Array.isArray(persisted && persisted.queuedBets) ? persisted.queuedBets : [],
  simPlayers: {},
  timer: null,
  deposits: Array.isArray(persisted && persisted.deposits) ? persisted.deposits : [],
  withdrawals: Array.isArray(persisted && persisted.withdrawals) ? persisted.withdrawals : [],
  walletLedger: Array.isArray(persisted && persisted.walletLedger) ? persisted.walletLedger : [],
  adminActions: Array.isArray(persisted && persisted.adminActions) ? persisted.adminActions : [],
  paymentSettings: (persisted && persisted.paymentSettings) || null,
  upcomingCrashes: Array.isArray(persisted && persisted.upcomingCrashes) ? persisted.upcomingCrashes.map(x => round2(Number(x))).filter(x => isFinite(x) && x >= 1).slice(0, 10) : [],
  forceHoldSimMoon: !!(persisted && persisted.forceHoldSimMoon),
  chat: Array.isArray(persisted && persisted.chat) ? persisted.chat.slice() : [],
  chatPins: Array.isArray(persisted && persisted.chatPins) ? persisted.chatPins.slice(-3) : [],
  chatAutoPins: Array.isArray(persisted && persisted.chatAutoPins) ? persisted.chatAutoPins.slice(-2) : [],
  chatSaves: (persisted && persisted.chatSaves && typeof persisted.chatSaves === 'object') ? persisted.chatSaves : {},
  chatReports: Array.isArray(persisted && persisted.chatReports) ? persisted.chatReports.slice(-500) : [],
  chatAudit: Array.isArray(persisted && persisted.chatAudit) ? persisted.chatAudit.slice(-500) : [],
  rains: Array.isArray(persisted && persisted.rains) ? persisted.rains.slice(-100) : [],
  boosterpot: (persisted && persisted.boosterpot && typeof persisted.boosterpot === 'object') ? persisted.boosterpot : null,
adminInbox: Array.isArray(persisted && persisted.adminInbox) ? persisted.adminInbox.slice(-500) : [],
    directMessages: Array.isArray(persisted && persisted.directMessages) ? persisted.directMessages.slice(-1000) : [],
  dmSaves: (persisted && persisted.dmSaves && typeof persisted.dmSaves === 'object') ? persisted.dmSaves : {},
  dmHidden: (persisted && persisted.dmHidden && typeof persisted.dmHidden === 'object') ? persisted.dmHidden : {},
  dmBlocks: (persisted && persisted.dmBlocks && typeof persisted.dmBlocks === 'object') ? persisted.dmBlocks : {},
    freebets: Array.isArray(persisted && persisted.freebets) ? persisted.freebets : []
  };
if (persisted && persisted.round) game.round = persisted.round;
pruneChat();
let congratsStyleChanged = false;
(game.directMessages || []).forEach(m => {
  if (!m || m.fromToken !== '__admin__') return;
  if (/^Congratulations! You won the Boosterpot/.test(String(m.text || ''))) { if (m.style !== 'gold') { m.style = 'gold'; congratsStyleChanged = true; } return; }
  if (m.style === 'red' && !/Free Bet/.test(String(m.text || ''))) { delete m.style; congratsStyleChanged = true; }
});
(game.adminInbox || []).forEach(m => {
  if (!m || m.from !== 'admin') return;
  if (/^Congratulations! You won the Boosterpot/.test(String(m.text || ''))) { if (m.style !== 'gold') { m.style = 'gold'; congratsStyleChanged = true; } return; }
  if (m.style === 'red' && !/Free Bet/.test(String(m.text || ''))) { delete m.style; congratsStyleChanged = true; }
});
if (congratsStyleChanged && typeof persist === 'function') persist(true);
if (!Array.isArray(game.betWins) || !game.betWins.length) {
  const seeded = [];
  (game.completedRounds || []).forEach(rd => {
    (rd.bets || []).forEach(b => {
      if (b.status !== 'CASHED_OUT') return;
      const owner = (!b.simulated && b.owner) ? game.players[b.owner] : null;
      const sim = b.simulated ? getSimPlayer(b.name) : null;
      const profile = owner || sim;
      seeded.push({
        id: b.id,
        roundId: rd.roundId,
        name: (owner && owner.username) ? owner.username : (b.name || 'Player'),
        avatar: profile ? (profile.avatar || AVATARS[0]) : null,
        isVip: profile ? !!profile.isVip : false,
        simulated: !!b.simulated,
        stake: b.amount,
        multiplier: round2(Number(b.cashoutAt) || 0),
        win: Number(b.win) || 0,
        at: rd.crashedAt || rd.startedAt || now()
      });
    });
  });
  game.betWins = seeded.slice(-800);
}
try { seedBoardsFromHistory(); } catch (e) { }
try { seedPnl(); } catch (e) { console.error('seedPnl failed', e && e.stack || e); }
ensureUpcomingCrashes(4);
payStore.ensurePaymentState(game);
ensureBoosterpotState();
ensureUpcomingBoosterpots(4);

function ensureBoosterpotState() {
  if (!CONFIG.boosterpotEnabled) return null;
  if (!game.boosterpot || typeof game.boosterpot !== 'object') {
    const prize = randomBoosterpotPrize();
    game.boosterpot = {
      currentEventId: uid('bp'),
      periodStartRoundSeq: game.roundSeq || 0,
      roundsCounted: 0,
      participants: {},
      simParticipants: {},
      status: 'ACTIVE',
      targetAmount: prize,
      contributionRate: CONFIG.boosterpotContributionRate,
      currentAmount: randomBoosterpotSeed(),
      prizeAmount: prize,
      currentWin: null,
      history: [],
      notifiedEventId: null
    };
  }
  const bp = game.boosterpot;
  if (!bp.currentEventId) bp.currentEventId = uid('bp');
  if (!bp.participants || typeof bp.participants !== 'object') bp.participants = {};
  if (!bp.simParticipants || typeof bp.simParticipants !== 'object') bp.simParticipants = {};
  if (!Array.isArray(bp.history)) bp.history = [];
  if (!Array.isArray(bp.upcomingTargets)) bp.upcomingTargets = [];
  if (!isFinite(Number(bp.roundsCounted))) bp.roundsCounted = 0;
  if (Number(bp.contributionRate) !== CONFIG.boosterpotContributionRate) {
    bp.contributionRate = CONFIG.boosterpotContributionRate;
    bp.currentAmount = 0;
  }
  if (!isFinite(Number(bp.currentAmount)) || bp.currentAmount < 0) bp.currentAmount = 0;
  const minP = CONFIG.boosterpotPrizeMin || 6999.99;
  const maxP = CONFIG.boosterpotPrizeMax || 15142;
  if (!isFinite(Number(bp.prizeAmount)) || bp.prizeAmount < minP || bp.prizeAmount > maxP) bp.prizeAmount = randomBoosterpotPrize();
  if (!isFinite(Number(bp.targetAmount)) || bp.targetAmount < minP || bp.targetAmount > maxP) {
    bp.targetAmount = bp.prizeAmount;
    bp.currentAmount = 0;
  }
  // keep target/prize aligned so pot triggers at the award point
  if (bp.status === 'ACTIVE' && !bp.currentWin) bp.prizeAmount = bp.targetAmount;
  if (!isFinite(Number(bp.targetHitRoundSeq))) bp.targetHitRoundSeq = 0;
  // pot already at/over target but no hit round recorded yet: only the current round counts
  if (bp.status === 'ACTIVE' && !bp.currentWin && !Number(bp.targetHitRoundSeq) && Number(bp.currentAmount) >= Number(bp.targetAmount)) {
    bp.targetHitRoundSeq = game.roundSeq || 0;
  }
  if (!bp.status) bp.status = 'ACTIVE';
  return bp;
}

function isEligibleBoosterpotParticipantPlayer(token) {
  if (!token || typeof token !== 'string') return false;
  const p = game.players[token];
  if (!p) return false;
  return true; // real registered players can participate/contribute by placing valid bets
}

function isBoosterpotWinnablePlayer(token) {
  const bp = ensureBoosterpotState();
  if (!token || typeof token !== 'string' || !bp) return false;
  const p = game.players[token];
  if (!p) return false;
  // winner must come from real registered players who actively placed qualifying bets in this event
  const meta = bp.participants && bp.participants[token];
  if (!meta || typeof meta !== 'object') return false;
  // must still have active bets contributing to this boosterpot event (cancelled bets remove eligibility)
  if ((Number(meta.betCount || 0) <= 0) || (Number(meta.totalAmount || 0) <= 0)) return false;
  const lastRound = Number(meta.lastRoundSeq || 0);
  const startSeq = Number(bp.periodStartRoundSeq || 0);
  if (lastRound < startSeq) return false;
  // must have bet in the round where the pot reached its target
  const hitSeq = Number(bp.targetHitRoundSeq || 0);
  if (hitSeq > 0 && lastRound < hitSeq) return false;
  return true;
}

function boosterpotIsActiveNow(token) {
  const r = game.round;
  if (r && Array.isArray(r.bets) && r.bets.some(b => b && b.owner === token && (b.status === 'BET_PLACED' || b.status === 'FLYING'))) return true;
  const nextId = nextRoundId();
  if (Array.isArray(game.queuedBets) && game.queuedBets.some(q => q && q.owner === token && q.targetRoundId === nextId)) return true;
  return false;
}

function registerBoosterpotContribution(token, betAmount) {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return;
  if (!isEligibleBoosterpotParticipantPlayer(token)) return;
  const amt = clampMoney(Math.max(0, Number(betAmount) || 0));
  if (amt <= 0) return;
  const prev = (bp.participants && bp.participants[token] && typeof bp.participants[token] === 'object') ? bp.participants[token] : { betCount: 0, totalAmount: 0 };
  bp.participants[token] = {
    lastBetAt: now(),
    lastRoundSeq: game.roundSeq || 0,
    betCount: (Number(prev.betCount) || 0) + 1,
    totalAmount: clampMoney((Number(prev.totalAmount) || 0) + amt)
  };
  const contrib = clampMoney(amt * (bp.contributionRate || CONFIG.boosterpotContributionRate));
  if (contrib <= 0) return;
  const target = clampMoney(bp.targetAmount || bp.prizeAmount || CONFIG.boosterpotPrizeMax || 15000);
  bp.currentAmount = clampMoney(Math.min(target, (bp.currentAmount || 0) + contrib));
  if (bp.currentAmount >= target) bp.targetHitRoundSeq = game.roundSeq || 0;
}

function revokeBoosterpotContribution(token, betAmount) {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return;
  const amt = clampMoney(Math.max(0, Number(betAmount) || 0));
  if (amt <= 0) return;
  const prev = (bp.participants && bp.participants[token] && typeof bp.participants[token] === 'object') ? bp.participants[token] : null;
  if (prev) {
    const betCount = Math.max(0, (Number(prev.betCount) || 0) - 1);
    const totalAmount = clampMoney(Math.max(0, (Number(prev.totalAmount) || 0) - amt));
    if (betCount <= 0 && totalAmount <= 0) {
      delete bp.participants[token];
    } else {
      bp.participants[token] = Object.assign({}, prev, { betCount, totalAmount });
    }
  }
  const contrib = clampMoney(amt * (bp.contributionRate || CONFIG.boosterpotContributionRate));
  if (contrib > 0) {
    bp.currentAmount = clampMoney(Math.max(0, (bp.currentAmount || 0) - contrib));
  }
}

function registerBoosterpotParticipant(token) {
  // legacy/no-op: participation now requires an actual bet contribution in this event
}

function registerBoosterpotSimContribution(betAmount) {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return;
  const amt = clampMoney(Math.max(0, Number(betAmount) || 0));
  if (amt <= 0) return;
  const id = `sim_${Object.keys(bp.simParticipants || {}).length + 1}_${Math.floor(now()/1000)}`;
  bp.simParticipants[id] = { at: now(), amount: amt }; // contributes only; cannot win
  const contrib = clampMoney(amt * (bp.contributionRate || CONFIG.boosterpotContributionRate));
  if (contrib > 0) {
    const target = clampMoney(bp.targetAmount || bp.prizeAmount || CONFIG.boosterpotPrizeMax || 15000);
    bp.currentAmount = clampMoney(Math.min(target, (bp.currentAmount || 0) + contrib));
    if (bp.currentAmount >= target) bp.targetHitRoundSeq = game.roundSeq || 0;
  }
}

function boosterpotEligibleWinnerTokens() {
  const bp = ensureBoosterpotState();
  if (!bp) return [];
  return Object.keys(bp.participants || {}).filter(t => isBoosterpotWinnablePlayer(t));
}

function secureRandomIndex(maxExclusive) {
  if (maxExclusive <= 0) return -1;
  return crypto.randomInt(0, maxExclusive);
}

function startBoosterpotEvent(bp, reset) {
  const history = (bp && Array.isArray(bp.history)) ? bp.history.slice(-50) : [];
  const pendingCollect = (bp && bp.pendingCollect && !bp.pendingCollect.collectedAt) ? bp.pendingCollect : null;
  let upcomingTargets = Array.isArray(bp && bp.upcomingTargets) ? bp.upcomingTargets.slice() : [];
  if (upcomingTargets.length) upcomingTargets.shift(); // consumed current
  while (upcomingTargets.length < 4) upcomingTargets.push(randomBoosterpotPrize());
  upcomingTargets = upcomingTargets.slice(0, 4).map(x => clampMoney(Number(x))).filter(x => isFinite(x));
  const nextPrize = clampMoney(upcomingTargets[0] || randomBoosterpotPrize());
  upcomingTargets[0] = nextPrize;
  return {
    currentEventId: uid('bp'),
    periodStartRoundSeq: game.roundSeq || 0,
    targetHitRoundSeq: 0,
    roundsCounted: 0,
    participants: {},
    simParticipants: {},
    status: 'ACTIVE',
    targetAmount: nextPrize,
    contributionRate: CONFIG.boosterpotContributionRate,
    currentAmount: randomBoosterpotSeed(),
    prizeAmount: nextPrize,
    currentWin: null,
    pendingCollect,
    history,
    upcomingTargets,
    notifiedEventId: null
  };
}

function boosterpotSelectWinner() {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return null;
  if (bp.currentWin) { bp.status = bp.currentWin.collectedAt ? 'COLLECTED' : 'WINNER_SELECTED'; return bp.currentWin; }
  const eligible = boosterpotEligibleWinnerTokens();
  const target = clampMoney(bp.targetAmount || bp.prizeAmount || CONFIG.boosterpotPrizeMin || 10000);
  const selectedAt = now();
  const winId = uid('bpw');
  const amount = clampMoney(target);
  const simCount = Object.keys(bp.simParticipants || {}).length;

  if (eligible.length === 0) {
    // no active real user can be awarded: award a random system-generated user and reset pot
    const simName = NAMES[Math.floor(Math.random() * NAMES.length)] || 'System';
    const record = {
      id: winId,
      eventId: bp.currentEventId,
      playerId: 'sim:' + simName,
      username: simName,
      amount,
      status: 'COLLECTED',
      selectedAt,
      collectedAt: selectedAt,
      payoutReference: null,
      participantCount: 0,
      simParticipantCount: simCount,
      simulated: true
    };
    const allRealTokens = Object.keys(game.players || {});
    for (const t of allRealTokens) {
      const p = game.players[t];
      if (!p) continue;
      p.boosterpotNotice = {
        eventId: bp.currentEventId,
        type: 'lost',
        msg: `${simName} won the Boosterpot of ${amount.toFixed(2)} KES.`,
        amount,
        winnerUsername: simName,
        at: selectedAt
      };
    }
    const hist = {
      eventId: bp.currentEventId,
      winId,
      winnerPlayerId: record.playerId,
      winnerUsername: simName,
      prizeAmount: amount,
      participantCount: 0,
      simParticipantCount: simCount,
      selectedAt,
      collectedAt: selectedAt,
      status: 'COLLECTED',
      payoutReference: null,
      simulated: true,
      criteria: 'No eligible active real player at round start when target reached; awarded to a random system-generated user.'
    };
    bp.history.push(hist);
    if (bp.history.length > 100) bp.history = bp.history.slice(-50);
    addTransaction({ type: 'boosterpot_winner_selected', eventId: bp.currentEventId, winId, owner: null, amount, participants: 0, simParticipants: simCount, simulated: true, winner: simName });
    game.boosterpot = startBoosterpotEvent(bp);
    persist(true);
    return record;
  }

  const idx = secureRandomIndex(eligible.length);
  if (idx < 0) return null;
  const winnerToken = eligible[idx];
  const winner = game.players[winnerToken];
  if (!winner) return null;
  const ref = 'boosterpot:' + bp.currentEventId;
  const record = {
    id: winId,
    eventId: bp.currentEventId,
    playerId: winnerToken,
    username: winner.username || 'Player',
    amount,
    status: 'CREDITED',
    selectedAt,
    collectedAt: null,
    payoutReference: ref,
    participantCount: eligible.length,
    simParticipantCount: simCount
  };
  // credit winner immediately (reflect in balance even if player does not click collect)
  if (!payStore.ledgerRefExists(game, ref, 'BOOSTERPOT_PAYOUT') && !(game.walletLedger || []).some(e => e.reference === ref && e.transaction_type === 'BOOSTERPOT_PAYOUT' && e.status === 'COMPLETED')) {
    winner.balance = clampMoney((winner.balance || 0) + amount);
    payStore.addLedger(game, { user_id: winnerToken, transaction_type: 'BOOSTERPOT_PAYOUT', amount: clampMoney(amount), reference: ref, status: 'COMPLETED', description: `Boosterpot win (${bp.currentEventId})`, environment: 'internal' });
    addTransaction({ type: 'boosterpot_collect', eventId: bp.currentEventId, winId, owner: winnerToken, amount, auto: true });
    pnlAdd('boosterpotAwards', amount);
    }
  winner.boosterpotPendingWinId = winId;
  // auto congratulatory message from Admin into winner's Inbox
  if (winnerToken && winnerToken !== '__admin__' && game.players[winnerToken]) {
    const congrats = {
      id: uid('adm'),
      at: selectedAt,
      from: 'admin',
      to: winnerToken,
      toUsername: winner.username || 'Player',
      toAvatar: AVATARS.includes(winner.avatar) ? winner.avatar : AVATARS[0],
      text: `Congratulations! You won the Boosterpot of ${amount.toFixed(2)} KES. Your balance has been credited.`,
      style: 'gold'
    };
    if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
    game.adminInbox.push(congrats);
    if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    game.directMessages.push({ id: congrats.id, at: congrats.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: winnerToken, toUsername: congrats.toUsername, toAvatar: congrats.toAvatar, text: congrats.text, style: 'gold' });
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    for (const [, s] of io.sockets.sockets) {
      if (!s.data.isAdmin && s.data.token === winnerToken) { s.emit('dm_new', { id: congrats.id, at: congrats.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: winnerToken, toUsername: congrats.toUsername, toAvatar: congrats.toAvatar, text: congrats.text, style: 'gold' }); sendState(s); }
    }
  }
  // notify all real players: winner gets popup (pendingWin), others get loss notice
  const allRealTokens = Object.keys(game.players || {});
  for (const t of allRealTokens) {
    const p = game.players[t];
    if (!p) continue;
    if (t !== winnerToken) {
      p.boosterpotNotice = {
        eventId: bp.currentEventId,
        type: 'lost',
        msg: `${winner.username || 'A player'} won the Boosterpot of ${amount.toFixed(2)} KES.`,
        amount,
        winnerUsername: winner.username || 'Player',
        at: selectedAt
      };
    }
  }
  const hist = {
    eventId: bp.currentEventId,
    winId,
    winnerPlayerId: winnerToken,
    winnerUsername: winner.username || 'Player',
    prizeAmount: amount,
    participantCount: eligible.length,
    simParticipantCount: simCount,
    selectedAt,
    collectedAt: selectedAt,
    status: 'COLLECTED',
    payoutReference: ref,
    criteria: `Target (KES ${amount.toFixed(2)}) reached at round start; winner randomly selected server-side from ${eligible.length} eligible active real player(s) who placed qualifying bets in this event (1 entry per player). Credited immediately.`
  };
  bp.history.push(hist);
  if (bp.history.length > 100) bp.history = bp.history.slice(-50);
  addTransaction({ type: 'boosterpot_winner_selected', eventId: bp.currentEventId, winId, owner: winnerToken, amount, participants: eligible.length, simParticipants: simCount, autoCredited: true });
  // start next round immediately; keep win claimable for popup (already credited)
  const nextEvent = startBoosterpotEvent(bp);
  nextEvent.pendingCollect = record;
  game.boosterpot = nextEvent;
  persist(true);
  return record;
}

function boosterpotOnRoundStart() {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return null;
  const target = clampMoney(bp.targetAmount || bp.prizeAmount || CONFIG.boosterpotPrizeMin || 10000);
  if (clampMoney(bp.currentAmount || 0) >= target) {
    // trigger when round starts and target is hit; award is the event target/prize
    return boosterpotSelectWinner();
  }
  return null;
}

function boosterpotOnRoundComplete(roundSummary) {
  const bp = ensureBoosterpotState();
  if (!bp || bp.status !== 'ACTIVE') return null;
  bp.roundsCounted = (bp.roundsCounted || 0) + 1;
  persist();
  return null;
}

function boosterpotCollect(token) {
  const bp = ensureBoosterpotState();
  if (!bp) return { ok: false, msg: 'Boosterpot not available' };
  const win = bp.pendingCollect || bp.currentWin;
  if (!win) return { ok: false, msg: 'No Boosterpot win to collect for this event' };
  if (win.playerId !== token) return { ok: false, msg: 'This Boosterpot win is not yours' };
  const p = game.players[token];
  if (!p) return { ok: false, msg: 'No active session' };
  if (win.status === 'COLLECTED' || win.collectedAt) return { ok: true, msg: 'Already collected', win, balance: p.balance };
  const ref = 'boosterpot:' + win.eventId;
  // idempotent by ledger/reference
  if (payStore.ledgerRefExists(game, ref, 'BOOSTERPOT_PAYOUT') || (game.walletLedger || []).some(e => e.reference === ref && e.transaction_type === 'BOOSTERPOT_PAYOUT' && e.status === 'COMPLETED')) {
    if (win.status !== 'COLLECTED') { win.status = 'COLLECTED'; win.collectedAt = now(); win.payoutReference = ref; }
    if (bp.history) { const h = bp.history.find(x => x.eventId === win.eventId); if (h) { h.status = 'COLLECTED'; h.collectedAt = win.collectedAt; h.payoutReference = ref; } }
    if (bp.pendingCollect && bp.pendingCollect.eventId === win.eventId) bp.pendingCollect = null;
    p.boosterpotPendingWinId = null;
    persist(true);
    return { ok: true, msg: 'Already collected', win, balance: p.balance };
  }
  const collectedAt = now();
  p.balance = clampMoney((p.balance || 0) + clampMoney(win.amount));
  win.status = 'COLLECTED';
  win.collectedAt = collectedAt;
  win.payoutReference = ref;
  p.boosterpotPendingWinId = null;
  payStore.addLedger(game, { user_id: token, transaction_type: 'BOOSTERPOT_PAYOUT', amount: clampMoney(win.amount), reference: ref, status: 'COMPLETED', description: `Boosterpot win (${win.eventId})`, environment: 'internal' });
  addTransaction({ type: 'boosterpot_collect', eventId: win.eventId, winId: win.id, owner: token, amount: win.amount });
  if (bp.history) { const h = bp.history.find(x => x.eventId === win.eventId); if (h) { h.status = 'COLLECTED'; h.collectedAt = collectedAt; h.payoutReference = ref; h.winnerUsername = win.username; } }
  if (bp.pendingCollect && bp.pendingCollect.eventId === win.eventId) bp.pendingCollect = null;
  // next round already started on announcement; collect is optional
  persist(true);
  try { payDb.syncAll(game); } catch (_) {}
  return { ok: true, msg: 'Boosterpot collected', win, balance: p.balance };
}

function boosterpotSnapshotFor(token) {
  const bp = ensureBoosterpotState();
  if (!bp) return null;
  const p = token && game.players[token] ? game.players[token] : null;
  let pendingWin = null;
  const claimable = bp.pendingCollect || bp.currentWin;
  if (p && claimable && claimable.playerId === token && claimable.status !== 'COLLECTED' && !claimable.collectedAt) {
    pendingWin = { eventId: claimable.eventId, winId: claimable.id, amount: claimable.amount, selectedAt: claimable.selectedAt };
  } else if (p) {
    p.boosterpotPendingWinId = null;
  }
  let notice = null;
  if (p && p.boosterpotNotice) {
    notice = p.boosterpotNotice;
  }
  const targetAmount = clampMoney(bp.targetAmount || CONFIG.boosterpotTargetAmount);
  const currentAmount = clampMoney(bp.currentAmount || 0);
  return {
    eventId: bp.currentEventId,
    status: bp.status,
    targetAmount,
    currentAmount,
    prizeAmount: bp.prizeAmount,
    contributionRate: bp.contributionRate || CONFIG.boosterpotContributionRate,
    roundsCounted: bp.roundsCounted || 0,
    roundsPerEvent: CONFIG.boosterpotRoundsPerEvent,
    participantCount: Object.keys(bp.participants || {}).length,
    eligibleWinnerCount: boosterpotEligibleWinnerTokens().length,
    simContributorCount: Object.keys(bp.simParticipants || {}).length,
    progressPercent: targetAmount > 0 ? Math.max(0, Math.min(100, (currentAmount / targetAmount) * 100)) : 0,
    pendingWin,
    notice,
    recentWinners: (bp.history || []).slice(-6).reverse().map(h => {
      const winner = h.winnerPlayerId && game.players[h.winnerPlayerId] ? game.players[h.winnerPlayerId] : null;
      return { eventId: h.eventId, username: (winner && winner.username) ? winner.username : h.winnerUsername, amount: h.prizeAmount, selectedAt: h.selectedAt, collectedAt: h.collectedAt, status: h.status };
    })
  };
}

function sanitizeUsername(name) {
  if (typeof name !== 'string') return null;
  const cleaned = name.replace(/\s+/g, ' ').trim().slice(0, 20);
  if (!cleaned) return null;
  return cleaned;
}

function sanitizeAvatar(av) {
  if (typeof av !== 'string') return null;
  const a = av.trim();
  if (!AVATARS.includes(a)) return null;
  return a;
}

function defaultAutoPanel() {
  return {
    running: false,
    amount: 100,
    roundsTotal: 0,
    roundsRemaining: 0,
    autoCashout: null,
    lastPlacedRoundId: null,
    lastQueuedRoundId: null,
    stopRequested: false,
    pausedOffline: false,
    status: 'AUTO STOPPED',
    lastError: null
  };
}

function normalizeAutoPanel(a) {
  const d = defaultAutoPanel();
  const x = a && typeof a === 'object' ? a : {};
  const p = {
    running: !!x.running,
    amount: Math.max(10, Math.min(10000, Math.floor(Number(x.amount) || d.amount))),
    roundsTotal: Math.max(0, Math.floor(Number(x.roundsTotal) || 0)),
    roundsRemaining: Math.max(0, Math.floor(Number(x.roundsRemaining) || 0)),
    autoCashout: normalizeAutoCashout(x.autoCashout),
    lastPlacedRoundId: typeof x.lastPlacedRoundId === 'string' ? x.lastPlacedRoundId : null,
    lastQueuedRoundId: typeof x.lastQueuedRoundId === 'string' ? x.lastQueuedRoundId : null,
    stopRequested: !!x.stopRequested,
    pausedOffline: !!x.pausedOffline,
    status: typeof x.status === 'string' && x.status ? x.status : d.status,
    lastError: x.lastError || null
  };
  if (p.running) p.pausedOffline = false;
  if (!p.running && p.roundsRemaining <= 0 && p.status !== 'INSUFFICIENT BALANCE') p.status = 'AUTO STOPPED';
  return p;
}

function ensureAuto(p) {
  if (!p) return;
  if (!Array.isArray(p.auto)) p.auto = [defaultAutoPanel(), defaultAutoPanel()];
  p.auto = [normalizeAutoPanel(p.auto[0]), normalizeAutoPanel(p.auto[1])];
}

function getPlayer(token) {
  if (!token || typeof token !== 'string') return null;
  const t = token.slice(0, 80);
  if (!game.players[t]) {
    game.players[t] = {
      token: t, balance: CONFIG.startBalance, reservedBalance: 0, phoneNumber: null, createdAt: now(), lastNotice: null,
      username: 'Player', avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)], activity: [], isVip: false, vipNotified: false,
      auto: [defaultAutoPanel(), defaultAutoPanel()]
    };
    persist();
  }
  const p = game.players[t];
  if (p.lastNotice === undefined) p.lastNotice = null;
  if (!p.username) p.username = 'Player';
  if (!p.avatar || !AVATARS.includes(p.avatar)) p.avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  if (!Array.isArray(p.activity)) p.activity = [];
  if (typeof p.isVip !== 'boolean') p.isVip = false;
  if (typeof p.vipNotified !== 'boolean') p.vipNotified = false;
  delete p.vipWindowStart;
  delete p.vipNotifiedWindow;
  if (!isFinite(Number(p.reservedBalance))) p.reservedBalance = 0;
  p.reservedBalance = clampMoney(Math.max(0, p.reservedBalance));
  if (!isFinite(Number(p.balance))) p.balance = 0;
  p.balance = clampMoney(Math.max(0, p.balance));
  if (p.phoneNumber === undefined) p.phoneNumber = null;
  ensureAuto(p);
  return p;
}

function getSimPlayer(name) {
  if (!name || typeof name !== 'string') return null;
  if (!game.simPlayers) game.simPlayers = {};
  if (!game.simPlayers[name]) {
    game.simPlayers[name] = {
      name,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      activity: [],
      isVip: false
    };
  }
  const sp = game.simPlayers[name];
  if (!sp.avatar || !AVATARS.includes(sp.avatar)) sp.avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  if (!Array.isArray(sp.activity)) sp.activity = [];
  if (typeof sp.isVip !== 'boolean') sp.isVip = false;
  return sp;
}

function updateVipStatus(p, t = now(), notify = true) {
  if (!p) return;
  if (!Array.isArray(p.activity)) p.activity = [];
  const cutoff = t - CONFIG.vipWindowMs;
  p.activity = p.activity.filter(ts => ts > cutoff);
  const wasVip = !!p.isVip;
  p.isVip = p.activity.length >= CONFIG.vipThreshold;
  if (!p.isVip) {
    if ('vipNotified' in p) p.vipNotified = false;
  } else if (!wasVip && notify) {
    if ('vipNotified' in p && !p.vipNotified) {
      p.vipNotified = true;
      p.lastNotice = { type: 'vip', msg: 'You are now a VIP! Stay active to keep your VIP status.', at: t };
    }
  }
}

function recordActivity(p, t = now(), notify = true) {
  if (!p) return;
  updateVipStatus(p, t, notify);
  p.activity.push(t);
  updateVipStatus(p, t, notify);
}

function addTransaction(tx) {
  game.transactions.push(Object.assign({ id: uid('tx'), at: now() }, tx));
  if (game.transactions.length > 1000) game.transactions = game.transactions.slice(-500);
}

function clearTimer() { if (game.timer) { clearTimeout(game.timer); game.timer = null; } }

function displayBetName(bet) {
  if (bet && bet.owner && !bet.simulated) {
    const p = game.players[bet.owner];
    return (p && p.username) ? p.username : 'Player';
  }
  return bet ? bet.name : 'Player';
}

function visibleBetsFor(token) {
  const r = game.round;
  const bets = r.bets.map(b => {
    const owner = b.owner && !b.simulated ? game.players[b.owner] : null;
    const sim = b.simulated ? getSimPlayer(b.name) : null;
    const profile = owner || sim;
    return {
      id: b.id,
      roundId: b.roundId,
      name: displayBetName(b),
      simulated: !!b.simulated,
      isMine: !!(token && b.owner === token),
      panel: b.panel ?? null,
      amount: b.amount,
      status: b.status,
      cashoutAt: b.cashoutAt,
      win: b.win,
      avatar: profile ? (profile.avatar || AVATARS[0]) : null,
      isVip: profile ? !!profile.isVip : false
    };
  });
  const nextId = nextRoundId();
  game.queuedBets.forEach(q => {
    if (q.targetRoundId !== nextId) return;
    const isMine = !!(token && q.owner === token);
    const p = game.players[q.owner];
    const uname = (p && p.username) ? p.username : 'Player';
    bets.unshift({
      id: q.id,
      roundId: q.targetRoundId,
      name: uname,
      simulated: false,
      isMine,
      panel: q.panel,
      amount: q.amount,
      status: 'QUEUED',
      cashoutAt: null,
      win: null,
      avatar: p ? (p.avatar || uname.charAt(0).toUpperCase()) : null,
      isVip: p ? !!p.isVip : false
    });
  });
  return bets;
}

function myBetHistory(token) {
  if (!token) return [];
  const out = [];
  for (let i = game.completedRounds.length - 1; i >= 0 && out.length < 50; i--) {
    const r = game.completedRounds[i];
    for (const b of (r.bets || [])) {
      if (b.owner === token && !b.simulated) {
        out.push({
          id: b.id,
          roundId: r.roundId,
          crashPoint: r.crashPoint,
          at: r.crashedAt,
          amount: b.amount,
          status: b.status,
          cashoutAt: b.cashoutAt,
          win: b.win
        });
        if (out.length >= 50) break;
      }
    }
  }
  return out;
}

function snapshotFor(token) {
  const t = now();
  const r = game.round;
  let multiplier = 1;
  let remainingMs = 0;
  if (r.state === 'BETTING') {
    multiplier = 1;
    remainingMs = Math.max(0, r.bettingEndsAt - t);
  } else if (r.state === 'RUNNING') {
    multiplier = Math.min(r.crashPoint, Math.max(1, multiplierAt(t - r.startedAt)));
  } else if (r.state === 'CRASHED') {
    multiplier = r.crashPoint;
    remainingMs = Math.max(0, r.nextAt - t);
  }
  const p = token && game.players[token] ? game.players[token] : null;
  if (p) updateVipStatus(p, t);
  const paySettings = payStore.getPaymentSettings(game);
  const lastCompleted = (game.completedRounds || []).length ? game.completedRounds[game.completedRounds.length - 1] : null;
  const snap = {
    type: 'state',
    serverTime: t,
    config: { bettingMs: CONFIG.bettingMs, crashedMs: CONFIG.crashedMs, growthRate: CONFIG.growthRate, vipWindowMs: CONFIG.vipWindowMs, vipThreshold: CONFIG.vipThreshold, avatars: AVATARS },
    payments: paySettings,
    round: {
      roundId: r.roundId,
      state: r.state,
      multiplier,
      crashPoint: r.crashPoint,
      bettingEndsAt: r.bettingEndsAt,
      startedAt: r.startedAt,
      crashedAt: r.crashedAt,
      nextAt: r.nextAt,
      remainingMs,
      nextRoundId: nextRoundId()
    },
    recent: game.recent,
    bets: visibleBetsFor(token),
    myBets: myBetHistory(token),
    previousRound: lastCompleted ? {
      roundId: lastCompleted.roundId,
      crashPoint: lastCompleted.crashPoint,
      crashedAt: lastCompleted.crashedAt,
      bets: (lastCompleted.bets || []).map(b => {
        const owner = b.owner && !b.simulated ? game.players[b.owner] : null;
        const sim = b.simulated ? getSimPlayer(b.name) : null;
        const profile = owner || sim;
        return {
          id: b.id,
          roundId: b.roundId,
          name: (owner && owner.username) ? owner.username : (b.name || 'Player'),
          simulated: !!b.simulated,
          isMine: !!(token && b.owner === token),
          panel: b.panel ?? null,
          amount: b.amount,
          status: b.status,
          cashoutAt: b.cashoutAt,
          win: b.win,
avatar: profile ? (profile.avatar || AVATARS[0]) : null,
          isVip: profile ? !!profile.isVip : false
        };
      })
    } : null,
    winBoards: currentWinBoards(),
    oddsBoards: currentOddsBoards(),
    myActiveBets: r.bets.filter(b => b.owner === token && (b.status === 'BET_PLACED' || b.status === 'FLYING')).map(b => ({ id: b.id, roundId: b.roundId, panel: b.panel, status: b.status, amount: b.amount, cashoutAt: b.cashoutAt, win: b.win })),
    betWins: (Array.isArray(game.betWins) ? game.betWins.slice(-600) : []),
    chat: (game.chat || []).slice(),
    chatPins: pinnedChatIds(),
    chatSaved: (token && game.chatSaves && Array.isArray(game.chatSaves[token])) ? game.chatSaves[token].slice() : [],
    rains: (Array.isArray(game.rains) ? game.rains.slice(-50) : []).map(r => ({ id: r.id, at: r.at, expiresAt: r.expiresAt, from: r.from, fromUsername: r.fromUsername || 'Player', amount: r.amount, maxClaimers: r.maxClaimers, total: r.total || (r.amount * r.maxClaimers), claimedCount: r.claimedCount || 0, claimedBy: Object.keys(r.claimedBy || {}) })),
    adminInbox: (Array.isArray(game.adminInbox) && token ? game.adminInbox.filter(m => (m.from === 'admin' && m.to === token) || (m.from === 'player' && m.fromToken === token)).slice(-100) : []),
    directMessages: (Array.isArray(game.directMessages) && token ? game.directMessages.filter(m => !((game.dmHidden || {})[token] || []).includes(m.id)).filter(m => m.fromToken === token || m.toToken === token).slice(-200) : []),
    dmSaves: ((game.dmSaves || {})[token] || []).slice(-500),
    dmBlocks: ((game.dmBlocks || {})[token] || []).slice(-200),
    freebets: (Array.isArray(game.freebets) && token ? game.freebets.filter(f => f.to === token).slice(-50) : []),
    contacts: (() => {
      const list = Object.values(game.players || {}).map(pl => ({ token: pl.token, username: pl.username || 'Player', avatar: AVATARS.includes(pl.avatar) ? pl.avatar : AVATARS[0], online: isPlayerOnline(pl.token), isAdmin: false, isVip: !!pl.isVip }));
      list.push({ token: '__admin__', username: 'Admin', avatar: '👑', online: isAnyAdminOnline(), isAdmin: true });
      return list.sort((a,b) => (b.isAdmin - a.isAdmin) || (b.online - a.online) || String(a.username||'').localeCompare(String(b.username||'')));
    })(),
    boosterpot: boosterpotSnapshotFor(token),
    player: p ? {
      token: p.token, balance: p.balance, reservedBalance: p.reservedBalance || 0, notice: p.lastNotice || null,
      username: p.username || 'Player', avatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0], isVip: !!p.isVip,
      activityCount: Array.isArray(p.activity) ? p.activity.length : 0,
      phoneNumber: p.phoneNumber || null,
      auto: (ensureAuto(p), p.auto),
      dmReadAt: (p.dmReadAt && typeof p.dmReadAt === 'object') ? p.dmReadAt : {},
      chatMutedUntil: p.chatMutedUntil || 0,
      chatWarnings: p.chatWarnings || 0
    } : null
  };
  // clear one-shot boosterpot loss notice after including in snapshot
  if (p && p.boosterpotNotice) {
    p.boosterpotNotice = null;
  }
  return snap;
}

function adminSnapshot() {
  const t = now();
  const r = game.round;
  ensureUpcomingCrashes(4);
  const bp = ensureBoosterpotState();
  ensureUpcomingBoosterpots(4);
  let multiplier = 1;
  let remainingMs = 0;
  if (r.state === 'BETTING') {
    multiplier = 1;
    remainingMs = Math.max(0, r.bettingEndsAt - t);
  } else if (r.state === 'RUNNING') {
    multiplier = Math.min(r.crashPoint, Math.max(1, multiplierAt(t - r.startedAt)));
  } else if (r.state === 'CRASHED') {
    multiplier = r.crashPoint;
    remainingMs = Math.max(0, r.nextAt - t);
  }
  const baseSeq = game.roundSeq;
  const upcoming = [r.crashPoint].concat((game.upcomingCrashes || []).slice(0, 3)).slice(0, 4).map((cp, i) => ({
    label: i === 0 ? 'This round' : `Next +${i}`,
    roundId: formatRoundId(baseSeq + i),
    crashPoint: round2(cp)
  }));
  const upcomingBoosterpots = (bp && bp.upcomingTargets ? bp.upcomingTargets : []).slice(0, 4).map((amt, i) => ({
    label: i === 0 ? 'Current (active)' : `Next +${i}`,
    eventId: i === 0 ? (bp && bp.currentEventId) : null,
    targetAmount: clampMoney(amt)
  }));
  const lastWonBp = (bp && Array.isArray(bp.history) && bp.history.length) ? (() => {
    const h = bp.history[bp.history.length - 1];
    return {
      eventId: h.eventId,
      winId: h.winId || null,
      winnerPlayerId: h.winnerPlayerId || null,
      winnerUsername: h.winnerUsername || 'Unknown',
      amount: clampMoney(h.prizeAmount || 0),
      selectedAt: h.selectedAt || null,
      collectedAt: h.collectedAt || null,
      status: h.status || null,
      simulated: !!h.simulated,
      criteria: h.criteria || 'Not recorded'
    };
  })() : null;
  return {
    type: 'admin_state',
    serverTime: t,
    round: {
      roundId: r.roundId,
      state: r.state,
      multiplier,
      crashPoint: r.crashPoint,
      bettingEndsAt: r.bettingEndsAt,
      startedAt: r.startedAt,
      crashedAt: r.crashedAt,
      nextAt: r.nextAt,
      remainingMs,
      nextRoundId: nextRoundId()
    },
    upcoming,
    recent: game.recent,
    completedRounds: game.completedRounds.slice(-10).map(x => ({ roundId: x.roundId, crashPoint: x.crashPoint, crashedAt: x.crashedAt, bets: (x.bets || []).map(b => ({ id: b.id, roundId: b.roundId, owner: b.owner, name: b.name, simulated: b.simulated, amount: b.amount, status: b.status, cashoutAt: b.cashoutAt, win: b.win, autoBet: !!b.autoBet })) })),
    pnl: pnlSnapshot(),
    freebets: (game.freebets || []).slice(-500),
    boosterpot: {
      currentEventId: bp ? bp.currentEventId : null,
      status: bp ? bp.status : null,
      currentAmount: bp ? clampMoney(bp.currentAmount || 0) : 0,
      targetAmount: bp ? clampMoney((bp.upcomingTargets && bp.upcomingTargets[0]) ? bp.upcomingTargets[0] : (bp.targetAmount || 0)) : 0,
      upcoming: upcomingBoosterpots,
      lastWon: lastWonBp,
      eligiblePlayers: bp ? (() => {
        const eligibleTokens = boosterpotEligibleWinnerTokens().filter(token => boosterpotIsActiveNow(token));
        return eligibleTokens.map(token => {
          const p = game.players[token];
          const meta = (bp.participants && bp.participants[token] && typeof bp.participants[token] === 'object') ? bp.participants[token] : {};
          return {
            token,
            username: (p && p.username) ? p.username : 'Player',
            online: isPlayerOnline(token),
            lastRoundSeq: isFinite(Number(meta.lastRoundSeq)) ? Number(meta.lastRoundSeq) : null,
            lastBetAt: isFinite(Number(meta.lastBetAt)) ? Number(meta.lastBetAt) : null,
            betCount: isFinite(Number(meta.betCount)) ? Number(meta.betCount) : 0,
            totalAmount: clampMoney(Number(meta.totalAmount) || 0)
          };
        }).sort((a,b) => (b.lastRoundSeq||0) - (a.lastRoundSeq||0) || (b.lastBetAt||0) - (a.lastBetAt||0));
      })() : [],
      recentWinners: (bp && bp.history ? bp.history.slice(-6).reverse().map(h => ({
        eventId: h.eventId,
        winnerUsername: h.winnerUsername || 'Unknown',
        amount: clampMoney(h.prizeAmount || 0),
        selectedAt: h.selectedAt || null,
        status: h.status || null,
        simulated: !!h.simulated,
        criteria: h.criteria || 'Not recorded'
      })) : [])
    },
    players: Object.values(game.players || {}).map(p => ({
      token: p.token,
      username: p.username || 'Player',
      avatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0],
      isVip: !!p.isVip,
      online: isPlayerOnline(p.token),
      balance: clampMoney(p.balance || 0)
    })).sort((a,b) => (b.online - a.online) || String(a.username || '').localeCompare(String(b.username || ''))),
    adminInbox: Array.isArray(game.adminInbox) ? game.adminInbox.slice(-500) : [],
    directMessages: (Array.isArray(game.directMessages) ? game.directMessages : []).filter(m => !((game.dmHidden || {})['__admin__'] || []).includes(m.id)).slice(-1000),
    dmSaves: ((game.dmSaves || {})['__admin__'] || []).slice(-500),
    dmBlocks: ((game.dmBlocks || {})['__admin__'] || []).slice(-200),
    chat: Array.isArray(game.chat) ? game.chat.slice() : [],
    chatPins: pinnedChatIds(),
    chatSaved: Array.isArray((game.chatSaves || {})['__admin__']) ? game.chatSaves['__admin__'] : [],
    chatReports: Array.isArray(game.chatReports) ? game.chatReports.slice(-100) : [],
    chatAudit: Array.isArray(game.chatAudit) ? game.chatAudit.slice(-100) : [],
    rains: (Array.isArray(game.rains) ? game.rains.slice(-50) : []).map(r => ({ id: r.id, at: r.at, expiresAt: r.expiresAt, from: r.from, fromUsername: r.fromUsername || 'Player', amount: r.amount, maxClaimers: r.maxClaimers, total: r.total || (r.amount * r.maxClaimers), claimedCount: r.claimedCount || 0, claimedBy: Object.keys(r.claimedBy || {}), claims: Object.keys(r.claimedBy || {}).map(t => ({ token: t, name: (game.players[t] && game.players[t].username) || 'Player', at: Number(r.claimedBy[t]) || 0 })) })),
    transactions: (game.transactions || []).slice(-500)
  };
}

// ---------------- Payments (Daraja-ready) ----------------

function paymentClientSnapshot(token) {
  const p = token ? game.players[token] : null;
  const settings = payStore.getPaymentSettings(game);
  const myDeposits = (game.deposits || []).filter(d => d.user_id === token).slice(-50).reverse();
  const myWithdrawals = (game.withdrawals || []).filter(w => w.user_id === token).slice(-50).reverse();
  const myLedger = (game.walletLedger || []).filter(e => e.user_id === token).slice(-80).reverse();
  return {
    type: 'payments_state',
    serverTime: now(),
    settings,
    player: p ? {
      token: p.token,
      username: p.username || 'Player',
      phone_number: p.phoneNumber || null,
      available_balance: p.balance || 0,
      reserved_balance: p.reservedBalance || 0
    } : null,
    deposits: myDeposits,
    withdrawals: myWithdrawals,
    ledger: myLedger
  };
}

function sendPaymentsState(socket) {
  if (!socket || !socket.data || socket.data.isAdmin) return;
  socket.emit('payments_state', paymentClientSnapshot(socket.data.token));
}

function adminPaymentsSnapshot() {
  payStore.ensurePaymentState(game);
  const settings = payStore.getPaymentSettings(game);
  const totals = payStore.totals(game);
  const players = {};
  Object.values(game.players || {}).forEach(p => {
    players[p.token] = { token: p.token, username: p.username || 'Player', phone_number: p.phoneNumber || null, available_balance: p.balance || 0, reserved_balance: p.reservedBalance || 0 };
  });
  return {
    type: 'admin_payments_state',
    serverTime: now(),
    settings,
    totals,
    deposits: (game.deposits || []).slice(-200).reverse().map(d => Object.assign({}, d, { username: (game.players[d.user_id] && game.players[d.user_id].username) || d.user_id })),
    withdrawals: (game.withdrawals || []).slice(-200).reverse().map(w => Object.assign({}, w, { username: (game.players[w.user_id] && game.players[w.user_id].username) || w.user_id })),
    adminActions: (game.adminActions || []).slice(-100).reverse(),
    players
  };
}

function sendAdminPayments(socket) {
  if (!socket || !socket.data || !socket.data.isAdmin) return;
  socket.emit('admin_payments_state', adminPaymentsSnapshot());
}
function broadcastAdminPayments() {
  for (const [, socket] of io.sockets.sockets) {
    if (socket.data.isAdmin) sendAdminPayments(socket);
  }
}
function broadcastPaymentsFor(token) {
  for (const [, socket] of io.sockets.sockets) {
    if (!socket.data.isAdmin && socket.data.token === token) sendPaymentsState(socket);
  }
}

function requirePlayerToken(req, res) {
  const token = (req.headers['x-player-token'] || req.query.token || (req.body && req.body.token) || '').toString().slice(0, 80);
  const p = getPlayer(token);
  if (!p) { res.status(401).json({ ok: false, msg: 'No active session' }); return null; }
  return { token, p };
}

function requireAdmin(req, res) {
  const key = (req.headers['x-admin-key'] || req.query.key || (req.body && req.body.key) || '').toString();
  if (key !== ADMIN_KEY) { res.status(401).json({ ok: false, msg: 'Unauthorized' }); return false; }
  return true;
}

function paymentError(res, msg, code=400) { return res.status(code).json({ ok: false, msg }); }

function sendState(socket) { socket.emit('state', snapshotFor(socket.data.token)); }
function broadcastState() {
  for (const [, socket] of io.sockets.sockets) {
    if (socket.data.isAdmin) { sendAdmin(socket); } else { sendState(socket); }
  }
}
function sendAdmin(socket) { socket.emit('admin_state', adminSnapshot()); }
function broadcastAdmin() {
  for (const [, socket] of io.sockets.sockets) {
    if (socket.data.isAdmin) sendAdmin(socket);
  }
}

function schedule(ms, fn) {
  clearTimer();
  game.timer = setTimeout(fn, Math.max(0, ms));
}

function finalizeRound() {
  const r = game.round;
  if (r.completed) return;
  r.completed = true;
  r.bets.forEach(b => { if (b.roundId === r.roundId && b.status === 'FLYING') b.status = 'LOST'; });
  // update auto panel statuses from outcomes
  r.bets.forEach(b => {
    if (!b.autoBet || !b.owner) return;
    const p = game.players[b.owner];
    if (!p) return; ensureAuto(p);
    const a = p.auto[b.panel];
    if (!a) return;
    if (b.status === 'CASHED_OUT') a.status = 'CASHED OUT';
    else if (b.status === 'LOST') a.status = 'ROUND LOST';
    if (!a.running && a.roundsRemaining <= 0 && a.status !== 'INSUFFICIENT BALANCE') {
      // keep outcome status visible; next start/idle will show stopped in UI context
    }
  });
    // auto panels with no bet this round but still running can continue; clear running when exhausted
    for (const token of Object.keys(game.players)) {
      const p = game.players[token]; ensureAuto(p);
      for (let panel = 0; panel < 2; panel++) {
        const a = p.auto[panel];
        if (a.running && a.roundsRemaining <= 0) {
          a.running = false;
          if (!['CASHED OUT','ROUND LOST','INSUFFICIENT BALANCE'].includes(a.status)) a.status = 'AUTO STOPPED';
        } else if (!a.running && a.roundsRemaining <= 0 && !['CASHED OUT','ROUND LOST','INSUFFICIENT BALANCE'].includes(a.status)) {
          a.status = 'AUTO STOPPED';
        }
      }
    }
  game.recent.unshift(r.crashPoint);
  if (game.recent.length > 30) game.recent.pop();
  const summary = {
    roundId: r.roundId,
    crashPoint: r.crashPoint,
    startedAt: r.startedAt,
    crashedAt: r.crashedAt,
    bets: r.bets.map(b => ({ id:b.id, roundId:b.roundId, owner:b.owner, name:b.name, simulated:b.simulated, amount:b.amount, status:b.status, cashoutAt:b.cashoutAt, win:b.win, autoBet: !!b.autoBet}))
  };
  game.completedRounds.push(summary);
  if (game.completedRounds.length > 100) game.completedRounds = game.completedRounds.slice(-50);
  addTransaction({ type: 'round_complete', roundId: r.roundId, crashPoint: r.crashPoint });
  persist(true);
}

function activateQueuedBetsForRound(roundId) {
  const r = game.round;
  if (!r || r.roundId !== roundId || r.state !== 'BETTING') return;
  const remaining = [];
  for (const q of game.queuedBets) {
    if (q.targetRoundId !== roundId) { remaining.push(q); continue; }
    const p = getPlayer(q.owner);
    if (!p) continue;
    if (p.balance < q.amount) {
      p.lastNotice = { type: 'error', msg: `Queued bet for panel ${q.panel + 1} (KSh ${q.amount}) rejected: insufficient balance`, at: now() };
      addTransaction({ type: 'queue_rejected', roundId, owner: q.owner, panel: q.panel, amount: q.amount, reason: 'insufficient_balance' });
      if (q.auto) {
        const a = p.auto && p.auto[q.panel];
        if (a) { a.running = false; a.roundsRemaining = 0; a.status = 'INSUFFICIENT BALANCE'; a.lastError = 'Insufficient balance'; a.stopRequested = false; }
      }
      continue;
    }
    p.balance = clampMoney(p.balance - q.amount);
    recordActivity(p);
    const bet = {
      id: uid('b'), roundId: roundId, owner: q.owner, panel: q.panel,
      name: 'Player', simulated: false, amount: q.amount, status: 'BET_PLACED',
      cashoutAt: null, win: null, auto: (q.autoCashout != null ? q.autoCashout : (q.auto || null)), payoutDone: false, placedAt: now(), activatedFromQueue: true, autoBet: !!q.autoBet || !!q.autoMode || !!q.auto
    };
    r.bets.unshift(bet);
    registerBoosterpotContribution(q.owner, q.amount);
    if (bet.autoBet) {
      const a = p.auto && p.auto[q.panel];
      if (a) { a.lastPlacedRoundId = roundId; a.status = 'BET ACTIVE'; a.lastError = null; }
    }
    addTransaction({ type: 'bet', roundId, betId: bet.id, owner: q.owner, amount: q.amount, auto: q.autoCashout || null, simulated: false, queued: true });
    pnlAdd('bets', q.amount);
    // award check for queued real-money bet activation (idempotent by bet id)
  }
  game.queuedBets = remaining;
}

function hasBetForRoundPanel(owner, panel, roundId) {
  const r = game.round;
  if (!r) return false;
  return r.bets.some(b => b.owner === owner && b.panel === panel && b.roundId === roundId && (b.status === 'BET_PLACED' || b.status === 'FLYING' || b.status === 'CASHED_OUT' || b.status === 'LOST'));
}
function hasQueuedFor(owner, panel, targetRoundId) {
  return game.queuedBets.some(q => q.owner === owner && q.panel === panel && q.targetRoundId === targetRoundId);
}

function tryAutoPlaceCurrent(p, token, panel, roundId) {
  const a = p.auto[panel];
  if (!a || !a.running || a.roundsRemaining <= 0) return false;
  if (a.lastPlacedRoundId === roundId || a.lastQueuedRoundId === roundId) return false;
  if (hasBetForRoundPanel(token, panel, roundId) || hasQueuedFor(token, panel, roundId)) { a.lastPlacedRoundId = roundId; return false; }
  if (p.balance < a.amount) {
    a.running = false; a.roundsRemaining = 0; a.status = 'INSUFFICIENT BALANCE'; a.lastError = 'Insufficient balance'; a.stopRequested = false;
    p.lastNotice = { type: 'error', msg: `Auto bet (panel ${panel + 1}) stopped: insufficient balance`, at: now() };
    return false;
  }
  p.balance = clampMoney(p.balance - a.amount);
  recordActivity(p);
  const bet = { id: uid('b'), roundId, owner: token, panel, name: 'Player', simulated: false, amount: a.amount, status: 'BET_PLACED', cashoutAt: null, win: null, auto: a.autoCashout, payoutDone: false, placedAt: now(), autoBet: true };
  game.round.bets.unshift(bet);
  registerBoosterpotContribution(token, a.amount);
  a.lastPlacedRoundId = roundId;
  a.roundsRemaining = Math.max(0, a.roundsRemaining - 1);
  a.status = 'BET ACTIVE';
  a.lastError = null;
  addTransaction({ type: 'bet', roundId, betId: bet.id, owner: token, amount: a.amount, auto: a.autoCashout, simulated: false, autoMode: true });
  pnlAdd('bets', a.amount);
  return true;
}

function tryAutoQueueNext(p, token, panel, targetRoundId) {
  const a = p.auto[panel];
  if (!a || !a.running || a.roundsRemaining <= 0) return false;
  if (a.lastQueuedRoundId === targetRoundId || a.lastPlacedRoundId === targetRoundId) return false;
  if (hasQueuedFor(token, panel, targetRoundId) || hasBetForRoundPanel(token, panel, targetRoundId)) { a.lastQueuedRoundId = targetRoundId; return false; }
  game.queuedBets.push({ id: uid('q'), owner: token, panel, amount: a.amount, autoCashout: a.autoCashout, targetRoundId, createdAt: now(), autoBet: true });
  a.lastQueuedRoundId = targetRoundId;
  a.roundsRemaining = Math.max(0, a.roundsRemaining - 1);
  a.status = 'BET QUEUED';
  a.lastError = null;
  addTransaction({ type: 'queue', targetRoundId, owner: token, panel, amount: a.amount, auto: a.autoCashout, autoMode: true });
  return true;
}

function processAutoSchedulingForRound(roundId) {
  const r = game.round;
  if (!r || r.roundId !== roundId || r.state !== 'BETTING') return;
  for (const token of Object.keys(game.players)) {
    const p = game.players[token];
    ensureAuto(p);
    for (let panel = 0; panel < 2; panel++) {
      const a = p.auto[panel];
      if (!a) continue;
      if (a.running && a.roundsRemaining <= 0) {
        // all scheduled rounds placed/queued; stop further scheduling
        a.running = false;
        if (!['CASHED OUT','ROUND LOST','INSUFFICIENT BALANCE'].includes(a.status)) a.status = 'AUTO STOPPED';
        continue;
      }
      if (!a.running || a.roundsRemaining <= 0) continue;
      tryAutoPlaceCurrent(p, token, panel, roundId);
    }
  }
}

function startBetting() {
  clearTimer();
  game.roundSeq += 1;
  game.round = newRound(game.roundSeq);
  processAutoSchedulingForRound(game.round.roundId);
  activateQueuedBetsForRound(game.round.roundId);
  const triggered = boosterpotOnRoundStart();
  addTransaction({ type: 'round_created', roundId: game.round.roundId, crashPoint: game.round.crashPoint, bettingEndsAt: game.round.bettingEndsAt });
  persist(true);
  schedule(game.round.bettingEndsAt - now(), startRunning);
  broadcastState(); broadcastAdmin();
  if (triggered) { broadcastState(); broadcastAdmin(); }
}

function startRunning() {
  const r = game.round;
  if (!r || r.state !== 'BETTING') return;
  clearTimer();
  r.state = 'RUNNING';
  r.startedAt = now();
  r.bets.forEach(b => { if (b.roundId === r.roundId && b.status === 'BET_PLACED') b.status = 'FLYING'; });
  addTransaction({ type: 'round_running', roundId: r.roundId, startedAt: r.startedAt });
  persist();
  broadcastState(); broadcastAdmin();
}

function crashRound(triggerTime) {
  const r = game.round;
  if (!r || r.state !== 'RUNNING') return;
  clearTimer();
  r.state = 'CRASHED';
  r.crashedAt = triggerTime || now();
  r.nextAt = r.crashedAt + CONFIG.crashedMs;
  finalizeRound();
  schedule(r.nextAt - now(), startBetting);
  broadcastState(); broadcastAdmin();
}

const CHAT_REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '🎉', '👏', '💯', '😡', '🙌'];
function chatAuditLog(actor, action, messageId, detail) {
  if (!Array.isArray(game.chatAudit)) game.chatAudit = [];
  game.chatAudit.push({ id: uid('audit'), at: now(), actor: actor || 'unknown', action, messageId: messageId || null, detail: detail || '' });
  if (game.chatAudit.length > 500) game.chatAudit = game.chatAudit.slice(-500);
}
function chatActorInfo(socket) {
  if (socket.data && socket.data.isAdmin) return { key: '__admin__', isAdmin: true, name: 'Admin' };
  const token = socket.data && socket.data.token;
  if (!token) return null;
  const p = game.players[token];
  return { key: token, isAdmin: false, name: (p && p.username) || 'Player' };
}
function findChatMessage(id) {
  if (!id || !Array.isArray(game.chat)) return null;
  return game.chat.find(m => m && m.id === id) || null;
}
function chatPreview(m) { return String((m && m.text) || '').replace(/\s+/g, ' ').slice(0, 120); }
function pinnedChatIds() {
  const manual = Array.isArray(game.chatPins) ? game.chatPins : [];
  const auto = Array.isArray(game.chatAutoPins) ? game.chatAutoPins : [];
  const out = [];
  for (const id of manual.concat(auto)) if (id && out.indexOf(id) === -1) out.push(id);
  return out;
}
function isSystemChat(m) {
  return !!m && (m.type === 'cashout' || m.type === 'rain' || !!m.rainId);
}
function pruneChat() {
  if (!Array.isArray(game.chat)) game.chat = [];
  const keepText = 150;
  const keepSystem = 12;
  let texts = 0;
  let systems = 0;
  const out = [];
  for (let i = game.chat.length - 1; i >= 0; i--) {
    const m = game.chat[i];
    if (!m) continue;
    if (isSystemChat(m)) {
      if (systems < keepSystem) { out.push(m); systems++; }
    } else if (texts < keepText) {
      out.push(m); texts++;
    }
  }
  game.chat = out.reverse();
  const live = new Set(game.chat.map(m => m && m.id));
  if (Array.isArray(game.chatPins)) game.chatPins = game.chatPins.filter(x => live.has(x));
  if (Array.isArray(game.chatAutoPins)) game.chatAutoPins = game.chatAutoPins.filter(x => live.has(x));
}

function sendAdminRain(amount, players) {
  const amt = Math.max(10, Math.min(1000, Math.floor(Number(amount) || 20)));
  const maxPlayers = Math.max(1, Math.min(10, Math.floor(Number(players) || 5)));
  const total = amt * maxPlayers;
  if (total > 10000) return null;
  const t = now();
  if (!Array.isArray(game.rains)) game.rains = [];
  const rain = { id: uid('rain'), at: t, expiresAt: t + 60 * 1000, from: '__admin__', fromUsername: 'Admin', amount: amt, maxClaimers: maxPlayers, total, claimedCount: 0, claimedBy: {} };
  game.rains.push(rain);
  if (game.rains.length > 100) game.rains = game.rains.slice(-100);
  const msg = {
    id: uid('chat'),
    at: t,
    userId: '__admin__',
    name: 'Admin',
    avatar: '👑',
    isVip: false,
    isAdmin: true,
    type: 'rain',
    rainId: rain.id,
    rain: { id: rain.id, amount: amt, maxClaimers: maxPlayers, claimedCount: 0, from: '__admin__', expiresAt: rain.expiresAt, total },
    text: `🌧️ is raining KSh ${total} to ${maxPlayers} player${maxPlayers === 1 ? '' : 's'}!`
  };
  if (!Array.isArray(game.chat)) game.chat = [];
  game.chat.push(msg);
  pruneChat();
  io.emit('chat_new', msg);
  persist();
  broadcastState();
  return rain;
}

const AUTO_RAIN_MIN_MS = 10 * 60 * 1000;
const AUTO_RAIN_MAX_MS = 15 * 60 * 1000;
function scheduleNextAutoRain() {
  const delay = AUTO_RAIN_MIN_MS + Math.random() * (AUTO_RAIN_MAX_MS - AUTO_RAIN_MIN_MS);
  setTimeout(() => {
    try { sendAdminRain(20, 5); } catch (e) { console.error('auto rain failed', e.message); }
    scheduleNextAutoRain();
  }, delay);
}


function awardFreebetsFor(amount, targets, expiresMs) {
  const amt = clampMoney(Math.max(1, Math.floor(Number(amount) || 0)));
  if (!(amt > 0)) return [];
  const valid = (Array.isArray(targets) ? targets : []).filter(t => t && game.players[t]);
  if (!valid.length) return [];
  if (!Array.isArray(game.freebets)) game.freebets = [];
  const createdAt = now();
  const expiresAt = createdAt + Math.max(10000, Number(expiresMs) || 5 * 60 * 1000);
  const batchId = uid('fbb');
  const created = [];
  valid.forEach(to => {
    const p = game.players[to];
    if (!p) return;
    const fb = { id: uid('fb'), batchId, to, toUsername: p.username || 'Player', amount: amt, status: 'PENDING', createdAt, expiresAt, claimedAt: null, claimed: false };
    game.freebets.push(fb);
    created.push(fb);
    for (const [, s] of io.sockets.sockets) {
      if (!s.data.isAdmin && s.data.token === to) s.emit('freebet_new', { ...fb, remainingMs: Math.max(0, fb.expiresAt - now()) });
    }
  });
  if (game.freebets.length > 5000) game.freebets = game.freebets.slice(-2000);
  persist(true);
  broadcastAdmin();
  return created;
}

const AUTO_FREEBET_MIN_MS = 15 * 60 * 1000;
const AUTO_FREEBET_MAX_MS = 20 * 60 * 1000;
function scheduleNextAutoFreebet() {
  const delay = AUTO_FREEBET_MIN_MS + Math.random() * (AUTO_FREEBET_MAX_MS - AUTO_FREEBET_MIN_MS);
  setTimeout(() => {
    try {
      const tokens = Object.keys(game.players || {});
      if (tokens.length) {
        const created = awardFreebetsFor(50, tokens, 60 * 1000);
        if (created.length) console.log('auto freebet batch awarded to', created.length, 'player(s)');
      }
    } catch (e) { console.error('auto freebet failed', e.message); }
    scheduleNextAutoFreebet();
  }, delay);
}


function removeChatCard(id) {
  if (!id || !Array.isArray(game.chat)) return;
  const idx = game.chat.findIndex(x => x && x.id === id);
  if (idx !== -1) game.chat.splice(idx, 1);
  game.chatPins = (game.chatPins || []).filter(x => x !== id);
  game.chatAutoPins = (game.chatAutoPins || []).filter(x => x !== id);
  io.emit('chat_removed', { id });
  io.emit('chat_pins', { ids: pinnedChatIds() });
}

function normalizeBoardStore(v) {
  const out = {};
  ['daily', 'weekly', 'monthly', 'yearly'].forEach(period => {
    const raw = v && v[period];
    const entries = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.entries) ? raw.entries : []);
    const periodKey = (raw && !Array.isArray(raw) && typeof raw.periodKey === 'string') ? raw.periodKey : '';
    out[period] = { periodKey, entries: entries.slice(0, 20) };
  });
  return out;
}

function winBoardKeys(t) {
  const shifted = new Date(Number(t || now()) + 3 * 3600000);
  const y = shifted.getUTCFullYear();
  const mo = shifted.getUTCMonth();
  const d = shifted.getUTCDate();
  const pad = (n) => String(n).padStart(2, '0');
  const daily = y + '-' + pad(mo + 1) + '-' + pad(d);
  const dow = (shifted.getUTCDay() + 6) % 7;
  const monday = new Date(Date.UTC(y, mo, d - dow));
  const weekly = monday.getUTCFullYear() + '-' + pad(monday.getUTCMonth() + 1) + '-' + pad(monday.getUTCDate());
  const monthly = y + '-' + pad(mo + 1);
  return { daily, weekly, monthly, yearly: String(y) };
}

function pushToBoard(store, entry, t, metric) {
  if (!game[store] || typeof game[store] !== 'object') game[store] = {};
  if (Array.isArray(game[store])) game[store] = { daily: [], weekly: [], monthly: [], yearly: [] };
  const keys = winBoardKeys(t);
  ['daily', 'weekly', 'monthly', 'yearly'].forEach(period => {
    let board = game[store][period];
    if (Array.isArray(board)) board = { periodKey: '', entries: board.slice(0, 20) };
    if (!board || typeof board !== 'object') board = { periodKey: '', entries: [] };
    if (board.periodKey !== keys[period]) { board.periodKey = keys[period]; board.entries = []; }
    if (!Array.isArray(board.entries)) board.entries = [];
    if (!board.entries.some(e => e && e.id === entry.id && e.roundId === entry.roundId)) board.entries.push(entry);
    board.entries.sort((a, b) => (Number(b[metric]) || 0) - (Number(a[metric]) || 0));
    if (board.entries.length > 20) board.entries = board.entries.slice(0, 20);
    game[store][period] = board;
  });
}

function updateWinBoards(entry, t) {
  pushToBoard('winBoards', entry, t, 'win');
  pushToBoard('oddsBoards', entry, t, 'multiplier');
}

function currentBoards(store) {
  if (!game[store] || typeof game[store] !== 'object') game[store] = {};
  const keys = winBoardKeys(now());
  const out = {};
  ['daily', 'weekly', 'monthly', 'yearly'].forEach(period => {
    const b = game[store][period];
    if (Array.isArray(b)) { out[period] = []; return; }
    out[period] = (b && b.periodKey === keys[period] && Array.isArray(b.entries)) ? b.entries.slice(0, 20) : [];
  });
  return out;
}
function currentWinBoards() { return currentBoards('winBoards'); }
function currentOddsBoards() { return currentBoards('oddsBoards'); }

function seedBoardsFromHistory() {
  if (!Array.isArray(game.betWins)) game.betWins = [];
  if (!game.winBoards || typeof game.winBoards !== 'object') game.winBoards = {};
  if (!game.oddsBoards || typeof game.oddsBoards !== 'object') game.oddsBoards = {};
  const priorWin = [];
  const priorOdds = [];
  ['daily', 'weekly', 'monthly', 'yearly'].forEach(period => {
    const wb = (game.winBoards || {})[period];
    const ob = (game.oddsBoards || {})[period];
    if (wb && Array.isArray(wb.entries)) wb.entries.forEach(e => priorWin.push(Object.assign({}, e)));
    if (ob && Array.isArray(ob.entries)) ob.entries.forEach(e => priorOdds.push(Object.assign({}, e)));
  });
  const seen = new Map();
  const pending = [];
  const add = (entry) => {
    if (!entry || !(Number(entry.win) > 0) || !(Number(entry.multiplier) > 0)) return;
    const key = String(entry.roundId || '') + '|' + String(entry.name || '') + '|' + (Number(entry.win) || 0) + '|' + (Number(entry.multiplier) || 0);
    const existing = seen.get(key);
    if (existing) {
      if (!existing.avatar && entry.avatar) { existing.avatar = entry.avatar; existing.isVip = !!entry.isVip; }
      if (entry.simulated) existing.simulated = true;
      return;
    }
    seen.set(key, entry);
    pending.push(entry);
  };
  priorWin.concat(priorOdds).forEach(e => add(e));
  game.betWins.forEach(w => add(Object.assign({}, w)));
  (game.completedRounds || []).forEach(rd => {
    (rd.bets || []).forEach(b => {
      if (b.status !== 'CASHED_OUT') return;
      const owner = (!b.simulated && b.owner) ? game.players[b.owner] : null;
      const sim = b.simulated ? getSimPlayer(b.name) : null;
      const profile = owner || sim;
      add({
        id: b.id,
        roundId: rd.roundId,
        name: (owner && owner.username) ? owner.username : (b.name || 'Player'),
        avatar: profile ? (profile.avatar || AVATARS[0]) : null,
        isVip: profile ? !!profile.isVip : false,
        simulated: !!b.simulated,
        stake: b.amount,
        multiplier: round2(Number(b.cashoutAt) || 0),
        win: Number(b.win) || 0,
        at: rd.crashedAt || rd.startedAt || now()
      });
    });
  });
  (game.chat || []).forEach(m => {
    if (!m || m.type !== 'cashout' || !(Number(m.winAmount) > 0) || !(Number(m.multiplier) > 0)) return;
    const cardName = m.cashoutUser || 'Player';
    const simProfile = NAMES.includes(cardName) ? getSimPlayer(cardName) : null;
    const realProfile = (!simProfile) ? Object.values(game.players || {}).find(pl => pl && pl.username === cardName) : null;
    const profile = simProfile || realProfile;
    add({
      id: m.id,
      roundId: m.roundId,
      name: cardName,
      avatar: profile ? (profile.avatar || AVATARS[0]) : null,
      isVip: profile ? !!profile.isVip : false,
      simulated: !!simProfile,
      stake: m.stake,
      multiplier: round2(Number(m.multiplier) || 0),
      win: Number(m.winAmount) || 0,
      at: m.at || now()
    });
  });
  (game.transactions || []).forEach(tx => {
    if (!tx || tx.type !== 'cashout') return;
    const owner = (!tx.simulated && tx.owner) ? game.players[tx.owner] : null;
    add({
      id: tx.betId || tx.id,
      roundId: tx.roundId,
      name: (owner && owner.username) ? owner.username : 'Player',
      avatar: owner ? (owner.avatar || AVATARS[0]) : null,
      isVip: owner ? !!owner.isVip : false,
      simulated: !!tx.simulated,
      stake: tx.amount,
      multiplier: round2(Number(tx.multiplier) || 0),
      win: Number(tx.win) || 0,
      at: tx.at || now()
    });
  });
  pending.sort((a, b) => (Number(a.at) || 0) - (Number(b.at) || 0));
  pending.forEach(e => updateWinBoards(e, e.at || now()));
}

function pnlAdd(key, amount) {
  if (!game.pnl || typeof game.pnl !== 'object') game.pnl = { bets: 0, cashouts: 0, boosterpotAwards: 0, seeded: true };
  const v = Number(amount) || 0;
  game.pnl[key] = (Number(game.pnl[key]) || 0) + v;
  try {
    if (typeof io !== 'undefined' && io && io.sockets) {
      const payload = pnlSnapshot();
      for (const [, s2] of io.sockets.sockets) {
        if (s2.data && s2.data.isAdmin) s2.emit('pnl_update', payload);
      }
    }
  } catch (e) { }
}

var ledgerSumsCache;
function ledgerSums() {
  if (!ledgerSumsCache) ledgerSumsCache = { at: 0, data: null };
  const t = Date.now();
  if (ledgerSumsCache.data && t - ledgerSumsCache.at < 5000) return ledgerSumsCache.data;
  let data = null;
  try {
    const db = payDb.getDb();
    const rows = db.prepare("SELECT transaction_type t, SUM(amount) s FROM wallet_transactions WHERE status = 'COMPLETED' GROUP BY transaction_type").all();
    data = {};
    rows.forEach(r => { data[r.t] = Number(r.s) || 0; });
  } catch (e) { data = null; }
  if (data) ledgerSumsCache = { at: t, data };
  return data;
}

function seedPnl() {
  if (!game.pnl || typeof game.pnl !== 'object') game.pnl = {};
  if (game.pnl.seeded === 8) return;
  game.pnl = {
    bets: 0,
    cashouts: 0,
    boosterpotAwards: 0,
    freebetsClaimed: 0,
    freebetsUnused: 0,
    rainsClaimed: 0,
    rainsUnused: 0,
    rainsUserUnused: 0,
    adminAdded: 0,
    adminDeducted: 0,
    cutoffAt: now(),
    seeded: 8
  };
}

function pnlSnapshot() {
  const p = game.pnl || {};
  const n = (k) => Number(p[k]) || 0;
  const cutoff = Number(p.cutoffAt) || 0;
  const wl = Array.isArray(game.walletLedger) ? game.walletLedger : [];
  const sumSince = (t) => wl.reduce((s, e) => {
    if (!e || e.status !== 'COMPLETED' || e.transaction_type !== t) return s;
    if (cutoff && Number(e.created_at) < cutoff) return s;
    return s + (Number(e.amount) || 0);
  }, 0);
  const deposits = sumSince('DEPOSIT_CREDIT');
  const withdrawals = sumSince('WITHDRAW_COMPLETE');
  const profit = n('bets') - n('cashouts') - n('boosterpotAwards') - n('freebetsClaimed') - n('rainsClaimed') + n('rainsUserUnused') + n('adminDeducted') - n('adminAdded');
  return {
    bets: n('bets'),
    cashouts: n('cashouts'),
    boosterpotAwards: n('boosterpotAwards'),
    freebetsClaimed: n('freebetsClaimed'),
    freebetsUnused: n('freebetsUnused'),
    rainsClaimed: n('rainsClaimed'),
    rainsUnused: n('rainsUnused'),
    rainsUserUnused: n('rainsUserUnused'),
    adminAdded: n('adminAdded'),
    adminDeducted: n('adminDeducted'),
    profit,
    deposits,
    withdrawals,
    cutoffAt: cutoff,
    updatedAt: now()
  };
}

function finalizeExpiredRains() {
  const t = now();
  let changed = false;
  (game.rains || []).forEach(r => {
    if (!r || r.finalized || !r.expiresAt || t <= Number(r.expiresAt)) return;
    const amt = Number(r.amount) || 0;
    const max = Number(r.maxClaimers) || 0;
    const claimed = Number(r.claimedCount) || 0;
    if (r.from === '__admin__') {
      const left = Math.max(0, amt * (max - claimed));
      if (left > 0) pnlAdd('rainsUnused', left);
    } else if (!r.refunded) {
      const total = Number(r.total) || amt * max;
      const left = Math.max(0, total - amt * claimed);
      if (left > 0) pnlAdd('rainsUserUnused', left);
    }
    r.refunded = false;
    r.finalized = true;
    changed = true;
  });
  if (changed) persist(true);
}

function recordBetWin(b, multiplier, win, at) {
  try {
    if (!Array.isArray(game.betWins)) game.betWins = [];
    const sim = b.simulated ? getSimPlayer(b.name) : null;
    const owner = (!b.simulated && b.owner) ? game.players[b.owner] : null;
    const profile = owner || sim;
    const entry = {
      id: b.id,
      roundId: b.roundId,
      name: (owner && owner.username) ? owner.username : (b.name || 'Player'),
      avatar: profile ? (profile.avatar || AVATARS[0]) : null,
      isVip: profile ? !!profile.isVip : false,
      simulated: !!b.simulated,
      stake: b.amount,
      multiplier: round2(Number(multiplier) || 0),
      win: clampMoney(Number(win) || 0),
      at: at || now()
    };
    game.betWins.push(entry);
    if (game.betWins.length > 5000) game.betWins = game.betWins.slice(-5000);
    updateWinBoards(entry, entry.at);
  } catch (e) { }
}

function pushCashoutCard(b, mult) {
  const m = round2(Number(mult) || 0);
  if (!(m >= 80 && m <= CONFIG.moonMultiplier)) return;
  const r = game.round;
  if (!Array.isArray(game.chat)) game.chat = [];
  let playerName = (b && b.name) || 'Player';
  if (b && !b.simulated && b.owner) {
    const p = game.players[b.owner];
    if (p && p.username) playerName = p.username;
  }
  const roundId = b && b.roundId ? b.roundId : '';
  // same player, same multiplier, same round: merge the extra bet into the existing card
  const sameCard = game.chat.find(c => c && c.type === 'cashout' && !c.deleted && c.roundId === roundId && Number(c.multiplier) === m && c.cashoutUser === playerName);
  if (sameCard) {
    sameCard.winAmount = round2(Number(sameCard.winAmount || 0) + Number((b && b.win) || 0));
    sameCard.stake = round2(Number(sameCard.stake || 0) + Number((b && b.amount) || 0));
    if (!Array.isArray(game.chatAutoPins)) game.chatAutoPins = [];
    game.chatAutoPins = game.chatAutoPins.filter(x => x !== sameCard.id);
    game.chatAutoPins.push(sameCard.id);
    if (game.chatAutoPins.length > 2) game.chatAutoPins = game.chatAutoPins.slice(-2);
    io.emit('chat_updated', sameCard);
    io.emit('chat_pins', { ids: pinnedChatIds() });
    return;
  }
  // keep only the round's 3 highest cash-out cards: a bigger cash-out replaces the lowest
  if (r && r.roundId) {
    const existing = game.chat.filter(c => c && c.type === 'cashout' && c.roundId === r.roundId && !c.deleted);
    if (existing.length >= 3) {
      let lowest = existing[0];
      for (const c of existing) if (Number(c.multiplier || 0) < Number(lowest.multiplier || 0)) lowest = c;
      if (!(m > Number(lowest.multiplier || 0))) return;
      removeChatCard(lowest.id);
    }
  }
  const msg = {
    id: uid('chat'),
    at: now(),
    userId: '__admin__',
    name: 'Admin',
    avatar: '👑',
    isAdmin: true,
    type: 'cashout',
    multiplier: m,
    cashoutUser: playerName,
    roundId,
    winAmount: round2((b && b.win) || 0),
    stake: round2((b && b.amount) || 0),
    text: `Cashed out ${m.toFixed(2)}x`
  };
  game.chat.push(msg);
  if (!Array.isArray(game.chatAutoPins)) game.chatAutoPins = [];
  game.chatAutoPins.push(msg.id);
  if (game.chatAutoPins.length > 2) game.chatAutoPins = game.chatAutoPins.slice(-2);
  pruneChat();
  io.emit('chat_new', msg);
  io.emit('chat_pins', { ids: pinnedChatIds() });
}

function processCashouts() {
  const r = game.round;
  if (!r || r.state !== 'RUNNING') return false;
  const t = now();
  const m = Math.min(r.crashPoint, Math.max(1, multiplierAt(t - r.startedAt)));
  let changed = false;
  r.bets.forEach(b => {
    if (b.roundId !== r.roundId || b.status !== 'FLYING' || b.cashoutAt != null || !b.auto) return;
    if (m >= b.auto && b.auto <= r.crashPoint && b.auto <= m) {
      b.status = 'CASHED_OUT';
      b.cashoutAt = b.auto;
      b.win = clampMoney(b.amount * b.auto);
      pushCashoutCard(b, b.auto);
      recordBetWin(b, b.auto, b.win, t);
      if (b.simulated) {
        const sp = getSimPlayer(b.name);
        if (sp) recordActivity(sp, t, false);
      }
      if (b.owner && !b.payoutDone) {
        const p = getPlayer(b.owner);
        if (p) { p.balance = clampMoney(p.balance + b.win); recordActivity(p, t); }
        b.payoutDone = true;
        addTransaction({ type: 'cashout', roundId: r.roundId, betId: b.id, owner: b.owner, amount: b.amount, multiplier: b.auto, win: b.win, simulated: !!b.simulated});
        pnlAdd('cashouts', b.win);
      }
      if (b.simulated) pnlAdd('cashouts', b.win);
      if (b.autoBet && b.owner) {
        const p = game.players[b.owner];
        if (p && p.auto && p.auto[b.panel]) {
          const a = p.auto[b.panel];
          if (a.running || a.roundsRemaining > 0) a.status = 'AUTO RUNNING';
          else { a.running = false; a.status = 'CASHED OUT'; }
        }
      }
      changed = true;
    }
  });
  if (changed) { persist(); broadcastState(); broadcastAdmin(); }
  if (m >= CONFIG.moonMultiplier) {
    r.crashPoint = CONFIG.moonMultiplier;
    r.bets.forEach(b => {
      if (b.roundId !== r.roundId || b.status !== 'FLYING' || b.cashoutAt != null) return;
      if (b.holdAtMoon) return;
      b.status = 'CASHED_OUT';
      b.cashoutAt = CONFIG.moonMultiplier;
      b.win = clampMoney(b.amount * CONFIG.moonMultiplier);
      pushCashoutCard(b, CONFIG.moonMultiplier);
      recordBetWin(b, CONFIG.moonMultiplier, b.win, t);
      if (b.simulated) { const sp = getSimPlayer(b.name); if (sp) recordActivity(sp, t, false); }
      if (b.owner && !b.payoutDone) {
        const p = getPlayer(b.owner);
        if (p) { p.balance = clampMoney(p.balance + b.win); recordActivity(p, t); }
        b.payoutDone = true;
        addTransaction({ type: 'cashout', roundId: r.roundId, betId: b.id, owner: b.owner, amount: b.amount, multiplier: CONFIG.moonMultiplier, win: b.win, simulated: !!b.simulated });
        pnlAdd('cashouts', b.win);
      }
      if (b.simulated) pnlAdd('cashouts', b.win);
      changed = true;
    });
    if (changed) { persist(); broadcastState(); broadcastAdmin(); }
    crashRound(t);
    return true;
  }
  if (m >= r.crashPoint) { crashRound(t); return true; }
  return false;
}

function vipSweep() {
  const t = now();
  let changed = false;
  for (const token of Object.keys(game.players)) {
    const p = game.players[token];
    const beforeVip = !!p.isVip;
    const beforeNotice = p.lastNotice;
    updateVipStatus(p, t);
    if (beforeVip !== !!p.isVip || beforeNotice !== p.lastNotice) changed = true;
  }
  if (game.simPlayers) {
    for (const name of Object.keys(game.simPlayers)) {
      const sp = game.simPlayers[name];
      const before = !!sp.isVip;
      updateVipStatus(sp, t, false);
      if (before !== !!sp.isVip) changed = true;
    }
  }
  if (changed) persist();
  return changed;
}

function engineTick() {
  const r = game.round;
  if (!r) return;
  const t = now();
  if (r.state === 'BETTING') {
    if (t >= r.bettingEndsAt) startRunning();
  } else if (r.state === 'RUNNING') {
    if (!processCashouts()) {
      // clients interpolate RUNNING multiplier locally; state updates are pushed on bet/cashout/phase events
    }
  } else if (r.state === 'CRASHED') {
    if (t >= r.nextAt) startBetting();
  }
}

function recover() {
  const t = now();
  if (!Array.isArray(game.queuedBets)) game.queuedBets = [];
  if (!game.simPlayers) game.simPlayers = {};
  if (!game.round || !game.round.roundId) { startBetting(); return; }
  const r = game.round;
  if (!Array.isArray(r.bets)) r.bets = [];
  const expectedNext = nextRoundId();
  game.queuedBets = game.queuedBets.filter(q => q && q.targetRoundId === expectedNext && (q.panel === 0 || q.panel === 1));
  Object.values(game.players).forEach(p => { getPlayer(p.token); ensureAuto(p); updateVipStatus(p, t); });
  if (r.state === 'RUNNING') {
    const m = Math.min(r.crashPoint, Math.max(1, multiplierAt(t - r.startedAt)));
    if (m >= r.crashPoint) crashRound(r.startedAt + Math.ceil(Math.log(r.crashPoint) / CONFIG.growthRate * 1000));
    else { broadcastState(); broadcastAdmin(); }
  } else if (r.state === 'BETTING') {
    if (t >= r.bettingEndsAt) startRunning(); else { schedule(r.bettingEndsAt - t, startRunning); broadcastState(); broadcastAdmin(); }
  } else if (r.state === 'CRASHED') {
    if (!r.completed) finalizeRound();
    if (t >= r.nextAt) startBetting(); else { schedule(r.nextAt - t, startBetting); broadcastState(); broadcastAdmin(); }
  } else {
    startBetting();
  }
}

function isPlayerOnline(token) {
  if (!token) return false;
  for (const [, s] of io.sockets.sockets) {
    if (!s.data.isAdmin && s.data.token === token && !s.disconnected) return true;
  }
  return false;
}

function isAnyAdminOnline() {
  for (const [, s] of io.sockets.sockets) {
    if (s.data.isAdmin && !s.disconnected) return true;
  }
  return false;
}

function sweepExpiredFreebets() {
  if (!Array.isArray(game.freebets) || !game.freebets.length) return 0;
  const t = now();
  let changed = 0;
  const expired = [];
  for (const fb of game.freebets) {
    if (fb.claimed || fb.status === 'EXPIRED' || fb.status === 'LOST') continue;
    if (t > fb.expiresAt) {
      fb.status = 'EXPIRED';
      changed++;
      expired.push(fb);
      if (fb.amount) pnlAdd('freebetsUnused', fb.amount);
    }
  }
  if (changed) {
    persist(true); broadcastState(); broadcastAdmin();
    for (const fb of expired) {
      for (const [, s] of io.sockets.sockets) {
        if (!s.data.isAdmin && s.data.token === fb.to) { s.emit('freebet_expired', fb); sendState(s); }
      }
      const sad = {
        id: uid('adm'),
        at: now(),
        from: 'admin',
        to: fb.to,
        toUsername: fb.toUsername || 'Player',
        toAvatar: '😢',
        text: `Oh no! Your Free Bet of KSh ${Number(fb.amount || 0).toFixed(2)} expired before you could claim it. Better luck next time!`,
        style: 'blue'
      };
      if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
      game.adminInbox.push(sad);
      if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
      if (!Array.isArray(game.directMessages)) game.directMessages = [];
      game.directMessages.push({ id: sad.id, at: sad.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: fb.to, toUsername: sad.toUsername, toAvatar: sad.toAvatar, text: sad.text, style: 'blue' });
      if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
      for (const [, s] of io.sockets.sockets) {
        if (!s.data.isAdmin && s.data.token === fb.to) { s.emit('dm_new', { id: sad.id, at: sad.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: fb.to, toUsername: sad.toUsername, toAvatar: sad.toAvatar, text: sad.text, style: 'blue' }); sendState(s); }
      }
    }
  }
  return changed;
}

io.on('connection', (socket) => {
  socket.data.token = null;
  socket.data.isAdmin = false;

  socket.on('hello', (payload = {}, ack) => {
    const token = (payload && typeof payload.token === 'string' && payload.token) ? payload.token.slice(0,80) : uid('p');
    socket.data.token = token;
    const player = getPlayer(token);
    updateVipStatus(player);
    const notice = player.lastNotice;
    player.lastNotice = null;
    const snap = snapshotFor(token);
    if (notice) snap.player.notice = notice;
    socket.emit('state', snap);
    sendPaymentsState(socket);
    if (typeof ack === 'function') ack({ ok: true, token, balance: player.balance, serverTime: now() });
    if (notice) persist();
  });

  socket.on('admin_send_message', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!socket.data.isAdmin) return res(false, 'Unauthorized');
    let targets = [];
    if (Array.isArray(payload && payload.to)) targets = payload.to.filter(x => typeof x === 'string');
    else if (Array.isArray(payload && payload.targets)) targets = payload.targets.filter(x => typeof x === 'string');
    else if (payload && typeof payload.to === 'string') targets = [payload.to];
    targets = Array.from(new Set(targets.map(t => String(t).slice(0, 80)).filter(Boolean)));
    let text = payload && typeof payload.text === 'string' ? payload.text.replace(/\s+/g, ' ').trim() : '';
    if (!targets.length) return res(false, 'Select at least one player');
    if (!text) return res(false, 'Message cannot be empty');
    if (text.length > 500) text = text.slice(0, 500);
    const popup = !!(payload && payload.popup);
    const replyToId = payload && typeof payload.replyToId === 'string' ? payload.replyToId : '';
    const repliedMsg = replyToId ? ((game.directMessages || []).find(m => m && m.id === replyToId) || (game.adminInbox || []).find(m => m && m.id === replyToId)) : null;
    const replyMeta = repliedMsg ? { replyToId, replyName: repliedMsg.fromUsername || 'Player', replyText: String(repliedMsg.text || '').slice(0, 120) } : null;
    const valid = targets.filter(t => game.players[t]);
    if (!valid.length) return res(false, 'No valid players selected');
    if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    let delivered = 0, offline = 0;
    const sent = [];
    valid.forEach(to => {
      const msg = Object.assign({ id: uid('adm'), at: now(), from: 'admin', to, toUsername: (game.players[to] && game.players[to].username) || 'Player', text }, replyMeta || {});
      game.adminInbox.push(msg);
      const dm = Object.assign({ id: msg.id, at: msg.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: to, toUsername: msg.toUsername, toAvatar: AVATARS.includes((game.players[to] && game.players[to].avatar) || '') ? game.players[to].avatar : AVATARS[0], text }, replyMeta || {});
      game.directMessages.push(dm);
      const sockets = [];
      for (const [, s] of io.sockets.sockets) { if (!s.data.isAdmin && s.data.token === to) sockets.push(s); }
      if (sockets.length) {
        sockets.forEach(s => { if (popup) s.emit('admin_message', { id: msg.id, at: msg.at, text: msg.text, fromToken: '__admin__', fromUsername: 'Admin' }); sendState(s); });
        delivered++;
      } else {
        offline++;
      }
      sent.push({ to, username: msg.toUsername, delivered: sockets.length > 0, id: msg.id });
    });
    if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    persist(true);
    broadcastAdmin();
    const summary = `Sent to ${sent.length} player${sent.length===1?'':'s'} (${delivered} delivered, ${offline} offline)`;
    res(true, summary, { delivered, offline, count: sent.length, sent });
  });

  socket.on('freebet_award', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!socket.data.isAdmin) return res(false, 'Unauthorized');
    let targets = [];
    if (Array.isArray(payload && payload.to)) targets = payload.to.filter(x => typeof x === 'string');
    else if (Array.isArray(payload && payload.targets)) targets = payload.targets.filter(x => typeof x === 'string');
    else if (payload && typeof payload.to === 'string') targets = [payload.to];
    targets = Array.from(new Set(targets.map(t => String(t).slice(0, 80)).filter(Boolean)));
    const amount = clampMoney(Math.max(1, Math.floor(Number(payload && payload.amount) || 0)));
    if (!targets.length) return res(false, 'Select at least one player');
    if (!(amount > 0)) return res(false, 'Enter a valid freebet amount');
    if (amount > 1000000) return res(false, 'Freebet amount too large (max KSh 1,000,000)');
    const valid = targets.filter(t => game.players[t]);
    if (!valid.length) return res(false, 'No valid players selected');
    const created = awardFreebetsFor(amount, valid, Number(payload && payload.expiresMs) || 5 * 60 * 1000);
    if (!created.length) return res(false, 'No valid players selected');
    res(true, `Awarded ${created.length} freebet(s) of KSh ${amount}`, { count: created.length, amount });
  });

  socket.on('player_reply_admin', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    let text = payload && typeof payload.text === 'string' ? payload.text.replace(/\s+/g, ' ').trim() : '';
    if (!text) return res(false, 'Reply cannot be empty');
    if (text.length > 500) text = text.slice(0, 500);
    const reply = {
      id: uid('preply'),
      at: now(),
      from: 'player',
      fromToken: token,
      fromUsername: p.username || 'Player',
      fromAvatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0],
      text,
      inReplyTo: payload && typeof payload.msgId === 'string' ? payload.msgId : null
    };
    if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
    game.adminInbox.push(reply);
    if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
    // also keep in direct messages as conversation with Admin
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    game.directMessages.push({ id: reply.id, at: reply.at, fromToken: token, fromUsername: p.username || 'Player', fromAvatar: reply.fromAvatar, toToken: '__admin__', toUsername: 'Admin', toAvatar: '👑', text, type: 'to_admin' });
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    persist(true);
    let delivered = 0;
    for (const [, s] of io.sockets.sockets) {
      if (s.data.isAdmin) { s.emit('admin_player_reply', reply); delivered++; }
    }
    broadcastAdmin();
    for (const [, s] of io.sockets.sockets) { if (!s.data.isAdmin && s.data.token === token) sendState(s); }
    if (!delivered) return res(false, 'Admin is not online');
    res(true, 'Reply sent', { delivered, reply });
  });

  socket.on('dm_send', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const to = payload && typeof payload.to === 'string' ? payload.to : '';
    let text = payload && typeof payload.text === 'string' ? payload.text.replace(/\s+/g, ' ').trim() : '';
    if (!to) return res(false, 'Recipient required');
    if (!text) return res(false, 'Message cannot be empty');
    if (text.length > 500) text = text.slice(0, 500);
    const replyToId = payload && typeof payload.replyToId === 'string' ? payload.replyToId : '';
    const repliedMsg = replyToId ? ((game.directMessages || []).find(m => m && m.id === replyToId) || (game.adminInbox || []).find(m => m && m.id === replyToId)) : null;
    const replyMeta = repliedMsg ? { replyToId, replyName: repliedMsg.fromUsername || 'Player', replyText: String(repliedMsg.text || '').slice(0, 120) } : null;
    if (to === '__admin__') {
      // route to admin as player reply/admin inbox message
      const reply = Object.assign({ id: uid('preply'), at: now(), from: 'player', fromToken: token, fromUsername: p.username || 'Player', fromAvatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0], text, inReplyTo: null }, replyMeta || {});
      if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
      game.adminInbox.push(reply);
      if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
if (!Array.isArray(game.directMessages)) game.directMessages = [];
    const dm = Object.assign({ id: reply.id, at: reply.at, fromToken: token, fromUsername: p.username || 'Player', fromAvatar: reply.fromAvatar, toToken: '__admin__', toUsername: 'Admin', toAvatar: '👑', text, type: 'to_admin' }, replyMeta || {});
    game.directMessages.push(dm);
      if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
      persist(true);
      let delivered = 0;
      for (const [, s] of io.sockets.sockets) { if (s.data.isAdmin) { s.emit('admin_player_reply', reply); delivered++; } }
      broadcastAdmin();
      // reflect to sender's other sockets
      for (const [, s] of io.sockets.sockets) { if (!s.data.isAdmin && s.data.token === token) sendState(s); }
      return res(true, 'Sent', { delivered, message: dm });
    }
    if (to === token) return res(false, 'Cannot message yourself');
    const tp = game.players[to];
    if (!tp) return res(false, 'Player not found');
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    const dm = Object.assign({ id: uid('dm'), at: now(), fromToken: token, fromUsername: p.username || 'Player', fromAvatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0], toToken: to, toUsername: tp.username || 'Player', toAvatar: AVATARS.includes(tp.avatar) ? tp.avatar : AVATARS[0], text }, replyMeta || {});
    game.directMessages.push(dm);
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    persist(true);
    let delivered = 0;
    for (const [, s] of io.sockets.sockets) {
      if (!s.data.isAdmin && s.data.token === to) { s.emit('dm_new', dm); sendState(s); delivered++; }
      if (!s.data.isAdmin && s.data.token === token) { sendState(s); }
    }
    res(true, 'Sent', { delivered, message: dm });
  });

  socket.on('dm_typing', (payload = {}) => {
    if (socket.data.isAdmin) return;
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return;
    const to = payload && typeof payload.to === 'string' ? payload.to : '';
    if (!to) return;
    const name = p.username || 'Player';
    for (const [, sock] of io.sockets.sockets) {
      if (sock.data.isAdmin) {
        if (to === '__admin__') sock.emit('admin_dm_typing', { from: token, name });
      } else if (sock.data.token === to) {
        sock.emit('dm_typing', { from: token, name });
      }
    }
  });

  socket.on('dm_delete', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    if (!id) return res(false, 'Message required');
    const dm = (game.directMessages || []).find(m => m && m.id === id) || (game.adminInbox || []).find(m => m && m.id === id);
    if (!dm) return res(false, 'Message not found');
    if (!socket.data.isAdmin && dm.fromToken !== socket.data.token) return res(false, 'You can only delete your own messages');
    const deleter = socket.data.isAdmin ? 'Admin' : ((game.players[socket.data.token] && game.players[socket.data.token].username) || dm.fromUsername || 'Player');
    dm.deleted = true;
    dm.deletedBy = deleter;
    dm.deletedAt = now();
    dm.pinned = false;
    dm.text = '';
    dm.reactions = {};
    dm.replyToId = null;
    dm.replyText = null;
    dm.replyName = null;
    persist(true);
    dmBroadcast(id);
    res(true, 'Message deleted');
  });

  function findDmMessage(id) {
    return (game.directMessages || []).find(m => m && m.id === id) || (game.adminInbox || []).find(m => m && m.id === id) || null;
  }
  function dmBroadcast(id) {
    const msg = findDmMessage(id);
    if (!msg) return;
    persist(true);
    broadcastAdmin();
    for (const [, sock] of io.sockets.sockets) {
      if (sock.data.isAdmin) sock.emit('dm_updated', { id, message: msg });
      else if (sock.data.token === msg.fromToken || sock.data.token === msg.toToken) { sock.emit('dm_updated', { id, message: msg }); }
    }
  }

  socket.on('dm_react', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const emoji = payload && typeof payload.emoji === 'string' ? payload.emoji : '';
    const allowed = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
    if (!id || allowed.indexOf(emoji) === -1) return res(false, 'Invalid reaction');
    const msg = findDmMessage(id);
    if (!msg) return res(false, 'Message not found');
    const who = socket.data.isAdmin ? '__admin__' : socket.data.token;
    if (!socket.data.isAdmin && who !== msg.fromToken && who !== msg.toToken) return res(false, 'Not allowed');
    msg.reactions = msg.reactions && typeof msg.reactions === 'object' ? msg.reactions : {};
    const arr = Array.isArray(msg.reactions[emoji]) ? msg.reactions[emoji] : [];
    const idx = arr.indexOf(who);
    if (idx >= 0) arr.splice(idx, 1); else arr.push(who);
    if (arr.length) msg.reactions[emoji] = arr; else delete msg.reactions[emoji];
    dmBroadcast(id);
    res(true, idx >= 0 ? 'Reaction removed' : 'Reaction added', { message: msg });
  });

  socket.on('dm_pin', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const msg = id ? findDmMessage(id) : null;
    if (!msg) return res(false, 'Message not found');
    if (!socket.data.isAdmin && msg.fromToken !== socket.data.token) return res(false, 'You can only pin your own messages');
    if (msg.deleted) return res(false, 'Message was deleted');
    msg.pinned = !msg.pinned;
    dmBroadcast(id);
    res(true, msg.pinned ? 'Pinned' : 'Unpinned', { message: msg });
  });


  socket.on('dm_forward', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const src = id ? findDmMessage(id) : null;
    if (!src || src.deleted) return res(false, 'Message not available');
    const text = String(src.text || '').slice(0, 500);
    if (!text) return res(false, 'Nothing to forward');
    const toPublic = !!payload.public;
    const targets = Array.isArray(payload.to) ? payload.to.filter(t => typeof t === 'string' && t && t !== token && game.players[t]) : [];
    const fromName = p.username || 'Player';
    const fromAvatar = AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0];
    const created = [];
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    targets.forEach(to => {
      const tp = game.players[to];
      const dm = { id: uid('dm'), at: now(), fromToken: token, fromUsername: fromName, fromAvatar, toToken: to, toUsername: tp.username || 'Player', toAvatar: AVATARS.includes(tp.avatar) ? tp.avatar : AVATARS[0], text, forwarded: true, forwardedFrom: src.fromUsername || 'Player' };
      game.directMessages.push(dm);
      created.push(dm);
      for (const [, sock] of io.sockets.sockets) {
        if (!sock.data.isAdmin && sock.data.token === to) { sock.emit('dm_new', dm); sendState(sock); }
        if (!sock.data.isAdmin && sock.data.token === token) sendState(sock);
      }
    });
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    if (toPublic) {
      const msg = { id: uid('chat'), at: now(), userId: token, name: fromName, avatar: fromAvatar, isVip: !!p.isVip, text, forwarded: true, forwardedFrom: src.fromUsername || 'Player' };
      if (!Array.isArray(game.chat)) game.chat = [];
      game.chat.push(msg);
      pruneChat();
      io.emit('chat_new', msg);
    }
    persist(true);
    res(true, 'Forwarded', { count: created.length, public: toPublic, messages: created });
  });

  socket.on('dm_report', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const reason = payload && typeof payload.reason === 'string' ? payload.reason.trim().slice(0, 300) : '';
    const msg = id ? findDmMessage(id) : null;
    if (!msg) return res(false, 'Message not found');
    if (!Array.isArray(game.chatReports)) game.chatReports = [];
    const report = { id: uid('report'), at: now(), messageId: id, messagePreview: String(msg.text || '').slice(0, 160), messageAuthor: msg.fromUsername || 'Player', reporter: token, reporterName: p.username || 'Player', reason: reason || 'No reason provided', status: 'OPEN', type: 'dm' };
    game.chatReports.push(report);
    if (game.chatReports.length > 500) game.chatReports = game.chatReports.slice(-500);
    persist();
    for (const [, s] of io.sockets.sockets) { if (s.data.isAdmin) s.emit('admin_chat_report', report); }
    broadcastAdmin();
    res(true, 'Report submitted', { report });
  });

  socket.on('dm_mark_read', (payload = {}, ack) => {
    const res = (ok, msg) => { if (typeof ack === 'function') ack({ ok, msg }); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const peer = payload && typeof payload.peer === 'string' ? payload.peer : '';
    if (!peer) return res(false, 'Peer required');
    if (!p.dmReadAt || typeof p.dmReadAt !== 'object') p.dmReadAt = {};
    p.dmReadAt[peer] = now();
    persist();
    for (const [, s] of io.sockets.sockets) { if (!s.data.isAdmin && s.data.token === token) sendState(s); }
    res(true, 'OK');
  });

  socket.on('freebet_claim', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    if (!id) return res(false, 'Freebet required');
    if (!Array.isArray(game.freebets)) game.freebets = [];
    const fb = game.freebets.find(x => x.id === id);
    if (!fb) return res(false, 'Freebet not found');
    if (fb.to !== token) return res(false, 'Not your freebet');
    if (fb.claimed) return res(false, 'Already claimed');
    if (fb.status === 'LOST') return res(false, 'Freebet closed');
    if (fb.status === 'EXPIRED') return res(false, 'Freebet expired');
    if (now() > fb.expiresAt) {
      fb.status = 'EXPIRED';
      persist(true);
      return res(false, 'Freebet expired');
    }
    fb.claimed = true;
    fb.status = 'CLAIMED';
    fb.claimedAt = now();
    const ref = 'freebet:' + fb.id;
    if (!payStore.ledgerRefExists(game, ref, 'FREEBET_CREDIT') && !(game.walletLedger || []).some(e => e.reference === ref && e.transaction_type === 'FREEBET_CREDIT' && e.status === 'COMPLETED')) {
      p.balance = clampMoney((p.balance || 0) + fb.amount);
      payStore.addLedger(game, { user_id: token, transaction_type: 'FREEBET_CREDIT', amount: clampMoney(fb.amount), reference: ref, status: 'COMPLETED', description: `Freebet claimed (${fb.id})`, environment: 'internal' });
      addTransaction({ type: 'freebet_claim', freebetId: fb.id, owner: token, amount: fb.amount });
    pnlAdd('freebetsClaimed', fb.amount);
    }
    persist(true);
    // Congratulatory DM from Admin in red (like boosterpot win notice) — only on claim
    const congrats = {
      id: uid('adm'),
      at: now(),
      from: 'admin',
      to: token,
      toUsername: p.username || 'Player',
      toAvatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0],
      text: `Congratulations! You claimed your Free Bet of KSh ${fb.amount.toFixed(2)}. It has been added to your balance.`,
      style: 'green'
    };
    if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
    game.adminInbox.push(congrats);
    if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    game.directMessages.push({ id: congrats.id, at: congrats.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: token, toUsername: congrats.toUsername, toAvatar: congrats.toAvatar, text: congrats.text, style: 'green' });
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    for (const [, s] of io.sockets.sockets) {
      if (!s.data.isAdmin && s.data.token === token) { s.emit('dm_new', { id: congrats.id, at: congrats.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: token, toUsername: congrats.toUsername, toAvatar: congrats.toAvatar, text: congrats.text, style: 'green' }); sendState(s); }
    }
    for (const [, s] of io.sockets.sockets) { if (!s.data.isAdmin && s.data.token === token) sendState(s); }
    res(true, 'Freebet claimed', { amount: fb.amount, balance: p.balance });
  });

  socket.on('freebet_decline', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    if (!id) return res(false, 'Freebet required');
    if (!Array.isArray(game.freebets)) game.freebets = [];
    const fb = game.freebets.find(x => x.id === id);
    if (!fb) return res(false, 'Freebet not found');
    if (fb.to !== token) return res(false, 'Not your freebet');
    if (fb.claimed) return res(false, 'Already claimed');
    if (fb.status === 'LOST') return res(false, 'Freebet already closed');
    if (now() > fb.expiresAt) {
      fb.status = 'EXPIRED';
      persist(true);
      return res(false, 'Freebet expired');
    }
    fb.status = 'LOST';
    pnlAdd('freebetsUnused', fb.amount);
    fb.lostAt = now();
    const lost = {
      id: uid('adm'),
      at: now(),
      from: 'admin',
      to: token,
      toUsername: p.username || 'Player',
      toAvatar: AVATARS.includes(p.avatar) ? p.avatar : AVATARS[0],
      text: `You closed your Free Bet of KSh ${Number(fb.amount || 0).toFixed(2)}. It has been marked as lost and can no longer be claimed.`,
      style: 'red'
    };
    if (!Array.isArray(game.adminInbox)) game.adminInbox = [];
    game.adminInbox.push(lost);
    if (game.adminInbox.length > 500) game.adminInbox = game.adminInbox.slice(-500);
    if (!Array.isArray(game.directMessages)) game.directMessages = [];
    game.directMessages.push({ id: lost.id, at: lost.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: token, toUsername: lost.toUsername, toAvatar: lost.toAvatar, text: lost.text, style: 'red' });
    if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    persist(true);
    for (const [, s] of io.sockets.sockets) {
      if (!s.data.isAdmin && s.data.token === token) { s.emit('dm_new', { id: lost.id, at: lost.at, fromToken: '__admin__', fromUsername: 'Admin', fromAvatar: '👑', toToken: token, toUsername: lost.toUsername, toAvatar: lost.toAvatar, text: lost.text, style: 'red' }); sendState(s); }
    }
    broadcastAdmin();
    res(true, 'Freebet marked as lost');
  });

    socket.on('disconnect', () => {
    const token = socket.data.token;
    if (!token || socket.data.isAdmin) return;
    // players keep playing (auto-betting continues server-side) even while offline
  });

  socket.on('admin_login', (payload = {}, ack) => {
    const key = payload && payload.key;
    if (key === ADMIN_KEY) {
      socket.data.isAdmin = true;
      socket.emit('admin_state', adminSnapshot());
      sendAdminPayments(socket);
      if (typeof ack === 'function') ack({ ok: true });
    } else {
      if (typeof ack === 'function') ack({ ok: false, msg: 'Invalid admin key' });
    }
  });

  socket.on('place_bet', (payload = {}, ack) => {
    if (socket.data.isAdmin) { if (typeof ack === 'function') ack({ ok: false, msg: 'Admin view' }); return; }
    const token = socket.data.token;
    const p = getPlayer(token);
    const r = game.round;
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p || !r) return res(false, 'No active session');
    const panel = Number(payload.panel);
    if (!(panel === 0 || panel === 1)) return res(false, 'Invalid panel');
    if (p.auto && p.auto[panel] && (p.auto[panel].running || p.auto[panel].roundsRemaining > 0)) return res(false, 'Stop Auto mode to place manual bets');
    const amount = Math.floor(Number(payload.amount) || 0);
    if (amount < 10 || amount > 10000) return res(false, 'Bet amount must be between KSh 10.00 and KSh 10,000.00');
    const autoVal = Number(payload.auto);
    const auto = normalizeAutoCashout(autoVal);

    if (r.state === 'BETTING') {
      const existing = r.bets.find(b => b.owner === token && b.panel === panel && b.roundId === r.roundId && (b.status === 'BET_PLACED' || b.status === 'FLYING'));
      if (existing) return res(false, 'Bet already placed');
      const qIdx = game.queuedBets.findIndex(q => q.owner === token && q.panel === panel && q.targetRoundId === r.roundId);
      if (qIdx !== -1) return res(false, 'Bet already placed');
      if (p.balance < amount) return res(false, 'Insufficient balance');
      p.balance = clampMoney(p.balance - amount);
      recordActivity(p);
      const bet = { id: uid('b'), roundId: r.roundId, owner: token, panel, name: 'Player', simulated: false, amount, status: 'BET_PLACED', cashoutAt: null, win: null, auto, payoutDone: false, placedAt: now() };
      r.bets.unshift(bet);
      registerBoosterpotContribution(token, amount);
      addTransaction({ type: 'bet', roundId: r.roundId, betId: bet.id, owner: token, amount, auto, simulated: false });
      pnlAdd('bets', amount);
      persist(); broadcastState(); broadcastAdmin(); sendState(socket);
      return res(true, 'Bet placed', { balance: p.balance });
    }

    if (r.state === 'RUNNING' || r.state === 'CRASHED') {
      const target = nextRoundId();
      const dup = game.queuedBets.find(q => q.owner === token && q.panel === panel && q.targetRoundId === target);
      if (dup) return res(false, 'Bet already queued for next round');
      game.queuedBets.push({ id: uid('q'), owner: token, panel, amount, auto, targetRoundId: target, createdAt: now() });
      addTransaction({ type: 'queue', targetRoundId: target, owner: token, panel, amount, auto });
      persist(); broadcastState(); broadcastAdmin(); sendState(socket);
      return res(true, 'Bet queued for next round', { balance: p.balance, queued: true, targetRoundId: target });
    }
    return res(false, 'Betting unavailable');
  });

  socket.on('cancel_bet', (payload = {}, ack) => {
    if (socket.data.isAdmin) { if (typeof ack === 'function') ack({ ok: false, msg: 'Admin view' }); return; }
    const token = socket.data.token;
    const p = getPlayer(token);
    const r = game.round;
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p || !r) return res(false, 'No active session');
    const panel = Number(payload.panel);
    if (!(panel === 0 || panel === 1)) return res(false, 'Invalid panel');
    if (p.auto && p.auto[panel] && (p.auto[panel].running || p.auto[panel].roundsRemaining > 0)) return res(false, 'Auto mode is running');
    const target = nextRoundId();
    const qIdx = game.queuedBets.findIndex(q => q.owner === token && q.panel === panel && q.targetRoundId === target);
    if (qIdx !== -1) {
      const q = game.queuedBets[qIdx];
      if (q.autoBet || q.autoMode || (p.auto && p.auto[panel] && (p.auto[panel].running || p.auto[panel].roundsRemaining > 0))) return res(false, 'Auto queued bet cannot be cancelled manually');
      game.queuedBets.splice(qIdx, 1);
      addTransaction({ type: 'queue_cancel', targetRoundId: q.targetRoundId, owner: token, panel, amount: q.amount });
      persist(); broadcastState(); broadcastAdmin(); sendState(socket);
      return res(true, 'Queued bet cancelled', { balance: p.balance });
    }
    if (r.state !== 'BETTING') return res(false, 'Cannot cancel');
    const idx = r.bets.findIndex(b => b.owner === token && b.panel === panel && b.roundId === r.roundId && b.status === 'BET_PLACED');
    if (idx === -1) return res(false, 'No bet to cancel');
    const bet = r.bets[idx];
    if (bet.autoBet) return res(false, 'Auto bet cannot be cancelled manually');
    r.bets.splice(idx, 1);
    p.balance = clampMoney(p.balance + bet.amount);
    revokeBoosterpotContribution(token, bet.amount);
    addTransaction({ type: 'cancel', roundId: r.roundId, betId: bet.id, owner: token, amount: bet.amount });
    persist(); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Bet cancelled', { balance: p.balance });
  });

  socket.on('cashout', (payload = {}, ack) => {
    if (socket.data.isAdmin) { if (typeof ack === 'function') ack({ ok: false, msg: 'Admin view' }); return; }
    const token = socket.data.token;
    const p = getPlayer(token);
    const r = game.round;
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p || !r) return res(false, 'No active session');
    if (r.state !== 'RUNNING') return res(false, 'Not running');
    const panel = Number(payload.panel);
    const bet = r.bets.find(b => b.owner === token && b.panel === panel && b.roundId === r.roundId);
    if (!bet) return res(false, 'No active bet');
    if (bet.status !== 'FLYING' || bet.cashoutAt != null) return res(false, 'Already settled');
    const t = now();
    const m = Math.min(r.crashPoint, Math.max(1, multiplierAt(t - r.startedAt)));
    if (m > r.crashPoint) return res(false, 'Round crashed');
    bet.status = 'CASHED_OUT';
    bet.cashoutAt = m;
    bet.win = clampMoney(bet.amount * m);
    pushCashoutCard(bet, m);
    recordBetWin(bet, m, bet.win, t);
    if (!bet.payoutDone) {
      p.balance = clampMoney(p.balance + bet.win);
      bet.payoutDone = true;
      recordActivity(p, t);
      addTransaction({ type: 'cashout', roundId: r.roundId, betId: bet.id, owner: token, amount: bet.amount, multiplier: m, win: bet.win, simulated: false });
      pnlAdd('cashouts', bet.win);
    }
    if (bet.autoBet && p.auto && p.auto[panel]) {
      const a = p.auto[panel];
      if (a.running || a.roundsRemaining > 0) a.status = 'AUTO RUNNING';
      else { a.running = false; a.status = 'CASHED OUT'; }
    }
    persist(); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Cashed out', { balance: p.balance, multiplier: m, win: bet.win });
  });

  socket.on('start_auto', (payload = {}, ack) => {
    if (socket.data.isAdmin) { if (typeof ack === 'function') ack({ ok: false, msg: 'Admin view' }); return; }
    const token = socket.data.token;
    const p = getPlayer(token);
    const r = game.round;
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p || !r) return res(false, 'No active session');
    const panel = Number(payload.panel);
    if (!(panel === 0 || panel === 1)) return res(false, 'Invalid panel');
    const amount = Math.floor(Number(payload.amount) || 0);
    const rounds = Math.max(1, Math.min(1000, Math.floor(Number(payload.rounds) || 0)));
    if (amount < 10 || amount > 10000) return res(false, 'Bet amount must be between KSh 10.00 and KSh 10,000.00');
    if (rounds < 1) return res(false, 'Select number of rounds');
    const autoVal = Number(payload.autoCashout);
    const autoCashout = normalizeAutoCashout(autoVal);
    ensureAuto(p);
    const a = p.auto[panel];
    a.amount = amount; a.roundsTotal = rounds; a.roundsRemaining = rounds; a.autoCashout = autoCashout;
    a.running = true; a.stopRequested = false; a.pausedOffline = false; a.lastError = null; a.status = 'AUTO RUNNING';
    if (r.state === 'BETTING') {
      tryAutoPlaceCurrent(p, token, panel, r.roundId);
      if (a.running && a.roundsRemaining > 0 && !hasBetForRoundPanel(token, panel, r.roundId) && !hasQueuedFor(token, panel, r.roundId)) {
        // could not place now (e.g. dup) - keep running for future
      }
    } else {
      tryAutoQueueNext(p, token, panel, nextRoundId());
      if (!a.running && a.status !== 'INSUFFICIENT BALANCE') a.status = 'BET QUEUED';
    }
    if (a.running && a.status === 'AUTO RUNNING') a.status = (r.state === 'BETTING' && hasBetForRoundPanel(token, panel, r.roundId)) ? 'BET ACTIVE' : (hasQueuedFor(token, panel, nextRoundId()) ? 'BET QUEUED' : 'AUTO RUNNING');
    persist(); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Auto mode started', { auto: p.auto[panel], balance: p.balance });
  });

  socket.on('stop_auto', (payload = {}, ack) => {
    if (socket.data.isAdmin) { if (typeof ack === 'function') ack({ ok: false, msg: 'Admin view' }); return; }
    const token = socket.data.token;
    const p = getPlayer(token);
    const r = game.round;
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p) return res(false, 'No active session');
    const panel = Number(payload.panel);
    if (!(panel === 0 || panel === 1)) return res(false, 'Invalid panel');
    ensureAuto(p);
    const a = p.auto[panel];
    a.running = false; a.roundsRemaining = 0; a.stopRequested = true; a.pausedOffline = false; a.status = 'AUTO STOPPED'; a.lastError = null;
    const target = nextRoundId();
    game.queuedBets = game.queuedBets.filter(q => !(q.owner === token && q.panel === panel && (q.autoBet || q.autoMode) && (q.targetRoundId === target)));
    persist(); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Auto mode stopped', { auto: a });
  });


  socket.on('set_profile', (payload = {}, ack) => {
    const token = socket.data.token;
    const p = getPlayer(token);
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p) return res(false, 'No active session');
    let changed = false;
    if (payload.username !== undefined) {
      const name = sanitizeUsername(payload.username);
      if (!name) return res(false, 'Enter a valid username');
      p.username = name; changed = true;
      if (game.boosterpot) {
        if (game.boosterpot.pendingCollect && game.boosterpot.pendingCollect.playerId === token) game.boosterpot.pendingCollect.username = name;
        if (Array.isArray(game.boosterpot.history)) game.boosterpot.history.forEach(h => { if (h.winnerPlayerId === token) h.winnerUsername = name; });
      }
    }
    if (payload.avatar !== undefined) {
      const av = sanitizeAvatar(payload.avatar);
      if (!av) return res(false, 'Invalid avatar');
      p.avatar = av; changed = true;
    }
    if (!changed) return res(false, 'Nothing to update');
    persist(true); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Profile updated', { username: p.username, avatar: p.avatar, isVip: p.isVip });
  });socket.on('set_username', (payload = {}, ack) => {
    const token = socket.data.token;
    const p = getPlayer(token);
    const res = (ok, msg, extra={}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p) return res(false, 'No active session');
    const name = sanitizeUsername(payload.username);
    if (!name) return res(false, 'Enter a valid username');
    p.username = name;
    if (game.boosterpot) {
      if (game.boosterpot.pendingCollect && game.boosterpot.pendingCollect.playerId === token) game.boosterpot.pendingCollect.username = name;
      if (Array.isArray(game.boosterpot.history)) game.boosterpot.history.forEach(h => { if (h.winnerPlayerId === token) h.winnerUsername = name; });
    }
    persist(true); broadcastState(); broadcastAdmin(); sendState(socket);
    res(true, 'Username updated', { username: name });
  });

  socket.on('request_state', () => {
    if (socket.data.isAdmin) { sendAdmin(socket); sendAdminPayments(socket); }
    else {
      sendState(socket); sendPaymentsState(socket);
      // Re-emit any unexpired, unclaimed freebets so returning players see the popup
      try {
        const token = socket.data.token;
        const t = now();
        if (Array.isArray(game.freebets)) {
          for (const fb of game.freebets) {
            if (fb.to === token && !fb.claimed && fb.status !== 'EXPIRED' && fb.status !== 'CLAIMED' && fb.status !== 'LOST' && t <= fb.expiresAt) {
              socket.emit('freebet_new', { ...fb, remainingMs: Math.max(0, fb.expiresAt - t) });
            }
          }
        }
      } catch (e) { }
    }
  });
  socket.on('payments_request', () => { if (socket.data.isAdmin) sendAdminPayments(socket); else sendPaymentsState(socket); });

  socket.on('chat_send', (payload = {}, ack) => {
    const token = socket.data.token;
    const p = getPlayer(token);
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!p) return res(false, 'No active session');
    let text = typeof payload.text === 'string' ? payload.text.replace(/\s+/g, ' ').trim() : '';
    if (!text) return res(false, 'Message cannot be empty');
    if (text.length > 200) text = text.slice(0, 200);
    const t = now();
    if (p.chatMutedUntil && p.chatMutedUntil > t) {
      const mins = Math.max(1, Math.ceil((p.chatMutedUntil - t) / 60000));
      return res(false, `You are muted for ${mins} more minute${mins === 1 ? '' : 's'} for using bad language`);
    }
    if (p.chatMutedUntil && p.chatMutedUntil <= t) { p.chatMutedUntil = 0; p.chatWarnings = 0; }
    if (containsBadWords(text)) {
      p.chatWarnings = (p.chatWarnings || 0) + 1;
      if (p.chatWarnings >= 3) {
        p.chatMutedUntil = t + 3 * 60 * 1000;
        p.chatWarnings = 0;
        persist();
        broadcastState();
        return res(false, 'Bad language is not allowed. You have been muted for 3 minutes.');
      }
      const left = 3 - p.chatWarnings;
      persist();
      broadcastState();
      return res(false, `Warning ${p.chatWarnings}/3: bad language is not allowed. ${left} more warning${left === 1 ? '' : 's'} before a 3-minute mute.`);
    }
    if (p.lastChatAt && t - p.lastChatAt < 1200) return res(false, 'Please wait before sending another message');
    p.lastChatAt = t;
    const msg = {
      id: uid('chat'),
      at: t,
      userId: token,
      name: p.username || 'Player',
      avatar: AVATARS.includes(p.avatar) ? p.avatar : (p.username ? p.username.charAt(0).toUpperCase() : 'P'),
      isVip: !!p.isVip,
      text
    };
    const replyTo = findChatMessage(payload && payload.replyToId);
    if (replyTo && !replyTo.deleted) {
      msg.replyToId = replyTo.id;
      msg.replyPreview = { name: replyTo.name || 'Player', text: chatPreview(replyTo) };
    }
    if (!Array.isArray(game.chat)) game.chat = [];
    game.chat.push(msg);
    pruneChat();
    io.emit('chat_new', msg);
    persist();
    res(true, 'Sent', { message: msg });
  });

  socket.on('rain_send', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const rawAmount = Math.floor(Number(payload && payload.amount) || 0);
    const rawPlayers = Math.floor(Number(payload && payload.players) || 0);
    const amount = Math.max(10, Math.min(1000, rawAmount || 10));
    const players = Math.max(1, Math.min(10, rawPlayers || 1));
    const total = amount * players;
    if (total > 10000) return res(false, 'Total rain cannot exceed 10,000');
    if ((p.balance || 0) < total) return res(false, 'Insufficient balance for this rain');
    const t = now();
    p.balance = clampMoney((p.balance || 0) - total);
    addTransaction({ type: 'rain_send', owner: token, amount: total });
    if (!Array.isArray(game.rains)) game.rains = [];
    const rain = { id: uid('rain'), at: t, expiresAt: t + 60 * 1000, from: token, fromUsername: p.username || 'Player', amount, maxClaimers: players, total, claimedCount: 0, claimedBy: {} };
    game.rains.push(rain);
    if (game.rains.length > 100) game.rains = game.rains.slice(-100);
    const msg = {
      id: uid('chat'),
      at: t,
      userId: token,
      name: p.username || 'Player',
      avatar: AVATARS.includes(p.avatar) ? p.avatar : (p.username ? p.username.charAt(0).toUpperCase() : 'P'),
      isVip: !!p.isVip,
      type: 'rain',
      rainId: rain.id,
      rain: { id: rain.id, amount, maxClaimers: players, claimedCount: 0, from: token, expiresAt: rain.expiresAt, total },
      text: `🌧️ is raining KSh ${total} to ${players} player${players === 1 ? '' : 's'}!`
    };
    if (!Array.isArray(game.chat)) game.chat = [];
    game.chat.push(msg);
    pruneChat();
    io.emit('chat_new', msg);
    persist();
    broadcastState();
    res(true, 'Rain sent', { balance: p.balance, rain });
  });

  socket.on('rain_claim', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (socket.data.isAdmin) return res(false, 'Admin view');
    const token = socket.data.token;
    const p = token && game.players[token] ? game.players[token] : null;
    if (!p) return res(false, 'No active session');
    const id = payload && typeof payload.rainId === 'string' ? payload.rainId : '';
    const rain = (Array.isArray(game.rains) ? game.rains : []).find(r => r.id === id);
    if (!rain) return res(false, 'Rain not found');
    if (now() >= rain.expiresAt) return res(false, 'This rain has expired');
    if (rain.from === token) return res(false, 'You cannot claim your own rain');
    if (rain.claimedBy && rain.claimedBy[token]) return res(false, 'You already claimed this rain');
    if ((rain.claimedCount || 0) >= rain.maxClaimers) return res(false, 'All spots have been claimed');
    rain.claimedBy = rain.claimedBy || {};
    rain.claimedBy[token] = now();
    rain.claimedCount = (rain.claimedCount || 0) + 1;
    p.balance = clampMoney((p.balance || 0) + rain.amount);
    addTransaction({ type: 'rain_claim', owner: token, amount: rain.amount });
    try { payStore.addLedger(game, { user_id: token, transaction_type: 'RAIN_PAYOUT', amount: rain.amount, reference: 'rain:' + rain.id + ':' + token, status: 'COMPLETED', description: 'Rain claimed', environment: 'internal' }); } catch (e) { }
    if (rain.from === '__admin__') pnlAdd('rainsClaimed', rain.amount);
    persist();
    broadcastState();
    res(true, `You claimed KSh ${rain.amount}!`, { balance: p.balance, amount: rain.amount });
  });

    socket.on('admin_rain_send', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!socket.data.isAdmin) return res(false, 'Unauthorized');
    const rawAmount = Math.floor(Number(payload && payload.amount) || 0);
    const rawPlayers = Math.floor(Number(payload && payload.players) || 0);
    const rain = sendAdminRain(rawAmount || 10, rawPlayers || 1);
    if (!rain) return res(false, 'Total rain cannot exceed 10,000');
    res(true, 'Rain sent', { rain });
  });

  socket.on('admin_chat_send', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!socket.data.isAdmin) return res(false, 'Unauthorized');
    let text = payload && typeof payload.text === 'string' ? payload.text.replace(/\r\n/g, '\n').trim() : '';
    if (!text) return res(false, 'Message cannot be empty');
    if (text.length > 12000) text = text.slice(0, 12000);
    const msg = {
      id: uid('chat'),
      at: now(),
      userId: '__admin__',
      name: 'Admin',
      avatar: '👑',
      isVip: false,
      isAdmin: true,
      text
    };
    const replyTo = findChatMessage(payload && payload.replyToId);
    if (replyTo && !replyTo.deleted) {
      msg.replyToId = replyTo.id;
      msg.replyPreview = { name: replyTo.name || 'Player', text: chatPreview(replyTo) };
    }
    if (!Array.isArray(game.chat)) game.chat = [];
    game.chat.push(msg);
    pruneChat();
    io.emit('chat_new', msg);
    persist();
    res(true, 'Sent', { message: msg });
  });

  socket.on('admin_chat_delete', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    if (!id) return res(false, 'Invalid message');
    if (!Array.isArray(game.chat)) game.chat = [];
    const msg = game.chat.find(m => m && m.id === id);
    if (!msg) return res(false, 'Message not found');
    if (msg.deleted) return res(false, 'Message already deleted');
    if (!actor.isAdmin && msg.userId !== actor.key) return res(false, 'You can only delete your own messages');
    msg.deleted = true;
    msg.deletedAt = now();
    msg.deletedBy = actor.isAdmin ? 'admin' : 'author';
    msg.deletedByName = actor.isAdmin ? 'Admin' : (actor.name || (msg.name || 'Player'));
    msg.text = '';
    delete msg.rainId;
    delete msg.rain;
    delete msg.multiplier;
    delete msg.winAmount;
    delete msg.stake;
    if (msg.type === 'cashout') msg.type = 'text';
    game.chatPins = (game.chatPins || []).filter(x => x !== id);
    game.chatAutoPins = (game.chatAutoPins || []).filter(x => x !== id);
    io.emit('chat_updated', msg);
    io.emit('chat_pins', { ids: pinnedChatIds() });
    chatAuditLog(actor.key, 'chat_delete', id, `Deleted message by ${msg.name || 'unknown'}`);
    persist();
    res(true, 'Deleted', { message: msg });
  });

  socket.on('chat_typing', (payload = {}) => {
    const actor = chatActorInfo(socket);
    if (!actor) return;
    const typing = !(payload && payload.typing === false);
    socket.broadcast.emit('chat_typing', { userId: actor.key, name: actor.name, typing, at: now() });
  });

  socket.on('chat_react', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const emoji = payload && typeof payload.emoji === 'string' ? payload.emoji : '';
    const msg = findChatMessage(id);
    if (!msg) return res(false, 'Message not found');
    if (msg.deleted) return res(false, 'Message is deleted');
    if (!CHAT_REACTION_EMOJIS.includes(emoji)) return res(false, 'Invalid reaction');
    if (!msg.reactions || typeof msg.reactions !== 'object') msg.reactions = {};
    if (msg.reactions[actor.key] === emoji) delete msg.reactions[actor.key];
    else msg.reactions[actor.key] = emoji;
    io.emit('chat_updated', msg);
    persist();
    res(true, 'Reaction saved', { message: msg });
  });

  socket.on('chat_pin', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const msg = findChatMessage(id);
    if (!msg) return res(false, 'Message not found');
    if (msg.deleted) return res(false, 'Cannot pin a deleted message');
    if (!actor.isAdmin && msg.userId !== actor.key) return res(false, 'You can only pin your own messages');
    if (!Array.isArray(game.chatPins)) game.chatPins = [];
    if (!Array.isArray(game.chatAutoPins)) game.chatAutoPins = [];
    const autoIdx = game.chatAutoPins.indexOf(id);
    if (autoIdx !== -1) {
      game.chatAutoPins.splice(autoIdx, 1);
      chatAuditLog(actor.key, 'chat_unpin', id, chatPreview(msg));
      io.emit('chat_pins', { ids: pinnedChatIds() });
      persist();
      return res(true, 'Unpinned', { ids: pinnedChatIds() });
    }
    const idx = game.chatPins.indexOf(id);
    if (idx !== -1) {
      game.chatPins.splice(idx, 1);
      chatAuditLog(actor.key, 'chat_unpin', id, chatPreview(msg));
    } else {
      game.chatPins.push(id);
      if (game.chatPins.length > 3) game.chatPins = game.chatPins.slice(-3);
      chatAuditLog(actor.key, 'chat_pin', id, chatPreview(msg));
    }
    io.emit('chat_pins', { ids: pinnedChatIds() });
    persist();
    res(true, idx !== -1 ? 'Unpinned' : 'Pinned', { ids: pinnedChatIds() });
  });

  socket.on('chat_save', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const msg = findChatMessage(id);
    if (!msg) return res(false, 'Message not found');
    if (!game.chatSaves || typeof game.chatSaves !== 'object') game.chatSaves = {};
    if (!Array.isArray(game.chatSaves[actor.key])) game.chatSaves[actor.key] = [];
    const list = game.chatSaves[actor.key];
    const idx = list.indexOf(id);
    if (idx !== -1) list.splice(idx, 1);
    else { list.push(id); if (list.length > 100) list.splice(0, list.length - 100); }
    persist();
    for (const [, s] of io.sockets.sockets) {
      if (actor.isAdmin ? s.data.isAdmin : s.data.token === actor.key) s.emit('chat_saved', { ids: list.slice() });
    }
    res(true, idx !== -1 ? 'Removed from saved' : 'Saved', { ids: list.slice() });
  });

  socket.on('chat_report', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const reason = payload && typeof payload.reason === 'string' ? payload.reason.trim().slice(0, 300) : '';
    const msg = findChatMessage(id);
    if (!msg) return res(false, 'Message not found');
    if (msg.deleted) return res(false, 'Message is deleted');
    if (!Array.isArray(game.chatReports)) game.chatReports = [];
    const report = {
      id: uid('report'),
      at: now(),
      messageId: id,
      messagePreview: chatPreview(msg),
      messageAuthor: msg.name || 'Player',
      reporter: actor.key,
      reporterName: actor.name,
      reason: reason || 'No reason provided',
      status: 'OPEN'
    };
    game.chatReports.push(report);
    if (game.chatReports.length > 500) game.chatReports = game.chatReports.slice(-500);
    chatAuditLog(actor.key, 'chat_report', id, report.reason);
    persist();
    for (const [, s] of io.sockets.sockets) { if (s.data.isAdmin) s.emit('admin_chat_report', report); }
    broadcastAdmin();
    res(true, 'Report submitted', { report });
  });

  socket.on('chat_forward', (payload = {}, ack) => {
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    const actor = chatActorInfo(socket);
    if (!actor) return res(false, 'Unauthorized');
    const id = payload && typeof payload.id === 'string' ? payload.id : '';
    const src = findChatMessage(id);
    if (!src) return res(false, 'Message not found');
    if (src.deleted) return res(false, 'Cannot forward a deleted message');
    const rawText = String(src.text || '').replace(/\r\n/g, '\n').trim();
    if (!rawText) return res(false, 'Nothing to forward');
    const text = actor.isAdmin ? rawText.slice(0, 12000) : rawText.replace(/\s+/g, ' ').slice(0, 200);
    const explicit = !!payload && (Array.isArray(payload.to) || typeof payload.public === 'boolean');
    const toPublic = explicit ? !!payload.public : true;
    const targets = (explicit && Array.isArray(payload.to)) ? payload.to.filter(t => typeof t === 'string' && t && t !== actor.key && game.players[t]) : [];
    const created = [];
    let chatMsg = null;
    if (toPublic) {
      chatMsg = {
        id: uid('chat'),
        at: now(),
        userId: actor.key,
        name: actor.name,
        avatar: actor.isAdmin ? '👑' : ((src.avatar || actor.name.charAt(0).toUpperCase())),
        isVip: false,
        isAdmin: actor.isAdmin,
        forwardedFrom: { id: src.id, name: src.name || 'Player' },
        text
      };
      if (!Array.isArray(game.chat)) game.chat = [];
      game.chat.push(chatMsg);
      pruneChat();
      io.emit('chat_new', chatMsg);
    }
    if (targets.length) {
      if (!Array.isArray(game.directMessages)) game.directMessages = [];
      targets.forEach(to => {
        const tp = game.players[to];
        const dm = { id: uid('dm'), at: now(), fromToken: actor.key, fromUsername: actor.name, fromAvatar: actor.isAdmin ? '👑' : (src.avatar || '👤'), toToken: to, toUsername: tp.username || 'Player', toAvatar: AVATARS.includes(tp.avatar) ? tp.avatar : AVATARS[0], text, forwarded: true, forwardedFrom: src.name || 'Player' };
        game.directMessages.push(dm);
        created.push(dm);
        for (const [, sock] of io.sockets.sockets) {
          if (!sock.data.isAdmin && sock.data.token === to) { sock.emit('dm_new', dm); sendState(sock); }
          if (!sock.data.isAdmin && sock.data.token === actor.key) sendState(sock);
        }
      });
      if (game.directMessages.length > 1000) game.directMessages = game.directMessages.slice(-1000);
    }
    if (!chatMsg && !created.length) return res(false, 'Pick a destination');
    chatAuditLog(actor.key, 'chat_forward', id, `Forwarded to ${created.length} chat(s)${toPublic ? ' + public' : ''}`);
    persist();
    res(true, 'Forwarded', { count: created.length, public: toPublic, message: chatMsg, messages: created });
  });

  socket.on('boosterpot_collect', (payload = {}, ack) => {
    const token = socket.data.token;
    const res = (ok, msg, extra = {}) => { if (typeof ack === 'function') ack(Object.assign({ ok, msg }, extra)); };
    if (!token || socket.data.isAdmin) return res(false, 'No active session');
    const result = boosterpotCollect(token);
    if (!result.ok) return res(false, result.msg || 'Could not collect');
    broadcastState();
    broadcastAdmin();
    broadcastAdminPayments();
    sendState(socket);
    sendPaymentsState(socket);
    res(true, result.msg || 'Collected', { balance: result.balance, win: result.win });
  });
});

/* ===================== PAYMENTS API ===================== */
function sendStateForToken(token){ for(const [,socket] of io.sockets.sockets){ if(socket.data.isAdmin){ sendAdmin(socket); } else if(socket.data.token===token){ sendState(socket); } } }
function updateLedgerStatus(reference,status,description){ (game.walletLedger||[]).forEach(e=>{ if(e.reference===reference && e.status==='PROCESSING'){ e.status=status; if(description) e.description=description; } }); }

function applyDepositSuccess(depId, mpesaReceipt, note){
  const d = (game.deposits||[]).find(x=>x.id===depId); if(!d) return false;
  if(d.status==='COMPLETED') return false; if(!['PROCESSING','PENDING','AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(d.status)) return false;
  const p = game.players[d.user_id]; if(!p) return false;
  if(mpesaReceipt){ const dup=(game.deposits||[]).find(x=>x!==d && x.mpesa_receipt_number===mpesaReceipt && x.status==='COMPLETED'); if(dup){ d.status='FAILED'; d.failure_reason='Duplicate M-Pesa receipt'; d.completed_at=now(); updateLedgerStatus(depId,'FAILED',d.failure_reason); persist(true); return false; } d.mpesa_receipt_number=mpesaReceipt; }
  else { if(payStore.ledgerRefExists(game,d.id,'DEPOSIT_CREDIT')) return false; }
  d.status='COMPLETED'; d.completed_at=now(); d.failure_reason=null;
  p.balance = clampMoney((p.balance||0)+Number(d.amount||0)); if(d.phone_number) p.phoneNumber=d.phone_number;
  updateLedgerStatus(depId,'COMPLETED', note||'Deposit completed');
  payStore.addLedger(game,{ user_id:d.user_id, transaction_type:'DEPOSIT_CREDIT', amount:d.amount, reference: mpesaReceipt||d.id, status:'COMPLETED', description: note||'Wallet credited (deposit)', environment:d.environment });
  persist(true); broadcastPaymentsFor(d.user_id); broadcastAdminPayments(); sendStateForToken(d.user_id); return true;
}
function applyDepositFailure(depId, reason){
  const d=(game.deposits||[]).find(x=>x.id===depId); if(!d) return false;
  if(['COMPLETED','FAILED','CANCELLED','REJECTED'].includes(d.status)) return false;
  d.status=/cancel/i.test(reason||'')?'CANCELLED':'REJECTED';
  d.failure_reason=String(reason||'Failed').slice(0,200); d.completed_at=now();
  updateLedgerStatus(depId,d.status,d.failure_reason); persist(true); broadcastPaymentsFor(d.user_id); broadcastAdminPayments(); return true;
}
function releaseWithdrawal(w, reason, by){
  const p=game.players[w.user_id]; if(!p) return false; if(['COMPLETED','FAILED','REJECTED','CANCELLED'].includes(w.status)) return false;
  const wasReserved=['PENDING','APPROVED','PROCESSING','AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(w.status);
  w.status=/reject/i.test(reason||'')?'REJECTED':(/cancel/i.test(reason||'')?'CANCELLED':'FAILED');
  w.failure_reason=String(reason||'Failed').slice(0,200); w.completed_at=now();
  if(wasReserved){ const amt=clampMoney(Number(w.amount||0)); p.reservedBalance=clampMoney(Math.max(0,(p.reservedBalance||0)-amt)); p.balance=clampMoney((p.balance||0)+amt); }
  updateLedgerStatus(w.id,w.status,w.failure_reason);
  payStore.addLedger(game,{ user_id:w.user_id, transaction_type:'WITHDRAW_RELEASE', amount:w.amount, reference:w.id, status:w.status, description:'Reserved amount released: '+w.failure_reason, environment:w.environment });
  if(by) payStore.recordAdminAction(game,{ action:'withdrawal_release', withdrawal_id:w.id, by, reason:w.failure_reason });
  persist(true); broadcastPaymentsFor(w.user_id); broadcastAdminPayments(); sendStateForToken(w.user_id); return true;
}
function applyWithdrawalSuccess(wId, txRef, note){
  const w=(game.withdrawals||[]).find(x=>x.id===wId); if(!w) return false; if(w.status==='COMPLETED') return false; if(!['APPROVED','PROCESSING'].includes(w.status)) return false;
  const p=game.players[w.user_id]; if(!p) return false;
  if(txRef){ const dup=(game.withdrawals||[]).find(x=>x!==w && x.transaction_reference===txRef && x.status==='COMPLETED'); if(dup){ releaseWithdrawal(w,'Duplicate transaction reference',null); return false; } w.transaction_reference=txRef; }
  else { if(payStore.ledgerRefExists(game,w.id,'WITHDRAW_COMPLETE')) return false; }
  const amt=clampMoney(Number(w.amount||0)); p.reservedBalance=clampMoney(Math.max(0,(p.reservedBalance||0)-amt));
  w.status='COMPLETED'; w.completed_at=now(); w.failure_reason=null; updateLedgerStatus(w.id,'COMPLETED', note||'Withdrawal completed');
  payStore.addLedger(game,{ user_id:w.user_id, transaction_type:'WITHDRAW_COMPLETE', amount:amt, reference: txRef||w.id, status:'COMPLETED', description: note||'Withdrawal sent', environment:w.environment });
  persist(true); broadcastPaymentsFor(w.user_id); broadcastAdminPayments(); sendStateForToken(w.user_id); return true;
}

app.get('/api/payments/config',(req,res)=>{ payStore.ensurePaymentState(game); res.json({ ok:true, settings: payStore.getPaymentSettings(game) }); });
app.get('/api/payments/history',(req,res)=>{ const auth=requirePlayerToken(req,res); if(!auth) return; res.json({ ok:true, data: paymentClientSnapshot(auth.token) }); });

app.post('/api/payments/deposit',(req,res)=>{
  const auth=requirePlayerToken(req,res); if(!auth) return; const {token,p}=auth;
  const phone=payStore.normalizePhone(req.body && req.body.phone_number); const amount=clampMoney(Number(req.body && req.body.amount));
  if(!phone) return paymentError(res,'Enter a valid M-Pesa phone number');
  if(!isFinite(amount)||amount<10) return paymentError(res,'Minimum deposit is KSh 10.00');
  if(amount>150000) return paymentError(res,'Maximum deposit is KSh 150,000.00');
  const clientRef=(req.body && req.body.client_ref)?String(req.body.client_ref).slice(0,64):null;
  if(clientRef){ const dup=payStore.findDepositByRef(game,{clientRef}); if(dup && dup.user_id===token) return res.json({ ok:true, deposit:dup, data: paymentClientSnapshot(token), duplicate:true }); }
  p.phoneNumber=phone;
  const dep={ id:uid('dep'), clientRef, user_id:token, amount, phone_number:phone, checkout_request_id:null, merchant_request_id:null, mpesa_receipt_number:null, status:'AWAITING_PAYMENT', environment:'manual', created_at:now(), completed_at:null, failure_reason:null, description:'Awaiting user payment to Paybill 542542, Account 03708400476150', paymentMessage:null };
  game.deposits.push(dep); payStore.addLedger(game,{ user_id:token, transaction_type:'DEPOSIT', amount, reference:dep.id, status:'PENDING', description:'Deposit requested; awaiting user payment and message', environment:dep.environment }); persist(true); broadcastPaymentsFor(token); broadcastAdminPayments(); sendStateForToken(token);
  return res.json({ ok:true, msg:'Pay to Paybill 542542, Account 03708400476150, then paste the M-Pesa confirmation message.', deposit:dep, data: paymentClientSnapshot(token) });
});

app.post('/api/payments/deposit/:id/mark-paid',(req,res)=>{
  const auth=requirePlayerToken(req,res); if(!auth) return; const {token}=auth;
  const d=(game.deposits||[]).find(x=>x.id===req.params.id && x.user_id===token); if(!d) return paymentError(res,'Deposit not found',404);
  if(d.status==='COMPLETED') return paymentError(res,'Deposit already completed');
  if(['FAILED','CANCELLED','REJECTED'].includes(d.status)) return paymentError(res,'This deposit cannot be submitted');
  if(!['AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(d.status)) return paymentError(res,'Deposit cannot be submitted in its current state');
  const msg=(req.body && (req.body.payment_message || req.body.paymentMessage || req.body.message)) ? String(req.body.payment_message || req.body.paymentMessage || req.body.message).trim().slice(0,2000) : '';
  if(!msg || msg.length < 10) return paymentError(res,'Paste the full M-Pesa confirmation message you received after paying.');
  const norm=msg.replace(/\s+/g,' ').toLowerCase();
  const dup=(game.deposits||[]).find(x=>x!==d && x.paymentMessage && String(x.paymentMessage).replace(/\s+/g,' ').toLowerCase()===norm && ['AWAITING_APPROVAL','COMPLETED','PROCESSING','PENDING','MARKED_PAID','AWAITING_PAYMENT'].includes(x.status));
  if(dup) return paymentError(res,'This transaction message has already been submitted.');
  d.paymentMessage=msg;
  d.status='AWAITING_APPROVAL'; d.description='Payment message submitted; awaiting admin approval'; d.completed_at=null; d.failure_reason=null;
  updateLedgerStatus(d.id,'PENDING','Payment message submitted; awaiting admin approval');
  persist(true); broadcastPaymentsFor(token); broadcastAdminPayments();
  return res.json({ ok:true, msg:'Submitted for admin approval. Your deposit will be credited after confirmation.', deposit:d, data: paymentClientSnapshot(token) });
});

app.post('/api/admin/deposits/:id/approve',(req,res)=>{
  if(!requireAdmin(req,res)) return; const d=(game.deposits||[]).find(x=>x.id===req.params.id); if(!d) return paymentError(res,'Deposit not found',404);
  if(d.status==='COMPLETED') return res.json({ ok:true, msg:'Deposit already completed.', deposit:d, data: adminPaymentsSnapshot() });
  if(!['AWAITING_APPROVAL','AWAITING_PAYMENT','MARKED_PAID','PROCESSING','PENDING'].includes(d.status)) return paymentError(res,'Deposit cannot be approved in its current state');
  const receipt=(req.body && req.body.mpesa_receipt_number)?String(req.body.mpesa_receipt_number).trim().slice(0,40):(d.mpesa_receipt_number||null);
  const by=(req.body && req.body.admin)?String(req.body.admin).slice(0,40):'admin';
  payStore.recordAdminAction(game,{ action:'deposit_approve', deposit_id:d.id, by, amount:d.amount, user_id:d.user_id });
  if(applyDepositSuccess(d.id, receipt, 'Deposit approved and credited by admin')){
    return res.json({ ok:true, msg:'Deposit approved and wallet credited.', deposit:(game.deposits||[]).find(x=>x.id===d.id), data: adminPaymentsSnapshot() });
  }
  return paymentError(res,'Failed to approve deposit (it may be in an invalid state)');
});

app.post('/api/admin/deposits/:id/reject',(req,res)=>{
  if(!requireAdmin(req,res)) return; const d=(game.deposits||[]).find(x=>x.id===req.params.id); if(!d) return paymentError(res,'Deposit not found',404);
  const reason=(req.body && req.body.reason)?String(req.body.reason).slice(0,200):'Rejected by admin';
  const by=(req.body && req.body.admin)?String(req.body.admin).slice(0,40):'admin';
  payStore.recordAdminAction(game,{ action:'deposit_reject', deposit_id:d.id, by, reason });
  if(applyDepositFailure(d.id, reason)) return res.json({ ok:true, deposit:(game.deposits||[]).find(x=>x.id===d.id), data: adminPaymentsSnapshot() });
  return paymentError(res,'Deposit cannot be rejected in its current state');
});

app.post('/api/admin/manage-finances',(req,res)=>{
  if(!requireAdmin(req,res)) return;
  const { user_id, type, amount, reason } = req.body || {};
  if (!user_id) return paymentError(res,'User ID required');
  if (!type || !['add','deduct'].includes(type)) return paymentError(res,'Type must be "add" or "deduct"');
  const amt = clampMoney(Number(amount));
  if (!isFinite(amt) || amt <= 0) return paymentError(res,'Enter a valid amount');
  const p = game.players[user_id];
  if (!p) return paymentError(res,'User not found');
  const by = (req.body && req.body.admin)?String(req.body.admin).slice(0,40):'admin';
  const prevBalance = clampMoney(p.balance || 0);
  let newBalance;
  if (type === 'add') {
    newBalance = clampMoney(prevBalance + amt);
    p.balance = newBalance;
    addTransaction({ type: 'admin_add_funds', owner: user_id, amount: amt, reason: reason || 'Funds added by admin', by, at: now() });
    pnlAdd('adminAdded', amt);
    payStore.addLedger(game,{ user_id, transaction_type:'ADMIN_ADD_FUNDS', amount:amt, reference:'admin_'+uid('add'), status:'COMPLETED', description: reason || 'Funds added by admin', environment:'internal' });
  } else {
    newBalance = clampMoney(Math.max(0, prevBalance - amt));
    p.balance = newBalance;
    addTransaction({ type: 'admin_deduct_funds', owner: user_id, amount: amt, reason: reason || 'Funds deducted by admin', by, at: now() });
    pnlAdd('adminDeducted', amt);
    payStore.addLedger(game,{ user_id, transaction_type:'ADMIN_DEDUCT_FUNDS', amount:amt, reference:'admin_'+uid('deduct'), status:'COMPLETED', description: reason || 'Funds deducted by admin', environment:'internal' });
  }
  persist();
  broadcastState();
  broadcastAdmin();
  broadcastPaymentsFor(user_id);
  return res.json({ ok: true, msg: `Funds ${type}ed successfully`, user_id, amount: amt, type, previousBalance: prevBalance, newBalance, player: { token: p.token, username: p.username || 'Player', balance: p.balance } });
});

app.post('/api/payments/callback/stk',(req,res)=>{ try{ const body=req.body||{}; const cb=body.Body && body.Body.stkCallback ? body.Body.stkCallback : null; if(cb){ const d=payStore.findDepositByRef(game,{ checkoutRequestId: cb.CheckoutRequestID||cb.CheckoutRequestId, merchantRequestId: cb.MerchantRequestID||cb.MerchantRequestId }); if(d){ const code=Number(cb.ResultCode); if(code===0){ let receipt=null; const items=cb.CallbackMetadata && cb.CallbackMetadata.Item ? cb.CallbackMetadata.Item : []; for(const it of items){ if(it && it.Name==='MpesaReceiptNumber') receipt=it.Value; } applyDepositSuccess(d.id, receipt, 'Deposit completed (M-Pesa)'); } else { applyDepositFailure(d.id, cb.ResultDesc||('ResultCode '+code)); } } } }catch(e){ console.error('stk callback error', e); } return res.json({ ResultCode:0, ResultDesc:'Accepted' }); });

app.get('/api/payments/deposit/:id/query', async (req,res)=>{ const auth=requirePlayerToken(req,res); if(!auth) return; const d=(game.deposits||[]).find(x=>x.id===req.params.id && x.user_id===auth.token); if(!d) return paymentError(res,'Deposit not found',404); if(!paymentsConfig.enabled || !d.checkout_request_id) return res.json({ ok:true, deposit:d, data: paymentClientSnapshot(auth.token) }); try{ const r=await daraja.stkQuery({ checkoutRequestId:d.checkout_request_id }); return res.json({ ok:true, deposit:d, daraja:r, data: paymentClientSnapshot(auth.token) }); }catch(e){ return res.status(502).json({ ok:false, msg:'Query failed', error:e.message }); } });

app.post('/api/payments/withdraw',(req,res)=>{
  const auth=requirePlayerToken(req,res); if(!auth) return; const {token,p}=auth; payStore.ensurePaymentState(game);
  const settings=payStore.getPaymentSettings(game);
  const phone=payStore.normalizePhone(req.body && req.body.phone_number);
  const amount=clampMoney(Number(req.body && req.body.amount));
  if(!phone) return paymentError(res,'Enter a valid M-Pesa phone number');
  if(!isFinite(amount)||amount<=0) return paymentError(res,'Enter a valid withdrawal amount');
  if(amount<settings.minWithdrawal) return paymentError(res,'Minimum withdrawal is KSh '+settings.minWithdrawal);
  if(amount>settings.maxWithdrawal) return paymentError(res,'Maximum withdrawal is KSh '+settings.maxWithdrawal);
  if((p.balance||0)<amount) return paymentError(res,'Insufficient available balance');
  const clientRef=(req.body && req.body.client_ref)?String(req.body.client_ref).slice(0,64):null;
  if(clientRef){ const dup=payStore.findWithdrawalByRef(game,{clientRef}); if(dup && dup.user_id===token) return res.json({ ok:true, withdrawal:dup, data: paymentClientSnapshot(token), duplicate:true }); }
  p.balance=clampMoney((p.balance||0)-amount); p.reservedBalance=clampMoney((p.reservedBalance||0)+amount); p.phoneNumber=phone;
  const fee = Number(settings.activationFee || 220);
  const w={ id:uid('wd'), clientRef, user_id:token, amount, phone_number:phone, transaction_reference:null, conversation_id:null, originator_conversation_id:null, status:'AWAITING_PAYMENT', environment:'manual', approved_by:null, created_at:now(), completed_at:null, failure_reason:null, description:`Pay activation fee KSh ${fee} to Paybill 542542, Account 03708400476150, then submit M-Pesa message`, paymentMessage:null };
  game.withdrawals.push(w);
  payStore.addLedger(game,{ user_id:token, transaction_type:'WITHDRAW_RESERVE', amount, reference:w.id, status:'PENDING', description:'Withdrawal amount reserved; awaiting activation fee evidence', environment:w.environment });
  persist(true); broadcastPaymentsFor(token); broadcastAdminPayments(); sendStateForToken(token);
  res.json({ ok:true, msg:`Withdrawal amount reserved. Pay activation fee KSh ${fee} to Paybill 542542, Account 03708400476150, then paste the M-Pesa confirmation message.`, withdrawal:w, data: paymentClientSnapshot(token) });
});

app.post('/api/payments/withdraw/:id/submit-evidence',(req,res)=>{
  const auth=requirePlayerToken(req,res); if(!auth) return; const {token}=auth;
  const w=(game.withdrawals||[]).find(x=>x.id===req.params.id && x.user_id===token); if(!w) return paymentError(res,'Withdrawal not found',404);
  if(w.status==='COMPLETED') return paymentError(res,'Withdrawal already completed');
  if(['FAILED','CANCELLED','REJECTED'].includes(w.status)) return paymentError(res,'This withdrawal cannot be submitted');
  if(!['AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(w.status)) return paymentError(res,'Withdrawal cannot be submitted in its current state');
  const msg=(req.body && (req.body.payment_message || req.body.paymentMessage || req.body.message)) ? String(req.body.payment_message || req.body.paymentMessage || req.body.message).trim().slice(0,2000) : '';
  if(!msg || msg.length < 10) return paymentError(res,'Paste the full M-Pesa confirmation message showing activation fee payment.');
  const norm=msg.replace(/\s+/g,' ').toLowerCase();
  const dup=(game.withdrawals||[]).find(x=>x!==w && x.paymentMessage && String(x.paymentMessage).replace(/\s+/g,' ').toLowerCase()===norm && ['AWAITING_APPROVAL','COMPLETED','PROCESSING','PENDING','MARKED_PAID','AWAITING_PAYMENT','APPROVED'].includes(x.status));
  if(dup) return paymentError(res,'This activation fee transaction message has already been submitted.');
  w.paymentMessage=msg;
  w.status='AWAITING_APPROVAL'; w.description='Activation fee evidence submitted; awaiting admin approval'; w.completed_at=null; w.failure_reason=null;
  updateLedgerStatus(w.id,'PENDING','Activation fee evidence submitted; awaiting admin approval');
  persist(true); broadcastPaymentsFor(token); broadcastAdminPayments();
  return res.json({ ok:true, msg:'Activation fee evidence submitted. Awaiting admin approval to complete withdrawal.', withdrawal:w, data: paymentClientSnapshot(token) });
});

app.get('/api/admin/payments',(req,res)=>{ if(!requireAdmin(req,res)) return; res.json({ ok:true, data: adminPaymentsSnapshot() }); });
app.post('/api/admin/withdrawals/:id/reject',(req,res)=>{
  if(!requireAdmin(req,res)) return; const w=(game.withdrawals||[]).find(x=>x.id===req.params.id); if(!w) return paymentError(res,'Withdrawal not found',404);
  if(!['PENDING','APPROVED','AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID','PROCESSING'].includes(w.status)) return paymentError(res,'Withdrawal cannot be rejected in its current state');
  const reason=(req.body && req.body.reason)?String(req.body.reason).slice(0,200):'Rejected by admin';
  w.approved_by=(req.body && req.body.admin)?String(req.body.admin).slice(0,40):'admin';
  payStore.recordAdminAction(game,{ action:'withdrawal_reject', withdrawal_id:w.id, by:w.approved_by, reason });
  releaseWithdrawal(w,'Rejected: '+reason,w.approved_by); persist(true);
  return res.json({ ok:true, withdrawal:w, data: adminPaymentsSnapshot() });
});

app.post('/api/admin/withdrawals/:id/approve', async (req,res)=>{
  if(!requireAdmin(req,res)) return; const w=(game.withdrawals||[]).find(x=>x.id===req.params.id); if(!w) return paymentError(res,'Withdrawal not found',404);
  if(!['AWAITING_APPROVAL','PENDING'].includes(w.status)) return paymentError(res,'Withdrawal cannot be approved in its current state (awaiting activation fee evidence and review)');
  w.status='APPROVED'; w.approved_by=(req.body && req.body.admin)?String(req.body.admin).slice(0,40):'admin';
  payStore.recordAdminAction(game,{ action:'withdrawal_approve', withdrawal_id:w.id, by:w.approved_by });
  updateLedgerStatus(w.id,'APPROVED','Withdrawal approved after activation fee review'); persist(true); broadcastPaymentsFor(w.user_id); broadcastAdminPayments();
  if(!paymentsConfig.enabled){
    w.status='PROCESSING'; persist(true); broadcastPaymentsFor(w.user_id); broadcastAdminPayments();
    setTimeout(()=>{ const ww=(game.withdrawals||[]).find(x=>x.id===w.id); if(ww && ww.status==='PROCESSING') applyWithdrawalSuccess(ww.id,null,'Withdrawal completed'); },4000);
    return res.json({ ok:true, msg:'Withdrawal approved and is being processed.', withdrawal:w, data: adminPaymentsSnapshot() });
  }
  try{
    w.status='PROCESSING'; const r=await daraja.b2cPayment({ amount:w.amount, phoneNumber:w.phone_number, remarks:'Aviator withdrawal', occasion:'Withdrawal' });
    w.conversation_id=r.ConversationID||r.conversationID||null; w.originator_conversation_id=r.OriginatorConversationID||r.originatorConversationID||null;
    persist(true); broadcastPaymentsFor(w.user_id); broadcastAdminPayments();
    return res.json({ ok:true, msg:'B2C request submitted; awaiting result callback.', withdrawal:w, daraja:r, data: adminPaymentsSnapshot() });
  }catch(e){
    releaseWithdrawal(w,'B2C initiation failed: '+String(e&&e.message||'error'), w.approved_by);
    return res.status(502).json({ ok:false, msg:'Failed to initiate B2C payment', error:e&&e.message, data: adminPaymentsSnapshot() });
  }
});

app.post('/api/payments/callback/b2c/result',(req,res)=>{ try{ const body=req.body||{}; const result=body.Result||body.result||null; if(result){ const w=payStore.findWithdrawalByRef(game,{ conversationId: result.ConversationID||result.ConversationId, originatorConversationId: result.OriginatorConversationID||result.OriginatorConversationId }); if(w){ const code=Number(result.ResultCode); if(code===0){ let txRef=null; const params=result.ResultParameters && result.ResultParameters.ResultParameter ? result.ResultParameters.ResultParameter : []; for(const it of params){ if(it && (it.Key==='TransactionReceipt'||it.Key==='TransactionID')) txRef=it.Value; } applyWithdrawalSuccess(w.id, txRef, 'Withdrawal completed (M-Pesa)'); } else { releaseWithdrawal(w, result.ResultDesc||('ResultCode '+code), null); } } } }catch(e){ console.error('b2c result error', e); } return res.json({ ResultCode:0, ResultDesc:'Accepted' }); });
app.post('/api/payments/callback/b2c/timeout',(req,res)=>{ try{ const body=req.body||{}; const result=body.Result||body; const w=payStore.findWithdrawalByRef(game,{ conversationId: result.ConversationID||result.ConversationId, originatorConversationId: result.OriginatorConversationID||result.OriginatorConversationId }); if(w) releaseWithdrawal(w,'B2C timeout',null); }catch(e){ console.error('b2c timeout error', e); } return res.json({ ResultCode:0, ResultDesc:'Accepted' }); });


app.use(express.static(__dirname));

setInterval(engineTick, 100);
setInterval(() => { if (vipSweep()) { broadcastState(); broadcastAdmin(); } }, 30000);
setInterval(sweepExpiredFreebets, 30000);
setInterval(finalizeExpiredRains, 10000);
setInterval(() => { broadcastAdmin(); }, 500);
setInterval(() => {
  if (Array.isArray(game.freebets)) {
    const now = Date.now();
    for (const f of game.freebets) {
      if (f.expiresAt && f.expiresAt <= now && f.status !== 'EXPIRED' && f.status !== 'CLAIMED' && f.status !== 'LOST') {
        f.status = 'EXPIRED';
      }
    }
    game.freebets = game.freebets.filter(f => !f.expiresAt || f.expiresAt > now || f.status === 'EXPIRED' || f.status === 'CLAIMED' || f.status === 'LOST' || f.claimed === true);
    if (game.freebets.length > 2000) game.freebets = game.freebets.slice(-2000);
  }
}, 60000);

scheduleNextAutoRain();
scheduleNextAutoFreebet();

recover();

function setupPhoneUsb(port) {
  const adbs = [
    process.env.ADB_PATH,
    path.join(process.env.USERPROFILE || '', 'Desktop', 'SCREEN COPY', 'scrcpy-win64-v2.3.1', 'adb.exe'),
    'C:\\Users\\Fluxtech\\Desktop\\SCREEN COPY\\scrcpy-win64-v2.3.1\\adb.exe',
    'adb'
  ].filter((v, i, a) => v && a.indexOf(v) === i);
  let adbBin = null;
  for (const adb of adbs) {
    try {
      if (adb !== 'adb' && !fs.existsSync(adb)) continue;
      execFileSync(adb, ['version'], { stdio: 'ignore', timeout: 5000, windowsHide: true });
      adbBin = adb; break;
    } catch (_) { /* try next */ }
  }
  if (!adbBin) {
    console.log('[ADB] Phone USB reverse not set. ADB not found (connect phone via USB with USB debugging enabled).');
    return false;
  }
  try {
    const out = execFileSync(adbBin, ['devices'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 5000, windowsHide: true });
    const devices = String(out).split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('List of devices'))
      .map(l => { const m = l.match(/^(\S+)\s+(\S+)/); return m ? { id: m[1], state: m[2] } : null; }).filter(Boolean);
    const ready = devices.filter(d => d.state === 'device');
    const pending = devices.filter(d => d.state !== 'device');
    if (!devices.length) {
      console.log('[ADB] No USB devices detected. Connect phone(s) via USB with USB debugging enabled.');
      return false;
    }
    let ok = 0;
    for (const d of ready) {
      try {
        execFileSync(adbBin, ['-s', d.id, 'reverse', '--remove-all'], { stdio: 'ignore', timeout: 5000, windowsHide: true });
        execFileSync(adbBin, ['-s', d.id, 'reverse', `tcp:${port}`, `tcp:${port}`], { stdio: 'ignore', timeout: 5000, windowsHide: true });
        console.log(`[ADB] Phone USB reverse ready on http://127.0.0.1:${port} (${d.id})`);
        ok++;
      } catch (_) { console.log(`[ADB] Failed to set reverse for ${d.id}.`); }
    }
    for (const d of pending) {
      console.log(`[ADB] Device ${d.id} is ${d.state} - accept USB debugging prompt/enable debugging on that phone.`);
    }
    return ok > 0;
  } catch (_) {
    console.log('[ADB] Phone USB reverse not set. Connect phone via USB with USB debugging enabled (adb not available).');
    return false;
  }
}

server.listen(PORT, () => {
  console.log(`Aviator server running on http://localhost:${PORT}`);
  console.log(`Admin page: http://localhost:${PORT}/admin.html (key: ${ADMIN_KEY})`);
  console.log(`Round ${game.round && game.round.roundId} state ${game.round && game.round.state}`);
  setupPhoneUsb(PORT);
});
