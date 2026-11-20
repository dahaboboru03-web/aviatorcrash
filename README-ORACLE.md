# Oracle Cloud Always Free — Aviator Deployment Guide

## Overview
You create the Oracle account and VM; I provide the config files (`Dockerfile`, `ecosystem.config.js`, `deploy-oracle.sh`). You run the setup on your VM, copy your project, and start with PM2.

---

## Step 1 — Create Oracle Cloud Free Tier account

1. Go to https://www.oracle.com/cloud/free/
2. Click **Start for free** / **Create account**
3. Fill in your email, name, country, and create a password
4. **Verify your email** (check inbox)
5. **Add a credit/debit card** — required for identity verification. Oracle does not charge for Always Free resources (they may place a small temporary hold that is refunded).
6. Choose your **home region** (pick one close to your players, e.g. `us-ashburn-1`, `eu-frankfurt-1`, `ap-mumbai-1`, etc.)
7. Sign in to the **Oracle Cloud Console**

> Tip: Always Free resources never expire, but if unused for a long time Oracle may reclaim some. Log in periodically.

---

## Step 2 — Create an Always Free Compute instance

1. In the Console, go to **Compute → Instances**
2. Click **Create instance**
3. Settings:
   - **Name:** `aviator`
   - **Placement:** your home region / any availability domain
   - **Image:** Canonical Ubuntu (22.04 or 24.04 LTS)
   - **Shape:** **VM.Standard.A1.Flex** (ARM, Always Free) — up to 4 OCPU, 24 GB RAM. Select 1–4 OCPU and memory.
   - **Networking:** VCN with public subnet (default is fine), assign a **public IP address**
   - **SSH keys:** Generate a new key pair in Oracle, download the private key (`aviator-key.pem`), keep it safe
4. Click **Create**

Wait until the instance state is **Running**. Copy its **Public IP address**.

---

## Step 3 — Open ports in Oracle Security List

Oracle has its own firewall layer separate from the OS.

1. Go to **Networking → Virtual Cloud Networks** → your VCN
2. Find **Security Lists** → the default security list for your subnet
3. Add **Ingress rules** (stateful):
   - `22` TCP — SSH (usually already there)
   - `80` TCP — HTTP
   - `443` TCP — HTTPS
   - `3000` TCP — Node app (optional, for direct testing)
4. Save

Also open the same ports inside the OS firewall via `deploy-oracle.sh` (UFW).

---

## Step 4 — Connect to your VM via SSH

From your local terminal (PowerShell on Windows):

```powershell
# Make sure the key is not readable by others
icacls C:\path\to\aviator-key.pem /grant "$env:USERNAME:(R)"

ssh -i C:\path\to\aviator-key.pem ubuntu@<YOUR_PUBLIC_IP>
```

If using PuTTY, convert `.pem` to `.ppk` with PuTTYgen.

---

## Step 5 — Bootstrap the VM

Run as root (or `sudo`):

```bash
sudo bash deploy-oracle.sh
```

This installs Node.js 22, PM2, Nginx, certbot, configures UFW, and prepares Nginx as a reverse proxy on port 80 → localhost:3000.

---

## Step 6 — Copy your Aviator project to the VM

From your local machine:

```powershell
scp -i C:\path\to\aviator-key.pem -r "C:\Users\Fluxtech\Desktop\MY WORK\aviator\*" ubuntu@<YOUR_PUBLIC_IP>:~/aviator/
```

On the VM:

```bash
sudo mkdir -p /app
sudo cp -r ~/aviator/* /app/
sudo chown -R $USER:$USER /app
cd /app
npm ci --omit=dev --no-audit --no-fund
```

---

## Step 7 — Mount persistent storage for `data/`

Your game state (`data/state.json`) and payments DB (`data/payments.db`) must survive reboots. Options:

**A. Oracle Block Volume (recommended)**
1. Console → **Storage → Block Volumes** → Create volume (e.g. 50 GB, in same AD)
2. Attach to your instance (iSCSI)
3. Follow Oracle's instructions to format and mount it at `/app/data`
4. Edit `/etc/fstab` so it auto-mounts on reboot

**B. Simple directory on boot disk** (data lost if instance is terminated)
Just use `/app/data` as-is.

---

## Step 8 — Start the app

```bash
cd /app
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # follow the printed command to enable on boot
```

Check status:
```bash
pm2 status
pm2 logs aviator --lines 50
```

Visit `http://<YOUR_PUBLIC_IP>` — the app should load.

---

## Step 9 — Add a domain + SSL (optional but recommended)

If you own a domain:
1. Point an `A` record at your VM's public IP
2. On the VM, set env vars and run certbot:
   ```bash
   sudo DOMAIN=yourdomain.com EMAIL=you@example.com bash deploy-oracle.sh
   # or just:
   sudo certbot --nginx -d yourdomain.com --email you@example.com --agree-tos --redirect
   ```
3. Visit `https://yourdomain.com`

---

## Step 10 — Maintenance

| Task | Command |
|------|---------|
| View logs | `pm2 logs aviator` |
| Restart app | `pm2 restart aviator` |
| Update app | `git pull` (or re-scp), then `pm2 restart aviator` |
| Backup data | Copy `/app/data/state.json` and `data/payments.db` somewhere safe |
| Nginx config | `/etc/nginx/sites-available/aviator`, then `sudo nginx -t && sudo systemctl reload nginx` |

---

## Files included in your project

| File | Purpose |
|------|---------|
| `Dockerfile` | Container definition (alternative to manual VM install) |
| `.dockerignore` | Excludes node_modules, logs, etc from image |
| `ecosystem.config.js` | PM2 process manager config |
| `deploy-oracle.sh` | VM bootstrap script (run once as root/sudo) |

---

## Important notes

- **Single instance only:** The game state lives in memory (`game` object) plus `data/state.json`. Do not run two copies pointing at the same data folder, or they will corrupt each other.
- **Persistent data:** `data/` must be on a volume that survives VM stops/reboots.
- **Port 3000:** Nginx proxies external traffic to localhost:3000. You don't need to expose 3000 publicly if Nginx handles 80/443.
- **No email/SMS provider configured:** Deposits/withdrawals rely on users pasting M-Pesa confirmations; admin approves manually in the admin panel.

---

## If you get stuck

1. `pm2 status` — is the app running?
2. `sudo systemctl status nginx` — is Nginx up?
3. `sudo ufw status` — are ports open?
4. Oracle Console → Networking → Security Lists — are ingress rules added?
5. `curl -I http://localhost:3000` on the VM — does the app respond locally?
