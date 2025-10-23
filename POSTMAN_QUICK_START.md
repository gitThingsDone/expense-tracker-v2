# Postman Quick Start

## 🚀 Quick Access

### Collection Information
- **Name**: Expense Tracker API
- **Workspace**: My Playground (Personal)
- **Requests**: 10 pre-configured endpoints

### Environment
- **Name**: Expense Tracker - Local
- **Base URL**: http://localhost:8000

## 📱 Access Your Collection

### Option 1: Postman Web
1. Go to [https://www.postman.com/](https://www.postman.com/)
2. Sign in to your account (avinash.choudhary@postman.com)
3. Navigate to "My Playground" workspace
4. Find "Expense Tracker API" collection

### Option 2: Postman Desktop
1. Open Postman Desktop app
2. Switch to "My Playground" workspace
3. Find "Expense Tracker API" in collections

## ⚡ Quick Test

1. **Start your backend server:**
   ```bash
   cd backend
   python main.py
   ```

2. **In Postman:**
   - Select "Expense Tracker - Local" environment (top-right)
   - Click "Health Check" request
   - Click "Send"
   - You should see 200 OK response

3. **Create your first expense:**
   - Click "Create Expense" request
   - Click "Send"
   - Note the expense ID in response

4. **View your expense:**
   - Click "Get All Expenses" request
   - Click "Send"
   - See your newly created expense

## 📋 Available Requests

1. ✅ Health Check
2. ➕ Create Expense
3. 📄 Get All Expenses
4. 🔍 Get Expense by ID
5. ✏️ Update Expense
6. 🗑️ Delete Expense
7. 🏷️ Filter by Category
8. 📅 Filter by Date Range
9. 📊 Get Expense Statistics
10. 📂 Get All Categories

## 📚 Full Documentation

For detailed information, see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)

## 🔗 Useful Links

- **API Docs**: http://localhost:8000/docs
- **GitHub**: https://github.com/gitThingsDone/expense-tracker

---

**Ready to test your API! 🎉**

