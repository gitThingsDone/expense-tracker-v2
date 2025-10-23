const API_BASE_URL = 'http://localhost:8000/api';

// Set today's date as default
document.getElementById('date').valueAsDate = new Date();

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    loadStats();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('expenseForm').addEventListener('submit', handleAddExpense);
}

// Add new expense
async function handleAddExpense(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    
    const expenseData = {
        description,
        amount,
        category,
        date: new Date(date).toISOString()
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        
        // Reset form
        document.getElementById('expenseForm').reset();
        document.getElementById('date').valueAsDate = new Date();
        
        // Reload data
        loadExpenses();
        loadStats();
        
        showMessage('Expense added successfully!', 'success');
    } catch (error) {
        console.error('Error adding expense:', error);
        showMessage('Failed to add expense. Please try again.', 'error');
    }
}

// Load all expenses
async function loadExpenses(filters = {}) {
    try {
        let url = `${API_BASE_URL}/expenses?limit=100`;
        
        if (filters.category) {
            url += `&category=${encodeURIComponent(filters.category)}`;
        }
        if (filters.startDate) {
            url += `&start_date=${encodeURIComponent(filters.startDate)}`;
        }
        if (filters.endDate) {
            url += `&end_date=${encodeURIComponent(filters.endDate)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        const expenses = await response.json();
        displayExpenses(expenses);
    } catch (error) {
        console.error('Error loading expenses:', error);
        document.getElementById('expensesList').innerHTML = 
            '<p class="error">Failed to load expenses. Make sure the backend server is running.</p>';
    }
}

// Display expenses in the UI
function displayExpenses(expenses) {
    const expensesList = document.getElementById('expensesList');
    
    if (!expenses || expenses.length === 0) {
        expensesList.innerHTML = '<p class="no-expenses">No expenses found.</p>';
        return;
    }
    
    expensesList.innerHTML = expenses.map(expense => {
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        return `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-description">${escapeHtml(expense.description)}</div>
                    <div class="expense-meta">
                        <span class="expense-category">${escapeHtml(expense.category)}</span>
                        <span>📅 ${formattedDate}</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <div class="expense-actions">
                        <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load statistics
async function loadStats(filters = {}) {
    try {
        let url = `${API_BASE_URL}/expenses/stats/summary`;
        
        const params = new URLSearchParams();
        if (filters.startDate) {
            params.append('start_date', filters.startDate);
        }
        if (filters.endDate) {
            params.append('end_date', filters.endDate);
        }
        
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }
        
        const stats = await response.json();
        displayStats(stats);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Display statistics
function displayStats(stats) {
    document.getElementById('totalExpenses').textContent = `$${stats.total_expenses.toFixed(2)}`;
    document.getElementById('expenseCount').textContent = stats.expense_count;
    document.getElementById('averageExpense').textContent = `$${stats.average_expense.toFixed(2)}`;
}

// Delete expense
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        
        loadExpenses();
        loadStats();
        showMessage('Expense deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting expense:', error);
        showMessage('Failed to delete expense. Please try again.', 'error');
    }
}

// Apply filters
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const startDate = document.getElementById('filterStartDate').value;
    const endDate = document.getElementById('filterEndDate').value;
    
    const filters = {};
    
    if (category) {
        filters.category = category;
    }
    if (startDate) {
        filters.startDate = new Date(startDate).toISOString();
    }
    if (endDate) {
        filters.endDate = new Date(endDate).toISOString();
    }
    
    loadExpenses(filters);
    loadStats(filters);
}

// Clear filters
function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterStartDate').value = '';
    document.getElementById('filterEndDate').value = '';
    
    loadExpenses();
    loadStats();
}

// Show success/error messages
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

