const https = require('https');
const config = require('./config');

let tokenCache = { token: null, expiresAt: 0 };

function base() { return config.baseUrl; }

async function request(method, path, { body, auth, headers = {} } = {}) {
  const url = base() + path;
  const opts = {
    method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
  };
  if (auth) opts.headers.Authorization = 'Bearer ' + auth;
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
  if (!res.ok) {
    const err = new Error((json && (json.errorMessage || json.error_description || json.ResponseDescription)) || ('HTTP ' + res.status));
    err.status = res.status; err.data = json; throw err;
  }
  return json;
}

async function getOAuthToken() {
  if (!config.enabled) throw new Error('Daraja is disabled');
  const now = Date.now();
  if (tokenCache.token && tokenCache.expiresAt - 30000 > now) return tokenCache.token;
  const creds = Buffer.from((config.consumerKey || '') + ':' + (config.consumerSecret || '')).toString('base64');
  const json = await request('GET', '/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: 'Basic ' + creds }
  });
  const token = json && (json.access_token || json.accessToken);
  const expiresIn = Number(json && (json.expires_in || json.expiresIn || 3599));
  if (!token) throw new Error('Failed to obtain OAuth token');
  tokenCache = { token, expiresAt: now + expiresIn * 1000 };
  return token;
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
}

function stkPassword(shortcode, passkey, ts) {
  return Buffer.from(String(shortcode) + String(passkey) + String(ts)).toString('base64');
}

async function stkPush({ amount, phoneNumber, accountReference, transactionDesc, callbackUrl }) {
  const token = await getOAuthToken();
  const ts = timestamp();
  const body = {
    BusinessShortCode: config.shortcode,
    Password: stkPassword(config.shortcode, config.passkey, ts),
    Timestamp: ts,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Math.round(Number(amount)),
    PartyA: phoneNumber,
    PartyB: config.shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl || config.callbackUrl,
    AccountReference: (accountReference || 'Aviator').slice(0, 12),
    TransactionDesc: (transactionDesc || 'Aviator deposit').slice(0, 13)
  };
  return request('POST', '/mpesa/stkpush/v1/processrequest', { body, auth: token });
}

async function stkQuery({ checkoutRequestId }) {
  const token = await getOAuthToken();
  const ts = timestamp();
  const body = {
    BusinessShortCode: config.shortcode,
    Password: stkPassword(config.shortcode, config.passkey, ts),
    Timestamp: ts,
    CheckoutRequestID: checkoutRequestId
  };
  return request('POST', '/mpesa/stkpushquery/v1/query', { body, auth: token });
}

async function b2cPayment({ amount, phoneNumber, remarks, occasion, commandID }) {
  const token = await getOAuthToken();
  const body = {
    InitiatorName: config.b2cInitiatorName,
    SecurityCredential: config.b2cSecurityCredential,
    CommandID: commandID || 'BusinessPayment',
    Amount: Math.round(Number(amount)),
    PartyA: config.shortcode,
    PartyB: phoneNumber,
    Remarks: (remarks || 'Withdrawal').slice(0, 100),
    QueueTimeOutURL: config.timeoutUrl,
    ResultURL: config.resultUrl,
    Occasion: (occasion || 'Aviator withdrawal').slice(0, 100)
  };
  return request('POST', '/mpesa/b2c/v1/paymentrequest', { body, auth: token });
}

module.exports = { getOAuthToken, stkPush, stkQuery, b2cPayment, request, tokenCache };
