#!/bin/bash

PROJECT_DIR="/Users/mmankoff/Projects/vulnwatch-ci"
VENV_DIR="$PROJECT_DIR/venv"

# Tab 1: Start NGINX with sudo — requires password
osascript <<EOF
tell application "Terminal"
    activate
    do script "echo 'Starting NGINX...'; sudo nginx -s stop; sudo nginx"
end tell
EOF

# Wait for user to enter sudo password and NGINX to start
echo "Waiting 7 seconds for NGINX to start..."
sleep 7

# Tab 2: Run Flask backend
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd $PROJECT_DIR && source $VENV_DIR/bin/activate && PYTHONPATH=. python backend/app.py"
end tell
EOF

# Tab 3: Tail logs
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd $PROJECT_DIR && tail -f backend/logs/vulnwatch.log"
end tell
EOF
