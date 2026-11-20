const path = require('path');

// Lightweight .env loader (no external deps). Real env vars take precedence.
(function loadEnv() {
  try {
    const fs = require('fs');
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) return;
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      if (!line || /^\s*#/.test(line)) continue;
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch (_) { /* ignore */ }
})();

const env = (process.env.DARAJA_ENV || 'sandbox').toLowerCase();
const baseUrl = env === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';
const enabled = String(process.env.DARAJA_ENABLED || 'false').toLowerCase() === 'true';

function num(v, def) { const n = Number(v); return isFinite(n) ? n : def; }

module.exports = {
  env,
  baseUrl,
  enabled,
  consumerKey: process.env.DARAJA_CONSUMER_KEY || '',
  consumerSecret: process.env.DARAJA_CONSUMER_SECRET || '',
  shortcode: process.env.DARAJA_SHORTCODE || '',
  passkey: process.env.DARAJA_PASSKEY || '',
  b2cInitiatorName: process.env.DARAJA_B2C_INITIATOR_NAME || '',
  b2cSecurityCredential: process.env.DARAJA_B2C_SECURITY_CREDENTIAL || '',
  callbackUrl: process.env.DARAJA_CALLBACK_URL || '',
  resultUrl: process.env.DARAJA_RESULT_URL || '',
  timeoutUrl: process.env.DARAJA_TIMEOUT_URL || '',
  publicBaseUrl: (process.env.PUBLIC_BASE_URL || '').replace(/\/$/, ''),
  minWithdrawal: Math.max(1, num(process.env.MIN_WITHDRAWAL, 220)),
  maxWithdrawal: Math.max(1, num(process.env.MAX_WITHDRAWAL, 70000)),
};
