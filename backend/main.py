from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from collections import defaultdict

from database import get_db, init_db, Expense
from models import ExpenseCreate, ExpenseUpdate, ExpenseResponse, ExpenseStats

app = FastAPI(
    title="Expense Tracker API",
    description="A simple expense tracking application API",
    version="1.0.0"
)

# CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/")
def read_root():
    return {
        "message": "Welcome to Expense Tracker API",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.post("/api/expenses", response_model=ExpenseResponse, status_code=201)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    """Create a new expense"""
    db_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        category=expense.category,
        date=expense.date or datetime.utcnow()
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@app.get("/api/expenses", response_model=List[ExpenseResponse])
def get_expenses(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    category: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    """Get all expenses with optional filtering"""
    query = db.query(Expense)
    
    if category:
        query = query.filter(Expense.category == category)
    
    if start_date:
        query = query.filter(Expense.date >= start_date)
    
    if end_date:
        query = query.filter(Expense.date <= end_date)
    
    expenses = query.order_by(Expense.date.desc()).offset(skip).limit(limit).all()
    return expenses


@app.get("/api/expenses/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int, db: Session = Depends(get_db)):
    """Get a specific expense by ID"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@app.put("/api/expenses/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    expense_update: ExpenseUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    update_data = expense_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(expense, field, value)
    
    db.commit()
    db.refresh(expense)
    return expense


@app.delete("/api/expenses/{expense_id}", status_code=204)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    """Delete an expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    db.delete(expense)
    db.commit()
    return None


@app.get("/api/expenses/stats/summary", response_model=ExpenseStats)
def get_expense_stats(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    """Get expense statistics"""
    query = db.query(Expense)
    
    if start_date:
        query = query.filter(Expense.date >= start_date)
    
    if end_date:
        query = query.filter(Expense.date <= end_date)
    
    expenses = query.all()
    
    if not expenses:
        return ExpenseStats(
            total_expenses=0.0,
            expense_count=0,
            average_expense=0.0,
            category_breakdown={}
        )
    
    total = sum(e.amount for e in expenses)
    count = len(expenses)
    
    # Category breakdown
    category_totals = defaultdict(float)
    for expense in expenses:
        category_totals[expense.category] += expense.amount
    
    return ExpenseStats(
        total_expenses=round(total, 2),
        expense_count=count,
        average_expense=round(total / count, 2) if count > 0 else 0.0,
        category_breakdown=dict(category_totals)
    )


@app.get("/api/categories", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """Get all unique expense categories"""
    categories = db.query(Expense.category).distinct().all()
    return [c[0] for c in categories]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

