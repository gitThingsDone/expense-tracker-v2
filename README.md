# 💰 Expense Tracker

A simple yet powerful expense tracking application with a FastAPI backend and vanilla JavaScript frontend.

## Features

- ✨ Add, view, and delete expenses
- 📊 Real-time statistics dashboard
- 🔍 Filter expenses by category and date range
- 📱 Responsive design for mobile and desktop
- 🚀 RESTful API with automatic documentation
- 💾 SQLite database for persistent storage

## Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Pydantic** - Data validation

### Frontend
- **HTML/CSS/JavaScript** - Vanilla JS for simplicity
- Modern, responsive UI design
- No framework dependencies

## Project Structure

```
expense-tracker/
├── backend/
│   ├── main.py          # FastAPI application and endpoints
│   ├── database.py      # Database configuration and models
│   └── models.py        # Pydantic models for validation
├── frontend/
│   ├── index.html       # Main HTML file
│   ├── style.css        # Styling
│   └── app.js           # Frontend logic
├── requirements.txt     # Python dependencies
├── .gitignore          # Git ignore rules
├── start.sh            # Startup script
└── README.md           # This file
```

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Start the Backend Server

```bash
cd backend
python main.py
```

The API server will start at `http://localhost:8000`

- API Documentation: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`

### Start the Frontend

Open the `frontend/index.html` file in your web browser, or use a simple HTTP server:

```bash
cd frontend
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## API Endpoints

### Expenses

- `POST /api/expenses` - Create a new expense
- `GET /api/expenses` - Get all expenses (with optional filters)
- `GET /api/expenses/{id}` - Get a specific expense
- `PUT /api/expenses/{id}` - Update an expense
- `DELETE /api/expenses/{id}` - Delete an expense

### Statistics

- `GET /api/expenses/stats/summary` - Get expense statistics

### Categories

- `GET /api/categories` - Get all unique categories

### Query Parameters

For `GET /api/expenses`:
- `category` - Filter by category
- `start_date` - Filter expenses from this date
- `end_date` - Filter expenses until this date
- `skip` - Number of records to skip (pagination)
- `limit` - Maximum number of records to return

## Usage Examples

### Adding an Expense

1. Fill in the expense details in the form
2. Select a category
3. Choose a date
4. Click "Add Expense"

### Filtering Expenses

1. Use the filter section to select category and date range
2. Click "Apply Filters"
3. Click "Clear" to reset filters

### Viewing Statistics

The statistics dashboard automatically updates to show:
- Total expenses
- Number of expenses
- Average expense amount

## API Usage Examples

### Create an Expense

```bash
curl -X POST "http://localhost:8000/api/expenses" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Grocery shopping",
    "amount": 45.50,
    "category": "Food",
    "date": "2025-10-23T10:00:00"
  }'
```

### Get All Expenses

```bash
curl "http://localhost:8000/api/expenses"
```

### Get Filtered Expenses

```bash
curl "http://localhost:8000/api/expenses?category=Food&limit=10"
```

### Delete an Expense

```bash
curl -X DELETE "http://localhost:8000/api/expenses/1"
```

## Database

The application uses SQLite database (`expenses.db`) which will be created automatically in the `backend` directory when you first run the application.

### Database Schema

**Expenses Table:**
- `id` - Integer, Primary Key
- `description` - String, Not Null
- `amount` - Float, Not Null
- `category` - String, Not Null
- `date` - DateTime
- `created_at` - DateTime

## Development

### Running in Development Mode

For automatic reload during development:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Testing the API

Visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Export expenses to CSV/PDF
- [ ] Budget tracking and alerts
- [ ] Recurring expenses
- [ ] Multiple currency support
- [ ] Data visualization with charts
- [ ] Mobile app (React Native/Flutter)
- [ ] Email notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

Made with ❤️ for better expense management

