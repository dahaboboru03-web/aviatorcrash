#!/bin/bash
set -euo pipefail

# Oracle Cloud Always Free VM bootstrap for Aviator crash game
# Run as root or with sudo on a fresh Ubuntu 22.04/24.04 instance.

APP_DIR="/app"
DATA_DIR="/app/data"
DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"

echo "==> Updating system"
apt-get update -y
apt-get upgrade -y

echo "==> Installing Node.js 22, PM2, Nginx, certbot"
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs git nginx certbot python3-certbot-nginx
npm install -g pm2

echo "==> Creating app dirs"
mkdir -p "$APP_DIR" "$DATA_DIR" /app/logs
chown -R "$SUDO_USER:$SUDO_USER" "$APP_DIR" 2>/dev/null || true

echo "==> Cloning app (run this manually or copy files)"
echo "   git clone <your-repo> $APP_DIR   # or scp your project here"
echo "   cd $APP_DIR && npm ci --omit=dev"

echo "==> Nginx reverse proxy on port 80"
cat > /etc/nginx/sites-available/aviator <<EOF
server {
    listen 80;
    server_name ${DOMAIN:-_};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
    }
}
EOF
ln -sf /etc/nginx/sites-available/aviator /etc/nginx/sites-enabled/aviator
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl enable --now nginx

echo "==> UFW firewall"
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw allow 3000/tcp || true
echo "y" | ufw enable || true

echo "==> PM2 startup"
pm2 startup systemd -u "$SUDO_USER" --hp /home/"$SUDO_USER" 2>/dev/null || true
systemctl enable pm2-"$SUDO_USER" 2>/dev/null || true

echo "==> SSL (if domain provided)"
if [ -n "$DOMAIN" ] && [ -n "$EMAIL" ]; then
  certbot --nginx -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive --redirect || true
  systemctl enable certbot.timer 2>/dev/null || true
fi

echo "==> DONE"
echo "   1. Copy your Aviator project to $APP_DIR"
echo "   2. Mount a persistent Oracle Block Volume at $DATA_DIR"
echo "   3. cd $APP_DIR && npm ci --omit=dev"
echo "   4. pm2 start ecosystem.config.js && pm2 save"
echo "   5. Open ports 80/443/3000 in Oracle Cloud Console -> Networking -> Security Lists"
