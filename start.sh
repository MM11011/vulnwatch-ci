#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🔄 Starting VulnWatch CI..."

# Step 1: Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Step 2: Start or restart Nginx
echo "🌀 Restarting Nginx..."
sudo nginx -s stop 2>/dev/null || true
sudo nginx

# Step 3: Start Flask backend
echo "🚀 Starting Flask backend..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

# Step 4: Start React frontend (Vite)
echo "🌐 Starting React frontend (Vite)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Step 5: Output access URLs
echo ""
echo "🎯 VulnWatch CI is running!"
echo "📊 Frontend:  http://localhost:5173"
echo "📡 Backend:   http://127.0.0.1:5000/api/results"
echo ""
echo "🛑 To stop the app:"
echo "   - Kill backend with: kill $BACKEND_PID"
echo "   - Kill frontend with: kill $FRONTEND_PID"
echo "   - Stop Nginx with: sudo nginx -s stop"
