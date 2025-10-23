from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ExpenseCreate(BaseModel):
    description: str = Field(..., min_length=1, max_length=200)
    amount: float = Field(..., gt=0)
    category: str = Field(..., min_length=1, max_length=50)
    date: Optional[datetime] = None


class ExpenseUpdate(BaseModel):
    description: Optional[str] = Field(None, min_length=1, max_length=200)
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    date: Optional[datetime] = None


class ExpenseResponse(BaseModel):
    id: int
    description: str
    amount: float
    category: str
    date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class ExpenseStats(BaseModel):
    total_expenses: float
    expense_count: int
    average_expense: float
    category_breakdown: dict

