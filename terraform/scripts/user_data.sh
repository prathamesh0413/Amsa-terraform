#!/bin/bash
set -eux

# Update OS
apt-get update -y
apt-get upgrade -y

# Install base packages
apt-get install -y git curl unzip nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 and serve globally
npm install -g pm2 serve

# Prepare frontend folder and permissions
mkdir -p /var/www/amsa-fe
chown -R ubuntu:ubuntu /var/www/amsa-fe

# Download and install Amazon CloudWatch Agent
TMP_DEB="/tmp/amazon-cloudwatch-agent.deb"
wget -O ${TMP_DEB} https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
dpkg -i ${TMP_DEB} || apt-get -f install -y

# CloudWatch agent configuration
cat <<'CWCFG' > /opt/aws/amazon-cloudwatch-agent/bin/config.json
{
  "metrics": {
    "metrics_collected": {
      "cpu": {
        "measurement": ["usage_idle","usage_user","usage_system"],
        "metrics_collection_interval": 60
      },
      "mem": {
        "measurement": ["mem_used_percent"],
        "metrics_collection_interval": 60
      },
      "disk": {
        "measurement": ["used_percent"],
        "resources": ["/"],
        "metrics_collection_interval": 60
      },
      "procstat": {
        "measurement": ["pid_count"],
        "metrics_collection_interval": 60,
        "process_name": "server.js"
      }
    }
  }
}
CWCFG

# Start CloudWatch agent (best-effort)
if [ -f /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl ]; then
  /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json -s || true
fi

# Nginx site configuration (frontend root and /api proxy to backend)
cat <<'NGINX' > /etc/nginx/sites-available/amsa
server {
    listen 80;
    server_name _;

    root /var/www/amsa-fe;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/amsa /etc/nginx/sites-enabled/amsa
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx && systemctl enable nginx

# Ensure pm2 restart on reboot for ubuntu user
su - ubuntu -c "pm2 startup systemd -u ubuntu --hp /home/ubuntu || true"
