const config = require('./config');

function now() { return Date.now(); }
function clampMoney(n) { return Math.round((Number(n) || 0) * 100) / 100; }
function uid(prefix='id') { return prefix + '_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

function normalizePhone(input) {
  if (input == null) return null;
  let s = String(input).trim().replace(/[\s\-()]/g, '');
  if (/^\+254\d{9}$/.test(s)) s = s.slice(1);
  if (/^254\d{9}$/.test(s)) return s;
  if (/^0\d{9}$/.test(s)) return '254' + s.slice(1);
  if (/^7\d{8}$/.test(s)) return '254' + s;
  if (/^1\d{8}$/.test(s)) return '254' + s; // newer prefixes
  return null;
}

function maskPhone(phone) {
  const p = String(phone || '');
  if (p.length < 6) return p;
  return p.slice(0, 6) + '***' + p.slice(-2);
}

function ensurePaymentState(game) {
  if (!Array.isArray(game.deposits)) game.deposits = [];
  if (!Array.isArray(game.withdrawals)) game.withdrawals = [];
  if (!Array.isArray(game.walletLedger)) game.walletLedger = [];
  if (!Array.isArray(game.adminActions)) game.adminActions = [];
  if (!game.paymentSettings || typeof game.paymentSettings !== 'object') {
    game.paymentSettings = { minWithdrawal: config.minWithdrawal, maxWithdrawal: config.maxWithdrawal };
  } else {
    if (!isFinite(Number(game.paymentSettings.minWithdrawal)) || Number(game.paymentSettings.minWithdrawal) < 220) game.paymentSettings.minWithdrawal = config.minWithdrawal;
    if (!isFinite(Number(game.paymentSettings.maxWithdrawal))) game.paymentSettings.maxWithdrawal = config.maxWithdrawal;
  }
  // migrate players: keep p.balance as available balance for gameplay compatibility
  for (const token of Object.keys(game.players || {})) {
    const p = game.players[token];
    if (!p) continue;
    if (!isFinite(Number(p.reservedBalance))) p.reservedBalance = 0;
    p.reservedBalance = clampMoney(Math.max(0, p.reservedBalance));
    if (!isFinite(Number(p.balance))) p.balance = 0;
    p.balance = clampMoney(Math.max(0, p.balance));
    if (p.phoneNumber === undefined) p.phoneNumber = null;
  }
}

function getPaymentSettings(game) {
  ensurePaymentState(game);
  return {
    darajaEnabled: config.enabled,
    darajaEnv: config.env,
    minWithdrawal: clampMoney(game.paymentSettings.minWithdrawal),
    maxWithdrawal: clampMoney(game.paymentSettings.maxWithdrawal),
    callbackReady: !!config.publicBaseUrl || !!config.callbackUrl,
    callbackNote: 'Safaricom cannot deliver callbacks to localhost. Configure a public HTTPS callback URL (PUBLIC_BASE_URL / DARAJA_*_URL) when deployed or via a tunnel.',
    manualDeposits: true,
    paybill: '542542',
    accountNumber: '03708400476150',
    activationFee: 220,
  };
}

function findDepositByRef(game, refFields) {
  ensurePaymentState(game);
  return game.deposits.find(d => {
    if (refFields.id && d.id === refFields.id) return true;
    if (refFields.clientRef && d.clientRef === refFields.clientRef) return true;
    if (refFields.checkoutRequestId && d.checkoutRequestId && d.checkoutRequestId === refFields.checkoutRequestId) return true;
    if (refFields.merchantRequestId && d.merchantRequestId && d.merchantRequestId === refFields.merchantRequestId) return true;
    return false;
  });
}

function findWithdrawalByRef(game, refFields) {
  ensurePaymentState(game);
  return game.withdrawals.find(w => {
    if (refFields.id && w.id === refFields.id) return true;
    if (refFields.clientRef && w.clientRef === refFields.clientRef) return true;
    if (refFields.conversationId && w.conversationId && w.conversationId === refFields.conversationId) return true;
    if (refFields.originatorConversationId && w.originatorConversationId && w.originatorConversationId === refFields.originatorConversationId) return true;
    return false;
  });
}

function ledgerRefExists(game, reference, type) {
  return (game.walletLedger || []).some(e => e.reference === reference && (!type || e.transaction_type === type));
}

function addLedger(game, entry) {
  ensurePaymentState(game);
  const rec = Object.assign({ id: uid('wl'), created_at: now() }, entry);
  game.walletLedger.push(rec);
  if (game.walletLedger.length > 5000) game.walletLedger = game.walletLedger.slice(-3000);
  return rec;
}

function recordAdminAction(game, action) {
  ensurePaymentState(game);
  game.adminActions.push(Object.assign({ id: uid('aa'), at: now() }, action));
  if (game.adminActions.length > 2000) game.adminActions = game.adminActions.slice(-1000);
}

function totals(game) {
  ensurePaymentState(game);
  let totalDeposits = 0, totalWithdrawals = 0, pendingWithdrawals = 0;
  for (const d of game.deposits) if (d.status === 'COMPLETED') totalDeposits = clampMoney(totalDeposits + Number(d.amount || 0));
  for (const w of game.withdrawals) {
    if (w.status === 'COMPLETED') totalWithdrawals = clampMoney(totalWithdrawals + Number(w.amount || 0));
    if (w.status === 'PENDING' || w.status === 'APPROVED' || w.status === 'PROCESSING') pendingWithdrawals++;
  }
  return { totalDeposits, totalWithdrawals, pendingWithdrawals };
}

module.exports = {
  config, now, clampMoney, uid, normalizePhone, maskPhone,
  ensurePaymentState, getPaymentSettings,
  findDepositByRef, findWithdrawalByRef, ledgerRefExists, addLedger, recordAdminAction, totals,
};
