module.exports = {
  apps: [{
    name: 'aviator',
    script: 'server.js',
    cwd: '/app',
    instances: 1,
    exec_mode: 'fork',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    },
    max_restarts: 10,
    min_uptime: '10s',
    autorestart: true,
    watch: false,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    out_file: '/app/logs/out.log',
    error_file: '/app/logs/err.log',
    pid_file: '/app/logs/aviator.pid'
  }]
};
