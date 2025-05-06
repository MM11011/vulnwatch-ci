#!/bin/bash

# Terminal tab 1: Start NGINX with sudo (requires password)
osascript <<EOF
tell application "Terminal"
    do script "echo '🔐 Starting NGINX...'; sudo nginx -c /opt/homebrew/etc/nginx/nginx.conf"
end tell
EOF

# Terminal tab 2: Start Flask backend (inside venv)
osascript <<EOF
tell application "Terminal"
    do script "cd ~/Projects/vulnwatch-ci && source venv/bin/activate && echo '🚀 Starting Flask app...' && python backend/app.py"
end tell
EOF

echo "VulnWatch CI testing environment launched in new Terminal tabs."

