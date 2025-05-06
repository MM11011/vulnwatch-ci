# VulnWatch CI

VulnWatch CI is a local continuous vulnerability monitoring and alerting system for developers and security teams.

It integrates with powerful scanning tools and is protected with secure access, making it ideal for internal CI/CD pipelines or personal security projects.

---

## 🚀 Features Implemented

- 🔐 **HTTPS with self-signed TLS** (NGINX reverse proxy)
- 🔐 **Basic Authentication** (via `htpasswd`)
- 📉 **Rate Limiting** to prevent abuse
- 🎛️ **Reverse Proxy to Flask** running on port `5000`
- ✅ **Security Headers**:
  - `Strict-Transport-Security`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Permissions-Policy`
  - `Referrer-Policy`
  - `Clear-Site-Data`
- ⚙️ **Python Flask Backend** (started with `PYTHONPATH=. python backend/app.py`)
- 🔍 **Nuclei scanner integration** for automated scans
- 📊 **Console Output + Logging** of scan results

---

## 🔧 Local Setup

### Prerequisites

- Python 3.10+
- NGINX (via Homebrew)
- `htpasswd` tool (`brew install httpd` if missing)

---

### 🔐 Setup SSL & Auth

```bash
# Generate TLS cert
mkdir -p /opt/homebrew/etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /opt/homebrew/etc/nginx/ssl/selfsigned.key \
  -out /opt/homebrew/etc/nginx/ssl/selfsigned.crt

# Create htpasswd
htpasswd -c /opt/homebrew/etc/nginx/.htpasswd admin

# Start backend Flask app
PYTHONPATH=. python backend/app.py

# Validate and reload nginx
sudo nginx -t && sudo nginx -s reload
Visit: https://localhost (accept warning for self-signed cert)


vulnwatch-ci/
│
├── backend/
│   ├── app.py               # Flask app with Nuclei scan
│   ├── scanner/             # Nuclei integration module
│   ├── utils/logger.py      # Custom logger
│   └── ...
│
├── nginx/
│   └── nginx.conf           # Reverse proxy + TLS + rate limit
│
├── ssl/
│   ├── selfsigned.key
│   └── selfsigned.crt
│
├── .htpasswd                # Basic auth credentials
└── README.md
