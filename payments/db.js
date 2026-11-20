const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'payments.db');

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_FILE);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT,
      phone_number TEXT,
      available_balance REAL NOT NULL DEFAULT 0,
      reserved_balance REAL NOT NULL DEFAULT 0,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS deposits (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      amount REAL NOT NULL,
      phone_number TEXT,
      checkout_request_id TEXT,
      merchant_request_id TEXT,
      mpesa_receipt_number TEXT,
      status TEXT NOT NULL,
      created_at INTEGER,
      completed_at INTEGER,
      client_ref TEXT,
      environment TEXT,
      failure_reason TEXT,
      description TEXT,
      payment_message TEXT
    );
    CREATE TABLE IF NOT EXISTS withdrawals (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      amount REAL NOT NULL,
      phone_number TEXT,
      transaction_reference TEXT,
      conversation_id TEXT,
      originator_conversation_id TEXT,
      status TEXT NOT NULL,
      approved_by TEXT,
      created_at INTEGER,
      completed_at INTEGER,
      client_ref TEXT,
      environment TEXT,
      failure_reason TEXT,
      description TEXT,
      payment_message TEXT
    );
    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      transaction_type TEXT NOT NULL,
      amount REAL NOT NULL,
      reference TEXT,
      status TEXT NOT NULL,
      description TEXT,
      created_at INTEGER,
      environment TEXT
    );
    CREATE TABLE IF NOT EXISTS boosterpot_events (
      event_id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      prize_amount REAL NOT NULL,
      participant_count INTEGER NOT NULL DEFAULT 0,
      winner_player_id TEXT,
      winner_username TEXT,
      selected_at INTEGER,
      collected_at INTEGER,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS boosterpot_winners (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL UNIQUE,
      player_id TEXT NOT NULL,
      username TEXT,
      amount REAL NOT NULL,
      status TEXT NOT NULL,
      selected_at INTEGER,
      collected_at INTEGER,
      payout_reference TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_boosterpot_winners_player ON boosterpot_winners(player_id, selected_at DESC);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_ledger_ref_type ON wallet_transactions(reference, transaction_type) WHERE reference IS NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_deposits_receipt ON deposits(mpesa_receipt_number) WHERE mpesa_receipt_number IS NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_withdrawals_tref ON withdrawals(transaction_reference) WHERE transaction_reference IS NOT NULL;
  `);
  try { db.exec('ALTER TABLE deposits ADD COLUMN payment_message TEXT'); } catch (_) {}
  try { db.exec('ALTER TABLE withdrawals ADD COLUMN payment_message TEXT'); } catch (_) {}
  return db;
}

let db = null;
function getDb() { if (!db) db = ensure(); return db; }

function upsertUser(p) {
  const d = getDb();
  d.prepare(`INSERT INTO users (id,username,phone_number,available_balance,reserved_balance,created_at)
    VALUES (?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET username=excluded.username, phone_number=excluded.phone_number, available_balance=excluded.available_balance, reserved_balance=excluded.reserved_balance`)
    .run(p.token, p.username||'Player', p.phoneNumber||null, Number(p.balance||0), Number(p.reservedBalance||0), p.createdAt||Date.now());
}

function upsertDeposit(dep) {
  const d = getDb();
  d.prepare(`INSERT INTO deposits (id,user_id,amount,phone_number,checkout_request_id,merchant_request_id,mpesa_receipt_number,status,created_at,completed_at,client_ref,environment,failure_reason,description,payment_message)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET checkout_request_id=excluded.checkout_request_id, merchant_request_id=excluded.merchant_request_id, mpesa_receipt_number=excluded.mpesa_receipt_number, status=excluded.status, completed_at=excluded.completed_at, failure_reason=excluded.failure_reason, description=excluded.description, payment_message=excluded.payment_message`)
    .run(dep.id, dep.user_id, dep.amount, dep.phone_number||null, dep.checkout_request_id||null, dep.merchant_request_id||null, dep.mpesa_receipt_number||null, dep.status, dep.created_at||Date.now(), dep.completed_at||null, dep.clientRef||null, dep.environment||null, dep.failure_reason||null, dep.description||null, dep.paymentMessage||dep.payment_message||null);
}

function upsertWithdrawal(w) {
  const d = getDb();
  d.prepare(`INSERT INTO withdrawals (id,user_id,amount,phone_number,transaction_reference,conversation_id,originator_conversation_id,status,approved_by,created_at,completed_at,client_ref,environment,failure_reason,description,payment_message)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET transaction_reference=excluded.transaction_reference, conversation_id=excluded.conversation_id, originator_conversation_id=excluded.originator_conversation_id, status=excluded.status, approved_by=excluded.approved_by, completed_at=excluded.completed_at, failure_reason=excluded.failure_reason, description=excluded.description, payment_message=excluded.payment_message`)
    .run(w.id, w.user_id, w.amount, w.phone_number||null, w.transaction_reference||null, w.conversation_id||null, w.originator_conversation_id||null, w.status, w.approved_by||null, w.created_at||Date.now(), w.completed_at||null, w.clientRef||null, w.environment||null, w.failure_reason||null, w.description||null, w.paymentMessage||w.payment_message||null);
}

function insertLedger(e) {
  const d = getDb();
  try {
    d.prepare(`INSERT OR IGNORE INTO wallet_transactions (id,user_id,transaction_type,amount,reference,status,description,created_at,environment)
      VALUES (?,?,?,?,?,?,?,?,?)`).run(e.id, e.user_id, e.transaction_type, e.amount, e.reference||null, e.status, e.description||null, e.created_at||Date.now(), e.environment||null);
  } catch (_) {}
}

function upsertBoosterpotEvent(ev) {
  const d = getDb();
  try {
    d.prepare(`INSERT INTO boosterpot_events (event_id,status,prize_amount,participant_count,winner_player_id,winner_username,selected_at,collected_at,created_at)
      VALUES (?,?,?,?,?,?,?,?,?)
      ON CONFLICT(event_id) DO UPDATE SET status=excluded.status, prize_amount=excluded.prize_amount, participant_count=excluded.participant_count,
      winner_player_id=excluded.winner_player_id, winner_username=excluded.winner_username, selected_at=excluded.selected_at, collected_at=excluded.collected_at`)
      .run(ev.event_id || ev.eventId, ev.status, Number(ev.prize_amount || ev.prizeAmount || 0), Number(ev.participant_count || ev.participantCount || 0), ev.winner_player_id || ev.winnerPlayerId || null, ev.winner_username || ev.winnerUsername || null, ev.selected_at || ev.selectedAt || null, ev.collected_at || ev.collectedAt || null, ev.created_at || ev.createdAt || Date.now());
  } catch (_) {}
}

function upsertBoosterpotWinner(w) {
  const d = getDb();
  try {
    d.prepare(`INSERT INTO boosterpot_winners (id,event_id,player_id,username,amount,status,selected_at,collected_at,payout_reference)
      VALUES (?,?,?,?,?,?,?,?,?)
      ON CONFLICT(event_id) DO UPDATE SET status=excluded.status, collected_at=excluded.collected_at, payout_reference=excluded.payout_reference, username=excluded.username`)
      .run(w.id, w.event_id || w.eventId, w.player_id || w.playerId, w.username || null, Number(w.amount || 0), w.status, w.selected_at || w.selectedAt || null, w.collected_at || w.collectedAt || null, w.payout_reference || w.payoutReference || null);
  } catch (_) {}
}

function syncAll(game) {
  const d = getDb();
  d.exec('BEGIN IMMEDIATE');
  try {
    for (const p of Object.values(game.players || {})) upsertUser(p);
    for (const dep of (game.deposits || [])) upsertDeposit(dep);
    for (const w of (game.withdrawals || [])) upsertWithdrawal(w);
    for (const e of (game.walletLedger || [])) insertLedger(e);
    const bp = game.boosterpot || {};
    for (const ev of (bp.history || [])) upsertBoosterpotEvent(ev);
    for (const ev of (bp.history || [])) if (ev.winnerPlayerId || ev.winner_player_id) upsertBoosterpotWinner({
      id: ev.winId || ev.id || ('bpw_' + ev.eventId),
      event_id: ev.eventId || ev.event_id,
      player_id: ev.winnerPlayerId || ev.winner_player_id,
      username: ev.winnerUsername || ev.winner_username,
      amount: ev.prizeAmount || ev.amount || 0,
      status: ev.status || (ev.collectedAt ? 'COLLECTED' : 'PENDING'),
      selected_at: ev.selectedAt || ev.selected_at,
      collected_at: ev.collectedAt || ev.collected_at,
      payout_reference: ev.payoutReference || ev.payout_reference || null
    });
    if (bp.currentWin) {
      const cw = bp.currentWin;
      upsertBoosterpotEvent({ event_id: cw.eventId, status: cw.collectedAt ? 'COLLECTED' : 'WINNER_SELECTED', prize_amount: cw.amount, participant_count: cw.participantCount || 0, winner_player_id: cw.playerId, winner_username: cw.username, selected_at: cw.selectedAt, collected_at: cw.collectedAt || null, created_at: cw.selectedAt });
      upsertBoosterpotWinner(cw);
    }
    d.exec('COMMIT');
  } catch (e) {
    try { d.exec('ROLLBACK'); } catch (_) {}
    throw e;
  }
}

function syncPaymentRecord(kind, rec) {
  try {
    if (kind === 'user') upsertUser(rec);
    else if (kind === 'deposit') upsertDeposit(rec);
    else if (kind === 'withdrawal') upsertWithdrawal(rec);
    else if (kind === 'ledger') insertLedger(rec);
  } catch (e) { /* ignore individual */ }
}

module.exports = { getDb, ensure, upsertUser, upsertDeposit, upsertWithdrawal, insertLedger, upsertBoosterpotEvent, upsertBoosterpotWinner, syncAll, syncPaymentRecord, DB_FILE };
