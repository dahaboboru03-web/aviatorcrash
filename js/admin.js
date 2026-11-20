(() => {

  const ADMIN_KEY_DEFAULT = '84798479';
  const STORAGE_KEY = 'aviator_admin_key';

  const loginScreen = document.getElementById('loginScreen');
  const dash = document.getElementById('dash');
  const adminKeyInput = document.getElementById('adminKeyInput');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminLoginMsg = document.getElementById('adminLoginMsg');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  const statRoundId = document.getElementById('statRoundId');
  const statRoundState = document.getElementById('statRoundState');
  const statMultiplier = document.getElementById('statMultiplier');
  const statCrashAt = document.getElementById('statCrashAt');
  const statCountdown = document.getElementById('statCountdown');
  const statNextRoundId = document.getElementById('statNextRoundId');

  const statBpCurrent = document.getElementById('statBpCurrent');
  const statBpTarget = document.getElementById('statBpTarget');
  const statBpStatus = document.getElementById('statBpStatus');
  const statBpEventId = document.getElementById('statBpEventId');

  const adminPredeterminedCrashes = document.getElementById('adminPredeterminedCrashes');
  const adminPredeterminedBoosterpots = document.getElementById('adminPredeterminedBoosterpots');
  const adminCompletedRoundsBody = document.getElementById('adminCompletedRoundsBody');
  const adminLastWonBp = document.getElementById('adminLastWonBp');
  const adminBpEligibleBody = document.getElementById('adminBpEligibleBody');
  const adminBpEligibleCount = document.getElementById('adminBpEligibleCount');
  const adminBpWinnersBody = document.getElementById('adminBpWinnersBody');

  const btnOpenWithdrawals = document.getElementById('btnOpenWithdrawals');
  const btnOpenDeposits = document.getElementById('btnOpenDeposits');
  const btnOpenFailed = document.getElementById('btnOpenFailed');
  const btnOpenMessage = document.getElementById('btnOpenMessage');
  const btnOpenInbox = document.getElementById('btnOpenInbox');
  const btnOpenHistory = document.getElementById('btnOpenHistory');
  const btnOpenManageFinances = document.getElementById('btnOpenManageFinances');
  const mfUserFields = document.getElementById('mfUserFields');
    const btnOpenPublicChat = document.getElementById('btnOpenPublicChat');

  const withdrawalsModal = document.getElementById('withdrawalsModal');
  const depositsModal = document.getElementById('depositsModal');
  const failedModal = document.getElementById('failedModal');
  const messageModal = document.getElementById('messageModal');
  const inboxModal = document.getElementById('inboxModal');

  const modalCloses = document.querySelectorAll('.admin-modal-close');
  const wdCloseBtn = document.getElementById('wdCloseBtn');
  const depCloseBtn = document.getElementById('depCloseBtn');
  const failCloseBtn = document.getElementById('failCloseBtn');
  const msgCancelBtn = document.getElementById('msgCancelBtn');
  const msgSendBtn = document.getElementById('msgSendBtn');
  const inboxCloseBtn = document.getElementById('inboxCloseBtn');

  const wdSearch = document.getElementById('wdSearch');
  const wdViewAll = document.getElementById('wdViewAll');
  const wdTableBody = document.getElementById('wdTableBody');
  const depSearch = document.getElementById('depSearch');
  const depTableBody = document.getElementById('depTableBody');
  const failSearch = document.getElementById('failSearch');
  const failTableBody = document.getElementById('failTableBody');

  const msgText = document.getElementById('msgText');

  const adminInboxSearch = document.getElementById('adminInboxSearch');
  const adminInboxThreads = document.getElementById('adminInboxThreads');
  const adminInboxHeader = document.getElementById('adminInboxHeader');
  const adminInboxMessages = document.getElementById('adminInboxMessages');
  const inboxCtxMenu = document.getElementById('inboxCtxMenu');
  const adminInboxComposer = document.getElementById('adminInboxComposer');
  const adminInboxInput = document.getElementById('adminInboxInput');
  const adminInboxSend = document.getElementById('adminInboxSend');
  const wdBadge = document.getElementById('wdBadge');
  const depBadge = document.getElementById('depBadge');
  const failBadge = document.getElementById('failBadge');
  const msgBadge = document.getElementById('msgBadge');
  const inboxBadge = document.getElementById('inboxBadge');
  const historyModal = document.getElementById('historyModal');
  const historyCloseBtn = document.getElementById('historyCloseBtn');
  const historySearch = document.getElementById('historySearch');
  const historyTableBody = document.getElementById('historyTableBody');
  const manageFinancesModal = document.getElementById('manageFinancesModal');
  const manageFinancesCloseBtn = document.getElementById('manageFinancesCloseBtn');
  const publicChatModal = document.getElementById('publicChatModal');
  const publicChatCloseBtn = document.getElementById('publicChatCloseBtn');
  const publicChatMessages = document.getElementById('publicChatMessages');
  const publicChatInput = document.getElementById('publicChatInput');
  const publicChatSend = document.getElementById('publicChatSend');
  const publicChatBadge = document.getElementById('publicChatBadge');
  const publicChatTyping = document.getElementById('publicChatTyping');
  const publicChatTypingText = document.getElementById('publicChatTypingText');
  const publicChatPinned = document.getElementById('publicChatPinned');
  const publicChatSavedBar = document.getElementById('publicChatSavedBar');
  const prBadge = document.getElementById('prBadge');
  const publicChatSavedBtn = document.getElementById('publicChatSavedBtn');
  const publicChatSavedClear = document.getElementById('publicChatSavedClear');
  const publicChatReportsBtn = document.getElementById('publicChatReportsBtn');
  const publicChatReplyBar = document.getElementById('publicChatReplyBar');
  const publicChatReplyName = document.getElementById('publicChatReplyName');
  const publicChatReplyText = document.getElementById('publicChatReplyText');
  const publicChatReplyCancel = document.getElementById('publicChatReplyCancel');
  const pcContextMenu = document.getElementById('pcContextMenu');
  const pcCtxReactions = document.getElementById('pcCtxReactions');
  const chatReportModal = document.getElementById('chatReportModal');
  const chatReportPreview = document.getElementById('chatReportPreview');
  const chatReportReason = document.getElementById('chatReportReason');
  const chatReportSubmit = document.getElementById('chatReportSubmit');
  const chatReportCloseBtn = document.getElementById('chatReportCloseBtn');
  const chatReportsModal = document.getElementById('chatReportsModal');
  const chatReportsCloseBtn = document.getElementById('chatReportsCloseBtn');
  const chatDeleteModal = document.getElementById('chatDeleteModal');
  const chatDeleteConfirmBtn = document.getElementById('chatDeleteConfirmBtn');
  const chatDeleteCancelBtn = document.getElementById('chatDeleteCancelBtn');
  const chatDeleteCloseBtn = document.getElementById('chatDeleteCloseBtn');
  const chatReportsList = document.getElementById('chatReportsList');
  const chatAuditList = document.getElementById('chatAuditList');
  const adminRainBtn = document.getElementById('adminRainBtn');
  const adminRainModal = document.getElementById('adminRainModal');
  const adminRainAmount = document.getElementById('adminRainAmount');
  const adminRainPlayers = document.getElementById('adminRainPlayers');
  const adminRainSummary = document.getElementById('adminRainSummary');
  const adminRainSendBtn = document.getElementById('adminRainSendBtn');
  const adminRainCancelBtn = document.getElementById('adminRainCancelBtn');
  const adminRainCloseBtn = document.getElementById('adminRainCloseBtn');
  const mfUserSelect = document.getElementById('mfUserSelect');
  const mfActionAdd = document.getElementById('mfActionAdd');
  const mfActionDeduct = document.getElementById('mfActionDeduct');
  const mfAmount = document.getElementById('mfAmount');
  const mfPreview = document.getElementById('mfPreview');
  const mfExecuteBtn = document.getElementById('mfExecuteBtn');

  const awardFreebetModal = document.getElementById('awardFreebetModal');
  const awardFreebetCloseBtn = document.getElementById('awardFreebetCloseBtn');
  const awardFreebetAmount = document.getElementById('awardFreebetAmount');
  const awardFreebetExpires = document.getElementById('awardFreebetExpires');
  const awardFreebetSendBtn = document.getElementById('awardFreebetSendBtn');

  const freebetsModal = document.getElementById('freebetsModal');
  const freebetsCloseBtn = document.getElementById('freebetsCloseBtn');
  const freebetsSummary = document.getElementById('freebetsSummary');
  const freebetsList = document.getElementById('freebetsList');

  const adminRainsTrackerModal = document.getElementById('adminRainsTrackerModal');
  const adminRainsTrackerCloseBtn = document.getElementById('adminRainsTrackerCloseBtn');
  const pnlModal = document.getElementById('pnlModal');
  const pnlBody = document.getElementById('pnlBody');
  const pnlCloseBtn = document.getElementById('pnlCloseBtn');
  const adminRainsSummary = document.getElementById('adminRainsSummary');
  const adminRainsList = document.getElementById('adminRainsList');

  const usersModal = document.getElementById('usersModal');
  const usersCloseBtn = document.getElementById('usersCloseBtn');
  const usersSearch = document.getElementById('usersSearch');
  const usersTableBody = document.getElementById('usersTableBody');

  const viewUserModal = document.getElementById('viewUserModal');
  const viewUserCloseBtn = document.getElementById('viewUserCloseBtn');
  const viewUserTabBar = document.getElementById('viewUserTabBar');
  const viewUserTabContent = document.getElementById('viewUserTabContent');
  const viewUserAvatar = document.getElementById('viewUserAvatar');
  const viewUserName = document.getElementById('viewUserName');
  const viewUserToken = document.getElementById('viewUserToken');
  const viewUserVipBadge = document.getElementById('viewUserVipBadge');
  const viewUserStatus = document.getElementById('viewUserStatus');
  const viewUserBalance = document.getElementById('viewUserBalance');
  const viewUserQuickActions = document.getElementById('viewUserQuickActions');

  let viewUserSelectedPeer = null;

  const toastContainer = document.getElementById('adminToastContainer');

  let socket = null;
  let last = null;
  let pay = null;
  let publicChatMsgs = [];
  let chatPinnedIds = [];
  let chatSavedIds = [];
  let chatReportsData = [];
  let chatAuditData = [];
  let chatReplyTo = null;
  let chatSavedFilter = false;
  let pcCtxMsgId = null;
  let adminTypingUsers = {};
  let adminTypingTimers = {};
  let adminTypingEmitAt = 0;
  let adminRains = [];
  let publicChatRestored = false;
  let inboxRestored = false;
  let freebetsRestored = false;
  let adminRainsRestored = false;
  let pnlRestored = false;
  let publicChatSeenId = (() => { try { return localStorage.getItem('aviator_admin_chat_seen') || ''; } catch (e) { return ''; } })();
  let selectedInboxPeer = null;
  let adminInboxDirty = false;
  let adminInboxLastMsgId = '';
  let adminReadAt = JSON.parse(localStorage.getItem('aviator_admin_read_at') || '{}');
  let lastActionCounts = { wd: 0, dep: 0, fail: 0, msg: 0, pr: 0 };
  let pendingResetCount = 0;
  let payDirty = false;
  let usersDirty = false;
  let viewUserDirty = false;
  let viewUserActiveTab = null;
  let viewUserLastMsgCount = 0;
  let mfSelectedAction = 'add';

  function saveAdminReadAt() { try { localStorage.setItem('aviator_admin_read_at', JSON.stringify(adminReadAt)); } catch (e) { } }

  function fmtMoney(n) { return 'KSh ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtTime(ms) { if (!ms) return '—'; return new Date(ms).toLocaleString(); }
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function toast(msg, ms = 3000) {
    const el = document.createElement('div');
    el.className = 'admin-toast';
    el.textContent = msg;
    toastContainer.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, ms);
  }

  function openModal(modal) { if (modal) { modal.classList.remove('hidden'); modal.classList.add('show'); } }
  function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        modal.classList.add('hidden');
        // Force reflow so display:none takes effect immediately
        void modal.offsetHeight;
    }
}
  function saveAdminInboxState(open) {
    try {
      localStorage.setItem('aviator_admin_inbox_open', open ? 'true' : 'false');
      if (selectedInboxPeer) localStorage.setItem('aviator_admin_inbox_peer', selectedInboxPeer);
    } catch (e) { }
  }
  function markAllInboxRead() {
    if (!last) return;
    const dms = Array.isArray(last.directMessages) ? last.directMessages : [];
    const nowMs = Date.now();
    dms.forEach(m => { if (m && m.fromToken && m.fromToken !== '__admin__') adminReadAt[m.fromToken] = nowMs; });
    saveAdminReadAt();
    lastActionCounts.msg = 0;
    updateInboxBadge();
    if (toastContainer) toastContainer.querySelectorAll('.admin-toast').forEach(el => { if (/unread/i.test(el.textContent || '')) el.remove(); });
  }

  function openAdminInboxModal() {
    markAllInboxRead();
    openModal(inboxModal);
    adminInboxLastMsgId = '';
    if (adminInboxMessages) adminInboxMessages.dataset.initScrollDone = '';
    renderAdminInbox(true);
    saveAdminInboxState(true);
  }
  function closeAdminInboxModal() {
    closeModal(inboxModal);
    saveAdminInboxState(false);
  }
  function closeAllModals() { if (publicChatModal && publicChatModal.classList.contains('show')) localStorage.setItem('aviator_admin_chat_open', 'false'); if (inboxModal && inboxModal.classList.contains('show')) saveAdminInboxState(false); if (freebetsModal && freebetsModal.classList.contains('show')) localStorage.setItem('aviator_admin_freebets_open', 'false'); if (adminRainsTrackerModal && adminRainsTrackerModal.classList.contains('show')) localStorage.setItem('aviator_admin_rains_open', 'false'); [withdrawalsModal, depositsModal, failedModal, messageModal, inboxModal, historyModal, manageFinancesModal, viewUserModal, publicChatModal, adminRainModal, chatReportModal, chatReportsModal, awardFreebetModal, usersModal, freebetsModal, adminRainsTrackerModal].forEach(closeModal); }

  function adminPost(path, body) {
    const key = localStorage.getItem(STORAGE_KEY) || ADMIN_KEY_DEFAULT;
    return fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify(body || {})
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.msg || 'Request failed (' + r.status + ')');
      return data;
    });
  }

  function adminGet(path) {
    const key = localStorage.getItem(STORAGE_KEY) || ADMIN_KEY_DEFAULT;
    return fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key }
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.msg || 'Request failed (' + r.status + ')');
      return data;
    });
  }

  function connectSocket() {
    if (socket) { socket.disconnect(); socket = null; }
    socket = io();

    socket.on('connect', () => {
      const key = localStorage.getItem(STORAGE_KEY) || ADMIN_KEY_DEFAULT;
      socket.emit('admin_login', { key }, (res) => {
        if (res && res.ok) {
          loginScreen.classList.remove('show');
          loginScreen.classList.add('hidden');
          dash.classList.remove('hidden');
          dash.classList.add('show');
          adminLoginMsg.textContent = '';
        } else {
          adminLoginMsg.textContent = (res && res.msg) || 'Invalid admin key';
        }
      });
    });

    socket.on('disconnect', () => { });

    socket.on('pnl_update', (p) => {
    if (!p) return;
    if (last) last.pnl = p;
    if (pnlModal && pnlModal.classList.contains('show')) renderPnl();
  });

  socket.on('dm_updated', (payload) => {
    const msg = payload && payload.message;
    if (!msg || !msg.id || !last) return;
    ['directMessages', 'adminInbox'].forEach(k => {
      const arr = Array.isArray(last[k]) ? last[k] : [];
      const idx = arr.findIndex(x => x && x.id === msg.id);
      if (idx !== -1) arr[idx] = msg;
    });
    adminInboxDirty = true;
    if (inboxModal && inboxModal.classList.contains('show')) renderAdminInbox(true);
  });

  socket.on('admin_state', (data) => { last = data; if (data && data.serverTime) offset = data.serverTime - Date.now(); adminInboxDirty = true; usersDirty = true; viewUserDirty = true; if (Array.isArray(data && data.rains)) adminRains = data.rains; if (Array.isArray(data && data.chatPins)) chatPinnedIds = data.chatPins.slice(); if (Array.isArray(data && data.chatSaved)) chatSavedIds = data.chatSaved.slice(); if (Array.isArray(data && data.chatReports)) chatReportsData = data.chatReports.slice(); if (Array.isArray(data && data.chatAudit)) chatAuditData = data.chatAudit.slice(); mergePublicChatState(); if (publicChatModal && publicChatModal.classList.contains('show')) refreshAdminRainCards(); if (!publicChatRestored) { publicChatRestored = true; if (localStorage.getItem('aviator_admin_chat_open') === 'true') openPublicChat(); } if (!inboxRestored) { inboxRestored = true; if (localStorage.getItem('aviator_admin_inbox_open') === 'true') { const savedPeer = localStorage.getItem('aviator_admin_inbox_peer'); if (savedPeer) selectedInboxPeer = savedPeer; openAdminInboxModal(); } } if (viewUserModal && viewUserModal.classList.contains('show') && viewUserSelectedPeer && viewUserActiveTab === 'profile') { const p = (last && last.players || []).find(x => x && x.token === viewUserSelectedPeer); if (p && viewUserBalance) viewUserBalance.textContent = fmtMoney(p.balance); } if (!freebetsRestored) { freebetsRestored = true; if (localStorage.getItem('aviator_admin_freebets_open') === 'true') { renderFreebets(); openModal(freebetsModal); } } if (!adminRainsRestored) { adminRainsRestored = true; if (localStorage.getItem('aviator_admin_rains_open') === 'true') { renderAdminRains(); openModal(adminRainsTrackerModal); } } if (freebetsModal && freebetsModal.classList.contains('show')) renderFreebets(); if (adminRainsTrackerModal && adminRainsTrackerModal.classList.contains('show')) renderAdminRains(); if (pnlModal && pnlModal.classList.contains('show')) renderPnl(); if (!pnlRestored) { pnlRestored = true; if (localStorage.getItem('aviator_admin_pnl_open') === 'true') { renderPnl(); openModal(pnlModal); } } });

    socket.on('admin_payments_state', (data) => { pay = data; adminInboxDirty = true; payDirty = true; viewUserDirty = true; });
    socket.on('chat_new', (msg) => { onPublicChatNew(msg); });
  socket.on('chat_updated', (msg) => {
    if (!msg || !msg.id) return;
    const idx = publicChatMsgs.findIndex(m => m && m.id === msg.id);
    if (idx !== -1) publicChatMsgs[idx] = msg;
    else publicChatMsgs.push(msg);
    if (publicChatModal && publicChatModal.classList.contains('show')) renderPublicChat();
    updatePublicChatBadge();
  });
  socket.on('chat_removed', (payload) => {
    const id = payload && payload.id;
    if (!id) return;
    publicChatMsgs = publicChatMsgs.filter(m => m && m.id !== id);
    chatPinnedIds = (chatPinnedIds || []).filter(x => x !== id);
    if (publicChatModal && publicChatModal.classList.contains('show')) renderPublicChat();
    updatePublicChatBadge();
  });
  socket.on('admin_chat_report', (report) => {
    if (!report || !report.id) return;
    chatReportsData.push(report);
    toast(`New chat report from ${report.reporterName || 'a player'}`);
    if (chatReportsModal && chatReportsModal.classList.contains('show')) renderChatReports();
  });
  socket.on('password_reset_request', (data) => {
    if (!data || !data.id) return;
    pendingResetCount++;
    setBadge(prBadge, pendingResetCount > 0);
    toast(`Password Reset: ${data.username} (${data.phone}) needs verification code`);
    if (prModal && prModal.classList.contains('show')) renderPasswordResets();
  });
  socket.on('password_reset_used', (data) => {
    if (!data) return;
    if (pendingResetCount > 0) pendingResetCount--;
    setBadge(prBadge, pendingResetCount > 0);
    prSummary.textContent = `${pendingResetCount} pending reset request${pendingResetCount === 1 ? '' : 's'}`;
    toast(`Password reset completed for ${data.phone}`);
    if (prModal && prModal.classList.contains('show')) renderPasswordResets();
  });
  socket.on('chat_typing', (data) => {
    if (!data || !data.userId || data.userId === '__admin__') return;
    if (data.typing === false) delete adminTypingUsers[data.userId];
    else adminTypingUsers[data.userId] = { name: data.name || 'Player', at: Date.now() };
    renderAdminChatTyping();
    clearTimeout(adminTypingTimers[data.userId]);
    if (data.typing !== false) {
      adminTypingTimers[data.userId] = setTimeout(() => {
        delete adminTypingUsers[data.userId];
        renderAdminChatTyping();
      }, 3500);
    }
  });
  socket.on('chat_pins', (payload) => {
    if (!payload || !Array.isArray(payload.ids)) return;
    chatPinnedIds = payload.ids.slice();
    if (publicChatModal && publicChatModal.classList.contains('show')) renderPinnedBar();
  });
  socket.on('chat_saved', (payload) => {
    if (!payload || !Array.isArray(payload.ids)) return;
    chatSavedIds = payload.ids.slice();
    if (publicChatModal && publicChatModal.classList.contains('show')) renderPublicChat();
  });
  }

  function render() {
    if (!last) return;

    const r = last.round || {};
    const t = Date.now() + (offset || 0);
    let liveMult = Number(r.multiplier || 1);
    if (r.state === 'RUNNING' && r.startedAt) {
      const elapsed = Math.max(0, t - r.startedAt);
      liveMult = Math.min(Number(r.crashPoint || 0), Math.max(1, Math.exp(0.06 * (elapsed / 1000))));
    }
    if (statRoundId) statRoundId.textContent = escapeHtml(r.roundId || '—');
    if (statRoundState) statRoundState.textContent = escapeHtml(r.state || '—');
    if (statMultiplier) statMultiplier.textContent = liveMult.toFixed(2) + 'x';
    if (statCrashAt) statCrashAt.textContent = Number(r.crashPoint || 0).toFixed(2) + 'x';
    if (statCountdown) {
      let cd = '—';
      if (r.state === 'BETTING' && r.bettingEndsAt) cd = Math.max(0, Math.ceil((r.bettingEndsAt - t) / 1000)) + 's to start';
      else if (r.state === 'RUNNING') cd = 'Flying';
      else if (r.state === 'CRASHED' && r.nextAt) cd = Math.max(0, Math.ceil((r.nextAt - t) / 1000)) + 's to next';
      else if (r.remainingMs != null) cd = Math.max(0, Math.ceil(r.remainingMs / 1000)) + 's';
      statCountdown.textContent = cd;
    }
    if (statNextRoundId) statNextRoundId.textContent = escapeHtml(r.nextRoundId || '—');

    if (adminPredeterminedCrashes) {
      const ups = (last.upcoming || []).slice(0, 4);
      adminPredeterminedCrashes.innerHTML = ups.map((x, i) => {
        return `<div class="admin-stat" style="text-align:left"><div class="label">${escapeHtml(x.label || 'Round ' + (i + 1))} · ${escapeHtml(x.roundId || '')}</div><div class="value crash" style="font-size:20px">${Number(x.crashPoint || 0).toFixed(2)}x</div></div>`;
      }).join('');
    }

    if (adminCompletedRoundsBody) {
      const cr = (last.completedRounds || []).slice(0, 10);
      adminCompletedRoundsBody.innerHTML = cr.map(x => `
        <tr><td>${escapeHtml(x.roundId || '—')}</td><td>${Number(x.crashPoint || 0).toFixed(2)}x</td><td>${fmtTime(x.crashedAt)}</td></tr>
      `).join('');
    }

    const bp = last.boosterpot || {};
    if (statBpCurrent) statBpCurrent.textContent = fmtMoney(bp.currentAmount);
    if (statBpTarget) statBpTarget.textContent = fmtMoney(bp.targetAmount);
    if (statBpStatus) statBpStatus.textContent = escapeHtml(bp.status || '—');
    if (statBpEventId) statBpEventId.textContent = escapeHtml(bp.currentEventId || '—');

    if (adminPredeterminedBoosterpots) {
      const ups = (bp.upcoming || []).slice(0, 4);
      adminPredeterminedBoosterpots.innerHTML = ups.map((x, i) => {
        return `<div class="admin-stat" style="text-align:left"><div class="label">${escapeHtml(x.label || 'Event ' + (i + 1))}${x.eventId ? ' · ' + escapeHtml(x.eventId) : ''}</div><div class="value crash" style="font-size:20px">${fmtMoney(x.targetAmount)}</div></div>`;
      }).join('');
    }

    if (adminLastWonBp) {
      const lw = bp.lastWon;
      if (lw) {
        adminLastWonBp.innerHTML = `
          <div><strong>Winner:</strong> ${escapeHtml(lw.winnerUsername || 'Unknown')}</div>
          <div><strong>Amount:</strong> ${fmtMoney(lw.amount)}</div>
          <div><strong>Status:</strong> ${escapeHtml(lw.status || '—')}</div>
          <div><strong>Event:</strong> ${escapeHtml(lw.eventId || '—')}</div>
          <div><strong>Time:</strong> ${fmtTime(lw.selectedAt)}</div>
        `;
      } else {
        adminLastWonBp.innerHTML = '<div>No boosterpot won yet.</div>';
      }
    }

    if (adminBpEligibleBody) {
      const list = bp.eligiblePlayers || [];
      if (adminBpEligibleCount) adminBpEligibleCount.textContent = String(list.length);
      adminBpEligibleBody.innerHTML = list.length ? list.map(p => `
        <tr>
          <td>${escapeHtml(p.username || 'Player')}</td>
          <td>${p.online ? '<span style="color:#22c55e">Online</span>' : '<span style="color:#94a3b8">Offline</span>'}</td>
          <td>${p.lastRoundSeq != null ? p.lastRoundSeq : '—'}</td>
          <td>${p.betCount || 0}</td>
          <td>${fmtMoney(p.totalAmount || 0)}</td>
          <td>${fmtTime(p.lastBetAt)}</td>
        </tr>
      `).join('') : '<tr><td colspan="6">No eligible players.</td></tr>';
    }

    if (adminBpWinnersBody) {
      const list = (bp.recentWinners || []).slice(0, 6);
      adminBpWinnersBody.innerHTML = list.length ? list.map(w => `
        <tr>
          <td>${escapeHtml(w.winnerUsername || 'Unknown')}</td>
          <td>${fmtMoney(w.amount)}</td>
          <td>${escapeHtml(w.status || '—')}</td>
          <td>${escapeHtml(w.eventId || '—')}</td>
          <td>${fmtTime(w.selectedAt)}</td>
        </tr>
      `).join('') : '<tr><td colspan="5">No winners yet.</td></tr>';
    }

    updateInboxBadge();

    if (inboxModal && inboxModal.classList.contains('show') && adminInboxDirty) renderAdminInbox();

    if (usersModal && usersModal.classList.contains('show') && usersDirty) {
      usersDirty = false;
      renderUsers();
    }

    if (viewUserModal && viewUserModal.classList.contains('show') && viewUserDirty && viewUserActiveTab) {
      viewUserDirty = false;
      if (viewUserActiveTab === 'messages') {
        const me = '__admin__';
        const dms = (last && last.directMessages || []).filter(m => m && ((m.fromToken === me && m.toToken === viewUserSelectedPeer) || (m.fromToken === viewUserSelectedPeer && m.toToken === me))).length;
        if (dms !== viewUserLastMsgCount) {
          viewUserLastMsgCount = dms;
          showViewUserTab('messages');
          const ml = document.getElementById('viewUserMsgList');
          if (ml) { ml.scrollTop = ml.scrollHeight; setTimeout(() => { if (ml) ml.scrollTop = ml.scrollHeight; }, 50); }
        }
      } else {
        showViewUserTab(viewUserActiveTab);
      }
    }
  }

  function renderHistory() {
    if (!pay) return;
    const all = [];
    (pay.deposits || []).forEach(d => all.push({ id: d.id, type: 'Deposit', user_id: d.user_id, username: (pay.players && pay.players[d.user_id] && pay.players[d.user_id].username) || d.user_id, amount: d.amount, status: d.status, phone: d.phone_number || '—', at: d.completed_at || d.created_at }));
    (pay.withdrawals || []).forEach(w => all.push({ id: w.id, type: 'Withdrawal', user_id: w.user_id, username: (pay.players && pay.players[w.user_id] && pay.players[w.user_id].username) || w.user_id, amount: w.amount, status: w.status, phone: w.phone_number || '—', at: w.completed_at || w.created_at }));
    (last && last.transactions || []).filter(t => t && (t.type === 'admin_add_funds' || t.type === 'admin_deduct_funds')).forEach(t => all.push({ id: t.id, type: t.type === 'admin_add_funds' ? 'Funds Added' : 'Funds Deducted', user_id: t.owner, username: (last.players && last.players[t.owner] && last.players[t.owner].username) || t.owner, amount: t.amount, status: 'COMPLETED', phone: '—', at: t.at }));
    all.sort((a, b) => (b.at || 0) - (a.at || 0));
    const q = (historySearch.value || '').toLowerCase().trim();
    const filtered = q ? all.filter(x => String(x.id || '').toLowerCase().includes(q) || String(x.username || '').toLowerCase().includes(q) || String(x.type || '').toLowerCase().includes(q)) : all;
    historyTableBody.innerHTML = filtered.length ? filtered.map(x => `
      <tr><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(x.id)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(x.type)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(x.username)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${fmtMoney(x.amount)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940;color:${x.status === 'APPROVED' || x.status === 'MARKED_PAID' ? '#22c55e' : x.status === 'REJECTED' || x.status === 'FAILED' || x.status === 'CANCELLED' ? '#ef4444' : '#f59e0b'};font-weight:600">${esc(x.status)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(x.phone)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${x.at ? new Date(x.at).toLocaleString() : '—'}</td></tr>
    `).join('') : '<tr><td colspan="7" class="muted">No transactions.</td></tr>';
  }

  function renderManageFinancesUsers() {
    if (!mfUserSelect || !last) return;
    const prev = mfUserSelect.value;
    const players = (last.players || []).filter(p => p && p.token && p.token !== '__admin__').sort((a, b) => (b.balance || 0) - (a.balance || 0));
    mfUserSelect.innerHTML = players.map(p => `<option value="${esc(p.token)}">${esc(p.username || 'Player')} (${esc(p.token)}) - Balance: ${fmtMoney(p.balance)}</option>`).join('');
    if (prev) { for (let i = 0; i < mfUserSelect.options.length; i++) { if (mfUserSelect.options[i].value === prev) { mfUserSelect.selectedIndex = i; break; } } }
    updateMfPreview();
  }

    function updateMfPreview() {
    if (!mfUserSelect || !mfAmount || !mfPreview || !last) return;
    const userId = mfUserSelect.value;
    const amt = Number(mfAmount.value);
    if (!userId || !isFinite(amt) || amt <= 0) {
      mfPreview.textContent = '';
      return;
    }
    const p = (last.players || []).find(x => x && x.token === userId);
    if (!p) { mfPreview.textContent = ''; return; }
    const prev = clampMoney(p.balance || 0);
    const newBal = mfSelectedAction === 'add' ? clampMoney(prev + amt) : clampMoney(Math.max(0, prev - amt));
    const actionText = mfSelectedAction === 'add' ? 'Add' : 'Deduct';
    mfPreview.textContent = `${actionText} KSh ${amt.toFixed(2)} ${mfSelectedAction === 'add' ? 'to' : 'from'} ${esc(p.username || 'Player')}. Balance: ${fmtMoney(prev)} → ${fmtMoney(newBal)}`;
    mfPreview.style.color = mfSelectedAction === 'add' ? '#059669' : '#dc2626';
    mfExecuteBtn.style.background = mfSelectedAction === 'add' ? '#059669' : '#dc2626';
    mfExecuteBtn.textContent = mfSelectedAction === 'add' ? 'Add Funds' : 'Deduct Funds';
  }

  function payUserLabel(row) {
    if (!row) return '—';
    if (row.username) return String(row.username);
    const pl = (pay && pay.players) ? pay.players[row.user_id] : null;
    if (pl && pl.username) return String(pl.username);
    return String(row.user_id || '—');
  }

  function renderPayments() {
    if (!pay) return;
    if (!payDirty) return;
    payDirty = false;

    if (wdTableBody) {
      const wds = (pay.withdrawals || []).filter(w => wdViewAll.checked || ['PENDING', 'APPROVED', 'AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PROCESSING'].includes(w.status));
      const q = (wdSearch.value || '').toLowerCase().trim();
      const filtered = q ? wds.filter(w => String(w.id || '').toLowerCase().includes(q) || String(w.user_id || '').toLowerCase().includes(q) || payUserLabel(w).toLowerCase().includes(q)) : wds;
      wdTableBody.innerHTML = filtered.map(w => `
        <tr>
          <td>${escapeHtml(w.id || '—')}</td>
          <td>${escapeHtml(payUserLabel(w))}</td>
          <td>${fmtMoney(w.amount)}</td>
          <td>${escapeHtml(w.phone_number || '—')}</td>
          <td>${escapeHtml(w.status || '—')}</td>
          <td>
            ${['PENDING', 'APPROVED', 'AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PROCESSING'].includes(w.status)
              ? `<button class="admin-btn-sm" data-action="wd-approve" data-id="${escapeHtml(w.id)}">Approve</button> <button class="admin-btn-sm" data-action="wd-reject" data-id="${escapeHtml(w.id)}">Reject</button>`
              : '—'}
          </td>
        </tr>
      `).join('');
    }

    if (depTableBody) {
      const deps = (pay.deposits || []).filter(d => ['AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PENDING', 'PROCESSING'].includes(d.status));
      const q = (depSearch.value || '').toLowerCase().trim();
      const filtered = q ? deps.filter(d => String(d.id || '').toLowerCase().includes(q) || String(d.user_id || '').toLowerCase().includes(q) || payUserLabel(d).toLowerCase().includes(q)) : deps;
      depTableBody.innerHTML = filtered.map(d => `
        <tr>
          <td>${escapeHtml(d.id || '—')}</td>
          <td>${escapeHtml(payUserLabel(d))}</td>
          <td>${fmtMoney(d.amount)}</td>
          <td>${escapeHtml(d.phone_number || '—')}</td>
          <td>${escapeHtml(d.status || '—')}</td>
          <td>
            <button class="admin-btn-sm" data-action="dep-approve" data-id="${escapeHtml(d.id)}">Approve</button>
            <button class="admin-btn-sm" data-action="dep-reject" data-id="${escapeHtml(d.id)}">Reject</button>
          </td>
        </tr>
      `).join('');
    }

    if (failTableBody) {
      const all = [];
      (pay.deposits || []).forEach(d => { if (['FAILED', 'CANCELLED', 'REJECTED'].includes(d.status)) all.push({ ...d, type: 'Deposit' }); });
      (pay.withdrawals || []).forEach(w => { if (['FAILED', 'CANCELLED', 'REJECTED'].includes(w.status)) all.push({ ...w, type: 'Withdrawal' }); });
      all.sort((a, b) => (b.completed_at || b.created_at || 0) - (a.completed_at || a.created_at || 0));
      const q = (failSearch.value || '').toLowerCase().trim();
      const filtered = q ? all.filter(x => String(x.id || '').toLowerCase().includes(q) || String(x.user_id || '').toLowerCase().includes(q) || payUserLabel(x).toLowerCase().includes(q)) : all;
      failTableBody.innerHTML = filtered.map(x => `
        <tr>
          <td>${escapeHtml(x.id || '—')}</td>
          <td>${escapeHtml(x.type || '—')}</td>
          <td>${escapeHtml(payUserLabel(x))}</td>
          <td>${fmtMoney(x.amount)}</td>
          <td>${escapeHtml(x.status || '—')}</td>
          <td>${escapeHtml(x.failure_reason || '—')}</td>
        </tr>
      `).join('');
    }

    if (inboxModal && inboxModal.classList.contains('show')) renderAdminInbox();

    updateActionBadges(pay);
  }

  function updateActionBadges(p) {
    if (!p) return;
    const pendingWdStatuses = ['PENDING', 'APPROVED', 'AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PROCESSING'];
    const pendingDepStatuses = ['AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PENDING', 'PROCESSING'];

    const wdCount = (p.withdrawals || []).filter(w => pendingWdStatuses.includes(w.status)).length;
    const depCount = (p.deposits || []).filter(d => pendingDepStatuses.includes(d.status)).length;

    setBadge(wdBadge, wdCount > 0);
    setBadge(depBadge, depCount > 0);
    setBadge(msgBadge, 0);
    setBadge(prBadge, pendingResetCount > 0);

    // Toast when new actionable items appear (count increased from previous)
    if (wdCount > lastActionCounts.wd) toast(`Withdrawal Requests: ${wdCount} need action`);
    if (depCount > lastActionCounts.dep) toast(`Deposits: ${depCount} need approval`);
    if (pendingResetCount > lastActionCounts.pr) toast(`Password Resets: ${pendingResetCount} awaiting verification`);

    lastActionCounts = { wd: wdCount, dep: depCount, pr: pendingResetCount };
  }

  function updateInboxBadge() {
    if (!last) return;
    const me = '__admin__';
    const dms = Array.isArray(last.directMessages) ? last.directMessages : [];
    const unreadCount = dms.filter(m => m && m.fromToken !== me && (m.at || 0) > Number(adminReadAt[m.fromToken || ''] || 0)).length;
    setBadge(inboxBadge, unreadCount > 0);

    if (unreadCount > lastActionCounts.msg) toast(`New messages: ${unreadCount} unread`);
    if (unreadCount === 0 && lastActionCounts.msg > 0) { /* all read, toast will auto-expire */ }
    lastActionCounts.msg = unreadCount;
  }

  function setBadge(el, hasDot) {
    if (!el) return;
    el.style.display = hasDot ? 'block' : 'none';
  }

  function isSystemPlayer(p) {
    const t = String(p && p.token || '');
    return /^(sim_|bot_|system_|admin_)/i.test(t);
  }

  function renderUsers() {
    if (!usersTableBody || !last) return;
    const players = Array.isArray(last.players) ? last.players : [];
    const q = (usersSearch.value || '').toLowerCase().trim();
    const real = players.filter(p => p && p.token && p.token !== '__admin__' && !isSystemPlayer(p));
    real.sort((a, b) => Number(b.balance || 0) - Number(a.balance || 0));
    const filtered = q ? real.filter(p => String(p.username || '').toLowerCase().includes(q) || String(p.token || '').toLowerCase().includes(q)) : real;
    usersTableBody.innerHTML = filtered.length ? filtered.map(p => {
      const av = p.avatar || p.username.charAt(0).toUpperCase();
      const vipBadge = p.isVip ? '<span style="color:#f59e0b;font-weight:700;margin-left:6px;font-size:11px">VIP</span>' : '';
      return `
        <tr style="cursor:pointer" data-token="${esc(p.token)}">
          <td><span class="chat-av" style="font-size:12px">${esc(av)}</span> <span style="font-weight:600">${esc(p.username || 'Player')}</span>${vipBadge}</td>
          <td style="font-family:monospace;font-size:11px;color:#94a3b8">${esc(p.token || '')}</td>
          <td>${p.online ? '<span style="color:#22c55e">● Online</span>' : '<span style="color:#94a3b8">● Offline</span>'}</td>
          <td>${fmtMoney(p.balance)}</td>
        </tr>
      `;
    }).join('') : '<tr><td colspan="4">No users found.</td></tr>';
  }

  async function renderPasswordResets() {
    if (!prList) return;
    try {
      const data = await adminGet('/api/auth/reset-requests');
      const requests = Array.isArray(data.requests) ? data.requests : [];
      pendingResetCount = requests.length;
      prSummary.textContent = `${requests.length} pending reset request${requests.length === 1 ? '' : 's'}`;
      setBadge(prBadge, requests.length > 0);
      prList.innerHTML = requests.length ? requests.map(r => {
        const created = new Date(r.createdAt || 0).toLocaleString();
        const expires = new Date(r.expiresAt || 0).toLocaleString();
        const waPhone = (r.whatsapp || r.phone || '').replace(/^\+/, '');
        const waText = encodeURIComponent(`Hello ${esc(r.username || 'Player')},\n\nYour Aviator password reset verification code is: *${esc(r.code || '')}*\n\nPlease use this code to reset your password. This code expires in 30 minutes.\n\nIf you did not request this, please ignore this message.\n\n— Aviator Support`);
        const waUrl = waPhone ? `https://wa.me/${waPhone}?text=${waText}` : '#';
        return `
          <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;align-items:start;gap:10px">
              <div style="flex:1">
                <div style="font-weight:700">${esc(r.username || 'Player')}</div>
                <div style="font-size:12px;color:#94a3b8;margin-bottom:4px">Phone: ${esc(r.phone || '')} &bull; WhatsApp: ${esc(r.whatsapp || '')} &bull; User ID: ${esc(r.userId || '')}</div>
                <div style="font-size:11px;color:#64748b">Verification code to send externally: <span style="font-family:monospace;color:#fbbf24">${esc(r.code || '')}</span></div>
                <div style="font-size:11px;color:#64748b">Requested: ${created} &bull; Expires: ${expires}</div>
              </div>
              <div style="display:flex;gap:6px;flex-shrink:0">
                ${waPhone ? `<a href="${waUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 10px;background:#25d366;color:#fff;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none">Send WhatsApp</a>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('') : '<div style="color:#94a3b8;text-align:center;padding:20px">No pending password reset requests.</div>';
    } catch (e) {
      prList.innerHTML = '<div style="color:#ef4444">Failed to load reset requests.</div>';
      console.error('renderPasswordResets error', e);
    }
  }

  function viewUserOpen(token) {
    if (!token) return;
    viewUserSelectedPeer = token;
    viewUserLastMsgCount = -1;
    const p = (last && last.players || []).find(x => x && x.token === token);
    if (!p) return;
    viewUserAvatar.textContent = p.avatar || p.username.charAt(0).toUpperCase();
    viewUserName.textContent = esc(p.username || 'Player');
    viewUserToken.textContent = esc(p.token || '');
    viewUserVipBadge.innerHTML = p.isVip ? '<span style="color:#f59e0b;font-weight:700;font-size:11px">VIP</span>' : '';
    viewUserStatus.innerHTML = p.online ? '<span style="color:#22c55e">● Online</span>' : '<span style="color:#94a3b8">● Offline</span>';
    viewUserBalance.textContent = fmtMoney(p.balance);
    openModal(viewUserModal);
    showViewUserTab('profile');
  }

  function showViewUserTab(tab) {
    if (!viewUserTabBar || !viewUserTabContent) return;
    viewUserActiveTab = tab;
    if (tab === 'messages' && viewUserSelectedPeer) {
      adminReadAt[viewUserSelectedPeer] = Date.now();
      saveAdminReadAt();
    }
    viewUserTabBar.querySelectorAll('.viewUserTab').forEach(b => {
      if (b.dataset.tab === tab) { b.style.background = '#1a243a'; b.style.color = 'var(--text)'; }
      else { b.style.background = '#101827'; b.style.color = '#94a3b8'; }
    });
    viewUserTabContent.innerHTML = '';
    const p = (last && last.players || []).find(x => x && x.token === viewUserSelectedPeer);
    if (!p) return;
    if (tab === 'profile') {
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Player details</div>
        <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:14px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">Username</span><span style="font-weight:600">${esc(p.username || 'Player')}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">User ID</span><span style="font-family:monospace;font-weight:600">${esc(p.token || '')}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">Status</span><span style="font-weight:600">${p.online ? '● Online' : '● Offline'}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">Balance</span><span style="font-weight:600">${fmtMoney(p.balance)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">VIP</span><span style="font-weight:600">${p.isVip ? 'Yes' : 'No'}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">Avatar</span><span style="font-size:14px">${esc(p.avatar || p.username.charAt(0).toUpperCase())}</span></div>
          ${isSystemPlayer(p) ? '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:#94a3b8">Type</span><span style="color:#f59e0b;font-weight:600">System</span></div>' : ''}
        </div>
      `;
    } else if (tab === 'bets') {
      const rounds = (last && last.completedRounds || []);
      const bets = rounds.flatMap(r => (r.bets || [])).filter(b => b && b.owner === viewUserSelectedPeer).slice(-30).reverse();
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Recent bets (last 30)</div>
        <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:14px">
          ${bets.length ? '<table style="width:100;font-size:12px"><thead><tr><th style="text-align:left">Round</th><th style="text-align:left">Amount</th><th style="text-align:left">Status</th><th style="text-align:left">Win</th></tr></thead><tbody>' + bets.map(b => `
            <tr><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(b.roundId || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${fmtMoney(b.amount)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(b.status || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${b.win != null ? fmtMoney(b.win) : '—'}</td></tr>
          `).join('') + '</tbody></table>' : '<div style="color:#94a3b8;font-size:12px">No recent bets.</div>'}
        </div>
      `;
    } else if (tab === 'deposits') {
      const deps = (pay && pay.deposits || []).filter(d => d && d.user_id === viewUserSelectedPeer).slice(-30);
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Deposit history</div>
        <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:14px">
          ${deps.length ? '<table style="width:100;font-size:12px"><thead><tr><th style="text-align:left">ID</th><th style="text-align:left">Amount</th><th style="text-align:left">Status</th><th style="text-align:left">Phone</th><th style="text-align:left">Reason</th><th style="text-align:left">Time</th><th style="text-align:left">Action</th></tr></thead><tbody>' + deps.map(d => `
            <tr><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(d.id || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${fmtMoney(d.amount)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940;color:${d.status === 'APPROVED' ? '#22c55e' : d.status === 'REJECTED' || d.status === 'FAILED' || d.status === 'CANCELLED' ? '#ef4444' : '#f59e0b'};font-weight:600">${esc(d.status || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(d.phone_number || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(d.failure_reason || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${d.created_at ? new Date(d.created_at).toLocaleString() : '—'}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${['PENDING', 'APPROVED', 'AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PROCESSING'].includes(d.status) ? `<button class="admin-btn-sm" data-action="dep-approve" data-id="${esc(d.id)}">Approve</button> <button class="admin-btn-sm" data-action="dep-reject" data-id="${esc(d.id)}">Reject</button>` : '—'}</td></tr>
          `).join('') + '</tbody></table>' : '<div style="color:#94a3b8;font-size:12px">No deposits.</div>'}
        </div>
      `;
    } else if (tab === 'withdrawals') {
      const wds = (pay && pay.withdrawals || []).filter(w => w && w.user_id === viewUserSelectedPeer).slice(-30);
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Withdrawal history</div>
        <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:14px">
          ${wds.length ? '<table style="width:100;font-size:12px"><thead><tr><th style="text-align:left">ID</th><th style="text-align:left">Amount</th><th style="text-align:left">Status</th><th style="text-align:left">Phone</th><th style="text-align:left">Reason</th><th style="text-align:left">Time</th><th style="text-align:left">Action</th></tr></thead><tbody>' + wds.map(w => `
            <tr><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(w.id || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${fmtMoney(w.amount)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940;color:${w.status === 'APPROVED' || w.status === 'MARKED_PAID' ? '#22c55e' : w.status === 'REJECTED' || w.status === 'FAILED' || w.status === 'CANCELLED' ? '#ef4444' : '#f59e0b'};font-weight:600">${esc(w.status || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(w.phone_number || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${esc(w.failure_reason || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${w.created_at ? new Date(w.created_at).toLocaleString() : '—'}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${['PENDING', 'APPROVED', 'AWAITING_PAYMENT', 'AWAITING_APPROVAL', 'MARKED_PAID', 'PROCESSING'].includes(w.status) ? `<button class="admin-btn-sm" data-action="wd-approve" data-id="${esc(w.id)}">Approve</button> <button class="admin-btn-sm" data-action="wd-reject" data-id="${esc(w.id)}">Reject</button>` : '—'}</td></tr>
          `).join('') + '</tbody></table>' : '<div style="color:#94a3b8;font-size:12px">No withdrawals.</div>'}
        </div>
      `;
    } else if (tab === 'messages') {
      const me = '__admin__';
      const dms = (last && last.directMessages || []).filter(m => m && ((m.fromToken === me && m.toToken === viewUserSelectedPeer) || (m.fromToken === viewUserSelectedPeer && m.toToken === me))).sort((a, b) => (a.at || 0) - (b.at || 0)).slice(-50);
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Direct messages with ${esc(p.username || 'Player')}</div>
        <div style="display:flex;flex-direction:column;height:400px;background:#0f1626;border:1px solid var(--border);border-radius:10px;overflow:hidden">
          <div id="viewUserMsgList" style="flex:1;overflow:auto;background:#0f1626;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px"></div>
          <div style="display:flex;gap:8px;padding:8px;background:#0f1626;border-top:1px solid var(--border)">
            <input type="text" id="viewUserMsgInput" placeholder="Type a message..." style="flex:1;height:34px;padding:0 10px;border:1px solid var(--border);border-radius:8px;background:#0f1626;color:var(--text)">
            <button class="btn btn-primary" id="viewUserMsgSend" style="padding:0 16px">Send</button>
          </div>
        </div>
      `;
      const msgList = document.getElementById('viewUserMsgList');
      if (msgList) {
        msgList.innerHTML = dms.map(m => {
          const mine = m.fromToken === me;
          return `<div style="display:flex;justify-content:${mine ? 'flex-end' : 'flex-start'}"><div style="max-width:72%;background:${mine ? '#2563eb' : '#1f2937'};color:#fff;padding:8px 10px;border-radius:12px;${mine ? 'border-bottom-right-radius:4px' : 'border-bottom-left-radius:4px'}"><div style="font-size:10px;color:#94a3b8;margin-bottom:2px">${esc(mine ? 'You' : (p.username || 'Player'))} • ${fmtTime(m.at)}</div><div>${esc(m.text || '')}</div></div></div>`;
        }).join('');
        const scrollMsgsBottom = () => {
          msgList.scrollTop = msgList.scrollHeight;
          const lastMsg = msgList.lastElementChild;
          if (lastMsg) lastMsg.scrollIntoView(false);
        };
        scrollMsgsBottom();
        setTimeout(scrollMsgsBottom, 50);
        setTimeout(scrollMsgsBottom, 200);
        requestAnimationFrame(scrollMsgsBottom);
      }

      setTimeout(() => {
        const sendBtn = document.getElementById('viewUserMsgSend');
        const msgInput = document.getElementById('viewUserMsgInput');
        if (sendBtn && msgInput) {
          sendBtn.onclick = () => {
            const text = msgInput.value.trim();
            if (!text) return;
            socket.emit('admin_send_message', { to: [viewUserSelectedPeer], text }, (res) => {
              if (res && res.ok) {
                msgInput.value = '';
                showViewUserTab('messages');
              } else {
                toast((res && res.msg) || 'Failed to send');
              }
            });
          };
          msgInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBtn.click(); } });
        }
      }, 0);
    } else if (tab === 'freebets') {
      const fbs = (last && last.freebets || []).filter(f => f && f.to === viewUserSelectedPeer).slice(-30).reverse();
      viewUserTabContent.innerHTML = `
        <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Freebets</div>
        <div style="background:#0f1626;border:1px solid var(--border);border-radius:10px;padding:14px">
          ${fbs.length ? '<table style="width:100;font-size:12px"><thead><tr><th style="text-align:left">Amount</th><th style="text-align:left">Status</th><th style="text-align:left">Claimed</th><th style="text-align:left">Expires</th></tr></thead><tbody>' + fbs.map(f => `
            <tr><td style="padding:4px 0;border-bottom:1px solid #1e2940">${fmtMoney(f.amount)}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940;color:${f.status === 'CLAIMED' ? '#22c55e' : f.status === 'EXPIRED' ? '#ef4444' : f.status === 'LOST' ? '#f87171' : '#f59e0b'};font-weight:600">${esc(f.status || '—')}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${f.claimed ? 'Yes' : 'No'}</td><td style="padding:4px 0;border-bottom:1px solid #1e2940">${f.expiresAt ? new Date(f.expiresAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '—'}</td></tr>
          `).join('') + '</tbody></table>' : '<div style="color:#94a3b8;font-size:12px">No freebets.</div>'}
        </div>
      `;
    }
  }

  document.querySelectorAll('.viewUserTab').forEach(btn => {
    btn.addEventListener('click', () => { showViewUserTab(btn.dataset.tab); });
  });

  viewUserCloseBtn.addEventListener('click', () => { viewUserSelectedPeer = null; closeModal(viewUserModal); });
  [usersModal, viewUserModal].forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  function esc(s) { return escapeHtml(String(s == null ? '' : s)); }

  function fmtThreadTime(ms) { if (!ms) return ''; return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

  function buildAdminThreads() {
    const me = '__admin__';
    const players = Array.isArray(last && last.players) ? last.players : [];
    const dms = Array.isArray(last && last.directMessages) ? last.directMessages : [];
    const q = ((adminInboxSearch && adminInboxSearch.value) || '').toLowerCase().trim();
    const byPeer = new Map();

    players.forEach(p => {
      if (!p || !p.token || p.token === me) return;
      byPeer.set(p.token, {
        peer: p.token,
        username: p.username || 'Player',
        avatar: p.avatar || null,
        online: !!p.online,
        isAdmin: false,
        messages: [],
        lastAt: 0,
        lastText: '',
        lastFrom: null,
        unread: false
      });
    });

    dms.forEach(m => {
      if (!m) return;
      const peer = m.fromToken === me ? m.toToken : (m.toToken === me ? m.fromToken : null);
      if (!peer || peer === me) return;
      if (!byPeer.has(peer)) {
        byPeer.set(peer, {
          peer,
          username: (m.fromToken === peer ? m.fromUsername : m.toUsername) || 'Player',
          avatar: (m.fromToken === peer ? m.fromAvatar : m.toAvatar) || null,
          online: false,
          isAdmin: peer === '__admin__',
          messages: [],
          lastAt: 0,
          lastText: '',
          lastFrom: null,
          unread: false
        });
      }
      const t = byPeer.get(peer);
      t.messages.push(m);
      if ((m.at || 0) >= t.lastAt) { t.lastAt = m.at || 0; t.lastText = m.text || ''; t.lastFrom = m.fromToken; }
      if (m.fromUsername && m.fromToken === peer) t.username = m.fromUsername;
      if (m.toUsername && m.toToken === peer) t.username = m.toUsername;
      if (m.fromToken === peer && m.fromAvatar) t.avatar = m.fromAvatar;
      if (m.toToken === peer && m.toAvatar) t.avatar = m.toAvatar;
    });

    byPeer.forEach(t => {
      t.messages.sort((a, b) => (a.at || 0) - (b.at || 0));
      const lm = t.messages[t.messages.length - 1];
      if (lm) { t.lastAt = lm.at || 0; t.lastText = lm.text || ''; t.lastFrom = lm.fromToken; }
      t.unread = t.messages.some(m => m.fromToken !== me && (m.at || 0) > Number(adminReadAt[t.peer] || 0));
    });

    let arr = Array.from(byPeer.values());
    if (q) arr = arr.filter(t => String(t.username || '').toLowerCase().includes(q));
    arr.sort((a, b) => (b.unread - a.unread) || (b.lastAt || 0) - (a.lastAt || 0) || (b.online - a.online) || String(a.username || '').localeCompare(String(b.username || '')));
    return arr;
  }

  function renderAdminInboxThreads() {
    const el = adminInboxThreads; if (!el) return;
    const threads = buildAdminThreads();
    const me = '__admin__';
    if (selectedInboxPeer && !threads.some(t => t.peer === selectedInboxPeer)) selectedInboxPeer = null;
    if (!selectedInboxPeer && threads.length) selectedInboxPeer = threads[0].peer;

    el.innerHTML = threads.map(t => {
      const sel = t.peer === selectedInboxPeer;
      const prev = (t.lastText ? ((t.lastFrom === me ? 'You: ' : '') + String(t.lastText).slice(0, 36)) : 'No messages yet');
      const dot = t.unread ? '<span style="display:inline-block;width:8px;height:8px;background:#ef4444;border-radius:50%;margin-left:6px;flex-shrink:0"></span>' : '';
      const online = `<span style="color:${t.online ? '#22c55e' : 'var(--muted)'};font-size:10px">●</span> `;
      const tag = t.isAdmin ? '<span style="font-size:10px;color:#f59e0b;margin-left:4px">ADMIN</span>' : '';
      const av = t.isAdmin ? '<span style="font-size:14px" title="Admin">👑</span>' : (t.avatar ? `<span class="chat-av" style="font-size:13px">${esc(t.avatar)}</span>` : '');
      return `<div data-peer="${esc(t.peer)}" style="padding:10px 12px;border-bottom:1px solid #1e2940;cursor:pointer;background:${sel ? '#162033' : 'transparent'}">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><strong style="font-size:13px;display:flex;align-items:center;gap:2px">${online}${av}${esc(t.username)}${tag}</strong><span style="display:flex;align-items:center;gap:4px"><span class="muted" style="font-size:11px;white-space:nowrap">${t.lastAt ? fmtThreadTime(t.lastAt) : ''}</span>${dot}</span></div>
        <div style="font-size:12px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--muted)">${esc(prev)}</div>
      </div>`;
    }).join('') || '<div class="muted" style="padding:16px">No conversations</div>';

    el.querySelectorAll('[data-peer]').forEach(node => {
      node.onclick = () => {
        adminReadAt[node.dataset.peer] = Date.now();
        saveAdminReadAt();
        selectedInboxPeer = node.dataset.peer;
        saveAdminInboxState(true);
        adminInboxLastMsgId = '';
        if (adminInboxMessages) adminInboxMessages.dataset.initScrollDone = '';
        renderAdminInbox(true);
      };
    });
  }

  function renderAdminInboxConversation() {
    const msgsEl = adminInboxMessages, head = adminInboxHeader, comp = adminInboxComposer; if (!msgsEl) return;
    const threads = buildAdminThreads();
    const t = threads.find(x => x.peer === selectedInboxPeer);
    const me = '__admin__';
    if (!t) {
      if (head) head.textContent = 'Select a conversation';
      msgsEl.innerHTML = '<div class="muted" style="margin:auto">Select a person to start chatting.</div>';
      if (comp) comp.style.display = 'none';
      return;
    }
    const onlineTxt = t.online ? '<span style="color:#22c55e;font-weight:600">online</span>' : '<span style="color:var(--muted)">offline</span>';
    if (head) head.innerHTML = `${esc(t.username)} ${t.isAdmin ? '<span style="font-size:11px;color:#f59e0b;margin-left:4px">ADMIN</span>' : ''} <span style="font-size:12px;font-weight:500;margin-left:6px">${onlineTxt}</span>`;
    const prevScrollTop = msgsEl.scrollTop;
    const wasAtBottom = msgsEl.scrollHeight - prevScrollTop - msgsEl.clientHeight < 80;
    const lastMsgId = t.messages.length ? (t.messages[t.messages.length - 1].id || '') : '';
    const hasNew = !!lastMsgId && lastMsgId !== adminInboxLastMsgId;
    adminInboxLastMsgId = lastMsgId;
    const forceBottom = !msgsEl.dataset.initScrollDone || wasAtBottom || hasNew;
    msgsEl.innerHTML = t.messages.map(m => {
      const mine = m.fromToken === me;
      const style = m.style === 'green' ? 'color:#22c55e;font-weight:600'
        : m.style === 'blue' ? 'color:#3b82f6;font-weight:600'
          : m.style === 'gold' ? 'color:#f59e0b;font-weight:600'
          : m.style === 'red' ? 'color:#ef4444;font-weight:600' : '';
      const time = m.at ? fmtThreadTime(m.at) : '';
      const isAdm = m.fromToken === '__admin__' || t.isAdmin;
      const av = isAdm ? '<span class="chat-avatar" style="font-size:13px" title="Admin">👑</span>' : (m.fromAvatar ? `<span class="chat-avatar" style="font-size:13px">${esc(m.fromAvatar)}</span>` : '');
      const q = m.replyText ? `<div class="dm-quote"><strong>${esc(m.replyName || 'Player')}</strong> ${esc(m.replyText)}</div>` : '';
      const rk = Object.keys(m.reactions || {}).filter(k => Array.isArray(m.reactions[k]) && m.reactions[k].length);
      const reactRow = rk.length ? `<div class="dm-reacts">${rk.map(k => `<span>${k} ${m.reactions[k].length}</span>`).join('')}</div>` : '';
      const pinTag = m.pinned ? '<span class="dm-pin" title="Pinned">📌</span>' : '';
      const fwdTag = (!m.deleted && m.forwarded) ? `<div class="dm-fwd">➦ Forwarded from ${esc(typeof m.forwardedFrom === 'string' ? m.forwardedFrom : ((m.forwardedFrom && m.forwardedFrom.name) || 'Player'))}</div>` : '';
      const timeTag = `<span class="dm-time">${time}</span>`;
      const body = m.deleted
        ? `<div class="chat-text dm-deleted">${fwdTag}🚫 Message deleted by ${esc(m.deletedBy || 'Admin')}${timeTag}</div>`
        : `<div class="chat-text" style="${style}">${fwdTag}${esc(m.text || '')}${timeTag}</div>`;
      return `<div class="chat-msg${mine ? ' mine' : ''}${isAdm ? ' admin-msg' : ''}${m.deleted ? ' deleted' : ''}" data-dm-id="${esc(String(m.id || ''))}">
        <div class="chat-content">
          ${q}
          <div class="dm-bubble"><div class="chat-text-wrap">${body}<button type="button" class="chat-more" data-dm-actions="${esc(String(m.id || ''))}" title="Message actions" aria-label="Message actions">⋮</button></div>${pinTag ? `<span class="dm-pin-line">${pinTag}</span>` : ''}</div>
          ${reactRow}
        </div>
      </div>`;
    }).join('') || '<div class="muted" style="margin:auto;text-align:center">No messages yet. Say hello!</div>';
    if (comp) comp.style.display = 'flex';
    msgsEl.dataset.initScrollDone = '1';
    ensureAdminInboxJumpBtn();
    clearAdminInboxScrollTimers();
    if (forceBottom) {
      const toBottom = () => {
        if (Date.now() - adminInboxUserScrollAt < 500) return;
        msgsEl.scrollTop = msgsEl.scrollHeight;
        updateAdminInboxJumpBtn();
      };
      toBottom();
      requestAnimationFrame(toBottom);
      adminInboxScrollTimers = [setTimeout(toBottom, 60), setTimeout(toBottom, 180)];
    } else {
      msgsEl.scrollTop = prevScrollTop;
      updateAdminInboxJumpBtn();
    }
  }

  let adminInboxScrollTimers = [];
  let adminInboxUserScrollAt = 0;
  function clearAdminInboxScrollTimers() {
    adminInboxScrollTimers.forEach(t => clearTimeout(t));
    adminInboxScrollTimers = [];
  }
  function updateAdminInboxJumpBtn() {
    const el = adminInboxMessages;
    const btn = document.getElementById('adminInboxJumpBtn');
    if (!el || !btn) return;
    const far = el.scrollHeight - el.scrollTop - el.clientHeight > 220;
    btn.classList.toggle('hidden', !far);
  }
  function adminInboxScrollToBottom() {
    if (!adminInboxMessages) return;
    adminInboxMessages.scrollTop = adminInboxMessages.scrollHeight;
    updateAdminInboxJumpBtn();
  }
  function ensureAdminInboxJumpBtn() {
    if (document.getElementById('adminInboxJumpBtn')) return;
    const card = document.querySelector('#inboxModal .admin-modal');
    if (!card) return;
    const btn = document.createElement('button');
    btn.id = 'adminInboxJumpBtn';
    btn.type = 'button';
    btn.className = 'inbox-jump-btn hidden';
    btn.textContent = '↓ Latest';
    btn.addEventListener('click', adminInboxScrollToBottom);
    card.appendChild(btn);
    if (adminInboxMessages) {
      adminInboxMessages.addEventListener('scroll', updateAdminInboxJumpBtn, { passive: true });
      adminInboxMessages.addEventListener('wheel', () => { adminInboxUserScrollAt = Date.now(); clearAdminInboxScrollTimers(); }, { passive: true });
      adminInboxMessages.addEventListener('touchstart', () => { adminInboxUserScrollAt = Date.now(); clearAdminInboxScrollTimers(); }, { passive: true });
    }
  }
  function adminDmById(id) {
    const dms = (last && Array.isArray(last.directMessages)) ? last.directMessages : [];
    return dms.find(m => m && m.id === id) || null;
  }
  function closeDmCtx() { if (inboxCtxMenu) inboxCtxMenu.classList.add('hidden'); }
  function openDmCtx(id, x, y) {
    if (!inboxCtxMenu || !adminDmById(id)) return;
    selectedDmCtxId = id;
    inboxCtxMenu.classList.remove('hidden');
    inboxCtxMenu.style.visibility = 'hidden';
    inboxCtxMenu.style.left = '0px';
    inboxCtxMenu.style.top = '0px';
    const r = inboxCtxMenu.getBoundingClientRect();
    inboxCtxMenu.style.left = Math.max(8, Math.min(x, window.innerWidth - r.width - 8)) + 'px';
    inboxCtxMenu.style.top = Math.max(8, Math.min(y, window.innerHeight - r.height - 8)) + 'px';
    inboxCtxMenu.style.visibility = '';
  }

  let selectedDmCtxId = null;
  let adminDmReply = null;
  function renderAdminInbox(force) {
    if (!force && !adminInboxDirty) return;
    adminInboxDirty = false;
    renderAdminInboxThreads();
    renderAdminInboxConversation();
  }

  adminLoginBtn.addEventListener('click', () => {
    const key = adminKeyInput.value.trim();
    if (!key) { adminLoginMsg.textContent = 'Enter admin key'; return; }
    localStorage.setItem(STORAGE_KEY, key);
    connectSocket();
  });

  adminKeyInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') adminLoginBtn.click(); });

  adminLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    if (socket) { socket.disconnect(); socket = null; }
    last = null; pay = null;
    publicChatRestored = false;
    inboxRestored = false;
    freebetsRestored = false;
    adminRainsRestored = false;
    dash.classList.remove('show');
    dash.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    loginScreen.classList.add('show');
    adminLoginMsg.textContent = '';
    adminKeyInput.value = '';
    closeAllModals();
  });

  btnOpenWithdrawals.addEventListener('click', () => { renderPayments(); openModal(withdrawalsModal); });
  btnOpenDeposits.addEventListener('click', () => { renderPayments(); openModal(depositsModal); });
  btnOpenFailed.addEventListener('click', () => { renderPayments(); openModal(failedModal); });
  btnOpenMessage.addEventListener('click', () => { msgText.value = ''; openModal(messageModal); });
  btnOpenInbox.addEventListener('click', () => { openAdminInboxModal(); });
  if (adminInboxMessages) {
    adminInboxMessages.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dm-actions]');
      if (btn) e.stopPropagation();
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      openDmCtx(btn.dataset.dmActions, rect.left, rect.bottom + 4);
    });
    let adminDmLongPress = null;
    const clearAdminDmLongPress = () => { if (adminDmLongPress) { clearTimeout(adminDmLongPress); adminDmLongPress = null; } };
    adminInboxMessages.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const node = e.target.closest('.chat-msg[data-dm-id]');
      if (!node) return;
      clearAdminDmLongPress();
      adminDmLongPress = setTimeout(() => { adminDmLongPress = null; openDmCtx(node.dataset.dmId, e.clientX, e.clientY); }, 480);
    });
    ['pointerup','pointerleave','pointercancel','pointermove'].forEach(ev => adminInboxMessages.addEventListener(ev, clearAdminDmLongPress));
    adminInboxMessages.addEventListener('contextmenu', (e) => {
      const node = e.target.closest('.chat-msg[data-dm-id]');
      if (!node) return;
      e.preventDefault();
      openDmCtx(node.dataset.dmId, e.clientX, e.clientY);
    });
  }
  if (inboxCtxMenu) {
    inboxCtxMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('.pc-ctx-item');
      if (!btn) return;
      const id = selectedDmCtxId;
      const m = id ? adminDmById(id) : null;
      const action = btn.dataset.action;
      closeDmCtx();
      if (!m) return;
      if (action === 'copy') {
        const text = String(m.text || '');
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast('Message copied')).catch(() => toast('Copy failed'));
        else toast('Copy not supported');
      } else if (action === 'forward') {
        if (typeof openPublicChat === 'function') openPublicChat();
        if (publicChatInput) { publicChatInput.value = String(m.text || ''); publicChatInput.focus(); }
      } else if (action === 'private') {
        if (m.fromToken && m.fromToken !== '__admin__') { selectedInboxPeer = m.fromToken; saveAdminInboxState(true); adminInboxDirty = true; renderAdminInbox(true); }
      } else if (action === 'react') {
        socket.emit('dm_react', { id, emoji: '👍' }, (res) => { if (!res || !res.ok) toast((res && res.msg) || 'Could not react'); });
      } else if (action === 'reply') {
        adminDmReply = { id, name: m.fromToken === '__admin__' ? 'You' : (m.fromUsername || 'Player'), text: String(m.text || '') };
        if (adminInboxInput) { adminInboxInput.placeholder = 'Replying to ' + adminDmReply.name + '…'; adminInboxInput.focus(); }
      } else if (action === 'pin') {
        socket.emit('dm_pin', { id }, (res) => toast((res && res.msg) || 'Pin failed'));
      } else if (action === 'delete') {
        socket.emit('dm_delete', { id }, (res) => {
          if (res && res.ok) { toast('Message deleted'); adminInboxDirty = true; renderAdminInbox(true); }
          else toast((res && res.msg) || 'Could not delete message');
        });
      }
    });
  }
  document.addEventListener('click', (e) => { if (inboxCtxMenu && !inboxCtxMenu.contains(e.target)) closeDmCtx(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDmCtx(); });


  btnOpenAwardFreebet.addEventListener('click', () => { awardFreebetAmount.value = ''; awardFreebetExpires.value = '30'; openModal(awardFreebetModal); });
  btnOpenFreebets.addEventListener('click', () => { localStorage.setItem('aviator_admin_freebets_open', 'true'); renderFreebets(); openModal(freebetsModal); });
  const btnOpenPnl = document.getElementById('btnOpenPnl');
  if (btnOpenPnl) btnOpenPnl.addEventListener('click', () => { localStorage.setItem('aviator_admin_pnl_open', 'true'); renderPnl(); openModal(pnlModal); });
  if (pnlCloseBtn) pnlCloseBtn.addEventListener('click', () => { localStorage.setItem('aviator_admin_pnl_open', 'false'); closeModal(pnlModal); });
  if (pnlModal) pnlModal.addEventListener('click', (e) => { if (e.target === pnlModal) { localStorage.setItem('aviator_admin_pnl_open', 'false'); closeModal(pnlModal); } });
  freebetsCloseBtn.addEventListener('click', () => { localStorage.setItem('aviator_admin_freebets_open', 'false'); closeModal(freebetsModal); });
  if (freebetsModal) freebetsModal.addEventListener('click', (e) => { if (e.target === freebetsModal) { localStorage.setItem('aviator_admin_freebets_open', 'false'); closeModal(freebetsModal); } });

  btnOpenRains.addEventListener('click', () => { localStorage.setItem('aviator_admin_rains_open', 'true'); renderAdminRains(); openModal(adminRainsTrackerModal); });
  adminRainsTrackerCloseBtn.addEventListener('click', () => { localStorage.setItem('aviator_admin_rains_open', 'false'); closeModal(adminRainsTrackerModal); });
  if (adminRainsTrackerModal) adminRainsTrackerModal.addEventListener('click', (e) => { if (e.target === adminRainsTrackerModal) { localStorage.setItem('aviator_admin_rains_open', 'false'); closeModal(adminRainsTrackerModal); } });

  function adminRainStatus(r) {
    const nowMs = Date.now();
    if (Number(r.claimedCount || 0) >= Number(r.maxClaimers || 0)) return { label: 'Completed', bg: 'rgba(34,197,94,.15)', fg: '#22c55e' };
    if (r.expiresAt && nowMs > Number(r.expiresAt)) return { label: 'Expired', bg: 'rgba(239,68,68,.15)', fg: '#ef4444' };
    return { label: 'Active', bg: 'rgba(56,189,248,.18)', fg: '#38bdf8' };
  }
  function renderAdminRains() {
    if (!adminRainsList) return;
    const all = (last && Array.isArray(last.rains) ? last.rains : []).filter(r => r && r.from === '__admin__').slice().reverse();
    const money = (n) => 'KSh ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let totalValue = 0, claimedValue = 0, openValue = 0, expiredValue = 0;
    let active = 0, completed = 0, expired = 0;
    all.forEach(r => {
      const st = adminRainStatus(r).label;
      const total = Number(r.total || (r.amount * r.maxClaimers)) || 0;
      const claimedCnt = Number(r.claimedCount || 0) || 0;
      const amount = Number(r.amount) || 0;
      totalValue += total;
      claimedValue += amount * claimedCnt;
      if (st === 'Active') { active++; openValue += amount * Math.max(0, Number(r.maxClaimers || 0) - claimedCnt); }
      else if (st === 'Expired') { expired++; expiredValue += amount * Math.max(0, Number(r.maxClaimers || 0) - claimedCnt); }
      else completed++;
    });
    const chip = (label, value, fg, bg, sub) => `<div style="flex:1 1 150px;min-width:140px;border:1px solid #223052;border-radius:10px;padding:8px 12px;background:${bg}">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8">${label}</div>
      <div style="font-size:16px;font-weight:800;color:${fg};line-height:1.35">${value}</div>
      ${sub ? `<div style="font-size:11px;color:#94a3b8">${sub}</div>` : ''}
    </div>`;
    if (adminRainsSummary) {
      adminRainsSummary.innerHTML = all.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
        ${chip('Dispatched (claimed)', money(claimedValue), '#22c55e', 'rgba(34,197,94,.08)', `${claimedValue ? '' : 'No claims yet'}${claimedValue ? 'claimed by players' : ''}`)}
        ${chip('Open slots', money(openValue), '#38bdf8', 'rgba(56,189,248,.08)', `${active} rain${active === 1 ? '' : 's'} active`)}
        ${chip('Unclaimed / expired', money(expiredValue), '#ef4444', 'rgba(239,68,68,.08)', `${expired} expired`)}
        ${chip('Total rains sent', money(totalValue), '#e2e8f0', 'rgba(148,163,184,.08)', `${all.length} rain${all.length === 1 ? '' : 's'} · ${completed} completed`)}
      </div>` : '';
    }
    adminRainsList.innerHTML = all.length ? all.map(r => {
      const st = adminRainStatus(r);
      const claims = Array.isArray(r.claims) ? r.claims.slice().sort((a, b) => (Number(a.at) || 0) - (Number(b.at) || 0)) : [];
      const openSlots = Math.max(0, Number(r.maxClaimers || 0) - Number(r.claimedCount || 0));
      const head = `${money(r.amount)} each · ${r.maxClaimers} player${Number(r.maxClaimers) === 1 ? '' : 's'} · ${r.at ? fmtThreadTime(r.at) : '-'}`;
      const rows = claims.map(c => `<tr><td>${esc(c.name || 'Player')}</td><td><span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;background:rgba(34,197,94,.15);color:#22c55e">Claimed</span></td><td>${money(r.amount)}</td><td>${c.at ? esc(fmtThreadTime(c.at)) : '-'}</td></tr>`).join('');
      const openRow = openSlots > 0 ? `<tr><td colspan="4" class="muted" style="font-size:11px">${st.label === 'Expired' ? 'Expired without claim' : 'Waiting'} — ${openSlots} slot${openSlots === 1 ? '' : 's'} unclaimed (${money(Number(r.amount) * openSlots)})</td></tr>` : '';
      return `<div style="border:1px solid #223052;border-radius:10px;margin-bottom:12px;overflow:hidden;background:#0d1526">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;padding:8px 12px;background:#101a2e;border-bottom:1px solid #223052">
          <strong style="font-size:12px;color:#38bdf8">${esc(head)}</strong>
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;background:${st.bg};color:${st.fg}">${st.label}</span>
        </div>
        <table><thead><tr><th>Claimed by</th><th>Status</th><th>Amount</th><th>Claimed At</th></tr></thead><tbody>${rows}${openRow}</tbody></table>
      </div>`;
    }).join('') : '<div class="muted" style="padding:14px">No admin rains sent yet.</div>';
  }

  function freebetStatusInfo(fb) {
    if (fb.claimed || fb.status === 'CLAIMED') return { label: 'Claimed', bg: 'rgba(34,197,94,.15)', fg: '#22c55e' };
    if (fb.status === 'LOST') return { label: 'Lost', bg: 'rgba(248,113,113,.15)', fg: '#f87171' };
    if (fb.status === 'EXPIRED' || (fb.expiresAt && Date.now() > Number(fb.expiresAt))) return { label: 'Expired', bg: 'rgba(239,68,68,.15)', fg: '#ef4444' };
    return { label: 'Pending', bg: 'rgba(245,158,11,.18)', fg: '#f59e0b' };
  }
  function renderFreebets() {
    if (!freebetsList) return;
    const all = (last && Array.isArray(last.freebets) ? last.freebets : []).slice();
    let claimed = 0, pending = 0, expired = 0, lost = 0;
    let claimedAmount = 0, pendingAmount = 0, expiredAmount = 0, lostAmount = 0;
    all.forEach(fb => {
      const s = freebetStatusInfo(fb).label;
      const amt = Number(fb.amount) || 0;
      if (s === 'Claimed') { claimed++; claimedAmount += amt; }
      else if (s === 'Expired') { expired++; expiredAmount += amt; }
      else if (s === 'Lost') { lost++; lostAmount += amt; }
      else { pending++; pendingAmount += amt; }
    });
    const money = (n) => 'KSh ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const chip = (label, value, fg, bg, sub) => `<div style="flex:1 1 150px;min-width:140px;border:1px solid #223052;border-radius:10px;padding:8px 12px;background:${bg}">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8">${label}</div>
      <div style="font-size:16px;font-weight:800;color:${fg};line-height:1.35">${value}</div>
      ${sub ? `<div style="font-size:11px;color:#94a3b8">${sub}</div>` : ''}
    </div>`;
    if (freebetsSummary) {
      freebetsSummary.innerHTML = all.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
        ${chip('Dispatched (claimed)', money(claimedAmount), '#22c55e', 'rgba(34,197,94,.08)', `${claimed} freebet${claimed === 1 ? '' : 's'} claimed`)}
        ${chip('Pending', money(pendingAmount), '#f59e0b', 'rgba(245,158,11,.08)', `${pending} awaiting claim`)}
        ${chip('Expired', money(expiredAmount), '#ef4444', 'rgba(239,68,68,.08)', `${expired} expired`)}
        ${chip('Lost', money(lostAmount), '#f87171', 'rgba(248,113,113,.08)', `${lost} closed by player`)}
        ${chip('Total awarded', money(claimedAmount + pendingAmount + expiredAmount + lostAmount), '#e2e8f0', 'rgba(148,163,184,.08)', `${all.length} freebet${all.length === 1 ? '' : 's'} in total`)}
      </div>` : '';
    }

    const groups = new Map();
    all.forEach(fb => {
      const key = fb.batchId || `${Number(fb.amount) || 0}_${Math.round((Number(fb.createdAt) || 0) / 5000)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(fb);
    });
    const ordered = Array.from(groups.values()).sort((a, b) => (Number(b[0].createdAt) || 0) - (Number(a[0].createdAt) || 0));

    freebetsList.innerHTML = ordered.length ? ordered.map(group => {
      group.sort((a, b) => String(a.toUsername || '').localeCompare(String(b.toUsername || '')));
      const first = group[0];
      const gClaimed = group.filter(f => freebetStatusInfo(f).label === 'Claimed').length;
      const gExpired = group.filter(f => freebetStatusInfo(f).label === 'Expired').length;
      const gLost = group.filter(f => freebetStatusInfo(f).label === 'Lost').length;
      const gPending = group.length - gClaimed - gExpired - gLost;
      const head = `KSh ${Number(first.amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ${group.length} player${group.length === 1 ? '' : 's'} · ${first.createdAt ? fmtThreadTime(first.createdAt) : '-'}`;
      const counts = [gClaimed ? `Claimed ${gClaimed}` : '', gPending ? `Pending ${gPending}` : '', gExpired ? `Expired ${gExpired}` : '', gLost ? `Lost ${gLost}` : ''].filter(Boolean).join(' · ');
      const rows = group.map(fb => {
        const st = freebetStatusInfo(fb);
        return `<tr>
          <td>${esc(fb.toUsername || 'Player')}</td>
          <td><span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;background:${st.bg};color:${st.fg}">${st.label}</span></td>
          <td>${fb.expiresAt ? esc(fmtThreadTime(fb.expiresAt)) : '-'}</td>
          <td>${fb.claimedAt ? esc(fmtThreadTime(fb.claimedAt)) : '-'}</td>
        </tr>`;
      }).join('');
      return `<div style="border:1px solid #223052;border-radius:10px;margin-bottom:12px;overflow:hidden;background:#0d1526">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;padding:8px 12px;background:#101a2e;border-bottom:1px solid #223052">
          <strong style="font-size:12px;color:#fbbf24">${esc(head)}</strong>
          <span class="muted" style="font-size:11px">${esc(counts)}</span>
        </div>
        <table><thead><tr><th>Player</th><th>Status</th><th>Expires</th><th>Claimed At</th></tr></thead><tbody>${rows}</tbody></table>
      </div>`;
    }).join('') : '<div class="muted" style="padding:14px">No freebets awarded yet.</div>';
  }
  function pnlMoney(n) { return 'KSh ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function renderPnl() {
    if (!pnlBody) return;
    const p = (last && last.pnl) || null;
    const pnlStartedAt = (p && p.cutoffAt) ? new Date(Number(p.cutoffAt)).toLocaleString() : 'the last reset';
    if (!p) { pnlBody.innerHTML = '<div class="muted">Waiting for data...</div>'; return; }
    const chip = (label, value, fg, bg, sub) => `<div style="flex:1 1 160px;min-width:150px;border:1px solid #223052;border-radius:10px;padding:8px 12px;background:${bg}">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#94a3b8">${label}</div>
      <div style="font-size:15px;font-weight:800;color:${fg};line-height:1.35">${value}</div>
      ${sub ? `<div style="font-size:11px;color:#94a3b8">${sub}</div>` : ''}
    </div>`;
    const positive = (Number(p.profit) || 0) >= 0;
    pnlBody.innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:stretch;margin-bottom:12px">
        <div style="flex:1 1 240px;border:1px solid ${positive ? '#14532d' : '#7f1d1d'};border-radius:12px;padding:14px;background:${positive ? 'rgba(34,197,94,.08)' : 'rgba(239,68,68,.08)'}">
          <div style="font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#94a3b8">System ${positive ? 'profit' : 'loss'}</div>
          <div style="font-size:26px;font-weight:800;color:${positive ? '#22c55e' : '#ef4444'}">${pnlMoney(p.profit)}</div>
          <div style="font-size:11px;color:#94a3b8">Bets − cash-outs − payouts ± admin balance moves</div>
          <div style="font-size:12px;color:#cbd5e1;margin-top:6px;line-height:1.7">
            <div>Gross gaming: <strong>${pnlMoney((Number(p.bets)||0) - (Number(p.cashouts)||0))}</strong></div>
            <div>Freebets paid: <strong>${pnlMoney(-(Number(p.freebetsClaimed)||0))}</strong></div>
            <div>Admin rain paid: <strong>${pnlMoney(-(Number(p.rainsClaimed)||0))}</strong></div>
            <div>Player rain forfeited: <strong>${pnlMoney(Number(p.rainsUserUnused)||0)}</strong></div>
            <div>Boosterpot paid: <strong>${pnlMoney(-(Number(p.boosterpotAwards)||0))}</strong></div>
            <div>Admin balance net: <strong>${pnlMoney((Number(p.adminDeducted)||0) - (Number(p.adminAdded)||0))}</strong></div>
          </div>
        </div>
        ${chip('Bets collected', pnlMoney(p.bets), '#22c55e', 'rgba(34,197,94,.08)', 'player stakes (system income)')}
        ${chip('Cash-outs paid', pnlMoney(p.cashouts), '#ef4444', 'rgba(239,68,68,.08)', 'player wins (system loss)')}
        ${chip('Boosterpot awards', pnlMoney(p.boosterpotAwards), '#f59e0b', 'rgba(245,158,11,.08)', 'paid to winners (loss)')}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        ${chip('Freebets claimed', pnlMoney(p.freebetsClaimed), '#ef4444', 'rgba(239,68,68,.08)', 'paid out (loss)')}
        ${chip('Rain claimed (admin)', pnlMoney(p.rainsClaimed), '#ef4444', 'rgba(239,68,68,.08)', 'paid out (loss)')}
        ${chip('Rain unused (player)', pnlMoney(p.rainsUserUnused), '#22c55e', 'rgba(34,197,94,.08)', 'unclaimed user rain forfeited (income)')}
        ${chip('Admin funds added', pnlMoney(p.adminAdded), '#ef4444', 'rgba(239,68,68,.08)', 'balance credited by admin (loss)')}
        ${chip('Admin funds deducted', pnlMoney(p.adminDeducted), '#22c55e', 'rgba(34,197,94,.08)', 'balance removed by admin (income)')}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${chip('Deposits in', pnlMoney(p.deposits), '#38bdf8', 'rgba(56,189,248,.08)', 'cash flow (not profit)')}
        ${chip('Withdrawals out', pnlMoney(p.withdrawals), '#a78bfa', 'rgba(167,139,250,.08)', 'cash flow (not profit)')}
      </div>
      <div class="muted" style="font-size:11px;margin-top:10px">Tracking started ${pnlStartedAt}. Bets, cash-outs, boosterpot payouts, freebet claims, rain claims and admin balance changes are counted from that moment onward and update here live. Unclaimed freebets and unclaimed admin rain are never paid out, so they do not affect profit; unclaimed player rain is forfeited to the system and counts as income. Deposits and withdrawals are cash flow and are not part of profit. </div>`;
  }

  btnOpenUsers.addEventListener('click', () => { closeModal(viewUserModal); usersSearch.value = ''; usersDirty = true; renderUsers(); openModal(usersModal); });

  btnOpenHistory.addEventListener('click', () => { renderHistory(); openModal(historyModal); });
  historyCloseBtn.addEventListener('click', () => closeModal(historyModal));

  btnOpenManageFinances.addEventListener('click', () => { renderManageFinancesUsers(); mfAmount.value = ''; mfSelectedAction = 'add'; setMfActionUI(); updateMfPreview(); mfExecuteBtn.disabled = false; openModal(manageFinancesModal); });
  if (mfUserSelect) mfUserSelect.addEventListener('change', () => { updateMfPreview(); });
  manageFinancesCloseBtn.addEventListener('click', () => closeModal(manageFinancesModal));

  function findAdminRain(id) { return (adminRains || []).find(r => r && r.id === id) || null; }
  function adminRainCtx(m) { return findAdminRain(m.rainId) || m.rain || null; }
  function isAdminRainMsg(m) { return !!m && (m.type === 'rain' || m.rainId) && (m.isAdmin || m.userId === '__admin__' || m.from === '__admin__'); }
  function reactionSummary(m) {
    const out = {};
    const r = (m && m.reactions && typeof m.reactions === 'object') ? m.reactions : {};
    Object.keys(r).forEach(k => { const e = r[k]; if (e) out[e] = (out[e] || 0) + 1; });
    return out;
  }
  function publicChatMsgHtml(m) {
    if (m.type === 'rain' || m.rainId) {
      const r = adminRainCtx(m);
      const id = m.rainId || (r && r.id) || '';
      const senderIsAdmin = !!m.isAdmin || m.userId === '__admin__' || (r && r.from === '__admin__');
      const name = (r && r.fromUsername) ? r.fromUsername : (m.name || 'Player');
      const label = senderIsAdmin ? '<span class="rain-admin-btn">👑 ADMIN</span>' : `<span class="rain-label">Rain from ${esc(name)}</span>`;
      const amount = r ? r.amount : '';
      return `<div class="pc-msg pc-rain${senderIsAdmin ? ' pc-mine' : ''}" data-chat-id="${esc(m.id)}" data-rain-id="${esc(id)}">
          <div class="rain-card" data-rain-id="${esc(id)}">
            <div class="rain-head"><span class="rain-icon">🌧️</span>${label}<span class="rain-timer"></span></div>
            <div class="rain-amt">KSh ${esc(String(amount))} each · <span class="rain-spots"></span></div>
            <span class="rain-status"></span>
          </div>
        </div>`;
    }
    const isAdmin = !!m.isAdmin || m.userId === '__admin__';
    const name = esc(m.name || (isAdmin ? 'Admin' : 'Player'));
    const vip = (!isAdmin && m.isVip) ? '<span class="vip-tag">VIP</span>' : '';
    const adminTag = isAdmin ? '<span class="pc-tag">ADMIN</span>' : '';
    const av = m.avatar ? `<span class="pc-av${(!isAdmin && m.isVip) ? ' vip' : ''}${isAdmin ? ' pc-av-admin' : ''}" title="${name}">${esc(m.avatar)}</span>` : '';
    const time = m.at ? fmtThreadTime(m.at) : '';
    if (m.deleted) {
      const drx = reactionSummary(m);
      const dKeys = Object.keys(drx);
      const dRx = dKeys.length ? `<div class="pc-reactions">${dKeys.map(e => `<span class="pc-reaction-chip">${e}${drx[e] > 1 ? ` <b>${drx[e]}</b>` : ''}</span>`).join('')}</div>` : '';
      const deleter = m.deletedByName || (m.deletedBy === 'author' ? (m.name || 'Player') : 'Admin');
      return `<div class="pc-msg" data-chat-id="${esc(m.id)}"><div class="pc-body"><div class="pc-head">${av}<span class="pc-name">${name}</span>${adminTag}${vip}<span class="pc-time">${time}</span></div><div class="pc-text pc-text-deleted">Message deleted by ${esc(deleter)}</div>${dRx}</div></div>`;
    }
    const pinned = chatPinnedIds.includes(m.id);
    const quote = m.replyPreview ? `<div class="pc-quote"><div class="pc-quote-name">${esc(m.replyPreview.name || 'Player')}</div><div class="pc-quote-text">${esc(m.replyPreview.text || '')}</div></div>` : '';
    const fwdName = (typeof m.forwardedFrom === 'string') ? m.forwardedFrom : ((m.forwardedFrom && m.forwardedFrom.name) || '');
const fwd = fwdName ? `<div class="pc-fwd">➦ Forwarded from ${esc(fwdName)}</div>` : '';
    const rx = reactionSummary(m);
    const rxKeys = Object.keys(rx);
    const reactionsHtml = rxKeys.length ? `<div class="pc-reactions">${rxKeys.map(e => `<span class="pc-reaction-chip">${e}${rx[e] > 1 ? ` <b>${rx[e]}</b>` : ''}</span>`).join('')}</div>` : '';
    return `<div class="pc-msg${isAdmin ? ' pc-admin pc-mine' : ''}${pinned ? ' pc-pinned-msg' : ''}" data-chat-id="${esc(m.id)}"><div class="pc-body"><div class="pc-head">${av}<span class="pc-name">${name}</span>${adminTag}${vip}${pinned ? '<span class="pc-pin-tag">PINNED</span>' : ''}<span class="pc-time">${time}</span></div><div class="pc-text-wrap"><div class="pc-text">${quote}${fwd}${esc(m.text || '')}</div><button type="button" class="pc-more" data-chat-id="${esc(m.id)}" title="Message actions" aria-label="Message actions">⋮</button></div>${reactionsHtml}</div></div>`;
  }
  function renderPinnedBar() {
    if (!publicChatPinned) return;
    const items = chatPinnedIds.map(id => publicChatMsgs.find(m => m && m.id === id)).filter(m => m && !m.deleted);
    publicChatPinned.classList.toggle('hidden', !items.length);
    publicChatPinned.innerHTML = items.map(m => `<button type="button" class="pc-pin-item" data-goto="${esc(m.id)}"><span class="pc-pin-ico">📌</span><span class="pc-pin-body"><b>${esc(m.name || 'Player')}</b> · ${esc((m.text || '').replace(/\s+/g, ' ').slice(0, 70))}</span></button>`).join('');
  }
  function mergePublicChatState() {
    if (!last || !Array.isArray(last.chat)) return;
    const byId = new Map(publicChatMsgs.map(m => [m.id, m]));
    last.chat.forEach(m => { if (m && m.id) byId.set(m.id, m); });
    publicChatMsgs = Array.from(byId.values()).sort((a, b) => (a.at || 0) - (b.at || 0)).slice(-200);
    if (publicChatModal && publicChatModal.classList.contains('show')) markPublicChatSeen();
    else updatePublicChatBadge();
  }
  function lastPublicChatId() {
    for (let i = publicChatMsgs.length - 1; i >= 0; i--) {
      if (!isAdminRainMsg(publicChatMsgs[i])) return publicChatMsgs[i].id;
    }
    return '';
  }
  function isAdminRainMsg(m) { return !!m && (m.type === 'rain' || m.rainId) && (m.isAdmin || m.userId === '__admin__' || m.from === '__admin__'); }
  function updatePublicChatBadge() {
    if (!publicChatBadge) return;
    const lastId = lastPublicChatId();
    const unread = !!lastId && lastId !== publicChatSeenId;
    publicChatBadge.style.display = unread ? 'block' : 'none';
  }
  function markPublicChatSeen() {
    const lastId = lastPublicChatId();
    if (lastId && lastId !== publicChatSeenId) {
      publicChatSeenId = lastId;
      try { localStorage.setItem('aviator_admin_chat_seen', publicChatSeenId); } catch (e) { }
    }
    updatePublicChatBadge();
  }
  function isAdminRainHidden(m) {
    if (!(m.type === 'rain' || m.rainId)) return false;
    const r = adminRainCtx(m);
    if (!r) return true;
    const left = (r.expiresAt || 0) - (Date.now() + offset);
    return left <= 0 || (r.claimedCount || 0) >= r.maxClaimers;
  }
  function renderPublicChat(forceBottom) {
    if (!publicChatMessages) return;
    const el = publicChatMessages;
    const atBottom = forceBottom || el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    const prevScrollTop = el.scrollTop;
    let visible = publicChatMsgs.filter(m => !isAdminRainHidden(m));
    if (chatSavedFilter) visible = visible.filter(m => chatSavedIds.includes(m.id));
    el.innerHTML = visible.map(publicChatMsgHtml).join('') || `<div style="margin:auto;color:#94a3b8;font-size:12px;text-align:center;padding:20px">${chatSavedFilter ? 'No saved messages.' : 'No messages yet.'}</div>`;
    if (atBottom) el.scrollTop = el.scrollHeight;
    else el.scrollTop = prevScrollTop;
    if (publicChatSavedBar) publicChatSavedBar.classList.toggle('hidden', !chatSavedFilter);
    if (publicChatSavedBtn) publicChatSavedBtn.classList.toggle('active', chatSavedFilter);
    renderPinnedBar();
    refreshAdminRainCards();
  }
  function refreshAdminRainCards() {
    if (!publicChatMessages) return;
    const nowMs = Date.now() + offset;
    publicChatMessages.querySelectorAll('.pc-rain').forEach(card => {
      const id = card.getAttribute('data-rain-id');
      const chatId = card.getAttribute('data-chat-id');
      const m = publicChatMsgs.find(x => x.id === chatId);
      const r = m ? adminRainCtx(m) : findAdminRain(id);
      const left = r ? Math.max(0, Math.ceil((r.expiresAt - nowMs) / 1000)) : 0;
      const expired = !r || left <= 0;
      const full = !!r && (r.claimedCount || 0) >= r.maxClaimers;
      const timerEl = card.querySelector('.rain-timer');
      const spotsEl = card.querySelector('.rain-spots');
      const statusEl = card.querySelector('.rain-status');
      if (timerEl) timerEl.textContent = expired ? 'Expired' : `${left}s`;
      if (spotsEl) spotsEl.textContent = r ? `${Math.max(0, r.maxClaimers - (r.claimedCount || 0))}/${r.maxClaimers} left` : '';
      if (statusEl) {
        let status = '';
        if (r && r.from === '__admin__') status = 'Your rain';
        else if (expired) status = 'Expired';
        else if (full) status = 'All claimed';
        statusEl.textContent = status;
      }
    });
  }
  function onPublicChatNew(m) {
    if (!m || !m.id) return;
    if (publicChatMsgs.some(x => x.id === m.id)) return;
    if (m.rainId && m.rain && !findAdminRain(m.rainId)) {
      adminRains.push(Object.assign({ claimedBy: [], claimedCount: 0 }, m.rain));
    }
    publicChatMsgs.push(m);
    publicChatMsgs.sort((a, b) => (a.at || 0) - (b.at || 0));
    if (publicChatMsgs.length > 200) publicChatMsgs = publicChatMsgs.slice(-200);
    if (publicChatModal && publicChatModal.classList.contains('show')) { renderPublicChat(true); markPublicChatSeen(); }
    else updatePublicChatBadge();
  }

  function openPublicChat() {
    mergePublicChatState();
    chatSavedFilter = false;
    openModal(publicChatModal);
    renderPublicChat(true);
    localStorage.setItem('aviator_admin_chat_open', 'true');
    markPublicChatSeen();
    setTimeout(() => { if (publicChatInput) publicChatInput.focus(); }, 60);
  }
  function closePublicChat() {
    emitAdminChatTyping(false);
    closeModal(publicChatModal);
    setChatReply(null);
    closeCtx();
    localStorage.setItem('aviator_admin_chat_open', 'false');
  }
  btnOpenPublicChat.addEventListener('click', openPublicChat);
  publicChatCloseBtn.addEventListener('click', closePublicChat);
  if (publicChatModal) publicChatModal.addEventListener('click', (e) => { if (e.target === publicChatModal) closePublicChat(); });

  const btnOpenPasswordResets = document.getElementById('btnOpenPasswordResets');
  const prModal = document.getElementById('passwordResetsModal');
  const prCloseBtn = document.getElementById('prCloseBtn');
  if (btnOpenPasswordResets) btnOpenPasswordResets.addEventListener('click', () => { renderPasswordResets(); openModal(prModal); });
  if (prCloseBtn) prCloseBtn.addEventListener('click', () => closeModal(prModal));
  if (prModal) prModal.addEventListener('click', (e) => { if (e.target === prModal) closeModal(prModal); });
  function setChatReply(m) {
    chatReplyTo = m ? { id: m.id, name: m.name || 'Player', text: String(m.text || '').replace(/\s+/g, ' ').slice(0, 120) } : null;
    if (publicChatReplyBar) publicChatReplyBar.classList.toggle('hidden', !chatReplyTo);
    if (chatReplyTo) {
      if (publicChatReplyName) publicChatReplyName.textContent = chatReplyTo.name;
      if (publicChatReplyText) publicChatReplyText.textContent = chatReplyTo.text;
      if (publicChatInput) publicChatInput.focus();
    }
  }
  if (publicChatReplyCancel) publicChatReplyCancel.addEventListener('click', () => setChatReply(null));
  function renderAdminChatTyping() {
    if (!publicChatTyping) return;
    const now = Date.now();
    Object.keys(adminTypingUsers).forEach(k => { if (now - (adminTypingUsers[k].at || 0) > 4000) delete adminTypingUsers[k]; });
    const names = Object.keys(adminTypingUsers).map(k => adminTypingUsers[k].name).filter(Boolean);
    if (!names.length) { publicChatTyping.classList.add('hidden'); return; }
    let text;
    if (names.length === 1) text = `${names[0]} is typing…`;
    else if (names.length === 2) text = `${names[0]} and ${names[1]} are typing…`;
    else if (names.length === 3) text = `${names[0]}, ${names[1]} and ${names[2]} are typing…`;
    else text = 'Several people are typing…';
    if (publicChatTypingText) publicChatTypingText.textContent = text;
    publicChatTyping.classList.remove('hidden');
  }
  function emitAdminChatTyping(typing) {
    const t = Date.now();
    if (typing) {
      if (t - adminTypingEmitAt < 1500) return;
      adminTypingEmitAt = t;
    } else {
      adminTypingEmitAt = 0;
    }
    socket.emit('chat_typing', { typing: !!typing });
  }
  if (publicChatInput) {
    publicChatInput.addEventListener('input', () => emitAdminChatTyping(!!(publicChatInput.value || '').trim()));
    publicChatInput.addEventListener('blur', () => emitAdminChatTyping(false));
  }
  function sendPublicChat() {
    const text = (publicChatInput && publicChatInput.value || '').replace(/\r\n/g, '\n').trim();
    if (!text) return;
    publicChatSend.disabled = true;
    const payload = { text };
    if (chatReplyTo) payload.replyToId = chatReplyTo.id;
    socket.emit('admin_chat_send', payload, (res) => {
      publicChatSend.disabled = false;
      if (res && res.ok) { publicChatInput.value = ''; publicChatInput.focus(); setChatReply(null); renderPublicChat(true); emitAdminChatTyping(false); }
      else toast((res && res.msg) || 'Failed to send');
    });
  }
  if (publicChatSend) publicChatSend.addEventListener('click', sendPublicChat);
  if (publicChatInput) publicChatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendPublicChat(); } });

  const CHAT_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
  const CHAT_REACTIONS_MORE = ['🔥', '🎉', '👏', '💯', '😡', '🙌'];
  function buildReactionBar() {
    if (!pcCtxReactions) return;
    pcCtxReactions.innerHTML = CHAT_REACTIONS.map(e => `<button type="button" class="pc-ctx-emoji" data-emoji="${e}">${e}</button>`).join('')
      + `<button type="button" class="pc-ctx-emoji pc-ctx-emoji-more" data-emoji-toggle="1" aria-label="More reactions">+</button>`
      + `<div class="pc-ctx-emoji-extra" hidden>${CHAT_REACTIONS_MORE.map(e => `<button type="button" class="pc-ctx-emoji" data-emoji="${e}">${e}</button>`).join('')}</div>`;
  }
  buildReactionBar();
  function closeCtx() {
    if (pcContextMenu) pcContextMenu.classList.add('hidden');
    pcCtxMsgId = null;
  }
  function openCtxFor(id, x, y) {
    const m = publicChatMsgs.find(v => v && v.id === id);
    if (!m || !pcContextMenu || m.deleted) return;
    pcCtxMsgId = id;
    const isOwn = m.userId === '__admin__';
    pcContextMenu.querySelectorAll('.pc-ctx-item').forEach(btn => {
      const a = btn.dataset.action;
      btn.disabled = (a === 'private' || a === 'report') ? isOwn : false;
      if (a === 'pin') btn.querySelector('span').textContent = chatPinnedIds.includes(id) ? 'Unpin message' : 'Pin message';
      if (a === 'save') btn.querySelector('span').textContent = chatSavedIds.includes(id) ? 'Unsave message' : 'Save message';
    });
    const extra = pcContextMenu.querySelector('.pc-ctx-emoji-extra');
    if (extra) extra.hidden = true;
    pcContextMenu.classList.remove('hidden');
    pcContextMenu.style.visibility = 'hidden';
    pcContextMenu.style.left = '0px';
    pcContextMenu.style.top = '0px';
    const rect = pcContextMenu.getBoundingClientRect();
    const pad = 8;
    let left = x;
    let top = y;
    if (left + rect.width + pad > window.innerWidth) left = Math.max(pad, window.innerWidth - rect.width - pad);
    if (left < pad) left = pad;
    if (top + rect.height + pad > window.innerHeight) top = Math.max(pad, y - rect.height - 10);
    if (top < pad) top = pad;
    pcContextMenu.style.left = `${Math.round(left)}px`;
    pcContextMenu.style.top = `${Math.round(top)}px`;
    pcContextMenu.style.visibility = '';
  }
  function gotoChatMessage(id) {
    if (!publicChatMessages) return;
    const node = publicChatMessages.querySelector(`[data-chat-id="${id}"]`);
    if (!node) { toast('That message is no longer in the chat'); return; }
    node.scrollIntoView({ block: 'center', behavior: 'smooth' });
    node.classList.add('pc-flash');
    setTimeout(() => node.classList.remove('pc-flash'), 1200);
  }
  function handleChatAction(action, m) {
    if (!m) return;
    const id = m.id;
    if (action === 'reply') { setChatReply(m); return; }
    if (action === 'private') {
      if (m.userId === '__admin__') { toast('You cannot message yourself'); return; }
      selectedInboxPeer = m.userId || null;
      closePublicChat();
      openAdminInboxModal();
      return;
    }
    if (action === 'copy') {
      const text = String(m.text || '');
      const done = () => toast('Message copied');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(() => toast('Copy failed'));
      else toast('Copy not supported');
      return;
    }
    if (action === 'react') {
      openCtxFor(id, window.innerWidth / 2 - 120, window.innerHeight / 2 - 120);
      return;
    }
    if (action === 'forward') {
      socket.emit('chat_forward', { id }, (res) => {
        if (res && res.ok) toast('Message forwarded');
        else toast((res && res.msg) || 'Could not forward');
      });
      return;
    }
    if (action === 'pin') {
      socket.emit('chat_pin', { id }, (res) => {
        if (res && res.ok) toast(res.msg === 'Unpinned' ? 'Message unpinned' : 'Message pinned');
        else toast((res && res.msg) || 'Could not pin');
      });
      return;
    }
    if (action === 'save') {
      socket.emit('chat_save', { id }, (res) => {
        if (res && res.ok) { if (Array.isArray(res.ids)) chatSavedIds = res.ids.slice(); toast(res.msg); renderPublicChat(); }
        else toast((res && res.msg) || 'Could not save');
      });
      return;
    }
    if (action === 'report') {
      if (chatReportPreview) chatReportPreview.textContent = `${m.name || 'Player'}: ${String(m.text || '').slice(0, 180)}`;
      if (chatReportReason) chatReportReason.value = '';
      chatReportPendingId = id;
      openModal(chatReportModal);
      return;
    }
    if (action === 'delete') {
      chatDeletePendingId = id;
      if (chatDeleteConfirmBtn) chatDeleteConfirmBtn.disabled = false;
      openModal(chatDeleteModal);
    }
  }
  let chatDeletePendingId = null;
  let chatReportPendingId = null;
  if (pcContextMenu) {
    pcContextMenu.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-emoji-toggle]');
      if (toggle) {
        const extra = pcContextMenu.querySelector('.pc-ctx-emoji-extra');
        if (extra) extra.hidden = !extra.hidden;
        return;
      }
      const emojiBtn = e.target.closest('[data-emoji]');
      if (emojiBtn) {
        const id = pcCtxMsgId;
        const emoji = emojiBtn.dataset.emoji;
        closeCtx();
        socket.emit('chat_react', { id, emoji }, (res) => { if (!res || !res.ok) toast((res && res.msg) || 'Could not react'); });
        return;
      }
      const item = e.target.closest('.pc-ctx-item');
      if (!item || item.disabled) return;
      const m = publicChatMsgs.find(v => v && v.id === pcCtxMsgId);
      const action = item.dataset.action;
      closeCtx();
      handleChatAction(action, m);
    });
  }
  document.addEventListener('click', (e) => {
    if (pcContextMenu && !pcContextMenu.classList.contains('hidden') && !pcContextMenu.contains(e.target) && !(e.target.closest && e.target.closest('.pc-more'))) closeCtx();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCtx(); });
  window.addEventListener('scroll', () => closeCtx(), true);

  if (publicChatMessages) {
    publicChatMessages.addEventListener('click', (e) => {
      const more = e.target.closest('.pc-more');
      if (more) {
        e.preventDefault();
        e.stopPropagation();
        const r = more.getBoundingClientRect();
        openCtxFor(more.dataset.chatId, r.right - 8, r.bottom + 6);
        return;
      }
    });
    publicChatMessages.addEventListener('contextmenu', (e) => {
      const node = e.target.closest('.pc-msg');
      if (!node) return;
      const id = node.getAttribute('data-chat-id');
      const m = publicChatMsgs.find(v => v && v.id === id);
      if (!m || m.deleted || m.type === 'rain' || m.rainId) return;
      e.preventDefault();
      openCtxFor(id, e.clientX, e.clientY);
    });
    let lpTimer = null;
    let lpPoint = null;
    publicChatMessages.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      const node = e.target.closest('.pc-msg');
      if (!node) return;
      const id = node.getAttribute('data-chat-id');
      const m = publicChatMsgs.find(v => v && v.id === id);
      if (!m || m.deleted || m.type === 'rain' || m.rainId) return;
      lpPoint = { x: e.clientX, y: e.clientY };
      lpTimer = setTimeout(() => {
        lpTimer = null;
        openCtxFor(id, lpPoint.x, lpPoint.y);
        if (navigator.vibrate) { try { navigator.vibrate(15); } catch (err) { } }
      }, 500);
    });
    const cancelLp = (e) => {
      if (!lpTimer) return;
      if (e && e.type === 'pointermove' && lpPoint && Math.hypot(e.clientX - lpPoint.x, e.clientY - lpPoint.y) < 10) return;
      clearTimeout(lpTimer);
      lpTimer = null;
    };
    publicChatMessages.addEventListener('pointerup', cancelLp);
    publicChatMessages.addEventListener('pointercancel', cancelLp);
    publicChatMessages.addEventListener('pointermove', cancelLp);
  }
  if (publicChatPinned) publicChatPinned.addEventListener('click', (e) => {
    const b = e.target.closest('[data-goto]');
    if (b) gotoChatMessage(b.dataset.goto);
  });
  if (publicChatSavedBtn) publicChatSavedBtn.addEventListener('click', () => { chatSavedFilter = !chatSavedFilter; renderPublicChat(); });  if (publicChatSavedClear) publicChatSavedClear.addEventListener('click', () => { chatSavedFilter = false; renderPublicChat(); });
  if (chatReportCloseBtn) chatReportCloseBtn.addEventListener('click', () => closeModal(chatReportModal));
  if (chatReportModal) chatReportModal.addEventListener('click', (e) => { if (e.target === chatReportModal) closeModal(chatReportModal); });
  if (chatReportSubmit) chatReportSubmit.addEventListener('click', () => {
    if (!chatReportPendingId) return;
    chatReportSubmit.disabled = true;
    socket.emit('chat_report', { id: chatReportPendingId, reason: chatReportReason ? chatReportReason.value : '' }, (res) => {
      chatReportSubmit.disabled = false;
      if (res && res.ok) {
        closeModal(chatReportModal);
        chatReportPendingId = null;
        toast('Report submitted to admin moderation');
      } else {
        toast((res && res.msg) || 'Could not submit report');
      }
    });
  });
  if (chatDeleteCloseBtn) chatDeleteCloseBtn.addEventListener('click', () => closeModal(chatDeleteModal));
  if (chatDeleteCancelBtn) chatDeleteCancelBtn.addEventListener('click', () => closeModal(chatDeleteModal));
  if (chatDeleteModal) chatDeleteModal.addEventListener('click', (e) => { if (e.target === chatDeleteModal) closeModal(chatDeleteModal); });
  if (chatDeleteConfirmBtn) chatDeleteConfirmBtn.addEventListener('click', () => {
    const id = chatDeletePendingId;
    if (!id) { closeModal(chatDeleteModal); return; }
    chatDeleteConfirmBtn.disabled = true;
    socket.emit('admin_chat_delete', { id }, (res) => {
      chatDeleteConfirmBtn.disabled = false;
      closeModal(chatDeleteModal);
      if (res && res.ok) {
        chatDeletePendingId = null;
        if (res.message) {
          const idx = publicChatMsgs.findIndex(x => x && x.id === id);
          if (idx !== -1) publicChatMsgs[idx] = res.message;
          else publicChatMsgs.push(res.message);
        }
        renderPublicChat();
      } else {
        toast((res && res.msg) || 'Could not delete message');
      }
    });
  });
  function renderChatReports() {
    if (chatReportsList) {
      const rows = chatReportsData.slice().reverse();
      chatReportsList.innerHTML = rows.length ? rows.map(r => `<div class="pc-report-row"><div class="pc-report-head"><strong>${esc(r.reporterName || (r.reporter === '__admin__' ? 'Admin' : 'Player'))}</strong><span>${r.at ? fmtThreadTime(r.at) : ''}</span></div><div class="pc-report-body">${esc(r.messageAuthor || 'Player')}: ${esc(r.messagePreview || '')}</div><div class="pc-report-reason">${esc(r.reason || 'No reason provided')}</div></div>`).join('') : '<div class="muted" style="padding:12px">No reports yet.</div>';
    }
    if (chatAuditList) {
      const rows = chatAuditData.slice().reverse();
      chatAuditList.innerHTML = rows.length ? rows.map(a => `<div class="pc-report-row"><div class="pc-report-head"><strong>${esc(a.action || '')}</strong><span>${a.at ? fmtThreadTime(a.at) : ''}</span></div><div class="pc-report-body">${esc(a.detail || '')}</div></div>`).join('') : '<div class="muted" style="padding:12px">No audit entries yet.</div>';
    }
  }
  if (publicChatReportsBtn) publicChatReportsBtn.addEventListener('click', () => { renderChatReports(); openModal(chatReportsModal); });
  if (chatReportsCloseBtn) chatReportsCloseBtn.addEventListener('click', () => closeModal(chatReportsModal));
  if (chatReportsModal) chatReportsModal.addEventListener('click', (e) => { if (e.target === chatReportsModal) closeModal(chatReportsModal); });
  if (chatReportsModal) {
    chatReportsModal.querySelectorAll('.pc-tab').forEach(tab => tab.addEventListener('click', () => {
      chatReportsModal.querySelectorAll('.pc-tab').forEach(t => t.classList.toggle('active', t === tab));
      const isAudit = tab.dataset.tab === 'audit';
      if (chatReportsList) chatReportsList.classList.toggle('hidden', isAudit);
      if (chatAuditList) chatAuditList.classList.toggle('hidden', !isAudit);
    }));
  }

  function updateAdminRainSummary() {
    const amount = Math.max(10, Math.min(1000, Math.floor(Number(adminRainAmount && adminRainAmount.value) || 0) || 10));
    const players = Math.max(1, Math.min(10, Math.floor(Number(adminRainPlayers && adminRainPlayers.value) || 0) || 1));
    if (adminRainSummary) adminRainSummary.textContent = `Total: ${fmtMoney(amount * players)} (${players} × ${fmtMoney(amount)})`;
  }
  function openAdminRain() {
    if (!adminRainModal) return;
    if (adminRainAmount) adminRainAmount.value = 20;
    if (adminRainPlayers) adminRainPlayers.value = 5;
    updateAdminRainSummary();
    openModal(adminRainModal);
  }
  if (adminRainBtn) adminRainBtn.addEventListener('click', openAdminRain);
  if (adminRainCloseBtn) adminRainCloseBtn.addEventListener('click', () => closeModal(adminRainModal));
  if (adminRainCancelBtn) adminRainCancelBtn.addEventListener('click', () => closeModal(adminRainModal));
  if (adminRainModal) adminRainModal.addEventListener('click', (e) => { if (e.target === adminRainModal) closeModal(adminRainModal); });
  if (adminRainAmount) adminRainAmount.addEventListener('input', updateAdminRainSummary);
  if (adminRainPlayers) adminRainPlayers.addEventListener('input', updateAdminRainSummary);
  if (adminRainSendBtn) adminRainSendBtn.addEventListener('click', () => {
    const rawAmount = Math.floor(Number(adminRainAmount && adminRainAmount.value) || 0);
    const rawPlayers = Math.floor(Number(adminRainPlayers && adminRainPlayers.value) || 0);
    const amount = Math.max(10, Math.min(1000, rawAmount || 10));
    const players = Math.max(1, Math.min(10, rawPlayers || 1));
    if (adminRainAmount) adminRainAmount.value = amount;
    if (adminRainPlayers) adminRainPlayers.value = players;
    updateAdminRainSummary();
    adminRainSendBtn.disabled = true;
    socket.emit('admin_rain_send', { amount, players }, (res) => {
      adminRainSendBtn.disabled = false;
      if (res && res.ok) { closeModal(adminRainModal); toast('Rain sent'); }
      else toast((res && res.msg) || 'Failed to send rain');
    });
  });
  setInterval(() => { if (publicChatModal && publicChatModal.classList.contains('show')) refreshAdminRainCards(); }, 1000);

  mfActionAdd.addEventListener('click', () => { mfSelectedAction = 'add'; setMfActionUI(); updateMfPreview(); });
  mfActionDeduct.addEventListener('click', () => { mfSelectedAction = 'deduct'; setMfActionUI(); updateMfPreview(); });
  mfAmount.addEventListener('input', updateMfPreview);
  mfUserSelect.addEventListener('change', updateMfPreview);

  function setMfActionUI() {
    if (mfSelectedAction === 'add') {
      mfActionAdd.style.background = '#059669';
      mfActionAdd.style.color = '#fff';
      mfActionDeduct.style.background = '#6b7280';
      mfActionDeduct.style.color = '#fff';
    } else {
      mfActionDeduct.style.background = '#dc2626';
      mfActionDeduct.style.color = '#fff';
      mfActionAdd.style.background = '#6b7280';
      mfActionAdd.style.color = '#fff';
    }
    mfExecuteBtn.style.background = mfSelectedAction === 'add' ? '#059669' : '#dc2626';
    mfExecuteBtn.textContent = mfSelectedAction === 'add' ? 'Add Funds' : 'Deduct Funds';
  }

  mfExecuteBtn.addEventListener('click', () => {
    const userId = mfUserSelect.value;
    if (!userId) { toast('Select a player'); return; }
    const amt = Number(mfAmount.value);
    if (!isFinite(amt) || amt <= 0) { toast('Enter a valid amount'); return; }
    const reason = mfSelectedAction === 'add' ? 'Funds added by admin' : 'Funds deducted by admin';
    const origText = mfExecuteBtn.textContent;
    mfExecuteBtn.disabled = true;
    mfExecuteBtn.textContent = 'Processing...';
    adminPost('/api/admin/manage-finances', { user_id: userId, type: mfSelectedAction, amount: amt, reason, admin: 'admin' }).then(res => {
      toast(`Funds ${mfSelectedAction === 'add' ? 'added' : 'deducted'}: KSh ${amt.toFixed(2)}`);
      mfAmount.value = '';
      renderManageFinancesUsers();
      if (res && res.player) {
        const opts = mfUserSelect.options;
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].value === res.player.token) {
            opts[i].text = `${esc(res.player.username || 'Player')} (${esc(res.player.token)}) - Balance: ${fmtMoney(res.player.balance)}`;
            break;
          }
        }
        // Push updated balance into last so view user modal reflects it immediately
        if (last && last.players) {
          const idx = last.players.findIndex(p => p && p.token === res.player.token);
          if (idx >= 0) last.players[idx].balance = res.player.balance;
        }
        // Re-render view user modal if open for this user
        if (viewUserModal && viewUserModal.classList.contains('show') && viewUserSelectedPeer === res.player.token && viewUserActiveTab) {
          showViewUserTab(viewUserActiveTab);
        }
      }
      usersDirty = true;
      viewUserDirty = true;
    }).catch(err => toast(err.message || 'Failed to adjust funds')).finally(() => {
      mfExecuteBtn.disabled = false;
      mfExecuteBtn.textContent = origText;
    });
  });

  wdSearch.addEventListener('input', () => renderPayments());
  depSearch.addEventListener('input', () => renderPayments());
  failSearch.addEventListener('input', () => renderPayments());
  historySearch.addEventListener('input', () => renderHistory());
  adminInboxSearch.addEventListener('input', () => { renderAdminInboxThreads(); renderAdminInboxConversation(); });
  usersSearch.addEventListener('input', () => { usersDirty = true; renderUsers(); });

  usersTableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-token]');
    if (row) viewUserOpen(row.dataset.token);
  });
  wdViewAll.addEventListener('change', () => renderPayments());

  modalCloses.forEach(btn => btn.addEventListener('click', () => closeAllModals()));
  wdCloseBtn.addEventListener('click', () => closeModal(withdrawalsModal));
  depCloseBtn.addEventListener('click', () => closeModal(depositsModal));
  failCloseBtn.addEventListener('click', () => closeModal(failedModal));
  msgCancelBtn.addEventListener('click', () => closeModal(messageModal));
  inboxCloseBtn.addEventListener('click', () => closeAdminInboxModal());
  awardFreebetCloseBtn.addEventListener('click', () => closeModal(awardFreebetModal));
  usersCloseBtn.addEventListener('click', () => closeModal(usersModal));

  [withdrawalsModal, depositsModal, failedModal, messageModal, inboxModal, awardFreebetModal, usersModal, viewUserModal, historyModal, manageFinancesModal].forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });
  inboxModal.addEventListener('click', (e) => { if (e.target === inboxModal) saveAdminInboxState(false); });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });

  function handleTableAction(btn) {
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (!id) return;
    if (action === 'wd-approve') {
      adminPost(`/api/admin/withdrawals/${id}/approve`, { admin: 'admin' }).then(() => { toast('Withdrawal approved'); renderPayments(); viewUserDirty = true; }).catch(err => toast(err.message));
    } else if (action === 'wd-reject') {
      adminPost(`/api/admin/withdrawals/${id}/reject`, { admin: 'admin' }).then(() => { toast('Withdrawal rejected'); renderPayments(); viewUserDirty = true; }).catch(err => toast(err.message));
    } else if (action === 'dep-approve') {
      adminPost(`/api/admin/deposits/${id}/approve`, { admin: 'admin' }).then(() => { toast('Deposit approved'); renderPayments(); viewUserDirty = true; }).catch(err => toast(err.message));
    } else if (action === 'dep-reject') {
      adminPost(`/api/admin/deposits/${id}/reject`, { admin: 'admin' }).then(() => { toast('Deposit rejected'); renderPayments(); viewUserDirty = true; }).catch(err => toast(err.message));
    }
  }

  wdTableBody.addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (btn) handleTableAction(btn); });
  depTableBody.addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (btn) handleTableAction(btn); });
  viewUserTabContent.addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (btn) handleTableAction(btn); });

  adminInboxSend.addEventListener('click', () => {
    if (!selectedInboxPeer) { toast('Select a conversation'); return; }
    const text = (adminInboxInput && adminInboxInput.value || '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    adminInboxSend.disabled = true;
    const rt = (adminDmReply && adminDmReply.id) ? { replyToId: adminDmReply.id } : {};
      socket.emit('admin_send_message', Object.assign({ to: [selectedInboxPeer], text }, rt), (res) => {
      adminInboxSend.disabled = false;
      if (res && res.ok) {
        adminInboxInput.value = '';
        adminDmReply = null;
        adminInboxInput.placeholder = 'Type a message...';
        // broadcastAdmin() delivers the real message via admin_state within ~100ms;
        // no optimistic append needed (avoids duplicate with server copy)
        adminInboxInput.focus();
      } else {
        toast((res && res.msg) || 'Failed to send');
      }
    });
  });
  adminInboxInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); adminInboxSend.click(); } });

  msgSendBtn.addEventListener('click', () => {
    const tokens = (last && last.players || []).filter(p => p && p.token && p.token !== '__admin__').map(p => p.token);
    if (!tokens.length) { toast('No players found'); return; }
    const text = msgText.value.trim();
    if (!text) { toast('Enter a message'); return; }
    socket.emit('admin_send_message', { to: tokens, text, popup: true }, (res) => {
      if (res && res.ok) {
        toast('Broadcast message sent to ' + tokens.length + ' player(s)');
        msgText.value = '';
        closeModal(messageModal);
      } else {
        toast((res && res.msg) || 'Failed to send');
      }
    });
  });

  awardFreebetSendBtn.addEventListener('click', () => {
    const amount = Number(awardFreebetAmount.value);
    if (!amount || amount <= 0) { toast('Enter a valid amount'); return; }
    const expiresMins = Number(awardFreebetExpires.value);
    if (!expiresMins || expiresMins <= 0) { toast('Enter a valid expiry'); return; }
    const players = (last && last.players || []).filter(p => p && p.token && p.token !== '__admin__');
    if (!players.length) { toast('No players found'); return; }
    const to = players.map(p => p.token);
    awardFreebetSendBtn.disabled = true;
    socket.emit('freebet_award', { to, amount, expiresMs: expiresMins * 60 * 1000 }, (res) => {
      awardFreebetSendBtn.disabled = false;
      if (res && res.ok) {
        toast('Freebet awarded to ' + to.length + ' player(s)');
        awardFreebetAmount.value = '';
        awardFreebetExpires.value = '30';
        closeModal(awardFreebetModal);
      } else {
        toast((res && res.msg) || 'Failed to award');
      }
    });
  });

  const savedKey = localStorage.getItem(STORAGE_KEY);
  if (savedKey) {
    adminKeyInput.value = savedKey;
    connectSocket();
  }

  setInterval(() => { render(); renderPayments(); renderHistory(); }, 100);

})();
