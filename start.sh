#!/bin/bash

# Expense Tracker Startup Script

echo "🚀 Starting Expense Tracker Application..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt
echo "✅ Dependencies installed"

# Start the backend server in the background
echo ""
echo "🖥️  Starting backend server..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..

echo "✅ Backend server started (PID: $BACKEND_PID)"
echo "📡 API running at: http://localhost:8000"
echo "📚 API docs at: http://localhost:8000/docs"
echo ""

# Start the frontend server
echo "🌐 Starting frontend server..."
cd frontend
echo "✅ Frontend server starting..."
echo "🌍 Open your browser at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

python -m http.server 8080

# Cleanup on exit
trap "kill $BACKEND_PID; exit" INT TERM

