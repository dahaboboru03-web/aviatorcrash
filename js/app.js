(() => {

  const ui = {
    canvas: document.getElementById('gameCanvas'),
    multiplier: document.getElementById('multiplier'),
    crashLabel: document.getElementById('crashLabel'),
    countdown: document.getElementById('countdown'),
    roundStatus: document.getElementById('roundStatus'),
    resultsStrip: document.getElementById('resultsStrip'),
    historyBody: document.getElementById('historyBody'),
    historyMeta: document.getElementById('historyMeta'),
    htabs: Array.from(document.querySelectorAll('.htab')),
    historyTableWrap: document.getElementById('historyTableWrap'),
    chatWrap: document.getElementById('chatWrap'),
    chatBtn: document.getElementById('chatBtn'),
    chatModal: document.getElementById('chatModal'),
    chatCloseBtn: document.getElementById('chatCloseBtn'),
    chatMessages: document.getElementById('chatMessages'),
    chatTyping: document.getElementById('chatTyping'),
    chatTypingText: document.getElementById('chatTypingText'),
    chatForm: document.getElementById('chatForm'),
    chatInput: document.getElementById('chatInput'),
    chatSend: document.getElementById('chatSend'),
    chatUnreadBadge: document.getElementById('chatUnreadBadge'),
    chatPinnedBar: document.getElementById('chatPinnedBar'),
    chatSavedBtn: document.getElementById('chatSavedBtn'),
    chatReplyBar: document.getElementById('chatReplyBar'),
    chatReplyName: document.getElementById('chatReplyName'),
    chatReplyText: document.getElementById('chatReplyText'),
    chatReplyCancel: document.getElementById('chatReplyCancel'),
    chatContextMenu: document.getElementById('chatContextMenu'),
    inboxCtxMenu: document.getElementById('inboxCtxMenu'),
    chatCtxReactions: document.getElementById('chatCtxReactions'),
    userReportModal: document.getElementById('userReportModal'),
    userReportPreview: document.getElementById('userReportPreview'),
    userReportReason: document.getElementById('userReportReason'),
    userReportSubmit: document.getElementById('userReportSubmit'),
    userReportCloseBtn: document.getElementById('userReportCloseBtn'),
    chatDeleteModal: document.getElementById('chatDeleteModal'),
    chatDeleteConfirmBtn: document.getElementById('chatDeleteConfirmBtn'),
    chatDeleteCancelBtn: document.getElementById('chatDeleteCancelBtn'),
    chatDeleteCloseBtn: document.getElementById('chatDeleteCloseBtn'),
    rainBtn: document.getElementById('rainBtn'),
    rainModal: document.getElementById('rainModal'),
    rainAmount: document.getElementById('rainAmount'),
    rainPlayers: document.getElementById('rainPlayers'),
    rainSummary: document.getElementById('rainSummary'),
    rainSendBtn: document.getElementById('rainSendBtn'),
    rainCancelBtn: document.getElementById('rainCancelBtn'),
    rainCloseBtn: document.getElementById('rainCloseBtn'),
    balance: document.getElementById('balance'),
    toast: document.getElementById('toast'),
    profileBtn: document.getElementById('profileBtn'),
    profileName: document.getElementById('profileName'),
    profileSub: document.getElementById('profileSub'),
    avatar: document.getElementById('avatar'),
    profilePhone: document.getElementById('profilePhone'),
    profileLogout: document.getElementById('profileLogout'),
    panels: [document.querySelector('.bet-panel[data-panel="0"]'), document.querySelector('.bet-panel[data-panel="1"]')],
    amount: [document.getElementById('amount-0'), document.getElementById('amount-1')],
    auto: [document.getElementById('auto-0'), document.getElementById('auto-1')],
    action: [document.getElementById('action-0'), document.getElementById('action-1')],
    status: [document.getElementById('status-0'), document.getElementById('status-1')],
    manualCtrl: [document.getElementById('manual-0'), document.getElementById('manual-1')],
    autoCtrl: [document.getElementById('autoctrl-0'), document.getElementById('autoctrl-1')],
    autoAmount: [document.getElementById('auto-amount-0'), document.getElementById('auto-amount-1')],
    autoRounds: [document.getElementById('auto-rounds-0'), document.getElementById('auto-rounds-1')],
    autoTarget: [document.getElementById('auto-target-0'), document.getElementById('auto-target-1')],
    autoMeta: [document.getElementById('auto-meta-0'), document.getElementById('auto-meta-1')],
    autoAction: [document.getElementById('auto-action-0'), document.getElementById('auto-action-1')],
    autoSub: [document.getElementById('auto-sub-0'), document.getElementById('auto-sub-1')],
    autoCashout: [document.getElementById('auto-cashout-0'), document.getElementById('auto-cashout-1')],
    autoCashoutSub: [document.getElementById('auto-cashout-sub-0'), document.getElementById('auto-cashout-sub-1')],
    tabs: [Array.from(document.querySelectorAll('.tab[data-panel="0"]')), Array.from(document.querySelectorAll('.tab[data-panel="1"]'))],
    modal: document.getElementById('profileModal'),
    modalClose: document.getElementById('profileClose'),
    modalCancel: document.getElementById('profileCancel'),
    modalSave: document.getElementById('profileSave'),
    usernameInput: document.getElementById('usernameInput'),
    avatarGrid: document.getElementById('avatarGrid'),
    profileAvatarPreview: document.getElementById('profileAvatarPreview'),
    profileNamePreview: document.getElementById('profileNamePreview'),
    profileVipBadge: document.getElementById('profileVipBadge'),
    profileVipStatus: document.getElementById('profileVipStatus'),
    vipHint: document.getElementById('vipHint'),
    depositModal: document.getElementById('depositModal'),
    depositClose: document.getElementById('depositClose'),
    depositCancel: document.getElementById('depositCancel'),
    depositConfirm: document.getElementById('depositConfirm'),
    depositPhone: document.getElementById('depositPhone'),
    depositAmount: document.getElementById('depositAmount'),
    depositQuick: document.getElementById('depositQuick'),
    depositStatusMsg: document.getElementById('depositStatusMsg'),
    withdrawModal: document.getElementById('withdrawModal'),
    withdrawClose: document.getElementById('withdrawClose'),
    withdrawCancel: document.getElementById('withdrawCancel'),
    withdrawConfirm: document.getElementById('withdrawConfirm'),
    withdrawPhone: document.getElementById('withdrawPhone'),
    withdrawAmount: document.getElementById('withdrawAmount'),
    withdrawInfo: document.getElementById('withdrawInfo'),
    withdrawLimits: document.getElementById('withdrawLimits'),
    withdrawStatusMsg: document.getElementById('withdrawStatusMsg'),
    txModal: document.getElementById('txModal'),
    txClose: document.getElementById('txClose'),
    txBody: document.getElementById('txBody'),
    txHistoryBtn: document.getElementById('txHistoryBtn'),
  rulesBtn: document.getElementById('rulesBtn'),
  rulesModal: document.getElementById('rulesModal'),
  rulesClose: document.getElementById('rulesClose'),
    boosterpotModal: document.getElementById('boosterpotModal'),
    boosterpotAmount: document.getElementById('boosterpotAmount'),
    boosterpotCollect: document.getElementById('boosterpotCollect'),
    boosterpotSub: document.getElementById('boosterpotSub'),
    boosterpotHud: document.getElementById('boosterpotHud'),
    boosterpotHudCurrent: document.getElementById('boosterpotHudCurrent'),
    boosterpotHudTarget: document.getElementById('boosterpotHudTarget'),
    boosterpotHudFill: document.getElementById('boosterpotHudFill'),
    boosterpotHudPercent: document.getElementById('boosterpotHudPercent'),
    boosterpotHudRate: document.getElementById('boosterpotHudRate'),
    boosterpotHistoryModal: document.getElementById('boosterpotHistoryModal'),
    boosterpotHistoryClose: document.getElementById('boosterpotHistoryClose'),
    boosterpotHistoryList: document.getElementById('boosterpotHistoryList'),
    adminMessageModal: document.getElementById('adminMessageModal'),
    adminMessageClose: document.getElementById('adminMessageClose'),
    adminMessageText: document.getElementById('adminMessageText'),
    adminMessageOk: document.getElementById('adminMessageOk'),
    adminMessageGotoInbox: document.getElementById('adminMessageGotoInbox'),
    userInboxBtn: document.getElementById('userInboxBtn'),
    userInboxBadge: document.getElementById('userInboxBadge'),
    userInboxModal: document.getElementById('userInboxModal'),
    userInboxClose: document.getElementById('userInboxClose'),
    userInboxSearch: document.getElementById('userInboxSearch'),
    userInboxThreads: document.getElementById('userInboxThreads'),
    userInboxHeader: document.getElementById('userInboxHeader'),
    userInboxMessages: document.getElementById('userInboxMessages'),
    userInboxComposer: document.getElementById('userInboxComposer'),
    userInboxInput: document.getElementById('userInboxInput'),
    userInboxSend: document.getElementById('userInboxSend'),
    betWinsFilter: document.getElementById('betWinsFilter'),
    betWinsModal: document.getElementById('betWinsModal'),
    betWinsCloseBtn: document.getElementById('betWinsCloseBtn'),
    betWinsRangeModal: document.getElementById('betWinsRangeModal'),
    betWinsModeTabs: document.getElementById('betWinsModeTabs'),
    betWinsBody: document.getElementById('betWinsBody'),
    betWinsRange: document.getElementById('betWinsRange'),
    forwardModal: document.getElementById('forwardModal'),
    forwardList: document.getElementById('forwardList'),
    forwardSend: document.getElementById('forwardSend'),
    forwardClose: document.getElementById('forwardClose'),
    forwardCancel: document.getElementById('forwardCancel'),
    freebetModal: document.getElementById('freebetModal'),
    freebetClose: document.getElementById('freebetClose'),
    freebetList: document.getElementById('freebetList')
  };
  const ctx = ui.canvas.getContext('2d');

  const TOKEN_KEY = 'aviator_player_token';
  const client = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    connected: false,
    serverOffset: 0,
    config: { growthRate: 0.06, bettingMs: 5000, crashedMs: 3000, avatars: [] },
    state: null,
    selectedAvatar: 'P',
    panelMode: ['manual', 'manual'],
    autoAmountDirty: [false, false],
    autoRoundsDirty: [false, false],
    liveBetsTab: 'all',
    payments: null,
    paymentsSettings: { minWithdrawal: 50, maxWithdrawal: 70000 },
    chat: [],
    chatPins: [],
    chatSaved: [],
    chatReplyTo: null,
    chatSavedFilter: false,
    chatCtxMsgId: null,
    typingUsers: {},
    typingEmitAt: 0,
    rains: [],
    chatSeenId: (() => { try { return localStorage.getItem('aviator_chat_seen') || ''; } catch (e) { return ''; } })(),
    boosterpot: null,
    shownBoosterpotWinId: null,
    shownBoosterpotNoticeAt: 0,
    collectingBoosterpot: false,
    contacts: [],
    directMessages: [],
    dmReadAt: {},
    selectedInboxPeer: null,
    freebets: [],
    freebetTimers: {}
  };

  function fmtMoney(n) {
    return 'KSh ' + Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtTime(ms){ if(!ms) return '—'; const d=new Date(ms); return d.toLocaleString(); }
  function round2(n) { return Math.floor(n * 100) / 100; }
  function serverNow() { return Date.now() + client.serverOffset; }

  function showToast(msg, ms = 2600, type) {
    ui.toast.textContent = msg;
    ui.toast.classList.toggle('warn', type === 'warn');
    ui.toast.classList.toggle('rain', type === 'rain');
    ui.toast.classList.toggle('gold', type === 'gold');
    ui.toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => { ui.toast.classList.remove('show'); }, ms);
  }

  async function api(path, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json', 'x-player-token': client.token || '' }, opts.headers || {});
    const res = await fetch(path, Object.assign({}, opts, { headers }));
    let data = null;
    try { data = await res.json(); } catch { data = null; }
    if (!res.ok) {
      const err = new Error((data && data.msg) || ('Request failed (' + res.status + ')'));
      err.data = data; err.status = res.status; throw err;
    }
    return data || {};
  }

  function normalizePhoneInput(v) {
    if (v == null) return null;
    let s = String(v).trim().replace(/[\s\-()]/g, '');
    if (/^\+254\d{9}$/.test(s)) s = s.slice(1);
    if (/^254\d{9}$/.test(s)) return s;
    if (/^0\d{9}$/.test(s)) return '254' + s.slice(1);
    if (/^[17]\d{8}$/.test(s)) return '254' + s;
    return null;
  }

  function openModal(el){ if(!el) return; el.classList.add('show'); el.classList.remove('hidden'); el.setAttribute('aria-hidden','false'); }
  function closeModal(el){ if(!el) return; el.classList.remove('show'); el.setAttribute('aria-hidden','true'); }

  function resize() {
    const rect = ui.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ui.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    ui.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function resultClass(mult) {
    if (mult >= 10) return 'top';
    if (mult >= 5) return 'high';
    if (mult >= 2) return 'mid';
    return 'low';
  }

  function renderRecent(recent) {
    ui.resultsStrip.innerHTML = (recent || []).map(m => `<span class="result-chip ${resultClass(m)}">${Number(m).toFixed(2)}x</span>`).join('');
  }

  function computeDisplayRound(round) {
    if (!round) return null;
    const t = serverNow();
    let multiplier = 1;
    let remainingMs = 0;
    if (round.state === 'BETTING') {
      multiplier = 1;
      remainingMs = Math.max(0, (round.bettingEndsAt || 0) - t);
    } else if (round.state === 'RUNNING') {
      const elapsed = Math.max(0, t - (round.startedAt || t));
      multiplier = Math.min(round.crashPoint, Math.max(1, round2(Math.exp(client.config.growthRate * (elapsed / 1000)))));
    } else if (round.state === 'CRASHED') {
      multiplier = round.crashPoint;
      remainingMs = Math.max(0, (round.nextAt || 0) - t);
    }
    return Object.assign({}, round, { multiplier, remainingMs, displayTime: t });
  }

  function getPanelAmount(i) {
    const v = parseFloat(ui.amount[i].value);
    return isFinite(v) ? Math.max(10, Math.floor(v)) : 100;
  }

  function myBetForPanel(state, panel) {
    const current = state.round && state.round.roundId;
    const nextId = state.round && state.round.nextRoundId;
    const mine = (state.bets || []).filter(x => x.isMine && x.panel === panel);
    let b = mine.find(x => x.status === 'QUEUED' && x.roundId === nextId);
    if (b) return b;
    b = mine.find(x => x.roundId === current && (x.status === 'FLYING' || x.status === 'BET_PLACED' || x.status === 'CASHED_OUT' || x.status === 'LOST'));
    if (b) return b;
    b = mine.find(x => x.roundId === current);
    if (b) return b;
    if (mine.length) return mine[0];
    const act = (state.myActiveBets || []).find(x => x && x.panel === panel);
    return act || null;
  }

  function setPanelMode(panel, mode) {
    client.panelMode[panel] = mode;
    ui.manualCtrl[panel].classList.toggle('hidden', mode !== 'manual');
    ui.autoCtrl[panel].classList.toggle('hidden', mode !== 'auto');
    ui.tabs[panel].forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  }

  function getAutoState(panel) {
    const p = client.state && client.state.player;
    const a = p && p.auto && p.auto[panel];
    return a || { running: false, amount: 100, roundsTotal: 0, roundsRemaining: 0, autoCashout: null, status: 'AUTO STOPPED', lastError: null };
  }

  function panelBetStatus(state, panel) {
    const round = state.round;
    const current = round && round.roundId;
    const nextId = round && round.nextRoundId;
    const auto = getAutoState(panel);
    const b = myBetForPanel(state, panel);
    // priority by active/queued bet state for this round context
    if (b && b.status === 'QUEUED') return { text: 'BET QUEUED', cls: 'queued' };
    if (b && b.status === 'FLYING' && b.roundId === current) return { text: 'BET ACTIVE', cls: 'active' };
    if (b && b.status === 'BET_PLACED' && b.roundId === current) return { text: auto.running || auto.roundsRemaining > 0 ? 'BET ACTIVE' : 'BET PLACED', cls: 'active' };
    if (b && b.status === 'CASHED_OUT' && b.roundId === current) return { text: 'CASHED OUT', cls: 'won' };
    if (b && b.status === 'LOST' && b.roundId === current) return { text: 'ROUND LOST', cls: 'lost' };
    if (auto.status === 'INSUFFICIENT BALANCE') return { text: 'INSUFFICIENT BALANCE', cls: 'lost' };
    if (auto.running) return { text: auto.status || 'AUTO RUNNING', cls: 'active' };
    if (auto.status && auto.status !== 'AUTO STOPPED') return { text: auto.status, cls: auto.status === 'CASHED OUT' ? 'won' : (auto.status === 'ROUND LOST' ? 'lost' : '') };
    return { text: 'Ready', cls: '' };
  }

  function setMyStatusFromState(state) {
    [0,1].forEach(panel => {
      const s = panelBetStatus(state, panel);
      const auto = getAutoState(panel);
      let text = s.text;
      if (auto.running || auto.roundsRemaining > 0 || auto.status !== 'AUTO STOPPED') {
        text = `${text} · Remaining: ${auto.roundsRemaining || 0}`;
      }
      ui.status[panel].textContent = text;
      ui.status[panel].className = 'bet-status' + (s.cls ? ' ' + s.cls : '');
      const b = myBetForPanel(state, panel);
      ui.panels[panel].classList.toggle('has-queued', !!(b && b.status === 'QUEUED'));

      ui.autoMeta[panel].textContent = `${auto.status || 'AUTO STOPPED'} · Remaining: ${auto.roundsRemaining || 0}`;
      ui.autoMeta[panel].className = 'auto-meta ' + (auto.status === 'INSUFFICIENT BALANCE' ? 'error' : ((auto.running || auto.roundsRemaining > 0) ? 'running' : 'stopped'));
      if (!client.autoAmountDirty[panel] && document.activeElement !== ui.autoAmount[panel]) ui.autoAmount[panel].value = auto.amount || 100;
      if (!client.autoRoundsDirty[panel] && document.activeElement !== ui.autoRounds[panel] && !auto.running) ui.autoRounds[panel].value = Math.max(auto.roundsTotal || 10, 1);
      if (document.activeElement !== ui.autoTarget[panel]) ui.autoTarget[panel].value = (auto.autoCashout != null ? auto.autoCashout : '');
      ui.autoSub[panel].textContent = fmtMoney(Math.max(10, Math.floor(parseInt(ui.autoAmount[panel].value || '100', 10) || 100)));
      if (auto.running) {
        ui.autoAction[panel].className = 'action-btn stop-auto';
        ui.autoAction[panel].innerHTML = `STOP AUTO <span class="action-sub">Remaining: ${auto.roundsRemaining || 0}</span>`;
        ui.autoAction[panel].disabled = !client.connected;
      } else {
        const amt = Math.max(10, Math.floor(parseInt(ui.autoAmount[panel].value || '100', 10) || 100));
        ui.autoAction[panel].className = 'action-btn bet';
        ui.autoAction[panel].innerHTML = `START AUTO <span class="action-sub">${fmtMoney(amt)}</span>`;
        ui.autoAction[panel].disabled = !client.connected;
      }
    });
  }
function renderChatMessageHtml(m) {
    if (m.type === 'rain' || m.rainId) return renderRainMessageHtml(m);
    const mine = m.userId && client.token && m.userId === client.token;
    const timeAgo = m.at ? timeAgoString(m.at) : '';
    const isAdmin = !!m.isAdmin || m.userId === '__admin__';
    const vip = (!isAdmin && m.isVip) ? '<span class="vip-tag">VIP</span>' : '';
    const adminTag = isAdmin ? '<span class="admin-tag">ADMIN</span>' : '';
    const av = m.avatar ? `<span class="chat-avatar-sm" title="${escapeHtml(m.name || 'Player')}">${escapeHtml(m.avatar || m.name.charAt(0).toUpperCase())}</span>` : '';
    if (m.deleted) {
      const deletedRx = reactionSummary(m);
      const deletedKeys = Object.keys(deletedRx);
      const deletedReactions = deletedKeys.length ? `<div class="pc-reactions">${deletedKeys.map(e => `<span class="pc-reaction-chip">${e}${deletedRx[e] > 1 ? ` <b>${deletedRx[e]}</b>` : ''}</span>`).join('')}</div>` : '';
      const deleter = m.deletedByName || (m.deletedBy === 'author' ? (m.name || 'Player') : 'Admin');
      return `<div class="chat-msg${mine ? ' mine' : ''}${isAdmin ? ' admin-msg' : ''}" data-chat-id="${escapeHtml(m.id)}">
        <div class="chat-bubble${mine ? ' mine-bubble' : ''}">
          <div class="chat-head">${av ? `<span class="chat-avatar-sm${(!isAdmin && m.isVip) ? ' vip' : ''}${isAdmin ? ' admin-av' : ''}" title="${escapeHtml(m.name || 'Player')}">${escapeHtml(m.avatar || m.name.charAt(0).toUpperCase())}</span>` : ''}<span class="chat-name">${escapeHtml(m.name || 'Player')}</span>${adminTag}${vip}<span class="chat-time">${timeAgo}</span></div>
          <div class="chat-text chat-deleted-text">Message deleted by ${escapeHtml(deleter)}</div>
          ${deletedReactions}
        </div>
      </div>`;
    }
    const isCashout = m.type === 'cashout' || (!isAdmin && (m.text || '').trim().length < 120 && /^cashed out\s+[\d.]+x/i.test((m.text || '').trim()));
    const pinned = (client.chatPins || []).includes(m.id);
    const quote = m.replyPreview ? `<div class="pc-quote"><div class="pc-quote-name">${escapeHtml(m.replyPreview.name || 'Player')}</div><div class="pc-quote-text">${escapeHtml(m.replyPreview.text || '')}</div></div>` : '';
    const fwdName = (typeof m.forwardedFrom === 'string') ? m.forwardedFrom : ((m.forwardedFrom && m.forwardedFrom.name) || '');
const fwd = fwdName ? `<div class="pc-fwd">➦ Forwarded from ${escapeHtml(fwdName)}</div>` : '';
    const rx = reactionSummary(m);
    const rxKeys = Object.keys(rx);
    const reactionsHtml = rxKeys.length ? `<div class="pc-reactions">${rxKeys.map(e => `<span class="pc-reaction-chip">${e}${rx[e] > 1 ? ` <b>${rx[e]}</b>` : ''}</span>`).join('')}</div>` : '';
    const content = isCashout ? renderCashoutText(m) : escapeHtml(m.text || '');
    return `<div class="chat-msg${mine ? ' mine' : ''}${isAdmin ? ' admin-msg' : ''}${isCashout ? ' cashout-msg' : ''}" data-chat-id="${escapeHtml(m.id)}">
        <div class="chat-bubble${mine ? ' mine-bubble' : ''}">
          <div class="chat-head">${av ? `<span class="chat-avatar-sm${(!isAdmin && m.isVip) ? ' vip' : ''}${isAdmin ? ' admin-av' : ''}" title="${escapeHtml(m.name || 'Player')}">${escapeHtml(m.avatar || m.name.charAt(0).toUpperCase())}</span>` : ''}<span class="chat-name">${escapeHtml(m.name || 'Player')}</span>${adminTag}${vip}${pinned ? '<span class="pc-pin-tag">PINNED</span>' : ''}<span class="chat-time">${timeAgo}</span></div>
          <div class="chat-text-wrap"><div class="chat-text">${quote}${fwd}${content}</div><button type="button" class="chat-more" data-chat-id="${escapeHtml(m.id)}" title="Message actions" aria-label="Message actions">⋮</button></div>
          ${reactionsHtml}
        </div>
      </div>`;
  }

  function reactionSummary(m) {
    const out = {};
    const r = (m && m.reactions && typeof m.reactions === 'object') ? m.reactions : {};
    Object.keys(r).forEach(k => { const e = r[k]; if (e) out[e] = (out[e] || 0) + 1; });
    return out;
  }

  function renderChatTyping() {
    if (!ui.chatTyping) return;
    const now = Date.now();
    Object.keys(client.typingUsers || {}).forEach(k => { if (now - (client.typingUsers[k].at || 0) > 4000) delete client.typingUsers[k]; });
    const names = Object.keys(client.typingUsers || {}).map(k => client.typingUsers[k].name).filter(Boolean);
    if (!names.length) {
      ui.chatTyping.classList.add('hidden');
      return;
    }
    let text;
    if (names.length === 1) text = `${names[0]} is Typing…`;
    else if (names.length === 2) text = `${names[0]} and ${names[1]} are Typing…`;
    else if (names.length === 3) text = `${names[0]}, ${names[1]} and ${names[2]} are Typing…`;
    else text = 'Several people are Typing…';
    if (ui.chatTypingText) ui.chatTypingText.textContent = text;
    ui.chatTyping.classList.remove('hidden');
  }

  function renderChatPinnedBar() {
    if (!ui.chatPinnedBar) return;
    const items = (client.chatPins || []).map(id => (client.chat || []).find(m => m && m.id === id)).filter(m => m && !m.deleted);
    ui.chatPinnedBar.classList.toggle('hidden', !items.length);
    ui.chatPinnedBar.innerHTML = items.map(m => `<button type="button" class="pc-pin-item" data-goto="${escapeHtml(m.id)}"><span class="pc-pin-ico">📌</span><span class="pc-pin-body"><b>${escapeHtml(m.name || 'Player')}</b> · ${escapeHtml(String(m.text || '').replace(/\s+/g, ' ').slice(0, 70))}</span></button>`).join('');
  }

  function renderChat(forceBottom) {
    if (!ui.chatMessages) return;
    let msgs = (client.chat || []).filter(m => !isRainHidden(m));
    if (client.chatSavedFilter) msgs = msgs.filter(m => (client.chatSaved || []).includes(m.id));
    const el = ui.chatMessages;
    const atBottom = forceBottom || el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    const prevScrollTop = el.scrollTop;
    el.innerHTML = msgs.map(m => renderChatMessageHtml(m)).join('') || '<div class="muted" style="margin:auto;text-align:center;padding:20px">No messages yet. Be the first to chat!</div>';
    if (atBottom) el.scrollTop = el.scrollHeight;
    else el.scrollTop = prevScrollTop;
    if (ui.chatSavedBtn) ui.chatSavedBtn.classList.toggle('active', !!client.chatSavedFilter);
    renderChatPinnedBar();
    refreshRainCards();
  }

  function findRain(id) {
    return (client.rains || []).find(r => r && r.id === id) || null;
  }
  function rainFor(m) { return findRain(m.rainId) || m.rain || null; }
  function isRainHidden(m) {
    if (!(m.type === 'rain' || m.rainId)) return false;
    const r = rainFor(m);
    if (!r) return true;
    const left = (r.expiresAt || 0) - serverNow();
    return left <= 0 || (r.claimedCount || 0) >= r.maxClaimers;
  }
  function renderRainMessageHtml(m) {
    const r = rainFor(m);
    const id = m.rainId || (r && r.id) || '';
    const amount = r ? r.amount : '';
    const senderToken = (r && r.from) || m.userId;
    const mine = senderToken && client.token && senderToken === client.token;
    const fromAdmin = senderToken === '__admin__' || m.isAdmin;
    const label = fromAdmin ? '<span class="rain-admin-btn">👑 ADMIN</span>' : `<span class="rain-label">Rain from ${escapeHtml(m.name || 'Player')}</span>`;
    return `<div class="chat-msg rain-msg${mine ? ' mine' : ''}" data-rain-id="${escapeHtml(id)}">
        <div class="rain-card" data-rain-id="${escapeHtml(id)}">
          <div class="rain-head"><span class="rain-icon">🌧️</span>${label}<span class="rain-timer"></span></div>
          <div class="rain-amt">KSh ${escapeHtml(String(amount))} each · <span class="rain-spots"></span></div>
          <button type="button" class="rain-claim-btn" data-rain-id="${escapeHtml(id)}">Claim</button>
        </div>
      </div>`;
  }
  function refreshRainCards() {
    if (!ui.chatMessages) return;
    ui.chatMessages.querySelectorAll('.rain-card').forEach(card => {
      const id = card.getAttribute('data-rain-id');
      const r = findRain(id);
      const left = r ? Math.max(0, Math.ceil((r.expiresAt - serverNow()) / 1000)) : 0;
      const expired = !r || left <= 0;
      const full = !!r && (r.claimedCount || 0) >= r.maxClaimers;
      const timerEl = card.querySelector('.rain-timer');
      const spotsEl = card.querySelector('.rain-spots');
      const btn = card.querySelector('.rain-claim-btn');
      const claimedBy = (r && r.claimedBy) || [];
      const claimed = claimedBy.indexOf(client.token) !== -1;
      const mine = !!r && r.from === client.token;
      const spotsLeft = r ? Math.max(0, r.maxClaimers - (r.claimedCount || 0)) : 0;
      if (timerEl) timerEl.textContent = expired ? 'Expired' : `${left}s`;
      if (spotsEl) spotsEl.textContent = r ? (full ? 'All claimed' : `${spotsLeft}/${r.maxClaimers} left`) : '';
      if (btn) {
        let label = 'Claim', disabled = false;
        if (mine) { label = 'Your rain'; disabled = true; }
        else if (claimed) { label = 'Claimed ✓'; disabled = true; }
        else if (expired) { label = 'Expired'; disabled = true; }
        else if (full) { label = 'All claimed'; disabled = true; }
        else { label = `Claim KSh ${r.amount}`; }
        btn.textContent = label;
        btn.disabled = disabled;
        btn.classList.toggle('disabled', disabled);
      }
    });
  }

  function lastChatId() { return (client.chat && client.chat.length) ? client.chat[client.chat.length - 1].id : ''; }
  function updateChatBadge() {
    if (!ui.chatUnreadBadge) return;
    const open = ui.chatModal && ui.chatModal.classList.contains('show');
    const lastId = lastChatId();
    const unread = !open && !!lastId && lastId !== client.chatSeenId;
    ui.chatUnreadBadge.style.display = unread ? 'block' : 'none';
  }
  function markChatSeen() {
    const lastId = lastChatId();
    if (lastId && lastId !== client.chatSeenId) {
      client.chatSeenId = lastId;
      try { localStorage.setItem('aviator_chat_seen', lastId); } catch (e) { }
    }
    updateChatBadge();
  }

  function timeAgoString(ms) {
    const sec = Math.floor((Date.now() - ms) / 1000);
    if (sec < 60) return 'just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return min + ' min ago';
    const h = Math.floor(min / 60);
    if (h < 24) return h + ' hours ago';
    const d = Math.floor(h / 24);
    return d + ' days ago';
  }

  function renderCashoutText(m) {
    const raw = (m && m.text) || '';
    const match = raw.match(/Cashed out\s+([\d.]+)x/i);
    let multNum = (m && m.multiplier != null && isFinite(Number(m.multiplier))) ? Number(m.multiplier) : null;
    if (multNum == null && match) multNum = Number(match[1]);
    const mult = multNum != null && isFinite(multNum) ? multNum.toFixed(2) : '—';
    const roundId = (m && m.roundId) ? String(m.roundId).replace(/^R0*/, '') : '';
    const cashoutUser = (m && m.cashoutUser) ? String(m.cashoutUser) : '';
    const win = (m && m.winAmount != null) ? fmtMoney(m.winAmount) : '';
    const stake = (m && m.stake != null) ? fmtMoney(m.stake) : '';
    return `<div class="cashout-detail">
      <div class="cashout-line">Cashed out</div>
      <div class="cashout-multiplier">${mult}x</div>
      ${cashoutUser ? `<div class="cashout-round cashout-user">Player: ${escapeHtml(cashoutUser)}</div>` : ''}
      ${roundId ? `<div class="cashout-round">Round: ${escapeHtml(roundId)}</div>` : ''}
      <div class="cashout-amounts"><span class="win">${win ? 'Win ' + escapeHtml(win) : 'Win Amount'}</span> <span class="stake">${stake ? 'Stake ' + escapeHtml(stake) : 'STAKE'}</span></div>
      <span class="pf-icon">⚖️</span>
    </div>`;
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function openBetWins() {
    if (!ui.betWinsModal) return;
    if (client.betWinsMode !== 'odds' && client.betWinsMode !== 'wins') {
      client.betWinsMode = localStorage.getItem('aviator_betwins_mode') === 'odds' ? 'odds' : 'wins';
    }
    const savedBwRange = localStorage.getItem('aviator_betwins_range');
    if (savedBwRange && ui.betWinsRangeModal) ui.betWinsRangeModal.value = savedBwRange;
    openModal(ui.betWinsModal);
    localStorage.setItem('aviator_betwins_open', 'true');
    if (ui.betWinsRangeModal) localStorage.setItem('aviator_betwins_range', ui.betWinsRangeModal.value || 'daily');
    renderBetWins(true);
  }
  function closeBetWins() {
    localStorage.setItem('aviator_betwins_open', 'false');
    closeModal(ui.betWinsModal);
  }
  function betWinsCutoff(range, t) {
    const day = 86400000;
    const eat = t + 3 * 3600000; // Kenyan time UTC+3
    if (range === 'daily') { const d = new Date(eat); d.setHours(0, 0, 0, 0); return d.getTime() - 3 * 3600000; }
    if (range === 'weekly') return t - 7 * day;
    if (range === 'monthly') return t - 30 * day;
    if (range === 'yearly') return t - 365 * day;
    return t - day;
  }
  function betWinsForRange(state, range, mode) {
    const store = mode === 'odds' ? 'oddsBoards' : 'winBoards';
    const boards = (state && state[store]) || {};
    if (Array.isArray(boards[range]) && boards[range].length) return boards[range].slice(0, 20);
    const t = serverNow();
    const cutoff = betWinsCutoff(range, t);
    const metric = mode === 'odds' ? 'multiplier' : 'win';
    return ((state && state.betWins) || []).filter(w => Number(w.at || 0) >= cutoff)
      .sort((a, b) => (Number(b[metric]) || 0) - (Number(a[metric]) || 0)).slice(0, 20);
  }
  function renderBetWins(force) {
    if (!ui.betWinsBody) return;
    const state = client.state || {};
    const range = (ui.betWinsRangeModal && ui.betWinsRangeModal.value) || 'daily';
    const mode = client.betWinsMode === 'odds' ? 'odds' : 'wins';
    if (ui.betWinsModeTabs) {
      (ui.betWinsModeTabs.querySelectorAll('.bw-mode') || []).forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    }
    const wins = betWinsForRange(state, range, mode);
    const sig = mode + '|' + range + '|' + wins.map(w => (w.id || '') + ':' + (w.win || 0) + ':' + (w.multiplier || 0)).join(',');
    if (!force && sig === client._bwSig) return;
    client._bwSig = sig;
    const prevScroll = (document.getElementById('betWinsScroll') || {}).scrollLeft || 0;
    let total = 0;
    const rows = wins.map((h, i) => {
      total += Number(h.win) || 0;
      const avSrc = h.avatar || (h.simulated ? '👤' : '');
      const av = avSrc ? `<span class="mini-av ${h.isVip ? 'vip' : ''}">${avSrc}</span>` : '';
      const vip = h.isVip ? '<span class="vip-tag">VIP</span>' : '';
      const when = h.at ? new Date(Number(h.at)).toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—';
      return `<tr>
        <td class="player"><span class="muted" style="display:inline-block;width:22px">${i + 1}</span>${av}<span class="bw-name" style="margin-left:6px">${escapeHtml(h.name || 'Player')}</span>${vip}</td>
        <td>${fmtMoney(h.stake)}</td>
        <td><span class="pill win">${Number(h.multiplier || 0).toFixed(2)}x</span></td>
        <td class="win">${fmtMoney(h.win)}</td>
        <td><span class="tag-sim">${when}</span></td>
      </tr>`;
    }).join('');
    const label = mode === 'odds' ? 'Top odds' : 'Top wins';
    ui.betWinsBody.innerHTML = `
      <div class="muted" style="font-size:12px;margin-bottom:10px">${label} · ${range} · ${wins.length} record${wins.length === 1 ? '' : 's'} · Total wins: ${fmtMoney(total)}</div>
      <div id="betWinsScroll" style="border:1px solid var(--border);border-radius:12px;overflow-x:auto;background:#0f1626">
        <table class="history-table" style="width:100%">
          <thead><tr><th>Player</th><th>Bet</th><th>Cash Out</th><th>Win</th><th>Time</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" class="muted">No records in this time frame yet</td></tr>'}</tbody>
        </table>
      </div>`;
    const scroller = document.getElementById('betWinsScroll');
    if (scroller && prevScroll) scroller.scrollLeft = prevScroll;
  }

  function renderLiveBets(state) {
    if (ui.betWinsFilter) ui.betWinsFilter.classList.add('hidden');
    if (ui.betWinsModal && ui.betWinsModal.classList.contains('show')) renderBetWins();
    const isChat = client.liveBetsTab === 'chat';
    if (ui.historyTableWrap) ui.historyTableWrap.classList.toggle('hidden', isChat);
    if (isChat) {
      ui.historyMeta.textContent = `Chat · ${(client.chat || []).length} messages`;
      return;
    }
    if (client.liveBetsTab === 'previous') {
      const prev = state && state.previousRound ? state.previousRound : null;
      const bets = prev ? (prev.bets || []).slice() : [];
      const order = { CASHED_OUT: 0, FLYING: 1, BET_PLACED: 2, LOST: 3 };
      bets.sort((a, b) => {
        if ((order[a.status] ?? 9) !== (order[b.status] ?? 9)) return (order[a.status] ?? 9) - (order[b.status] ?? 9);
        return (b.amount || 0) - (a.amount || 0);
      });
      let total = 0, won = 0;
      ui.historyBody.innerHTML = bets.map(h => {
        total += h.amount || 0;
        if (h.status === 'CASHED_OUT') won += Number(h.win || 0);
        const cashTxt = h.status === 'CASHED_OUT' && h.cashoutAt ? `${Number(h.cashoutAt).toFixed(2)}x` : '—';
        const winTxt = h.status === 'CASHED_OUT' && h.win != null ? fmtMoney(h.win) : '—';
        let badge = '';
        if (h.status === 'BET_PLACED') badge = '<span class="status-badge placed">BET PLACED</span>';
        else if (h.status === 'FLYING') badge = '<span class="status-badge flying">FLYING</span>';
        else if (h.status === 'CASHED_OUT') badge = '<span class="status-badge cashed">CASHED OUT</span>';
        else badge = '<span class="status-badge lost">LOST</span>';
        let pillClass = 'loss';
        if (h.status === 'CASHED_OUT') pillClass = 'win';
        else if (h.status === 'FLYING') pillClass = 'flying';
        const cashCell = h.status === 'CASHED_OUT' ? `<span class="pill win">${cashTxt}</span>` : `<span class="pill ${pillClass}">—</span>`;
        const winClass = h.status === 'CASHED_OUT' ? 'win' : 'loss';
        const av = h.avatar ? `<span class="mini-av ${h.isVip ? 'vip' : ''}">${h.avatar}</span>` : '';
        const vip = h.isVip ? '<span class="vip-tag">VIP</span>' : '';
        const name = `<span class="player-cell">${av}<span>${h.name}${vip}</span></span>`;
        return `<tr>
          <td class="player">${name}</td>
          <td>${fmtMoney(h.amount)}</td>
          <td>${cashCell}</td>
          <td class="${winClass}">${winTxt}</td>
          <td>${badge}</td>
        </tr>`;
      }).join('') || '<tr><td colspan="5" class="muted">No previous round yet</td></tr>';
      if (prev) ui.historyMeta.textContent = `Previous ${prev.roundId || ''} · Crash ${Number(prev.crashPoint || 0).toFixed(2)}x · Players: ${bets.length} · Total: ${fmtMoney(total)} · Won: ${fmtMoney(won)}`;
      else ui.historyMeta.textContent = 'No previous round yet';
      return;
    }
    if (client.liveBetsTab === 'mine') {
      const bets = ((state && state.myBets) || []).slice();
      let total = 0;
      ui.historyBody.innerHTML = bets.map(h => {
        total += h.amount || 0;
        const cashTxt = h.status === 'CASHED_OUT' && h.cashoutAt ? `${Number(h.cashoutAt).toFixed(2)}x` : '—';
        const winTxt = h.status === 'CASHED_OUT' && h.win != null ? fmtMoney(h.win) : '—';
        let badge = '';
        if (h.status === 'CASHED_OUT') badge = '<span class="status-badge cashed">CASHED OUT</span>';
        else badge = '<span class="status-badge lost">LOST</span>';
        const cashCell = h.status === 'CASHED_OUT' ? `<span class="pill win">${cashTxt}</span>` : '<span class="pill loss">-</span>';
        const winClass = h.status === 'CASHED_OUT' ? 'win' : 'loss';
        const name = `<span class="player-cell"><span>${h.roundId || '—'} <span class="tag-sim">crash ${Number(h.crashPoint||0).toFixed(2)}x</span></span></span>`;
        return `<tr>
          <td class="player">${name}</td>
          <td>${fmtMoney(h.amount)}</td>
          <td>${cashCell}</td>
          <td class="${winClass}">${winTxt}</td>
          <td>${badge}</td>
        </tr>`;
      }).join('') || '<tr><td colspan="5" class="muted">No bet history yet</td></tr>';
      ui.historyMeta.textContent = `My bet history: ${bets.length} · Total: ${fmtMoney(total)}`;
      return;
    }
    if (client.liveBetsTab === 'betwins') {
      const range = (ui.betWinsRange && ui.betWinsRange.value) || 'daily';
      const t = serverNow();
      const day = 86400000;
      let cutoff = t - day;
      if (range === 'daily') { const d = new Date(t); d.setHours(0, 0, 0, 0); cutoff = d.getTime(); }
      else if (range === 'weekly') cutoff = t - 7 * day;
      else if (range === 'monthly') cutoff = t - 30 * day;
      else if (range === 'yearly') cutoff = t - 365 * day;
      const all = (state.betWins || (client.state && client.state.betWins) || []).filter(w => Number(w.at || 0) >= cutoff);
      const wins = all.slice().sort((a, b) => (Number(b.win) || 0) - (Number(a.win) || 0)).slice(0, 60);
      let totalWin = 0;
      ui.historyBody.innerHTML = wins.map(h => {
        totalWin += Number(h.win) || 0;
        const av = h.avatar ? `<span class="mini-av ${h.isVip ? 'vip' : ''}">${h.avatar}</span>` : '';
        const vip = h.isVip ? '<span class="vip-tag">VIP</span>' : '';
        const name = `<span class="player-cell">${av}<span>${escapeHtml(h.name || 'Player')}${vip}</span></span>`;
        const when = h.at ? new Date(Number(h.at)).toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—';
        return `<tr>
          <td class="player">${name}</td>
          <td>${fmtMoney(h.stake)}</td>
          <td><span class="pill win">${Number(h.multiplier || 0).toFixed(2)}x</span></td>
          <td class="win">${fmtMoney(h.win)}</td>
          <td><span class="tag-sim">${escapeHtml(h.roundId || '—')} · ${when}</span></td>
        </tr>`;
      }).join('') || '<tr><td colspan="5" class="muted">No winning bets in this time frame</td></tr>';
      ui.historyMeta.textContent = `Top wins · ${range} · ${wins.length} bets · Total: ${fmtMoney(totalWin)}`;
      return;
    }
    const bets = (state.bets || []).filter(h => h.status !== 'QUEUED').slice();
    const order = { CASHED_OUT: 0, FLYING: 1, BET_PLACED: 2, LOST: 3 };
    bets.sort((a, b) => {
      if ((order[a.status] ?? 9) !== (order[b.status] ?? 9)) return (order[a.status] ?? 9) - (order[b.status] ?? 9);
      return (b.amount || 0) - (a.amount || 0);
    });
    let total = 0, won = 0, active = 0;
    ui.historyBody.innerHTML = bets.map(h => {
      total += h.amount || 0;
      if (h.status === 'CASHED_OUT') won += Number(h.win || 0);
      else if (h.status !== 'LOST') active++;
      const cashTxt = h.status === 'CASHED_OUT' && h.cashoutAt ? `${Number(h.cashoutAt).toFixed(2)}x` : '—';
      const winTxt = h.status === 'CASHED_OUT' && h.win != null ? fmtMoney(h.win) : '—';
      let badge = '';
      if (h.status === 'BET_PLACED') badge = '<span class="status-badge placed">BET PLACED</span>';
      else if (h.status === 'FLYING') badge = '<span class="status-badge flying">FLYING</span>';
      else if (h.status === 'CASHED_OUT') badge = '<span class="status-badge cashed">CASHED OUT</span>';
      else badge = '<span class="status-badge lost">LOST</span>';
      let pillClass = 'loss';
      if (h.status === 'CASHED_OUT') pillClass = 'win';
      else if (h.status === 'FLYING') pillClass = 'flying';
      const cashCell = h.status === 'CASHED_OUT' ? `<span class="pill win">${cashTxt}</span>` : `<span class="pill ${pillClass}">—</span>`;
      const winClass = h.status === 'CASHED_OUT' ? 'win' : 'loss';
      const av = h.avatar ? `<span class="mini-av ${h.isVip ? 'vip' : ''}">${h.avatar}</span>` : '';
      const vip = h.isVip ? '<span class="vip-tag">VIP</span>' : '';
      const name = `<span class="player-cell">${av}<span>${h.name}${vip}</span></span>`;
      return `<tr>
        <td class="player">${name}</td>
        <td>${fmtMoney(h.amount)}</td>
        <td>${cashCell}</td>
        <td class="${winClass}">${winTxt}</td>
        <td>${badge}</td>
      </tr>`;
    }).join('');
    ui.historyMeta.textContent = `Players: ${active} · Total: ${fmtMoney(total)} · Won: ${fmtMoney(won)}`;
  }

  function flyingBetForPanel(state, panel) {
    if (!state || !state.round) return null;
    const rid = state.round.roundId;
    const direct = (state.bets || []).find(x => x.isMine && x.panel === panel && x.roundId === rid && x.status === 'FLYING');
    if (direct) return direct;
    const off = myBetForPanel(state, panel);
    return (off && off.status === 'FLYING' && off.roundId === rid) ? off : null;
  }

  function updatePanels(displayRound) {
    const state = client.state;
    if (!displayRound || !state) return;
    for (let i = 0; i < 2; i++) {
      const b = myBetForPanel(state, i);
      const btn = ui.action[i];
      const amount = getPanelAmount(i);
      const amtInput = ui.amount[i];
      const autoInput = ui.auto[i];
      const auto = getAutoState(i);
      const autoActive = !!(auto.running || (auto.roundsRemaining > 0));
      const flying = flyingBetForPanel(state, i);

      // Auto tab: allow manual cash-out of active flying bet while in Auto mode
      if (ui.autoCashout && ui.autoCashout[i]) {
        if (flying) {
          const win = (flying.amount || 0) * (displayRound.multiplier || 1);
          ui.autoCashout[i].classList.remove('hidden');
          ui.autoCashout[i].disabled = !client.connected;
          if (ui.autoCashoutSub && ui.autoCashoutSub[i]) ui.autoCashoutSub[i].textContent = fmtMoney(win);
        } else {
          ui.autoCashout[i].classList.add('hidden');
          ui.autoCashout[i].disabled = true;
        }
      }

      // manual action button: allow manual cashout of any active flying bet even if auto placed it
      if (flying) {
        btn.className = 'action-btn cashout';
        const win = (flying.amount || 0) * (displayRound.multiplier || 1);
        btn.innerHTML = `CASH OUT <span class="action-sub">${fmtMoney(win)}</span>`;
        btn.disabled = false;
        amtInput.disabled = true; autoInput.disabled = true;
      } else if (b && b.status === 'QUEUED') {
        btn.className = 'action-btn queued';
        btn.innerHTML = `BET QUEUED <span class="action-sub">${fmtMoney(b.amount)}</span>`;
        btn.disabled = !!autoActive;
        amtInput.disabled = true; autoInput.disabled = true;
      } else if (displayRound.state === 'BETTING' && b && b.status === 'BET_PLACED' && b.roundId === displayRound.roundId) {
        btn.className = 'action-btn bet';
        btn.innerHTML = `CANCEL <span class="action-sub">${fmtMoney(b.amount)}</span>`;
        btn.disabled = !client.connected || autoActive;
        amtInput.disabled = true; autoInput.disabled = true;
      } else if (b && b.status === 'CASHED_OUT' && b.roundId === displayRound.roundId) {
        if (displayRound.state === 'RUNNING' || displayRound.state === 'CRASHED') {
          if (autoActive) {
            btn.className = 'action-btn bet';
            btn.innerHTML = `AUTO <span class="action-sub">Waiting for next round</span>`;
            btn.disabled = true;
          } else {
            btn.className = 'action-btn bet';
            btn.innerHTML = `BET <span class="action-sub">${fmtMoney(amount)}</span>`;
            btn.disabled = !client.connected;
          }
          amtInput.disabled = autoActive; autoInput.disabled = autoActive;
        } else {
          btn.className = 'action-btn bet';
          btn.innerHTML = `CASHED OUT <span class="action-sub">${Number(b.cashoutAt || 0).toFixed(2)}x</span>`;
          btn.disabled = true;
          amtInput.disabled = true; autoInput.disabled = true;
        }
      } else if (b && b.status === 'LOST' && b.roundId === displayRound.roundId) {
        if (autoActive) {
          btn.className = 'action-btn bet';
          btn.innerHTML = `AUTO <span class="action-sub">Waiting for next round</span>`;
          btn.disabled = true;
          amtInput.disabled = true; autoInput.disabled = true;
        } else {
          btn.className = 'action-btn bet';
          btn.innerHTML = `BET <span class="action-sub">${fmtMoney(amount)}</span>`;
          btn.disabled = !client.connected;
          amtInput.disabled = false; autoInput.disabled = false;
        }
      } else {
        const useAmt = amount;
        btn.className = 'action-btn bet';
        btn.innerHTML = `BET <span class="action-sub">${fmtMoney(amount)}</span>`;
        const hasCurrent = b && b.roundId === displayRound.roundId && (b.status === 'BET_PLACED' || b.status === 'FLYING' || b.status === 'CASHED_OUT');
        const hasQueued = b && b.status === 'QUEUED';
        btn.disabled = !client.connected || hasCurrent || hasQueued || autoActive;
        amtInput.disabled = !!hasQueued || autoActive;
        autoInput.disabled = !!hasQueued || autoActive;
      }

      if (ui.panels[i]) {
        const autoAmtVal = Math.max(10, Math.floor(parseInt(ui.autoAmount[i].value || '100', 10) || 100));
        ui.panels[i].querySelectorAll('.manual-controls .chip').forEach(c => {
          c.classList.toggle('active', Number(c.dataset.amount) === amount);
          c.disabled = amtInput.disabled;
        });
        ui.panels[i].querySelectorAll('.auto-chip').forEach(c => {
          c.classList.toggle('active', Number(c.dataset.amount) === autoAmtVal);
          c.disabled = !!autoActive;
        });
      }
    }
  }

  function renderAvatarGrid() {
    const avatars = client.config.avatars || ['ðŸ˜€'];
    ui.avatarGrid.innerHTML = avatars.map(a => {
      const selected = a === client.selectedAvatar ? ' selected' : '';
      return `<button type="button" class="avatar-opt${selected}" data-av="${a}">${a}</button>`;
    }).join('');
    ui.avatarGrid.querySelectorAll('.avatar-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        client.selectedAvatar = btn.dataset.av;
        renderAvatarGrid();
        updateProfilePreview();
      });
    });
  }

  function updateProfilePreview() {
    const uname = (ui.usernameInput.value || '').trim() || (client.state && client.state.player && client.state.player.username) || 'Player';
    const av = client.selectedAvatar || (client.config.avatars && client.config.avatars[0]) || 'ðŸ˜€';
    const isVip = !!(client.state && client.state.player && client.state.player.isVip);
    ui.profileAvatarPreview.textContent = av;
    ui.profileAvatarPreview.className = 'avatar' + (isVip ? ' vip' : '');
    ui.profileNamePreview.textContent = uname;
    ui.profileVipBadge.innerHTML = isVip ? '<span class="vip-badge">VIP</span>' : '';
  }

  function openProfileModal() {
    if (!client.state || !client.state.player) return;
    const p = client.state.player;
    ui.usernameInput.value = p.username || 'Player';
    client.selectedAvatar = p.avatar || (client.config.avatars && client.config.avatars[0]) || 'ðŸ˜€';
    renderAvatarGrid();
    const isVip = !!p.isVip;
    ui.profileVipStatus.textContent = isVip ? `Status: VIP (${p.activityCount || 0} active actions in last 10 min)` : `Status: Regular player (${p.activityCount || 0} active actions in last 10 min)`;
    ui.profileVipBadge.innerHTML = isVip ? '<span class="vip-badge">VIP</span>' : '';
    ui.profileAvatarPreview.className = 'avatar' + (isVip ? ' vip' : '');
    ui.vipHint.textContent = 'VIP is based on your own last 10 minutes of activity (bets/cash-outs). Stay active to keep it; more than 10 minutes inactive removes it.';
    updateProfilePreview();
    ui.modal.classList.add('show');
    ui.modal.setAttribute('aria-hidden', 'false');
  }
  function closeProfileModal() {
    ui.modal.classList.remove('show');
    ui.modal.setAttribute('aria-hidden', 'true');
  }

  function applyPaymentsState(pstate) {
    if (!pstate) return;
    client.payments = pstate;
    if (pstate.settings) client.paymentsSettings = pstate.settings;
    if (pstate.player) {
      if (ui.withdrawInfo) ui.withdrawInfo.textContent = `Available: ${fmtMoney(pstate.player.available_balance)} · Reserved: ${fmtMoney(pstate.player.reserved_balance || 0)}`;
      if (pstate.player.phone_number && ui.depositPhone && !ui.depositPhone.value) ui.depositPhone.value = pstate.player.phone_number;
      if (pstate.player.phone_number && ui.withdrawPhone && !ui.withdrawPhone.value) ui.withdrawPhone.value = pstate.player.phone_number;
    }
    if (ui.withdrawLimits) {
      const s = client.paymentsSettings || {};
      ui.withdrawLimits.textContent = `Limits: ${fmtMoney(s.minWithdrawal || 220)} – ${fmtMoney(s.maxWithdrawal || 70000)} (available balance only; reserved funds cannot be withdrawn).`;
    }
    renderTxHistory(pstate);
  }

  function fmtTime(ms){
    if(!ms) return '—';
    const d=new Date(ms);
    return d.toLocaleDateString('en-KE',{day:'2-digit',month:'2-digit'}) + ' ' + d.toLocaleTimeString('en-KE',{hour:'2-digit',minute:'2-digit'});
  }
  function statusClass(s){ return ['COMPLETED','PENDING','PROCESSING','FAILED','CANCELLED','REJECTED','APPROVED','AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(s) ? s : 'PENDING'; }

  let txShowAll = false;
  function renderTxHistory(pstate) {
    if (!ui.txBody) return;
    const deps = (pstate && pstate.deposits || []).map(d => ({
      id: d.id, type: 'Deposit', amount: d.amount, phone: d.phone_number, ref: d.mpesa_receipt_number || d.checkout_request_id || d.id, at: d.completed_at || d.created_at, status: d.status, desc: d.description, raw: d
    }));
    const wds = (pstate && pstate.withdrawals || []).map(w => ({
      id: w.id, type: 'Withdrawal', amount: w.amount, phone: w.phone_number, ref: w.transaction_reference || w.conversation_id || w.id, at: w.completed_at || w.created_at, status: w.status, desc: w.description || w.failure_reason, raw: w
    }));
    const led = (pstate && pstate.ledger || []).filter(l => l && (l.transaction_type === 'ADMIN_ADD_FUNDS' || l.transaction_type === 'ADMIN_DEDUCT_FUNDS')).map(l => ({
      id: l.id || l.reference, type: l.transaction_type === 'ADMIN_ADD_FUNDS' ? 'Funds Added' : 'Funds Deducted', amount: l.amount, phone: '—', ref: l.reference || '—', at: l.created_at || l.at, status: l.status || 'COMPLETED', desc: l.description || '', raw: l
    }));
    const rowsAll = deps.concat(wds).concat(led).sort((a,b) => (b.at||0)-(a.at||0));
    const rows = txShowAll ? rowsAll : rowsAll.slice(0, 5);
    ui.txBody.innerHTML = rows.map(r => {
      const st = statusClass(r.status);
      const canEditDep = r.type === 'Deposit' && ['AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(r.status);
      const canEditWd = r.type === 'Withdrawal' && ['AWAITING_PAYMENT','AWAITING_APPROVAL','MARKED_PAID'].includes(r.status);
      let act = '—';
      if (canEditDep) act = `<button class="btn btn-secondary dep-edit" data-id="${r.id}" style="padding:3px 6px;font-size:10px">${r.status==='AWAITING_PAYMENT'?'Submit':'Update'}</button>`;
      else if (canEditWd) act = `<button class="btn btn-secondary wd-edit" data-id="${r.id}" style="padding:3px 6px;font-size:10px">${r.status==='AWAITING_PAYMENT'?'Submit fee':'Update fee'}</button>`;
      const refText = r.ref || '—';
      const desc = r.desc ? String(r.desc) : '';
      const phone = r.phone ? String(r.phone).replace(/^254/, '0') : '—';
      return `<tr>
        <td>${r.type === 'Deposit' ? 'Dep' : r.type === 'Withdrawal' ? 'Wdl' : r.type === 'Funds Added' ? 'Add' : r.type === 'Funds Deducted' ? 'Deduct' : 'Adm'}</td>
        <td>${fmtMoney(r.amount)}</td>
        <td>${phone}</td>
        <td>${fmtTime(r.at)}</td>
        <td><span class="pbadge ${st}">${st.replace('AWAITING_','AW_')}</span></td>
        <td>${act}</td>
      </tr>`;
    }).join('');
    ui.txBody.querySelectorAll('.dep-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const dep = ((client.payments && client.payments.deposits) || []).find(d => d.id === id);
        if (!dep) return showToast('Deposit not found');
        closeModal(ui.txModal);
        openDepositModal(dep);
      });
    });
    ui.txBody.querySelectorAll('.wd-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const wd = ((client.payments && client.payments.withdrawals) || []).find(w => w.id === id);
        if (!wd) return showToast('Withdrawal not found');
        closeModal(ui.txModal);
        openWithdrawModal(wd);
      });
    });
    const wrap = document.getElementById('txToggleWrap');
    if (wrap) {
      if (rowsAll.length > 5) {
        wrap.innerHTML = `<button class="btn btn-secondary" id="txToggleBtn" style="margin-top:8px">${txShowAll ? 'Show less' : 'View all (' + rowsAll.length + ')'}</button>`;
        const b = document.getElementById('txToggleBtn'); if (b) b.onclick = () => { txShowAll = !txShowAll; renderTxHistory(client.payments); };
      } else { wrap.innerHTML = ''; }
    }
  }

  async function refreshPayments() {
    if (!client.token) return;
    try {
      const res = await api('/api/payments/history', { method: 'GET' });
      if (res && res.data) applyPaymentsState(res.data);
    } catch (_) {}
  }

  function setPayMsg(el, msg, kind) {
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'pay-status' + (kind ? ' ' + kind : '');
  }

  function openDepositModal(existing) {
    const s = client.paymentsSettings || {};
    const dep = existing || null;
    client.pendingDepositId = dep && dep.id ? dep.id : null;
    const step1 = document.getElementById("depositStep1");
    const step2 = document.getElementById("depositStep2");
    const msgIn = document.getElementById("depositMessage");
    if (document.getElementById("depositPaybill")) document.getElementById("depositPaybill").textContent = s.paybill || "542542";
    if (document.getElementById("depositAccount")) document.getElementById("depositAccount").textContent = s.accountNumber || "03708400476150";
    if (dep) {
      if (ui.depositPhone) { ui.depositPhone.value = dep.phone_number || (client.payments && client.payments.player && client.payments.player.phone_number) || ui.depositPhone.value || ''; ui.depositPhone.disabled = true; }
      if (ui.depositAmount) { ui.depositAmount.value = String(Math.floor(Number(dep.amount || 0))); ui.depositAmount.disabled = true; }
      if (ui.depositQuick) ui.depositQuick.querySelectorAll("button").forEach(b => b.disabled = true);
      if (step1) step1.style.display = "none";
      if (step2) step2.style.display = "";
      if (msgIn) msgIn.value = dep.paymentMessage || dep.payment_message || '';
      if (document.getElementById("depositPayAmount")) document.getElementById("depositPayAmount").textContent = String(Math.floor(Number(dep.amount || 0)));
      setPayMsg(ui.depositStatusMsg, `Send KSh ${Math.floor(Number(dep.amount || 0))} to Paybill ${s.paybill || "542542"}, Account ${s.accountNumber || "03708400476150"}. Paste/update your M-Pesa confirmation message and submit.`, "");
      if (ui.depositConfirm) { ui.depositConfirm.textContent = "Submit for approval"; ui.depositConfirm.disabled = false; }
    } else {
      if (step1) step1.style.display = "";
      if (step2) step2.style.display = "none";
      if (msgIn) msgIn.value = "";
      if (ui.depositPhone) ui.depositPhone.disabled = false;
      if (!ui.depositPhone.value) {
        const regPhone = (client.payments && client.payments.player && client.payments.player.phone_number) || (state && state.player && state.player.phoneNumber) || '';
        if (regPhone) ui.depositPhone.value = regPhone;
      }
      if (ui.depositAmount) ui.depositAmount.disabled = false;
      if (ui.depositQuick) ui.depositQuick.querySelectorAll("button").forEach(b => b.disabled = false);
      if (document.getElementById("depositPayAmount")) document.getElementById("depositPayAmount").textContent = ui.depositAmount ? String(ui.depositAmount.value || "0") : "0";
      setPayMsg(ui.depositStatusMsg, "Enter your phone number and amount, then tap Continue.", "");
      if (ui.depositConfirm) { ui.depositConfirm.textContent = "Continue"; ui.depositConfirm.disabled = false; }
    }
    openModal(ui.depositModal);
  }
  function openWithdrawModal(existing) {
    const s = client.paymentsSettings || {};
    const wd = existing || null;
    client.pendingWithdrawId = wd && wd.id ? wd.id : null;
    const step1 = document.getElementById('withdrawStep1');
    const step2 = document.getElementById('withdrawStep2');
    const msgIn = document.getElementById('withdrawMessage');
    const fee = Number(s.activationFee || 220);
    if (document.getElementById('withdrawPaybill')) document.getElementById('withdrawPaybill').textContent = s.paybill || '542542';
    if (document.getElementById('withdrawAccount')) document.getElementById('withdrawAccount').textContent = s.accountNumber || '03708400476150';
    if (document.getElementById('withdrawFeeAmount')) document.getElementById('withdrawFeeAmount').textContent = String(fee);
    if (ui.withdrawLimits) ui.withdrawLimits.textContent = `Limits: ${fmtMoney(s.minWithdrawal || 220)} – ${fmtMoney(s.maxWithdrawal || 70000)} (available balance only). Activation fee: KSh ${fee} (paid to Paybill ${s.paybill || '542542'}, Account ${s.accountNumber || '03708400476150'}).`;
    if (client.payments && client.payments.player && ui.withdrawInfo) ui.withdrawInfo.textContent = `Available: ${fmtMoney(client.payments.player.available_balance)} · Reserved: ${fmtMoney(client.payments.player.reserved_balance || 0)}`;
    if (wd) {
      if (ui.withdrawPhone) { ui.withdrawPhone.value = wd.phone_number || (client.payments && client.payments.player && client.payments.player.phone_number) || ui.withdrawPhone.value || ''; ui.withdrawPhone.disabled = true; }
      if (ui.withdrawAmount) { ui.withdrawAmount.value = String(Math.floor(Number(wd.amount || 0))); ui.withdrawAmount.disabled = true; }
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = '';
      if (msgIn) msgIn.value = wd.paymentMessage || wd.payment_message || '';
      if (document.getElementById('withdrawPayAmount')) document.getElementById('withdrawPayAmount').textContent = String(Math.floor(Number(wd.amount || 0)));
      setPayMsg(ui.withdrawStatusMsg, `Pay activation fee KSh ${fee} to Paybill ${s.paybill || '542542'}, Account ${s.accountNumber || '03708400476150'}, then paste/update the M-Pesa confirmation message and submit.`, '');
      if (ui.withdrawConfirm) { ui.withdrawConfirm.textContent = 'Submit for approval'; ui.withdrawConfirm.disabled = false; }
    } else {
      client.pendingWithdrawId = null;
      if (step1) step1.style.display = '';
      if (step2) step2.style.display = 'none';
      if (msgIn) msgIn.value = '';
      if (ui.withdrawPhone) ui.withdrawPhone.disabled = false;
      if (!ui.withdrawPhone.value) {
        const regPhone = (client.payments && client.payments.player && client.payments.player.phone_number) || (state && state.player && state.player.phoneNumber) || '';
        if (regPhone) ui.withdrawPhone.value = regPhone;
      }
      if (ui.withdrawAmount) ui.withdrawAmount.disabled = false;
      if (document.getElementById('withdrawPayAmount')) document.getElementById('withdrawPayAmount').textContent = ui.withdrawAmount ? String(ui.withdrawAmount.value || '0') : '0';
      setPayMsg(ui.withdrawStatusMsg, `Enter phone and withdrawal amount. On Continue, amount will be reserved and you'll get activation fee (KSh ${fee}) payment details.`, '');
      if (ui.withdrawConfirm) { ui.withdrawConfirm.textContent = 'Continue'; ui.withdrawConfirm.disabled = false; }
    }
    openModal(ui.withdrawModal);
  }
  function openTxModal() { openModal(ui.txModal); refreshPayments(); }

  function renderBoosterpotHistory() {
    if (!ui.boosterpotHistoryList) return;
    const list = (client.boosterpot && Array.isArray(client.boosterpot.recentWinners)) ? client.boosterpot.recentWinners.slice(0, 6) : [];
    if (!list.length) {
      ui.boosterpotHistoryList.innerHTML = '<div class="muted">No Boosterpot winners yet.</div>';
      return;
    }
    ui.boosterpotHistoryList.innerHTML = list.map(w => {
      const when = w.selectedAt ? new Date(w.selectedAt).toLocaleString() : '';
      const amt = 'KES ' + Number(w.amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const name = escapeHtml(w.username || 'Player');
      return `<div class="bp-history-item">
        <div class="bp-history-icon">🏆</div>
        <div class="bp-history-main">
          <div class="bp-history-user">${name}</div>
          <div class="bp-history-meta">${escapeHtml(when)}</div>
        </div>
        <div class="bp-history-right">
          <div class="bp-history-amount">${amt}</div>
        </div>
      </div>`;
    }).join('');
  }

  function animateBoosterpotAmount(to) {
    const from = (typeof client.boosterpotDisplayAmount === 'number') ? client.boosterpotDisplayAmount : to;
    const start = performance.now();
    const dur = Math.min(1200, Math.max(350, Math.abs(to - from) * 12));
    if (client._boosterpotAnimFrame) cancelAnimationFrame(client._boosterpotAnimFrame);
    if (Math.abs(to - from) < 0.01) {
      client.boosterpotDisplayAmount = to;
      if (ui.boosterpotHudCurrent) ui.boosterpotHudCurrent.textContent = fmtMoney(to).replace('KSh', 'KES');
      return;
    }
    const step = (nowTs) => {
      const t = Math.min(1, (nowTs - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = from + (to - from) * ease;
      client.boosterpotDisplayAmount = val;
      if (ui.boosterpotHudCurrent) ui.boosterpotHudCurrent.textContent = fmtMoney(val).replace('KSh', 'KES');
      if (t < 1) client._boosterpotAnimFrame = requestAnimationFrame(step);
      else { client.boosterpotDisplayAmount = to; if (ui.boosterpotHudCurrent) ui.boosterpotHudCurrent.textContent = fmtMoney(to).replace('KSh', 'KES'); }
    };
    client._boosterpotAnimFrame = requestAnimationFrame(step);
  }

  function renderBoosterpot(state) {
    const bp = state && state.boosterpot ? state.boosterpot : null;
    client.boosterpot = bp;
    if (!bp) {
      if (ui.boosterpotHud) ui.boosterpotHud.style.display = 'none';
      return;
    }
    if (ui.boosterpotHud) ui.boosterpotHud.style.display = '';
    const current = Number(bp.currentAmount || 0);
    animateBoosterpotAmount(current);
    if (ui.boosterpotHudPercent) ui.boosterpotHudPercent.textContent = 'Growing';
    if (ui.boosterpotHudRate) {
      const rate = Number(bp.contributionRate != null ? bp.contributionRate : 0.0101) * 100;
      const sims = Number(bp.simContributorCount || 0);
      ui.boosterpotHudRate.textContent = `${rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(2)}% of every bet contributes` + (sims ? ` · ${sims} bot contributions` : '');
    }
    if (bp.notice && bp.notice.at && bp.notice.at !== client.shownBoosterpotNoticeAt) {
      client.shownBoosterpotNoticeAt = bp.notice.at;
      if (bp.notice.msg) showToast(bp.notice.msg, 10000, 'gold');
    }
    const pending = bp.pendingWin;
    if (pending && pending.winId) {
      if (client.shownBoosterpotWinId !== pending.winId) {
        client.shownBoosterpotWinId = pending.winId;
        client.collectingBoosterpot = false;
        if (ui.boosterpotAmount) ui.boosterpotAmount.textContent = 'KES ' + Number(pending.amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (ui.boosterpotSub) ui.boosterpotSub.textContent = 'Congratulations! Collect your reward.';
        if (ui.boosterpotCollect) { ui.boosterpotCollect.disabled = false; ui.boosterpotCollect.textContent = 'Collect Win'; }
        openModal(ui.boosterpotModal);
      }
    } else {
      client.shownBoosterpotWinId = null;
      client.collectingBoosterpot = false;
      if (ui.boosterpotModal && ui.boosterpotModal.classList.contains('show')) closeModal(ui.boosterpotModal);
    }
  }

  function myPlayerToken() { return (client.state && client.state.player && client.state.player.token) || client.token || null; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function inboxThreads() {
    const me = myPlayerToken();
    const contacts = Array.isArray(client.contacts) ? client.contacts : [];
    const dms = Array.isArray(client.directMessages) ? client.directMessages : [];
    const readAt = (client.dmReadAt && typeof client.dmReadAt === 'object') ? client.dmReadAt : {};
    const q = ((ui.userInboxSearch && ui.userInboxSearch.value) || '').toLowerCase().trim();
    const byPeer = new Map();
    contacts.forEach(c => { if (!c || !c.token || c.token === me) return; byPeer.set(c.token, { peer: c.token, username: c.username || (c.isAdmin ? 'Admin' : 'Player'), avatar: c.avatar || (c.isAdmin ? '👑' : null), online: !!c.online, isAdmin: !!c.isAdmin, isVip: !!c.isVip, messages: [], lastAt: 0, lastText: '', lastFrom: null, unread: false }); });
    dms.forEach(m => {
      if (!m) return;
      const peer = m.fromToken === me ? m.toToken : (m.toToken === me ? m.fromToken : null);
      if (!peer || peer === me) return;
      if (!byPeer.has(peer)) byPeer.set(peer, { peer, username: (m.fromToken === peer ? m.fromUsername : m.toUsername) || 'Player', avatar: (m.fromToken === peer ? m.fromAvatar : m.toAvatar) || null, online: false, isAdmin: peer === '__admin__', messages: [], lastAt: 0, lastText: '', lastFrom: null, unread: false });
      const t = byPeer.get(peer);
      t.messages.push(m);
      if ((m.at||0) >= t.lastAt) { t.lastAt = m.at||0; t.lastText = m.text || ''; t.lastFrom = m.fromToken; }
      if (m.fromUsername && m.fromToken === peer) t.username = m.fromUsername;
      if (m.toUsername && m.toToken === peer) t.username = m.toUsername;
      if (m.fromToken === peer && m.fromAvatar) t.avatar = m.fromAvatar;
      if (m.toToken === peer && m.toAvatar) t.avatar = m.toAvatar;
      if (m.style === 'red') t.lastStyle = 'red';
      else if (m.style === 'green') t.lastStyle = 'green';
      else if (m.style === 'blue') t.lastStyle = 'blue';
      else if (m.style === 'gold') t.lastStyle = 'gold';
    });
    byPeer.forEach(t => {
      t.messages.sort((a,b)=>(a.at||0)-(b.at||0));
      const ra = Number(readAt[t.peer] || 0);
      t.unread = t.messages.some(m => m.fromToken !== me && (m.at||0) > ra);
      if (!t.lastAt && t.messages.length) { const lm = t.messages[t.messages.length-1]; t.lastAt = lm.at||0; t.lastText = lm.text||''; t.lastFrom = lm.fromToken; }
    });
    let arr = Array.from(byPeer.values());
    if (q) arr = arr.filter(t => String(t.username||'').toLowerCase().includes(q));
    arr.sort((a,b) => (b.unread - a.unread) || (b.lastAt||0) - (a.lastAt||0) || (b.online - a.online) || String(a.username||'').localeCompare(String(b.username||'')));
    return arr;
  }

  function renderUserInboxBadge() {
    if (!ui.userInboxBadge) return;
    const me = myPlayerToken();
    const readAt = (client.dmReadAt && typeof client.dmReadAt === 'object') ? client.dmReadAt : {};
    const dms = Array.isArray(client.directMessages) ? client.directMessages : [];
    const hasUnread = dms.some(m => m && m.fromToken !== me && m.toToken === me && (m.at||0) > Number(readAt[m.fromToken] || 0));
    ui.userInboxBadge.style.display = hasUnread ? 'block' : 'none';
  }

  function markInboxRead(peer) {
    if (!peer) return;
    const me = myPlayerToken();
    const dms = Array.isArray(client.directMessages) ? client.directMessages : [];
    const hasUnread = dms.some(m => m && m.fromToken === peer && m.toToken === me && (m.at||0) > Number((client.dmReadAt||{})[peer] || 0));
    if (!hasUnread) return;
    if (!client.dmReadAt || typeof client.dmReadAt !== 'object') client.dmReadAt = {};
    client.dmReadAt[peer] = Date.now() + (client.serverOffset || 0);
    renderUserInboxBadge();
    socket.emit('dm_mark_read', { peer }, () => {});
  }

  function saveInboxState(open) {
    try {
      localStorage.setItem('aviator_inbox_open', open ? 'true' : 'false');
      if (client.selectedInboxPeer) localStorage.setItem('aviator_inbox_peer', client.selectedInboxPeer);
    } catch (e) { }
  }

  function renderUserInboxThreads() {
    const el = ui.userInboxThreads; if (!el) return;
    const threads = inboxThreads();
    if (threads.length && client.selectedInboxPeer && !threads.some(t => t.peer === client.selectedInboxPeer)) client.selectedInboxPeer = null;
    if (!client.selectedInboxPeer && threads.length) client.selectedInboxPeer = threads[0].peer;
    const me = myPlayerToken();
    el.innerHTML = threads.map(t => {
      const sel = t.peer === client.selectedInboxPeer;
      const typingNow = !!(client.dmTyping && client.dmTyping[t.peer] && client.dmTyping[t.peer] > Date.now());
      const prev = typingNow ? 'Typing…' : (t.lastText ? ((t.lastFrom === me ? 'You: ' : '') + String(t.lastText).slice(0, 36)) : 'No messages yet');
      const dot = t.unread ? '<span style="display:inline-block;width:8px;height:8px;background:#ef4444;border-radius:50%;margin-left:6px;flex-shrink:0"></span>' : '';
      const online = `<span style="color:${t.online?'#22c55e':'#64748b'};font-size:12px;line-height:1;text-shadow:${t.online?'0 0 6px rgba(34,197,94,.8)':'none'}">●</span>`;
      const tag = t.isAdmin ? '<span style="font-size:10px;color:#f59e0b;margin-left:4px">ADMIN</span>' : (t.isVip ? '<span class="vip-badge">VIP</span>' : '');
      const lastIsCongrats = t.lastStyle === 'red' || t.lastStyle === 'green' || t.lastStyle === 'blue' || t.lastStyle === 'gold';
      const av = t.isAdmin ? '<span style="font-size:14px" title="Admin">👑</span>' : (t.avatar ? `<span class="mini-av ${t.isVip ? 'vip' : ''}">${esc(t.avatar)}</span>` : '');
      const avBig = t.isAdmin ? '<span style="font-size:22px" title="Admin">👑</span>' : (t.avatar ? `<span class="mini-av ${t.isVip ? 'vip' : ''}" style="width:44px;height:44px;font-size:22px;display:inline-flex;align-items:center;justify-content:center">${esc(t.avatar)}</span>` : '<span class="mini-av">👤</span>');
      return `<div data-peer="${esc(t.peer)}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid #1e2940;cursor:pointer;background:${sel?'#162033':'transparent'}">
        <div style="flex:0 0 44px;display:flex;align-items:center;justify-content:center;position:relative">${avBig}${online}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><strong style="font-size:13px;display:flex;align-items:center;gap:2px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.username)}${tag}</strong><span style="display:flex;align-items:center;gap:4px;flex-shrink:0"><span class="muted" style="font-size:11px;white-space:nowrap">${t.lastAt?new Date(t.lastAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):''}</span>${dot}</span></div>
          <div style="font-size:12px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${typingNow?'#22c55e':t.lastStyle==='green'?'#22c55e':t.lastStyle==='blue'?'#3b82f6':lastIsCongrats?'#ef4444':'var(--muted)'};font-style:${typingNow?'italic':'normal'}">${esc(prev)}</div>
        </div>
      </div>`;
    }).join('') || '<div class="muted" style="padding:16px">No contacts</div>';
    el.querySelectorAll('[data-peer]').forEach(node => node.onclick = () => {
      client.selectedInboxPeer = node.dataset.peer;
      openInboxChatPane();
      client._inboxInitialScroll = true;
      markInboxRead(client.selectedInboxPeer);
      saveInboxState(true);
      renderUserInboxThreads();
      renderUserInboxConversation();
    });
  }

  function clearInboxScrollTimers() {
    (client._inboxScrollTimers || []).forEach(t => clearTimeout(t));
    client._inboxScrollTimers = [];
  }
  function updateInboxJumpBtn() {
    const el = ui.userInboxMessages;
    const btn = document.getElementById('userInboxJumpBtn');
    if (!el || !btn) return;
    const far = el.scrollHeight - el.scrollTop - el.clientHeight > 220;
    btn.classList.toggle('hidden', !far);
  }
  function inboxScrollToBottom() {
    const el = ui.userInboxMessages;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    updateInboxJumpBtn();
  }
  function ensureInboxJumpBtn() {
    if (document.getElementById('userInboxJumpBtn')) return;
    const card = ui.userInboxModal && ui.userInboxModal.querySelector('.modal-card');
    if (!card) return;
    const btn = document.createElement('button');
    btn.id = 'userInboxJumpBtn';
    btn.type = 'button';
    btn.className = 'inbox-jump-btn hidden';
    btn.textContent = '↓ Latest';
    btn.addEventListener('click', () => { inboxScrollToBottom(); if (client.selectedInboxPeer) markInboxRead(client.selectedInboxPeer); });
    card.appendChild(btn);
    if (ui.userInboxMessages) {
      ui.userInboxMessages.addEventListener('scroll', updateInboxJumpBtn, { passive: true });
      ui.userInboxMessages.addEventListener('wheel', () => { client._inboxUserScrollAt = Date.now(); clearInboxScrollTimers(); }, { passive: true });
      ui.userInboxMessages.addEventListener('touchstart', () => { client._inboxUserScrollAt = Date.now(); clearInboxScrollTimers(); }, { passive: true });
    }
  }
  function renderUserInboxConversation() {
    const msgsEl = ui.userInboxMessages, head = ui.userInboxHeader, comp = ui.userInboxComposer; if (!msgsEl) return;
    const threads = inboxThreads();
    const t = threads.find(x => x.peer === client.selectedInboxPeer);
    const me = myPlayerToken();
    if (!t) {
      if (head) head.textContent = 'Select a conversation';
      msgsEl.innerHTML = '<div class="muted" style="margin:auto">Select a person to start chatting.</div>';
      if (comp) comp.style.display = 'none';
      return;
    }
    const onlineTxt = t.online ? '<span style="color:#22c55e;font-weight:700">● online</span>' : '<span style="color:#94a3b8;font-weight:600">● offline</span>';
    const typingNow = (client.dmTyping && client.dmTyping[t.peer] && client.dmTyping[t.peer] > Date.now());
    const headAv = t.isAdmin ? '<span style="font-size:16px" title="Admin">👑</span>' : (t.avatar ? `<span class="mini-av ${t.isVip ? 'vip' : ''}" style="width:26px;height:26px;font-size:14px">${esc(t.avatar)}</span>` : '');
    const headVip = t.isVip ? '<span class="vip-badge">VIP</span>' : '';
    const statusTxt = typingNow ? '<span style="color:#22c55e;font-weight:700">● Typing…</span>' : onlineTxt;
    if (head) head.innerHTML = `<button type="button" id="inboxBackBtn" class="inbox-back-btn" aria-label="Back">‹</button><span style="display:flex;align-items:center;gap:8px">${headAv}<span>${esc(t.username)}${headVip}${t.isAdmin?'<span style="font-size:11px;color:#f59e0b;margin-left:4px">ADMIN</span>':''}</span><span style="font-size:13px;font-weight:700;letter-spacing:.2px">${statusTxt}</span></span>`;
    const prevScrollTop = msgsEl.scrollTop;
    const wasAtBottom = msgsEl.scrollHeight - prevScrollTop - msgsEl.clientHeight < 80;
    const lastMsgId = t.messages.length ? (t.messages[t.messages.length - 1].id || '') : '';
    const hasNew = !!lastMsgId && lastMsgId !== client._inboxLastMsgId;
    client._inboxLastMsgId = lastMsgId;
    const pinnedMsgs = t.messages.filter(m => m && m.pinned && !m.deleted);
    const pinnedStrip = pinnedMsgs.length ? `<div class="dm-pinned-strip">📌 <span>${pinnedMsgs.map(pm => esc(String(pm.text || '').slice(0, 70))).join('  ·  ')}</span></div>` : '';
    msgsEl.innerHTML = pinnedStrip + (t.messages.map(m => {
      const mine = m.fromToken === me;
      const isAdm = m.fromToken === '__admin__' || t.isAdmin;
      const style = m.style === 'green' ? 'color:#22c55e;font-weight:600'
        : m.style === 'blue' ? 'color:#3b82f6;font-weight:600'
          : m.style === 'gold' ? 'color:#f59e0b;font-weight:600'
          : m.style === 'red' ? 'color:#ef4444;font-weight:600' : '';
      const time = m.at ? new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const av = isAdm ? '<span class="chat-avatar" style="font-size:13px" title="Admin">👑</span>' : (m.fromAvatar ? `<span class="chat-avatar" style="font-size:13px">${esc(m.fromAvatar)}</span>` : '');
      const q = (!m.deleted && m.replyText) ? `<div class="dm-quote"><strong>${esc(m.replyName || 'Player')}</strong> ${esc(m.replyText)}</div>` : '';
      const rk = Object.keys(m.reactions || {}).filter(k => Array.isArray(m.reactions[k]) && m.reactions[k].length);
      const reactRow = (!m.deleted && rk.length) ? `<div class="dm-reacts">${rk.map(k => `<span>${k} ${m.reactions[k].length}</span>`).join('')}</div>` : '';
      const pinTag = m.pinned ? '<span class="dm-pin" title="Pinned">📌</span>' : '';
      const fwdTag = (!m.deleted && m.forwarded) ? `<div class="dm-fwd">➦ Forwarded from ${esc(typeof m.forwardedFrom === 'string' ? m.forwardedFrom : ((m.forwardedFrom && m.forwardedFrom.name) || 'Player'))}</div>` : '';
      const timeTag = `<span class="dm-time">${time}</span>`;
      const body = m.deleted
        ? `<div class="chat-text dm-deleted">${fwdTag}🚫 Message deleted by ${esc(m.deletedBy || (isAdm ? 'Admin' : 'user'))}${timeTag}</div>`
        : `<div class="chat-text" style="${style}">${fwdTag}${esc(m.text||'')}${timeTag}</div>`;
      return `<div class="chat-msg${mine ? ' mine' : ''}${isAdm ? ' admin-msg' : ''}${m.deleted ? ' deleted' : ''}" data-dm-id="${esc(String(m.id || ''))}">
        <div class="chat-content">
          ${q}
          <div class="dm-bubble"><div class="chat-text-wrap">${body}<button type="button" class="chat-more" data-dm-actions="${esc(String(m.id || ''))}" title="Message actions" aria-label="Message actions">⋮</button></div>${pinTag ? `<span class="dm-pin-line">${pinTag}</span>` : ''}</div>
          ${reactRow}
        </div>
      </div>`;
    }).join('') || '<div class="muted" style="margin:auto;text-align:center">No messages yet. Say hello!</div>');
    if (comp) comp.style.display = 'flex';
    ensureInboxJumpBtn();
    const forceBottom = !!client._inboxInitialScroll || wasAtBottom || hasNew;
    client._inboxInitialScroll = false;
    clearInboxScrollTimers();
    if (forceBottom) {
      const toBottom = () => {
        if (Date.now() - (client._inboxUserScrollAt || 0) < 500) return;
        msgsEl.scrollTop = msgsEl.scrollHeight;
        updateInboxJumpBtn();
      };
      toBottom();
      requestAnimationFrame(toBottom);
      client._inboxScrollTimers = [setTimeout(toBottom, 60), setTimeout(toBottom, 180)];
    } else {
      msgsEl.scrollTop = prevScrollTop;
      updateInboxJumpBtn();
    }
  }

  function dmById(id) { return (client.directMessages || []).find(m => m && m.id === id) || null; }
  function closeDmCtx() { if (ui.inboxCtxMenu) ui.inboxCtxMenu.classList.add('hidden'); }
  function openDmCtx(id, x, y) {
    const menu = ui.inboxCtxMenu;
    if (!menu || !dmById(id)) return;
    client.dmCtxId = id;
    menu.classList.remove('hidden');
    menu.style.visibility = 'hidden';
    menu.style.left = '0px';
    menu.style.top = '0px';
    const r = menu.getBoundingClientRect();
    const left = Math.min(x, window.innerWidth - r.width - 8);
    const top = Math.min(y, window.innerHeight - r.height - 8);
    menu.style.left = Math.max(8, left) + 'px';
    menu.style.top = Math.max(8, top) + 'px';
    menu.style.visibility = '';
  }
  function renderForwardList() {
    const el2 = ui.forwardList; if (!el2) return;
    const me = myPlayerToken();
    const seen = new Set();
    const rows = [];
    rows.push('<label style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--border);border-radius:8px;cursor:pointer"><input type="checkbox" id="fwdPublic" checked><strong>Public chat</strong></label>');
    (Array.isArray(client.contacts) ? client.contacts : []).forEach(c => {
      if (!c || !c.token || c.token === me || seen.has(c.token)) return;
      seen.add(c.token);
      rows.push(`<label style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--border);border-radius:8px;cursor:pointer"><input type="checkbox" class="fwd-peer" value="${esc(c.token)}"><span>${esc(c.avatar || '')}</span><span>${esc(c.username || 'Player')}</span>${c.isVip ? '<span style="font-size:9px;color:#f59e0b;border:1px solid #f59e0b;border-radius:4px;padding:0 3px">VIP</span>' : ''}${c.isAdmin ? '<span style="font-size:10px;color:#f59e0b">ADMIN</span>' : ''}</label>`);
    });
    el2.innerHTML = rows.join('');
  }
  function openForwardPicker(id, source) {
    client.dmForwardSource = source === 'chat' ? 'chat' : 'dm';
    if (!ui.forwardModal) return;
    client.dmForwardId = id || null;
    const pub = document.getElementById('fwdPublic');
    renderForwardList();
    if (ui.forwardModal) { ui.forwardModal.classList.remove('hidden'); ui.forwardModal.classList.add('show'); ui.forwardModal.setAttribute('aria-hidden', 'false'); }
  }
  function closeForwardPicker() {
    if (!ui.forwardModal) return;
    ui.forwardModal.classList.add('hidden'); ui.forwardModal.classList.remove('show'); ui.forwardModal.setAttribute('aria-hidden', 'true');
    client.dmForwardId = null;
  }

  function beginDmReply(m) {
    if (!m || m.deleted) return;
    client.dmReply = { id: m.id, name: m.fromToken === myPlayerToken() ? 'You' : (m.fromUsername || 'Player'), text: String(m.text || '') };
    if (ui.userInboxInput) { ui.userInboxInput.placeholder = 'Replying to ' + client.dmReply.name + '\u2026'; ui.userInboxInput.focus(); }
  }

  function prefillPublicChat(text) {
    openChatModal();
    if (ui.chatInput) { ui.chatInput.value = text; ui.chatInput.focus(); }
  }

  function inboxPanes() {
    if (!ui.userInboxModal) return null;
    const card = ui.userInboxModal.querySelector('.modal-card');
    const wrap = card && card.children[1];
    if (!wrap) return null;
    return { list: wrap.children[0], chat: wrap.children[1] };
  }
  function openInboxChatPane() {
    if (ui.userInboxModal) ui.userInboxModal.classList.add('inbox-mobile-thread-open');
    if (window.innerWidth > 760) return;
    const p = inboxPanes();
    if (p) { if (p.list) p.list.style.display = 'none'; if (p.chat) p.chat.style.display = 'flex'; }
  }
  function showInboxListPane() {
    if (ui.userInboxModal) ui.userInboxModal.classList.remove('inbox-mobile-thread-open');
    const p = inboxPanes();
    if (!p) return;
    if (p.list) p.list.style.display = 'flex';
    if (p.chat) p.chat.style.display = window.innerWidth <= 760 ? 'none' : '';
  }
  function renderUserInbox() { renderUserInboxThreads(); renderUserInboxConversation(); renderUserInboxBadge(); }

  function showFreebetPopup(fb) {
    if (!fb || !ui.freebetModal) return;
    if (!Array.isArray(client.freebets)) client.freebets = [];
    if (!client.freebets.some(f => f.id === fb.id)) client.freebets.push(fb);
    showNextFreebet();
  }

  function getPendingFreebets() {
    const now = serverNow();
    return (client.freebets || [])
      .filter(f => !f.claimed && f.status !== 'EXPIRED' && f.status !== 'CLAIMED' && f.status !== 'LOST' && (!f.expiresAt || f.expiresAt > now))
      .reverse(); // newest first
  }

  function showNextFreebet() {
    if (!ui.freebetList || !ui.freebetModal) return;
    const pending = getPendingFreebets();
    if (!pending.length) {
      client.currentFreebetId = null;
      if (ui.freebetEmpty) ui.freebetEmpty.style.display = 'block';
      if (ui.freebetModal && ui.freebetModal.classList.contains('show')) closeModal(ui.freebetModal);
      return;
    }
    if (ui.freebetEmpty) ui.freebetEmpty.style.display = 'none';
    const fb = pending[0]; // show newest only
    client.currentFreebetId = fb.id;
    const now = serverNow();
    ui.freebetList.innerHTML = '';
    const remaining = Math.max(0, Math.floor((fb.expiresAt ? fb.expiresAt - now : 0) / 1000));
    const card = document.createElement('div');
    card.style.cssText = 'background:#0f1626;border:1px solid var(--border);border-radius:12px;padding:24px 16px;text-align:center';
    card.innerHTML = `
      <div style="font-size:44px;margin-bottom:8px">🎁</div>
      <div style="font-size:34px;font-weight:800;color:#fde68a;margin-bottom:6px">KSh ${Number(fb.amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <p class="muted" style="font-size:12px;margin:0 0 14px">The admin has awarded you a free bet!</p>
      <button class="btn-primary" id="fb-claim-one" style="background:#f59e0b;color:#1f2937;padding:10px 26px;font-size:15px;margin-bottom:10px">Claim Free Bet</button>
      <div id="fb-countdown-one" style="font-size:12px;color:var(--muted)"></div>
    `;
    ui.freebetList.appendChild(card);
    const claimBtn = card.querySelector('#fb-claim-one');
    const countdownEl = card.querySelector('#fb-countdown-one');
    function tick() {
      const now = serverNow();
      const remainingSec = Math.max(0, Math.floor((fb.expiresAt ? fb.expiresAt - now : 0) / 1000));
      if (remainingSec <= 0) {
        clearInterval(timer);
        countdownEl.textContent = 'Expired';
        claimBtn.disabled = true;
        claimBtn.textContent = 'Expired';
        setTimeout(showNextFreebet, 800);
        return;
      }
      countdownEl.textContent = `Expires in ${Math.floor(remainingSec/60)}:${String(remainingSec%60).padStart(2,'0')}`;
    }
    tick();
    const timer = setInterval(tick, 1000);
    client.freebetTimers[fb.id] = timer;
    claimBtn.addEventListener('click', () => claimFreebet(fb));
    openModal(ui.freebetModal);
  }

  function claimFreebet(fb) {
    if (!fb) return;
    socket.emit('freebet_claim', { id: fb.id }, (ack) => {
      if (client.freebetTimers[fb.id]) { clearInterval(client.freebetTimers[fb.id]); delete client.freebetTimers[fb.id]; }
      if (ack && ack.ok) {
        showToast('Freebet claimed! +' + fmtMoney(fb.amount));
        setTimeout(showNextFreebet, 600);
      } else {
        showToast((ack && ack.msg) || 'Could not claim freebet');
      }
    });
  }

  if (ui.freebetClose) ui.freebetClose.addEventListener('click', () => {
    const fbId = client.currentFreebetId;
    const fb = fbId ? (client.freebets || []).find(f => f.id === fbId) : null;
    if (fb && !fb.claimed && fb.status !== 'LOST' && fb.status !== 'EXPIRED' && fb.status !== 'CLAIMED') {
      fb.status = 'LOST';
      socket.emit('freebet_decline', { id: fb.id }, (ack) => {
        if (ack && ack.ok) showToast('Free bet closed and marked as lost', 'warn');
        else if (ack && !ack.ok) showToast(ack.msg || 'Could not close free bet', 'warn');
      });
    }
    client.currentFreebetId = null;
    Object.values(client.freebetTimers || {}).forEach(t => clearInterval(t));
    client.freebetTimers = {};
    if (ui.freebetModal) closeModal(ui.freebetModal);
  });
  if (ui.freebetModal) ui.freebetModal.addEventListener('click', (e) => {
    if (e.target === ui.freebetModal) {
      Object.values(client.freebetTimers || {}).forEach(t => clearInterval(t));
      client.freebetTimers = {};
      closeModal(ui.freebetModal);
    }
  });

  let lastNoticeAt = 0;
  function applyState(state) {
    if (!state) return;
    if (state.config) client.config = Object.assign(client.config, state.config);
    if (state.payments) client.paymentsSettings = state.payments;
    if (state.serverTime) client.serverOffset = state.serverTime - Date.now();
    client.state = state;
    if (Array.isArray(state.freebets)) client.freebets = state.freebets;
    showNextFreebet();
    if (Array.isArray(state.rains)) client.rains = state.rains;
    if (Array.isArray(state.chat)) {
      const newChat = state.chat.slice(-200);
      client.chatPins = Array.isArray(state.chatPins) ? state.chatPins.slice() : (client.chatPins || []);
      client.chatSaved = Array.isArray(state.chatSaved) ? state.chatSaved.slice() : (client.chatSaved || []);
      const prev = client.chat || [];
      const prevIds = new Set(prev.map(m => m.id));
      const added = newChat.filter(m => !prevIds.has(m.id));
      const samePrefix = prev.length <= newChat.length && prev.every((m, i) => m.id === newChat[i].id);
      client.chat = newChat;
      if (ui.chatModal && ui.chatModal.classList.contains('show')) {
        if (samePrefix && added.length && added.length < 20) {
          const el = ui.chatMessages;
          el.insertAdjacentHTML('beforeend', added.map(m => renderChatMessageHtml(m)).join(''));
          el.scrollTop = el.scrollHeight;
        } else if (prev.length !== newChat.length) {
          renderChat(true);
        }
        refreshRainCards();
        markChatSeen();
      } else {
        updateChatBadge();
      }
    }
    if (Array.isArray(state.adminInbox)) {
      client.adminChat = state.adminInbox.slice(-100);
      if (ui.adminMessageModal && ui.adminMessageModal.classList.contains('show')) renderAdminChat();
    }
    if (Array.isArray(state.contacts)) client.contacts = state.contacts.map(c => Object.assign({}, c, { avatar: c.avatar || (c.isAdmin ? '👑' : null) }));
    if (Array.isArray(state.directMessages)) client.directMessages = state.directMessages.slice(-300);
    if (state.player && state.player.dmReadAt && typeof state.player.dmReadAt === 'object') client.dmReadAt = state.player.dmReadAt;
    renderUserInboxBadge();
    if (ui.userInboxModal && ui.userInboxModal.classList.contains('show')) renderUserInbox();
    if (state.player && state.player.token) {
      client.token = state.player.token;
      localStorage.setItem(TOKEN_KEY, client.token);
      ui.balance.textContent = fmtMoney(state.player.balance);
      const uname = state.player.username || 'Player';
      const av = state.player.avatar || uname.charAt(0).toUpperCase();
      if (ui.profileName) ui.profileName.textContent = uname;
      if (ui.profileSub) ui.profileSub.textContent = state.player && state.player.phoneNumber ? state.player.phoneNumber : '—';
      if (ui.avatar) {
        ui.avatar.textContent = av;
        ui.avatar.className = 'avatar' + (state.player.isVip ? ' vip' : '');
      }
      if (ui.profilePhone) {
        const phone = state.player && state.player.phoneNumber ? state.player.phoneNumber : '';
        ui.profilePhone.value = phone || '';
        ui.profilePhone.placeholder = phone ? '' : 'Not registered';
        ui.profilePhone.style.color = phone ? '#e5e7eb' : '#94a3b8';
        ui.profilePhone.readOnly = true;
      }
      const mutedUntil = state.player.chatMutedUntil || 0;
      const muted = mutedUntil > serverNow();
      if (ui.chatInput) {
        ui.chatInput.disabled = muted;
        ui.chatInput.placeholder = muted ? `Muted for bad language — ${Math.max(1, Math.ceil((mutedUntil - serverNow()) / 60000))} min left` : 'Type a message...';
        if (ui.chatSend) ui.chatSend.disabled = muted;
      }
      if (ui.modal.classList.contains('show')) {
        ui.profileVipStatus.textContent = state.player.isVip ? `Status: VIP (${state.player.activityCount || 0} active actions in last 10 min)` : `Status: Regular player (${state.player.activityCount || 0} active actions in last 10 min)`;
      }
      if (state.player.notice && state.player.notice.msg && state.player.notice.at && state.player.notice.at !== lastNoticeAt) {
        lastNoticeAt = state.player.notice.at;
        showToast(state.player.notice.msg);
      }
    }
    renderRecent(state.recent || []);
    setMyStatusFromState(state);
    renderLiveBets(state);
    renderBoosterpot(state);
    }

  const socket = io({ transports: ['websocket', 'polling'] });
  socket.on('connect', () => {
    client.connected = true;
    socket.emit('hello', { token: client.token }, (ack) => {
      if (ack && ack.ok) {
        if (ack.token) { client.token = ack.token; localStorage.setItem(TOKEN_KEY, ack.token); }
        if (ack.serverTime) client.serverOffset = ack.serverTime - Date.now();
      }
      socket.emit('request_state');
    });
  });
  socket.on('disconnect', () => { client.connected = false; showToast('Reconnecting...'); });

  socket.on('session_kicked', (data) => {
    showKickedPopup(data.msg || 'Multisession not allowed — your account was logged in on another device.');
  });

  function showKickedPopup(msg) {
    const overlay = document.createElement('div');
    overlay.className = 'session-conflict-overlay';
    overlay.innerHTML = `
      <div class="session-conflict-card">
        <h3>Multisession not allowed</h3>
        <p>${escapeHtml(msg)}</p>
        <div class="session-conflict-actions">
          <button class="session-conflict-btn allow" id="kickedLoginAgain">Login again</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const btn = overlay.querySelector('#kickedLoginAgain');
    btn.onclick = () => {
      document.body.removeChild(overlay);
      localStorage.removeItem(TOKEN_KEY);
      location.href = 'login.html';
    };
  }
  socket.io.on('reconnect', () => {
    client.connected = true;
    socket.emit('hello', { token: client.token }, (ack) => {
      if (ack && ack.serverTime) client.serverOffset = ack.serverTime - Date.now();
      socket.emit('request_state');
    });
  });
  socket.on('state', applyState);

  socket.on('tick', (state) => { if (state) applyState(state); });
  socket.on('payments_state', (pstate) => { if (pstate) applyPaymentsState(pstate); });
  socket.on('chat_new', (msg) => {
    if (!msg) return;
    if (!Array.isArray(client.chat)) client.chat = [];
    if (!client.chat.some(m => m.id === msg.id)) client.chat.push(msg);
    if (client.chat.length > 200) client.chat = client.chat.slice(-200);
    if (msg.rainId && msg.rain && !findRain(msg.rainId)) { if (!Array.isArray(client.rains)) client.rains = []; client.rains.push(Object.assign({ claimedBy: [], claimedCount: 0 }, msg.rain)); }
    const rain = (msg.type === 'rain' || msg.rainId) ? (msg.rain || findRain(msg.rainId) || null) : null;
    if (rain && !(client.token && rain.from === client.token) && !(ui.chatModal && ui.chatModal.classList.contains('show'))) {
      showToast('🌧️ Rain is falling! Hurry to Chat and claim your share!', 10000, 'rain');
    }
    if (ui.chatModal && ui.chatModal.classList.contains('show')) {
      ui.chatMessages.insertAdjacentHTML('beforeend', renderChatMessageHtml(msg));
      ui.historyMeta.textContent = `Chat · ${client.chat.length} messages`;
      ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight;
      refreshRainCards();
      markChatSeen();
    } else {
      updateChatBadge();
    }
  });
  socket.on('chat_updated', (msg) => {
    if (!msg || !msg.id) return;
    if (!Array.isArray(client.chat)) client.chat = [];
    const idx = client.chat.findIndex(m => m.id === msg.id);
    if (idx === -1) client.chat.push(msg);
    else client.chat[idx] = msg;
    if (ui.chatModal && ui.chatModal.classList.contains('show')) renderChat();
    else updateChatBadge();
  });
  socket.on('chat_removed', (payload) => {
    const id = payload && payload.id;
    if (!id) return;
    if (Array.isArray(client.chat)) client.chat = client.chat.filter(m => m && m.id !== id);
    if (Array.isArray(client.chatPins)) client.chatPins = client.chatPins.filter(x => x !== id);
    if (ui.chatModal && ui.chatModal.classList.contains('show')) renderChat();
    else updateChatBadge();
  });
  socket.on('chat_typing', (data) => {
    if (!data || !data.userId) return;
    if (client.token && data.userId === client.token) return;
    if (data.typing === false) delete client.typingUsers[data.userId];
    else client.typingUsers[data.userId] = { name: data.name || 'Player', at: Date.now() };
    renderChatTyping();
    clearTimeout(client['_typingT_' + data.userId]);
    if (data.typing !== false) {
      client['_typingT_' + data.userId] = setTimeout(() => {
        delete client.typingUsers[data.userId];
        renderChatTyping();
      }, 3500);
    }
  });
  socket.on('chat_pins', (payload) => {
    if (!payload || !Array.isArray(payload.ids)) return;
    client.chatPins = payload.ids.slice();
    if (ui.chatModal && ui.chatModal.classList.contains('show')) renderChat();
    else renderChatPinnedBar();
  });
  socket.on('chat_saved', (payload) => {
    if (!payload || !Array.isArray(payload.ids)) return;
    client.chatSaved = payload.ids.slice();
    if (ui.chatModal && ui.chatModal.classList.contains('show')) renderChat();
  });
  socket.on('admin_message', (msg) => {
    if (!msg || !msg.text) return;
    if (ui.adminMessageText) ui.adminMessageText.textContent = String(msg.text);
    openModal(ui.adminMessageModal);
    renderUserInboxBadge();
  });
  socket.on('dm_typing', (payload) => {
    if (!payload || !payload.from) return;
    if (!client.dmTyping || typeof client.dmTyping !== 'object') client.dmTyping = {};
    client.dmTyping[payload.from] = Date.now() + 3000;
    if (ui.userInboxModal && ui.userInboxModal.classList.contains('show')) {
      renderUserInboxThreads();
      if (client.selectedInboxPeer === payload.from) renderUserInboxConversation();
      setTimeout(() => { if (client.dmTyping && client.dmTyping[payload.from] < Date.now()) { delete client.dmTyping[payload.from]; if (ui.userInboxModal && ui.userInboxModal.classList.contains('show')) { renderUserInboxThreads(); if (client.selectedInboxPeer === payload.from) renderUserInboxConversation(); } } }, 3200);
    }
  });

  socket.on('dm_updated', (payload) => {
    const msg = payload && payload.message;
    if (!msg || !msg.id) return;
    const arr = client.directMessages || [];
    const idx = arr.findIndex(x => x && x.id === msg.id);
    if (idx !== -1) arr[idx] = msg;
    renderUserInbox();
  });

  socket.on('dm_removed', (payload) => {
    const id = payload && payload.id;
    if (!id) return;
    client.directMessages = (client.directMessages || []).filter(m => m && m.id !== id);
    renderUserInbox();
  });

  socket.on('dm_new', (dm) => {
    if (!dm) return;
    if (!Array.isArray(client.directMessages)) client.directMessages = [];
    if (!client.directMessages.some(m => m.id === dm.id)) client.directMessages.push(dm);
    if (dm.fromToken && client.dmTyping) delete client.dmTyping[dm.fromToken];
    renderUserInboxBadge();
    if (ui.userInboxModal && ui.userInboxModal.classList.contains('show')) renderUserInbox();
  });
  socket.on('freebet_new', (fb) => {
    if (!fb) return;
    if (!Array.isArray(client.freebets)) client.freebets = [];
    if (!client.freebets.some(f => f.id === fb.id)) client.freebets.push(fb);
    showFreebetPopup(fb);
  });
  socket.on('freebet_expired', (fb) => {
    if (!fb) return;
    if (client.freebetTimers[fb.id]) { clearInterval(client.freebetTimers[fb.id]); delete client.freebetTimers[fb.id]; }
    if (Array.isArray(client.freebets)) client.freebets = client.freebets.filter(f => f.id !== fb.id);
    showNextFreebet();
  });

  function normalizeAutoCashout(v) {
    const n = parseFloat(v);
    if (!isFinite(n) || n <= 0) return null;
    return Math.min(100, Math.max(1.1, round2(n)));
  }

  function placeBet(i) {
    const state = client.state;
    const round = state && state.round;
    if (!round) return;
    const auto = getAutoState(i);
    if (auto.running) return showToast('Stop Auto mode to place manual bets');
    const b = myBetForPanel(state, i);
    if (b && (b.status === 'QUEUED' || (b.status === 'BET_PLACED' && b.roundId === round.roundId) || (b.status === 'FLYING' && b.roundId === round.roundId))) return;
    const amount = getPanelAmount(i);
    if (amount < 10 || amount > 10000) return showToast('Bet amount must be between KSh 10.00 and KSh 10,000.00');
    const autoVal = parseFloat(ui.auto[i].value);
    const autoCo = normalizeAutoCashout(autoVal);
    if (autoCo != null && String(autoCo) !== String(ui.auto[i].value)) ui.auto[i].value = autoCo;
    socket.emit('place_bet', { panel: i, amount, auto: autoCo }, (ack) => {
      if (!ack || !ack.ok) showToast((ack && ack.msg) || 'Bet failed');
      else if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
      else if (ack.queued) showToast('Bet queued for next round');
    });
  }
  function cancelBet(i) {
    const auto = getAutoState(i);
    if (auto.running) return showToast('Auto mode is running');
    socket.emit('cancel_bet', { panel: i }, (ack) => {
      if (!ack || !ack.ok) showToast((ack && ack.msg) || 'Cannot cancel');
      else if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
    });
  }
  function cashOut(i) {
    socket.emit('cashout', { panel: i }, (ack) => {
      if (!ack || !ack.ok) showToast((ack && ack.msg) || 'Cash out failed');
      else if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
    });
  }
  function handleAction(i) {
    const state = client.state; if (!state) return;
    const round = state.round;
    const b = myBetForPanel(state, i);
    const flying = flyingBetForPanel(state, i);
    if (round.state === 'RUNNING' && flying) cashOut(i);
    else if (b && b.status === 'QUEUED') {
      const auto = getAutoState(i);
      if (auto.running && !b) return;
      cancelBet(i);
    }
    else if (round.state === 'BETTING' && b && b.status === 'BET_PLACED' && b.roundId === round.roundId) cancelBet(i);
    else if (!b || b.status === 'LOST' || b.status === 'CASHED_OUT' || (b.roundId !== round.roundId && b.status !== 'QUEUED' && b.status !== 'FLYING')) placeBet(i);
  }

  function startAuto(i) {
    const amount = Math.max(10, Math.min(10000, Math.floor(parseInt(ui.autoAmount[i].value || '100', 10) || 100)));
    const rounds = Math.max(1, Math.min(1000, Math.floor(parseInt(ui.autoRounds[i].value || '1', 10) || 1)));
    ui.autoAmount[i].value = amount;
    ui.autoRounds[i].value = rounds;
    const t = parseFloat(ui.autoTarget[i].value);
    const autoCashout = normalizeAutoCashout(t);
    if (autoCashout != null && String(autoCashout) !== String(ui.autoTarget[i].value)) ui.autoTarget[i].value = autoCashout;
    socket.emit('start_auto', { panel: i, amount, rounds, autoCashout }, (ack) => {
      if (!ack || !ack.ok) return showToast((ack && ack.msg) || 'Could not start auto');
      client.autoAmountDirty[i] = false;
      client.autoRoundsDirty[i] = false;
      showToast('Auto mode started');
      if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
    });
  }
function stopAuto(i) {
    socket.emit('stop_auto', { panel: i }, (ack) => {
      if (!ack || !ack.ok) return showToast((ack && ack.msg) || 'Could not stop auto');
      showToast('Auto mode stopped');
    });
  }

  function bindUI() {
    // mode tabs
    [0,1].forEach(panel => {
      ui.tabs[panel].forEach(tab => {
        tab.addEventListener('click', () => setPanelMode(panel, tab.dataset.mode));
      });
    });

    // manual amount controls
    document.querySelectorAll('.manual-controls .step').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.panel;
        const b = client.state ? myBetForPanel(client.state, i) : null;
        if (b && b.status === 'QUEUED') return;
        const delta = btn.dataset.action === 'inc' ? 10 : -10;
        ui.amount[i].value = Math.max(10, Math.min(10000, (parseInt(ui.amount[i].value || '0', 10) || 0) + delta));
        if (client.state) updatePanels(computeDisplayRound(client.state.round));
      });
    });
    document.querySelectorAll('.manual-controls .chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.panel;
        const b = client.state ? myBetForPanel(client.state, i) : null;
        if (b && b.status === 'QUEUED') return;
        ui.amount[i].value = Math.max(10, Math.min(10000, parseInt(btn.dataset.amount, 10) || 100));
        if (client.state) updatePanels(computeDisplayRound(client.state.round));
      });
    });
    [0,1].forEach(i => {
      ui.action[i].addEventListener('click', () => handleAction(i));
      ui.amount[i].addEventListener('input', () => { if (client.state) updatePanels(computeDisplayRound(client.state.round)); });
    });

    // auto controls
    document.querySelectorAll('.auto-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.panel;
        if (getAutoState(i).running) return;
        const delta = btn.dataset.action === 'inc' ? 10 : -10;
        ui.autoAmount[i].value = Math.max(10, Math.min(10000, (parseInt(ui.autoAmount[i].value || '0', 10) || 0) + delta));
        client.autoAmountDirty[i] = true;
        ui.autoSub[i].textContent = fmtMoney(Math.max(10, parseInt(ui.autoAmount[i].value||'100',10)||100));
      });
    });
    document.querySelectorAll('.auto-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.panel;
        if (getAutoState(i).running) return;
        ui.autoAmount[i].value = Math.max(10, Math.min(10000, parseInt(btn.dataset.amount, 10) || 100));
        client.autoAmountDirty[i] = true;
        ui.autoSub[i].textContent = fmtMoney(parseInt(ui.autoAmount[i].value, 10));
      });
    });
    [0,1].forEach(i => {
      ui.autoAmount[i].addEventListener('input', () => {
        client.autoAmountDirty[i] = true;
        const amt = Math.max(10, Math.min(10000, Math.floor(parseInt(ui.autoAmount[i].value || '100', 10) || 100)));
        ui.autoSub[i].textContent = fmtMoney(amt);
      });
      ui.autoRounds[i].addEventListener('input', () => {
        client.autoRoundsDirty[i] = true;
      });
      ui.autoRounds[i].addEventListener('change', () => {
        const v = Math.max(1, Math.min(1000, Math.floor(parseInt(ui.autoRounds[i].value || '1', 10) || 1)));
        ui.autoRounds[i].value = v;
        client.autoRoundsDirty[i] = true;
      });
      ui.autoAction[i].addEventListener('click', () => {
        const a = getAutoState(i);
        if (a.running) stopAuto(i); else startAuto(i);
      });
      if (ui.autoCashout[i]) ui.autoCashout[i].addEventListener('click', () => cashOut(i));
    });

    document.getElementById('depositBtn').addEventListener('click', () => { openDepositModal(); refreshPayments(); });
    document.getElementById('withdrawBtn').addEventListener('click', () => { openWithdrawModal(); refreshPayments(); });
    if (ui.txHistoryBtn) ui.txHistoryBtn.addEventListener('click', openTxModal);
  [0, 1].forEach(i => {
    if (ui.auto[i]) ui.auto[i].addEventListener('change', () => { const v = normalizeAutoCashout(ui.auto[i].value); ui.auto[i].value = v == null ? '' : v; });
    if (ui.autoTarget[i]) ui.autoTarget[i].addEventListener('change', () => { const v = normalizeAutoCashout(ui.autoTarget[i].value); ui.autoTarget[i].value = v == null ? '' : v; });
    [ui.auto[i], ui.autoTarget[i]].forEach(el => {
      if (!el) return;
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { const v = normalizeAutoCashout(el.value); el.value = v == null ? '' : v; }
      });
    });
  });
  if (ui.rulesBtn) ui.rulesBtn.addEventListener('click', () => { openModal(ui.rulesModal); try { localStorage.setItem('aviator_rules_open', 'true'); } catch (e) { } });
  if (ui.rulesClose) ui.rulesClose.addEventListener('click', () => { closeModal(ui.rulesModal); try { localStorage.setItem('aviator_rules_open', 'false'); } catch (e) { } });
  if (ui.rulesModal) ui.rulesModal.addEventListener('click', (e) => { if (e.target === ui.rulesModal) { closeModal(ui.rulesModal); try { localStorage.setItem('aviator_rules_open', 'false'); } catch (err) { } } });
    ui.profileBtn.addEventListener('click', openProfileModal);
    ui.modalClose.addEventListener('click', closeProfileModal);
    ui.modalCancel.addEventListener('click', closeProfileModal);
    ui.modal.addEventListener('click', (e) => { if (e.target === ui.modal) closeProfileModal(); });
    ui.usernameInput.addEventListener('input', updateProfilePreview);
    ui.modalSave.addEventListener('click', () => {
      const username = (ui.usernameInput.value || '').replace(/\s+/g, ' ').trim();
      if (!username) return showToast('Enter a valid username');
      socket.emit('set_profile', { username, avatar: client.selectedAvatar }, (ack) => {
        if (!ack || !ack.ok) return showToast((ack && ack.msg) || 'Could not update profile');
      showToast('Profile updated');
        closeProfileModal();
      });
    });

    if (ui.profileLogout) ui.profileLogout.addEventListener('click', async () => {
      try {
        await api('/api/auth/logout', { method: 'POST', body: JSON.stringify({ token: client.token }) });
      } catch (_) {}
      socket.disconnect();
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('aviator_chat_seen');
      location.href = 'login.html';
    });

    // deposit modal
    if (ui.depositClose) ui.depositClose.addEventListener('click', () => closeModal(ui.depositModal));
    if (ui.depositCancel) ui.depositCancel.addEventListener('click', () => closeModal(ui.depositModal));
    if (ui.depositModal) ui.depositModal.addEventListener('click', (e) => { if (e.target === ui.depositModal) closeModal(ui.depositModal); });
    if (ui.depositQuick) ui.depositQuick.querySelectorAll('.chip').forEach(btn => btn.addEventListener('click', () => { ui.depositAmount.value = btn.dataset.amount; }));
    if (ui.depositConfirm) ui.depositConfirm.addEventListener('click', async () => {
      const s = client.paymentsSettings || {};
      const phone = normalizePhoneInput(ui.depositPhone.value);
      const amount = Math.floor(Number(ui.depositAmount.value));
      const step1 = document.getElementById('depositStep1');
      const step2 = document.getElementById('depositStep2');
      if (client.pendingDepositId) {
        const msg = (document.getElementById('depositMessage') && document.getElementById('depositMessage').value || '').trim();
        if (!msg) return setPayMsg(ui.depositStatusMsg, 'Paste the M-Pesa transaction message you received after paying.', 'err');
        if (msg.length < 10) return setPayMsg(ui.depositStatusMsg, 'Paste the full transaction message.', 'err');
        ui.depositConfirm.disabled = true;
        setPayMsg(ui.depositStatusMsg, 'Submitting for admin approval...', 'proc');
        try {
          const res = await api(`/api/payments/deposit/${client.pendingDepositId}/mark-paid`, { method: 'POST', body: JSON.stringify({ payment_message: msg }) });
          setPayMsg(ui.depositStatusMsg, res.msg || 'Submitted. Awaiting admin approval.', 'ok');
          showToast(res.msg || 'Awaiting admin approval');
          if (res.data) applyPaymentsState(res.data);
          client.pendingDepositId = null;
          ui.depositConfirm.textContent = 'Submitted';
          setTimeout(() => { closeModal(ui.depositModal); refreshPayments(); }, 1200);
        } catch (e) {
          setPayMsg(ui.depositStatusMsg, e.message || 'Failed to submit', 'err');
          showToast(e.message || 'Failed to submit');
          ui.depositConfirm.disabled = false;
        }
        return;
      }
      if (!phone) return setPayMsg(ui.depositStatusMsg, 'Enter a valid M-Pesa phone number (e.g. 07XXXXXXXX or 2547XXXXXXXX).', 'err');
      if (!isFinite(amount) || amount < 10) return setPayMsg(ui.depositStatusMsg, 'Minimum deposit is KSh 10.00.', 'err');
      if (amount > 150000) return setPayMsg(ui.depositStatusMsg, 'Maximum deposit is KSh 150,000.00.', 'err');
      ui.depositConfirm.disabled = true;
      setPayMsg(ui.depositStatusMsg, 'Preparing payment details...', 'proc');
      try {
        const res = await api('/api/payments/deposit', { method: 'POST', body: JSON.stringify({ phone_number: phone, amount, client_ref: 'dep_' + Date.now() }) });
        client.pendingDepositId = res.deposit && res.deposit.id ? res.deposit.id : null;
        if (!client.pendingDepositId) throw new Error('Could not create deposit request');
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = '';
        if (document.getElementById('depositPayAmount')) document.getElementById('depositPayAmount').textContent = String(amount);
        if (ui.depositPhone) ui.depositPhone.disabled = true;
        if (ui.depositAmount) ui.depositAmount.disabled = true;
        if (ui.depositQuick) ui.depositQuick.querySelectorAll('button').forEach(b => b.disabled = true);
        setPayMsg(ui.depositStatusMsg, `Send KSh ${amount} to Paybill ${s.paybill || '542542'}, Account ${s.accountNumber || '03708400476150'}. After paying, paste the M-Pesa confirmation message below and submit.`, '');
        showToast('Payment details ready. Paste M-Pesa message after paying.');
        if (ui.depositConfirm) ui.depositConfirm.textContent = 'Submit for approval';
        if (res.data) applyPaymentsState(res.data);
      } catch (e) {
        setPayMsg(ui.depositStatusMsg, e.message || 'Deposit failed', 'err');
        showToast(e.message || 'Deposit failed');
      } finally { if (ui.depositConfirm && ui.depositConfirm.textContent !== 'Submitted') ui.depositConfirm.disabled = false; }
    });

    // withdraw modal
    if (ui.withdrawClose) ui.withdrawClose.addEventListener('click', () => closeModal(ui.withdrawModal));
    if (ui.withdrawCancel) ui.withdrawCancel.addEventListener('click', () => closeModal(ui.withdrawModal));
    if (ui.withdrawModal) ui.withdrawModal.addEventListener('click', (e) => { if (e.target === ui.withdrawModal) closeModal(ui.withdrawModal); });
    if (ui.withdrawConfirm) ui.withdrawConfirm.addEventListener('click', async () => {
      const s = client.paymentsSettings || {};
      const phone = normalizePhoneInput(ui.withdrawPhone.value);
      const amount = Math.floor(Number(ui.withdrawAmount.value));
      const step1 = document.getElementById('withdrawStep1');
      const step2 = document.getElementById('withdrawStep2');
      const fee = Number(s.activationFee || 220);
      if (client.pendingWithdrawId) {
        const msg = (document.getElementById('withdrawMessage') && document.getElementById('withdrawMessage').value || '').trim();
        if (!msg) return setPayMsg(ui.withdrawStatusMsg, 'Paste the M-Pesa confirmation message showing you paid the activation fee.', 'err');
        if (msg.length < 10) return setPayMsg(ui.withdrawStatusMsg, 'Paste the full activation fee transaction message.', 'err');
        ui.withdrawConfirm.disabled = true;
        setPayMsg(ui.withdrawStatusMsg, 'Submitting activation fee evidence for admin approval...', 'proc');
        try {
          const res = await api(`/api/payments/withdraw/${client.pendingWithdrawId}/submit-evidence`, { method: 'POST', body: JSON.stringify({ payment_message: msg }) });
          setPayMsg(ui.withdrawStatusMsg, res.msg || 'Submitted. Awaiting admin approval.', 'ok');
          showToast(res.msg || 'Awaiting admin approval');
          if (res.data) applyPaymentsState(res.data);
          client.pendingWithdrawId = null;
          ui.withdrawConfirm.textContent = 'Submitted';
          setTimeout(() => { closeModal(ui.withdrawModal); refreshPayments(); }, 1200);
        } catch (e) {
          setPayMsg(ui.withdrawStatusMsg, e.message || 'Failed to submit', 'err');
          showToast(e.message || 'Failed to submit');
          ui.withdrawConfirm.disabled = false;
        }
        return;
      }
      const avail = client.payments && client.payments.player ? Number(client.payments.player.available_balance || 0) : (client.state && client.state.player ? Number(client.state.player.balance || 0) : 0);
      if (!phone) return setPayMsg(ui.withdrawStatusMsg, 'Enter a valid M-Pesa phone number.', 'err');
      if (!isFinite(amount) || amount <= 0) return setPayMsg(ui.withdrawStatusMsg, 'Enter a valid withdrawal amount.', 'err');
      if (amount < (s.minWithdrawal || 220)) return setPayMsg(ui.withdrawStatusMsg, `Minimum withdrawal is ${fmtMoney(s.minWithdrawal || 220)}.`, 'err');
      if (amount > (s.maxWithdrawal || 70000)) return setPayMsg(ui.withdrawStatusMsg, `Maximum withdrawal is ${fmtMoney(s.maxWithdrawal || 70000)}.`, 'err');
      if (amount > avail) return setPayMsg(ui.withdrawStatusMsg, 'Insufficient available balance.', 'err');
      ui.withdrawConfirm.disabled = true;
      setPayMsg(ui.withdrawStatusMsg, 'Reserving withdrawal amount...', 'proc');
      try {
        const res = await api('/api/payments/withdraw', { method: 'POST', body: JSON.stringify({ phone_number: phone, amount, client_ref: 'wd_' + Date.now() }) });
        client.pendingWithdrawId = res.withdrawal && res.withdrawal.id ? res.withdrawal.id : null;
        if (!client.pendingWithdrawId) throw new Error('Could not create withdrawal request');
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = '';
        if (document.getElementById('withdrawPayAmount')) document.getElementById('withdrawPayAmount').textContent = String(amount);
        if (ui.withdrawPhone) ui.withdrawPhone.disabled = true;
        if (ui.withdrawAmount) ui.withdrawAmount.disabled = true;
        setPayMsg(ui.withdrawStatusMsg, `Amount reserved. Pay activation fee KSh ${fee} to Paybill ${s.paybill || '542542'}, Account ${s.accountNumber || '03708400476150'}. Paste the M-Pesa confirmation message and submit.`, 'proc');
        showToast('Withdrawal reserved. Pay activation fee and submit evidence.');
        if (ui.withdrawConfirm) ui.withdrawConfirm.textContent = 'Submit for approval';
        if (res.data) applyPaymentsState(res.data);
      } catch (e) {
        setPayMsg(ui.withdrawStatusMsg, e.message || 'Withdrawal failed', 'err');
        showToast(e.message || 'Withdrawal failed');
      } finally { if (ui.withdrawConfirm && ui.withdrawConfirm.textContent !== 'Submitted') ui.withdrawConfirm.disabled = false; }
    });

    // tx modal
    if (ui.txClose) ui.txClose.addEventListener('click', () => closeModal(ui.txModal));
    if (ui.txModal) ui.txModal.addEventListener('click', (e) => { if (e.target === ui.txModal) closeModal(ui.txModal); });

    if (ui.boosterpotCollect) ui.boosterpotCollect.addEventListener('click', () => {
      if (client.collectingBoosterpot) return;
      client.collectingBoosterpot = true;
      ui.boosterpotCollect.disabled = true;
      ui.boosterpotCollect.textContent = 'Collecting...';
      socket.emit('boosterpot_collect', {}, (ack) => {
        if (!ack || !ack.ok) {
          client.collectingBoosterpot = false;
          ui.boosterpotCollect.disabled = false;
          ui.boosterpotCollect.textContent = 'Collect Win';
          showToast((ack && ack.msg) || 'Could not collect Boosterpot');
          return;
        }
        if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
        if (ui.boosterpotSub) ui.boosterpotSub.textContent = 'Collected successfully!';
        showToast('Boosterpot collected');
        setTimeout(() => { closeModal(ui.boosterpotModal); client.collectingBoosterpot = false; }, 600);
      });
    });

    const openBpHistory = () => { renderBoosterpotHistory(); openModal(ui.boosterpotHistoryModal); };
    if (ui.boosterpotHud) {
      ui.boosterpotHud.addEventListener('click', openBpHistory);
      ui.boosterpotHud.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBpHistory(); } });
    }
  if (ui.boosterpotHistoryClose) ui.boosterpotHistoryClose.addEventListener('click', () => closeModal(ui.boosterpotHistoryModal));
  if (ui.boosterpotHistoryModal) ui.boosterpotHistoryModal.addEventListener('click', (e) => { if (e.target === ui.boosterpotHistoryModal) closeModal(ui.boosterpotHistoryModal); });
  if (ui.adminMessageClose) ui.adminMessageClose.addEventListener('click', () => closeModal(ui.adminMessageModal));
  if (ui.adminMessageOk) ui.adminMessageOk.addEventListener('click', () => closeModal(ui.adminMessageModal));
  if (ui.adminMessageGotoInbox) ui.adminMessageGotoInbox.addEventListener('click', () => { closeModal(ui.adminMessageModal); client.selectedInboxPeer = '__admin__'; client._inboxInitialScroll = true; markInboxRead('__admin__'); openModal(ui.userInboxModal); saveInboxState(true); renderUserInbox(); });
  if (ui.adminMessageModal) ui.adminMessageModal.addEventListener('click', (e) => { if (e.target === ui.adminMessageModal) closeModal(ui.adminMessageModal); });

    if (ui.userInboxBtn) ui.userInboxBtn.addEventListener('click', () => { client._inboxInitialScroll = true; openModal(ui.userInboxModal); showInboxListPane(); saveInboxState(true); renderUserInbox(); if (client.selectedInboxPeer) markInboxRead(client.selectedInboxPeer); });
    if (ui.userInboxClose) ui.userInboxClose.addEventListener('click', () => { closeModal(ui.userInboxModal); showInboxListPane(); saveInboxState(false); });
    if (ui.userInboxModal) ui.userInboxModal.addEventListener('click', (e) => { if (e.target.id === 'inboxBackBtn') { showInboxListPane(); renderUserInboxThreads(); return; } if (e.target === ui.userInboxModal) { closeModal(ui.userInboxModal); showInboxListPane(); saveInboxState(false); } });
    if (ui.userInboxSearch) ui.userInboxSearch.addEventListener('input', () => { renderUserInboxThreads(); renderUserInboxConversation(); });
    if (ui.userInboxMessages) {
    ui.userInboxMessages.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dm-actions]');
      if (btn) e.stopPropagation();
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      openDmCtx(btn.dataset.dmActions, rect.left, rect.bottom + 4);
    });
    let dmLongPress = null;
    const clearDmLongPress = () => { if (dmLongPress) { clearTimeout(dmLongPress); dmLongPress = null; } };
    ui.userInboxMessages.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const node = e.target.closest('.chat-msg[data-dm-id]');
      if (!node) return;
      clearDmLongPress();
      dmLongPress = setTimeout(() => { dmLongPress = null; openDmCtx(node.dataset.dmId, e.clientX, e.clientY); }, 480);
    });
    ['pointerup','pointerleave','pointercancel','pointermove'].forEach(ev => ui.userInboxMessages.addEventListener(ev, clearDmLongPress));
    let dmSwipe = null;
    ui.userInboxMessages.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const node = e.target.closest('.chat-msg[data-dm-id]');
      if (!node) return;
      dmSwipe = { node, id: node.dataset.dmId, x: e.clientX, y: e.clientY, moved: false };
    });
    ui.userInboxMessages.addEventListener('pointermove', (e) => {
      if (!dmSwipe) return;
      const dx = e.clientX - dmSwipe.x;
      const dy = e.clientY - dmSwipe.y;
      if (Math.abs(dy) > 30) { dmSwipe = null; return; }
      if (Math.abs(dx) > 12) {
        dmSwipe.moved = true;
        const clamped = Math.max(-70, Math.min(70, dx));
        dmSwipe.node.style.transition = 'none';
        dmSwipe.node.style.transform = `translateX(${clamped}px)`;
      }
    });
    const endDmSwipe = (e) => {
      if (!dmSwipe) return;
      const sw = dmSwipe; dmSwipe = null;
      sw.node.style.transition = 'transform .18s ease';
      sw.node.style.transform = '';
      if (!sw.moved) return;
      const dx = e.clientX - sw.x;
      const m = dmById(sw.id);
      if (!m || m.deleted) return;
      if (dx > 60) beginDmReply(m);
      else if (dx < -60) openForwardPicker(m.id);
    };
    ['pointerup','pointercancel'].forEach(ev => ui.userInboxMessages.addEventListener(ev, endDmSwipe));
    ui.userInboxMessages.addEventListener('contextmenu', (e) => {
      const node = e.target.closest('.chat-msg[data-dm-id]');
      if (!node) return;
      e.preventDefault();
      openDmCtx(node.dataset.dmId, e.clientX, e.clientY);
    });
  }
  if (ui.inboxCtxMenu) {
    ui.inboxCtxMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('.pc-ctx-item');
      if (!btn) return;
      const id = client.dmCtxId;
      const m = id ? dmById(id) : null;
      const action = btn.dataset.action;
      closeDmCtx();
      if (!m) return;
      if (action === 'copy') {
        const text = String(m.text || '');
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => showToast('Message copied')).catch(() => showToast('Copy failed'));
        else showToast('Copy not supported');
      } else if (action === 'private') {
        showToast('You are already in this conversation');
      } else if (action === 'react') {
        socket.emit('dm_react', { id: m.id, emoji: '\uD83D\uDC4D' }, (res) => { if (!res || !res.ok) showToast((res && res.msg) || 'Could not react'); });
      } else if (action === 'reply') {
        beginDmReply(m);
      } else if (action === 'pin') {
        socket.emit('dm_pin', { id: m.id }, (res) => showToast((res && res.msg) || 'Pin failed'));
      } else if (action === 'forward') {
        openForwardPicker(m.id);
      } else if (action === 'delete') {
        if (m.fromToken !== myPlayerToken()) { showToast('You can only delete your own messages'); return; }
        ui.chatDeleteConfirmBtn && (ui.chatDeleteConfirmBtn.disabled = false);
        client.dmDeletePendingId = m.id;
        openModal(ui.chatDeleteModal);
      }
    });
  }
  document.addEventListener('click', (e) => { if (ui.inboxCtxMenu && !ui.inboxCtxMenu.contains(e.target)) closeDmCtx(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDmCtx(); });

  if (ui.userInboxSend) ui.userInboxSend.addEventListener('click', () => {
      const text = (ui.userInboxInput && ui.userInboxInput.value || '').replace(/\s+/g, ' ').trim();
      if (!client.selectedInboxPeer) { showToast('Select a person'); return; }
      if (!text) return;
      ui.userInboxSend.disabled = true;
      const rt = (client.dmReply && client.dmReply.id) ? { replyToId: client.dmReply.id } : {};
      socket.emit('dm_send', Object.assign({ to: client.selectedInboxPeer, text }, rt), (ack) => {
        ui.userInboxSend.disabled = false;
        if (ack && ack.ok) {
          if (ui.userInboxInput) ui.userInboxInput.value = '';
          client.dmReply = null;
          if (ui.userInboxInput) ui.userInboxInput.placeholder = 'Type a message...';
          // state update will come via sendState; optimistically append if message returned
          if (ack.message && Array.isArray(client.directMessages) && !client.directMessages.some(m => m.id === ack.message.id)) client.directMessages.push(ack.message);
          renderUserInbox();
          if (ui.userInboxInput) ui.userInboxInput.blur();
        } else {
          showToast((ack && ack.msg) || 'Failed to send');
        }
      });
    });
    if (ui.userInboxInput) ui.userInboxInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (ui.userInboxSend) ui.userInboxSend.click(); } });
    if (ui.userInboxInput) ui.userInboxInput.addEventListener('input', () => {
      if (!client.selectedInboxPeer) return;
      const nowMs = Date.now();
      if (client._dmTypingSentAt && nowMs - client._dmTypingSentAt < 1800) return;
      client._dmTypingSentAt = nowMs;
      socket.emit('dm_typing', { to: client.selectedInboxPeer });
    });
    if (ui.forwardClose) ui.forwardClose.addEventListener('click', closeForwardPicker);
    if (ui.forwardCancel) ui.forwardCancel.addEventListener('click', closeForwardPicker);
    if (ui.forwardModal) ui.forwardModal.addEventListener('click', (e) => { if (e.target === ui.forwardModal) closeForwardPicker(); });
    if (ui.forwardSend) ui.forwardSend.addEventListener('click', () => {
      const id = client.dmForwardId;
      if (!id) { closeForwardPicker(); return; }
      const pubEl = document.getElementById('fwdPublic');
      const toPublic = !!(pubEl && pubEl.checked);
      const to = Array.from(document.querySelectorAll('.fwd-peer:checked')).map(n => n.value).filter(Boolean);
      if (!toPublic && !to.length) { showToast('Pick a destination'); return; }
      const evt = client.dmForwardSource === 'chat' ? 'chat_forward' : 'dm_forward';
      socket.emit(evt, { id, to, public: toPublic }, (res) => {
        if (res && res.ok) { showToast('Forwarded'); closeForwardPicker(); }
        else showToast((res && res.msg) || 'Could not forward');
      });
    });

    (ui.htabs || []).forEach(tab => tab.addEventListener('click', () => {
      if ((tab.dataset.tab || '') === 'betwins') { openBetWins(); return; }
      client.liveBetsTab = tab.dataset.tab || 'all';
      (ui.htabs || []).forEach(t => t.classList.toggle('active', t === tab));
      if (client.liveBetsTab === 'chat') {
        openChatModal();
        return;
      }
      if (client.state) renderLiveBets(client.state);
      else renderLiveBets({});
    }));

    if (ui.chatBtn) ui.chatBtn.addEventListener('click', () => { openChatModal(); });
    if (ui.betWinsRange) ui.betWinsRange.addEventListener('change', () => { if (client.state) renderLiveBets(client.state); });
    if (ui.betWinsCloseBtn) ui.betWinsCloseBtn.addEventListener('click', closeBetWins);
    if (ui.betWinsModeTabs) (ui.betWinsModeTabs.querySelectorAll('.bw-mode') || []).forEach(btn => btn.addEventListener('click', () => {
      client.betWinsMode = btn.dataset.mode === 'odds' ? 'odds' : 'wins';
      localStorage.setItem('aviator_betwins_mode', client.betWinsMode);
      renderBetWins(true);
    }));
    if (ui.betWinsRangeModal) ui.betWinsRangeModal.addEventListener('change', () => { localStorage.setItem('aviator_betwins_range', ui.betWinsRangeModal.value || 'daily'); renderBetWins(true); });

    if (ui.chatCloseBtn) ui.chatCloseBtn.addEventListener('click', () => { emitChatTyping(false); closeModal(ui.chatModal); localStorage.setItem('chat_open', 'false'); client.liveBetsTab = 'all'; if (ui.htabs) { (ui.htabs || []).forEach(t => t.classList.toggle('active', t.dataset.tab === 'all')); } });

  function openChatModal() {
    if (!ui.chatModal) return;
    client.chatSavedFilter = false;
    openModal(ui.chatModal);
    localStorage.setItem('chat_open', 'true');
    renderChat(true);
    markChatSeen();
    setTimeout(() => { if (ui.chatMessages) ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight; }, 100);
    setTimeout(() => { if (ui.chatMessages) ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight; }, 250);
  }

  if (ui.chatForm) ui.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = (ui.chatInput && ui.chatInput.value || '').trim();
      if (!text) return;
      if (ui.chatSend) ui.chatSend.disabled = true;
      const payload = { text };
      if (client.chatReplyTo) payload.replyToId = client.chatReplyTo.id;
      socket.emit('chat_send', payload, (ack) => {
        if (ui.chatSend) ui.chatSend.disabled = false;
        if (ack && !ack.ok) {
          const msg = (ack && ack.msg) || 'Chat message failed';
          const isWarn = /warning|muted|bad language/i.test(msg);
          showToast(msg, isWarn ? 5000 : 2600, isWarn ? 'warn' : undefined);
          if (isWarn && ui.chatInput) ui.chatInput.value = '';
        } else { if (ui.chatInput) ui.chatInput.value = ''; setChatReply(null); emitChatTyping(false); }
      });
    });

  function setChatReply(m) {
    client.chatReplyTo = m ? { id: m.id, name: m.name || 'Player', text: String(m.text || '').replace(/\s+/g, ' ').slice(0, 120) } : null;
    if (ui.chatReplyBar) ui.chatReplyBar.classList.toggle('hidden', !client.chatReplyTo);
    if (client.chatReplyTo) {
      if (ui.chatReplyName) ui.chatReplyName.textContent = client.chatReplyTo.name;
      if (ui.chatReplyText) ui.chatReplyText.textContent = client.chatReplyTo.text;
      if (ui.chatInput) ui.chatInput.focus();
    }
  }
  if (ui.chatReplyCancel) ui.chatReplyCancel.addEventListener('click', () => setChatReply(null));
  function emitChatTyping(typing) {
    const t = Date.now();
    if (typing) {
      if (t - client.typingEmitAt < 1500) return;
      client.typingEmitAt = t;
    } else {
      client.typingEmitAt = 0;
    }
    socket.emit('chat_typing', { typing: !!typing });
  }
  if (ui.chatInput) {
    ui.chatInput.addEventListener('input', () => emitChatTyping(!!(ui.chatInput.value || '').trim()));
    ui.chatInput.addEventListener('blur', () => emitChatTyping(false));
  }

  const PLAYER_CHAT_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
  const PLAYER_CHAT_REACTIONS_MORE = ['🔥', '🎉', '👏', '💯', '😡', '🙌'];
  function buildChatReactionBar() {
    if (!ui.chatCtxReactions) return;
    ui.chatCtxReactions.innerHTML = PLAYER_CHAT_REACTIONS.map(e => `<button type="button" class="pc-ctx-emoji" data-emoji="${e}">${e}</button>`).join('')
      + `<button type="button" class="pc-ctx-emoji pc-ctx-emoji-more" data-emoji-toggle="1" aria-label="More reactions">+</button>`
      + `<div class="pc-ctx-emoji-extra" hidden>${PLAYER_CHAT_REACTIONS_MORE.map(e => `<button type="button" class="pc-ctx-emoji" data-emoji="${e}">${e}</button>`).join('')}</div>`;
  }
  buildChatReactionBar();
  function closeChatCtx() {
    if (ui.chatContextMenu) ui.chatContextMenu.classList.add('hidden');
    client.chatCtxMsgId = null;
  }
  if (ui.chatMessages) {
    let chatSwipe = null;
    ui.chatMessages.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const node = e.target.closest('.chat-msg');
      if (!node) return;
      const id = node.getAttribute('data-chat-id');
      if (!id) return;
      chatSwipe = { node, id, x: e.clientX, y: e.clientY, moved: false };
    });
    ui.chatMessages.addEventListener('pointermove', (e) => {
      if (!chatSwipe) return;
      const dx = e.clientX - chatSwipe.x;
      const dy = e.clientY - chatSwipe.y;
      if (Math.abs(dy) > 30) { chatSwipe = null; return; }
      if (Math.abs(dx) > 12) {
        chatSwipe.moved = true;
        const clamped = Math.max(-70, Math.min(70, dx));
        chatSwipe.node.style.transition = 'none';
        chatSwipe.node.style.transform = `translateX(${clamped}px)`;
      }
    });
    const endChatSwipe = (e) => {
      if (!chatSwipe) return;
      const sw = chatSwipe; chatSwipe = null;
      sw.node.style.transition = 'transform .18s ease';
      sw.node.style.transform = '';
      if (!sw.moved) return;
      const dx = e.clientX - sw.x;
      const m = (client.chat || []).find(v => v && v.id === sw.id);
      if (!m || m.deleted || m.type === 'rain' || m.rainId) return;
      if (dx > 60) setChatReply(m);
      else if (dx < -60) handleChatCtxAction('forward', m);
    };
    ['pointerup','pointercancel'].forEach(ev => ui.chatMessages.addEventListener(ev, endChatSwipe));
  }

  function openChatCtxFor(id, x, y) {
    const m = (client.chat || []).find(v => v && v.id === id);
    if (!m || !ui.chatContextMenu || m.deleted) return;
    client.chatCtxMsgId = id;
    const isMine = !!(client.token && m.userId === client.token);
    ui.chatContextMenu.querySelectorAll('.pc-ctx-item').forEach(btn => {
      const a = btn.dataset.action;
      btn.disabled = (a === 'delete' && !isMine) || (a === 'pin' && !isMine) || ((a === 'private' || a === 'report') && isMine);
      if (a === 'pin') btn.querySelector('span').textContent = (client.chatPins || []).includes(id) ? 'Unpin message' : 'Pin message';
      if (a === 'save') btn.querySelector('span').textContent = (client.chatSaved || []).includes(id) ? 'Unsave message' : 'Save message';
    });
    const extra = ui.chatContextMenu.querySelector('.pc-ctx-emoji-extra');
    if (extra) extra.hidden = true;
    ui.chatContextMenu.classList.remove('hidden');
    ui.chatContextMenu.style.visibility = 'hidden';
    ui.chatContextMenu.style.left = '0px';
    ui.chatContextMenu.style.top = '0px';
    const rect = ui.chatContextMenu.getBoundingClientRect();
    const pad = 8;
    let left = x;
    let top = y;
    if (left + rect.width + pad > window.innerWidth) left = Math.max(pad, window.innerWidth - rect.width - pad);
    if (left < pad) left = pad;
    if (top + rect.height + pad > window.innerHeight) top = Math.max(pad, y - rect.height - 10);
    if (top < pad) top = pad;
    ui.chatContextMenu.style.left = `${Math.round(left)}px`;
    ui.chatContextMenu.style.top = `${Math.round(top)}px`;
    ui.chatContextMenu.style.visibility = '';
  }
  function gotoChatMessage(id) {
    if (!ui.chatMessages) return;
    const node = ui.chatMessages.querySelector(`[data-chat-id="${id}"]`);
    if (!node) { showToast('That message is no longer in the chat'); return; }
    node.scrollIntoView({ block: 'center', behavior: 'smooth' });
    node.classList.add('pc-flash');
    setTimeout(() => node.classList.remove('pc-flash'), 1200);
  }
  function handleChatCtxAction(action, m) {
    if (!m) return;
    const id = m.id;
    if (action === 'reply') { setChatReply(m); return; }
    if (action === 'private') {
      const peer = (m.userId === '__admin__') ? '__admin__' : m.userId;
      if (!peer) { showToast('Cannot open this conversation'); return; }
      closeModal(ui.chatModal);
      localStorage.setItem('chat_open', 'false');
      client.liveBetsTab = 'all';
      (ui.htabs || []).forEach(t => t.classList.toggle('active', t.dataset.tab === 'all'));
      client.selectedInboxPeer = peer;
      client._inboxInitialScroll = true;
      markInboxRead(peer);
      saveInboxState(true);
      renderUserInbox();
      openModal(ui.userInboxModal);
      return;
    }
    if (action === 'copy') {
      const text = String(m.text || '');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => showToast('Message copied')).catch(() => showToast('Copy failed'));
      else showToast('Copy not supported');
      return;
    }
    if (action === 'react') {
      openChatCtxFor(id, window.innerWidth / 2 - 120, window.innerHeight / 2 - 120);
      return;
    }
    if (action === 'forward') {
      openForwardPicker(id, 'chat');
      return;
    }
    if (action === 'pin') {
      socket.emit('chat_pin', { id }, (res) => {
        if (res && res.ok) showToast(res.msg === 'Unpinned' ? 'Message unpinned' : 'Message pinned');
        else showToast((res && res.msg) || 'Could not pin');
      });
      return;
    }
    if (action === 'save') {
      socket.emit('chat_save', { id }, (res) => {
        if (res && res.ok) { if (Array.isArray(res.ids)) client.chatSaved = res.ids.slice(); showToast(res.msg); renderChat(); }
        else showToast((res && res.msg) || 'Could not save');
      });
      return;
    }
    if (action === 'report') {
      if (ui.userReportPreview) ui.userReportPreview.textContent = `${m.name || 'Player'}: ${String(m.text || '').slice(0, 180)}`;
      if (ui.userReportReason) ui.userReportReason.value = '';
      client.chatReportPendingId = id;
      openModal(ui.userReportModal);
      return;
    }
    if (action === 'delete') {
      client.chatDeletePendingId = id;
      if (ui.chatDeleteConfirmBtn) ui.chatDeleteConfirmBtn.disabled = false;
      openModal(ui.chatDeleteModal);
    }
  }
  if (ui.chatContextMenu) {
    ui.chatContextMenu.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-emoji-toggle]');
      if (toggle) {
        const extra = ui.chatContextMenu.querySelector('.pc-ctx-emoji-extra');
        if (extra) extra.hidden = !extra.hidden;
        return;
      }
      const emojiBtn = e.target.closest('[data-emoji]');
      if (emojiBtn) {
        const id = client.chatCtxMsgId;
        const emoji = emojiBtn.dataset.emoji;
        closeChatCtx();
        socket.emit('chat_react', { id, emoji }, (res) => { if (!res || !res.ok) showToast((res && res.msg) || 'Could not react'); });
        return;
      }
      const item = e.target.closest('.pc-ctx-item');
      if (!item || item.disabled) return;
      const m = (client.chat || []).find(v => v && v.id === client.chatCtxMsgId);
      const action = item.dataset.action;
      closeChatCtx();
      handleChatCtxAction(action, m);
    });
  }
  document.addEventListener('click', (e) => {
    if (ui.chatContextMenu && !ui.chatContextMenu.classList.contains('hidden') && !ui.chatContextMenu.contains(e.target) && !(e.target.closest && e.target.closest('.chat-more'))) closeChatCtx();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChatCtx(); });
  window.addEventListener('scroll', () => closeChatCtx(), true);

  if (ui.chatMessages) {
    ui.chatMessages.addEventListener('click', (e) => {
      const more = e.target.closest('.chat-more');
      if (more) {
        e.preventDefault();
        e.stopPropagation();
        const r = more.getBoundingClientRect();
        openChatCtxFor(more.dataset.chatId, r.right - 8, r.bottom + 6);
        return;
      }
    });
    ui.chatMessages.addEventListener('contextmenu', (e) => {
      const node = e.target.closest('.chat-msg');
      if (!node) return;
      const id = node.getAttribute('data-chat-id');
      const m = (client.chat || []).find(v => v && v.id === id);
      if (!m || m.deleted || m.type === 'rain' || m.rainId) return;
      e.preventDefault();
      openChatCtxFor(id, e.clientX, e.clientY);
    });
    let chatLpTimer = null;
    let chatLpPoint = null;
    ui.chatMessages.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      const node = e.target.closest('.chat-msg');
      if (!node) return;
      const id = node.getAttribute('data-chat-id');
      const m = (client.chat || []).find(v => v && v.id === id);
      if (!m || m.deleted || m.type === 'rain' || m.rainId) return;
      chatLpPoint = { x: e.clientX, y: e.clientY };
      chatLpTimer = setTimeout(() => {
        chatLpTimer = null;
        openChatCtxFor(id, chatLpPoint.x, chatLpPoint.y);
        if (navigator.vibrate) { try { navigator.vibrate(15); } catch (err) { } }
      }, 500);
    });
    const cancelChatLp = (e) => {
      if (!chatLpTimer) return;
      if (e && e.type === 'pointermove' && chatLpPoint && Math.hypot(e.clientX - chatLpPoint.x, e.clientY - chatLpPoint.y) < 10) return;
      clearTimeout(chatLpTimer);
      chatLpTimer = null;
    };
    ui.chatMessages.addEventListener('pointerup', cancelChatLp);
    ui.chatMessages.addEventListener('pointercancel', cancelChatLp);
    ui.chatMessages.addEventListener('pointermove', cancelChatLp);
  }
  if (ui.chatPinnedBar) ui.chatPinnedBar.addEventListener('click', (e) => {
    const b = e.target.closest('[data-goto]');
    if (b) gotoChatMessage(b.dataset.goto);
  });
  if (ui.chatSavedBtn) ui.chatSavedBtn.addEventListener('click', () => { client.chatSavedFilter = !client.chatSavedFilter; renderChat(); });
  if (ui.userReportCloseBtn) ui.userReportCloseBtn.addEventListener('click', () => closeModal(ui.userReportModal));
  if (ui.userReportModal) ui.userReportModal.addEventListener('click', (e) => { if (e.target === ui.userReportModal) closeModal(ui.userReportModal); });
  if (ui.userReportSubmit) ui.userReportSubmit.addEventListener('click', () => {
    const id = client.chatReportPendingId;
    if (!id) return;
    ui.userReportSubmit.disabled = true;
    socket.emit('chat_report', { id, reason: ui.userReportReason ? ui.userReportReason.value : '' }, (res) => {
      ui.userReportSubmit.disabled = false;
      if (res && res.ok) {
        closeModal(ui.userReportModal);
        client.chatReportPendingId = null;
        showToast('Report submitted to admin');
      } else {
        showToast((res && res.msg) || 'Could not submit report');
      }
    });
  });
  if (ui.chatDeleteCloseBtn) ui.chatDeleteCloseBtn.addEventListener('click', () => closeModal(ui.chatDeleteModal));
  if (ui.chatDeleteCancelBtn) ui.chatDeleteCancelBtn.addEventListener('click', () => closeModal(ui.chatDeleteModal));
  if (ui.chatDeleteModal) ui.chatDeleteModal.addEventListener('click', (e) => { if (e.target === ui.chatDeleteModal) closeModal(ui.chatDeleteModal); });
  if (ui.chatDeleteConfirmBtn) ui.chatDeleteConfirmBtn.addEventListener('click', () => {
    const dmId = client.dmDeletePendingId;
    if (dmId) {
      ui.chatDeleteConfirmBtn.disabled = true;
      socket.emit('dm_delete', { id: dmId }, (res) => {
        ui.chatDeleteConfirmBtn.disabled = false;
        closeModal(ui.chatDeleteModal);
        client.dmDeletePendingId = null;
        if (res && res.ok) { client.directMessages = (client.directMessages || []).filter(m => m && m.id !== dmId); renderUserInbox(); showToast('Message deleted'); }
        else showToast((res && res.msg) || 'Could not delete message');
      });
      return;
    }
    const id = client.chatDeletePendingId;
    if (!id) { closeModal(ui.chatDeleteModal); return; }
    ui.chatDeleteConfirmBtn.disabled = true;
    socket.emit('admin_chat_delete', { id }, (res) => {
      ui.chatDeleteConfirmBtn.disabled = false;
      closeModal(ui.chatDeleteModal);
      if (res && res.ok) {
        client.chatDeletePendingId = null;
        if (res.message) {
          const idx = (client.chat || []).findIndex(x => x && x.id === id);
          if (idx !== -1) client.chat[idx] = res.message;
        }
        renderChat();
      } else {
        showToast((res && res.msg) || 'Could not delete message');
      }
    });
  });

    function updateRainSummary() {
      const amount = Math.max(10, Math.min(1000, Math.floor(Number(ui.rainAmount && ui.rainAmount.value) || 0)));
      const players = Math.max(1, Math.min(10, Math.floor(Number(ui.rainPlayers && ui.rainPlayers.value) || 0)));
      const total = amount * players;
      if (ui.rainSummary) ui.rainSummary.textContent = `Total: ${fmtMoney(total)} (${players} × ${fmtMoney(amount)})`;
    }
    function openRainModal() {
      if (!ui.rainModal) return;
      if (ui.rainAmount) ui.rainAmount.value = 20;
      if (ui.rainPlayers) ui.rainPlayers.value = 5;
      updateRainSummary();
      openModal(ui.rainModal);
    }
    function closeRainModal() { closeModal(ui.rainModal); }
    if (ui.rainBtn) ui.rainBtn.addEventListener('click', openRainModal);
    if (ui.rainCloseBtn) ui.rainCloseBtn.addEventListener('click', closeRainModal);
    if (ui.rainCancelBtn) ui.rainCancelBtn.addEventListener('click', closeRainModal);
    if (ui.rainModal) ui.rainModal.addEventListener('click', (e) => { if (e.target === ui.rainModal) closeRainModal(); });
    if (ui.rainAmount) ui.rainAmount.addEventListener('input', updateRainSummary);
    if (ui.rainPlayers) ui.rainPlayers.addEventListener('input', updateRainSummary);
    if (ui.rainSendBtn) ui.rainSendBtn.addEventListener('click', () => {
      const rawAmount = Math.floor(Number(ui.rainAmount && ui.rainAmount.value) || 0);
      const rawPlayers = Math.floor(Number(ui.rainPlayers && ui.rainPlayers.value) || 0);
      const amount = Math.max(10, Math.min(1000, rawAmount || 10));
      const players = Math.max(1, Math.min(10, rawPlayers || 1));
      if (ui.rainAmount) ui.rainAmount.value = amount;
      if (ui.rainPlayers) ui.rainPlayers.value = players;
      updateRainSummary();
      ui.rainSendBtn.disabled = true;
      socket.emit('rain_send', { amount, players }, (ack) => {
        ui.rainSendBtn.disabled = false;
        if (ack && ack.ok) {
          if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
          closeRainModal();
          showToast(ack.msg || 'Rain sent');
        } else {
          showToast((ack && ack.msg) || 'Could not send rain', 3500, 'warn');
        }
      });
    });
    if (ui.chatMessages) ui.chatMessages.addEventListener('click', (e) => {
      const btn = e.target.closest('.rain-claim-btn');
      if (!btn || btn.disabled) return;
      const id = btn.getAttribute('data-rain-id');
      if (!id) return;
      btn.disabled = true;
      socket.emit('rain_claim', { rainId: id }, (ack) => {
        if (ack && ack.ok) {
          if (ack.balance != null) ui.balance.textContent = fmtMoney(ack.balance);
          showToast(ack.msg || 'Claimed');
        } else {
          showToast((ack && ack.msg) || 'Could not claim', 3000, 'warn');
        }
        refreshRainCards();
      });
    });
    setInterval(() => { if (ui.chatModal && ui.chatModal.classList.contains('show')) refreshRainCards(); }, 1000);

    if (localStorage.getItem('chat_open') === 'true') { openChatModal(); }
    if (localStorage.getItem('aviator_rules_open') === 'true') { openModal(ui.rulesModal); }
    client.betWinsMode = localStorage.getItem('aviator_betwins_mode') === 'odds' ? 'odds' : 'wins';
    if (localStorage.getItem('aviator_betwins_open') === 'true') {
      const savedRange = localStorage.getItem('aviator_betwins_range');
      if (savedRange && ui.betWinsRangeModal) ui.betWinsRangeModal.value = savedRange;
      openBetWins();
    }
    if (localStorage.getItem('aviator_inbox_open') === 'true') {
      const savedPeer = localStorage.getItem('aviator_inbox_peer');
      if (savedPeer) client.selectedInboxPeer = savedPeer;
      client._inboxInitialScroll = true;
      openModal(ui.userInboxModal);
      renderUserInbox();
    }

    setPanelMode(0, 'manual');
    setPanelMode(1, 'manual');
  }

  function drawPlane(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(1.2, 1.2);
    ctx.fillStyle = '#e63946';
    ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-10, -5); ctx.lineTo(-6, 0); ctx.lineTo(-10, 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ff5b6e';
    ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(-6, -12); ctx.lineTo(-2, 0); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(-6, 12); ctx.lineTo(-2, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c1121f';
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-12, -6); ctx.lineTo(-9, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffd6d9';
    ctx.beginPath(); ctx.arc(8, -1, 2.2, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function draw(displayRound) {
    const w = ui.canvas.parentElement.clientWidth;
    const h = ui.canvas.parentElement.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    const grid = 50;
    for (let x = 0; x < w; x += grid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += grid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.restore();

    const grad = ctx.createLinearGradient(0, h, w, 0);
    grad.addColorStop(0, 'rgba(214,40,40,0.0)');
    grad.addColorStop(1, 'rgba(214,40,40,0.12)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const padL = 50, padB = 40, padT = 30, padR = 30;
    const originX = padL, originY = h - padB;
    const visMax = 12;
    let p = 0;
    if (displayRound && (displayRound.state === 'RUNNING' || displayRound.state === 'CRASHED')) {
      p = Math.min(1, Math.log(Math.max(1, displayRound.multiplier || 1)) / Math.log(visMax));
    }
    p = Math.max(0, Math.min(1, p));
    const endX = originX + (w - padL - padR) * (0.12 + 0.88 * p);
    const endY = originY - (h - padT - padB) * (0.08 + 0.92 * p);
    const cp1x = originX + (endX - originX) * 0.35;
    const cp1y = originY;
    const cp2x = originX + (endX - originX) * 0.75;
    const cp2y = originY - (originY - endY) * 0.55;

    if (displayRound && (displayRound.state === 'RUNNING' || displayRound.state === 'CRASHED')) {
      ctx.save();
      ctx.lineWidth = 4; ctx.strokeStyle = '#d62828'; ctx.shadowColor = 'rgba(214,40,40,0.5)'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.moveTo(originX, originY); ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY); ctx.stroke();
      ctx.restore();
      ctx.save();
      const fill = ctx.createLinearGradient(0, originY, 0, endY);
      fill.addColorStop(0, 'rgba(214,40,40,0.18)'); fill.addColorStop(1, 'rgba(214,40,40,0.0)');
      ctx.fillStyle = fill;
      ctx.beginPath(); ctx.moveTo(originX, originY); ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY); ctx.lineTo(endX, originY); ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    if (displayRound && displayRound.state === 'RUNNING') drawPlane(endX, endY, Math.atan2(endY - cp2y, endX - cp2x));
    else if (displayRound && displayRound.state === 'CRASHED') { ctx.save(); ctx.fillStyle = 'rgba(214,40,40,0.25)'; ctx.beginPath(); ctx.arc(endX, endY, 22, 0, Math.PI*2); ctx.fill(); ctx.restore(); }
    else drawPlane(originX + 10, originY - 10, -0.5);

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(w - padR, originY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(originX, padT); ctx.stroke();
    ctx.restore();
  }

  function renderLoop() {
    const state = client.state;
    const displayRound = state ? computeDisplayRound(state.round) : null;

    if (!displayRound) {
      ui.roundStatus.textContent = client.connected ? 'Connecting...' : 'Reconnecting...';
      ui.multiplier.className = 'multiplier';
      ui.multiplier.textContent = '1.00x';
      ui.crashLabel.textContent = '';
      ui.countdown.textContent = '';
      draw(null);
      requestAnimationFrame(renderLoop);
      return;
    }

    if (displayRound.state === 'BETTING') {
      ui.roundStatus.textContent = 'Place your bets';
      ui.multiplier.className = 'multiplier';
      ui.multiplier.textContent = '1.00x';
      ui.crashLabel.textContent = '';
      ui.countdown.textContent = `Next round in ${Math.max(0, Math.ceil((displayRound.remainingMs || 0) / 1000))}s`;
    } else if (displayRound.state === 'RUNNING') {
      ui.roundStatus.textContent = 'Round in progress';
      ui.multiplier.className = 'multiplier flying';
      ui.multiplier.textContent = Number(displayRound.multiplier || 1).toFixed(2) + 'x';
      ui.crashLabel.textContent = '';
      ui.countdown.textContent = '';
    } else if (displayRound.state === 'CRASHED') {
      ui.roundStatus.textContent = 'Round ended';
      ui.multiplier.className = 'multiplier crashed';
      ui.multiplier.textContent = Number(displayRound.crashPoint || 1).toFixed(2) + 'x';
      ui.crashLabel.textContent = 'CRASHED';
      ui.countdown.textContent = 'Preparing next round...';
    }

    updatePanels(displayRound);
    draw(displayRound);
    requestAnimationFrame(renderLoop);
  }

  bindUI();
  updatePanels(null);
  requestAnimationFrame(renderLoop);

})();

