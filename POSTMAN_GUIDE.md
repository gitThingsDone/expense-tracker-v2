# Postman Setup Guide - Expense Tracker API

## 📚 Overview

This guide will help you get started with testing the Expense Tracker API using Postman. A complete collection has been created with all API endpoints, examples, and proper documentation.

## 🔗 Quick Access

### Collection Details
- **Collection Name**: Expense Tracker API
- **Collection ID**: `11222788-0f5a161f-6541-423b-9e9f-6790c513fd8f`
- **Workspace**: My Playground
- **Environment**: Expense Tracker - Local

### Direct Links
- **View in Postman**: [Open Collection](https://www.postman.com/postman/expense-tracker-api)
- **Workspace**: My Playground (Personal)

## 📋 Collection Contents

The collection includes **10 pre-configured requests**:

### 1. Health Check
- **Method**: GET
- **Endpoint**: `/`
- **Purpose**: Verify the API is running
- **Response**: API information and version

### 2. Create Expense
- **Method**: POST
- **Endpoint**: `/api/expenses`
- **Purpose**: Create a new expense entry
- **Body Example**:
```json
{
  "description": "Grocery shopping at Whole Foods",
  "amount": 87.50,
  "category": "Food",
  "date": "2025-10-23T10:30:00Z"
}
```
- **Response**: Created expense with ID

### 3. Get All Expenses
- **Method**: GET
- **Endpoint**: `/api/expenses?limit=100&skip=0`
- **Purpose**: Retrieve all expenses with pagination
- **Query Parameters**:
  - `limit`: Maximum number of results (default: 100)
  - `skip`: Number of records to skip (default: 0)
  - `category`: Filter by category (optional)
  - `start_date`: Filter from date (optional)
  - `end_date`: Filter until date (optional)

### 4. Get Expense by ID
- **Method**: GET
- **Endpoint**: `/api/expenses/1`
- **Purpose**: Get details of a specific expense
- **Response**: Single expense object

### 5. Update Expense
- **Method**: PUT
- **Endpoint**: `/api/expenses/1`
- **Purpose**: Update an existing expense
- **Body Example**:
```json
{
  "description": "Updated description",
  "amount": 95.75
}
```
- **Note**: All fields are optional

### 6. Delete Expense
- **Method**: DELETE
- **Endpoint**: `/api/expenses/1`
- **Purpose**: Delete an expense
- **Response**: 204 No Content

### 7. Filter by Category
- **Method**: GET
- **Endpoint**: `/api/expenses?category=Food`
- **Purpose**: Get all expenses in a specific category
- **Example Categories**: Food, Transportation, Entertainment, Utilities, Healthcare, Shopping, Other

### 8. Filter by Date Range
- **Method**: GET
- **Endpoint**: `/api/expenses?start_date=2025-10-01T00:00:00Z&end_date=2025-10-31T23:59:59Z`
- **Purpose**: Get expenses within a date range
- **Date Format**: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)

### 9. Get Expense Statistics
- **Method**: GET
- **Endpoint**: `/api/expenses/stats/summary`
- **Purpose**: Get overall expense analytics
- **Response**:
```json
{
  "total_expenses": 1250.75,
  "expense_count": 15,
  "average_expense": 83.38,
  "category_breakdown": {
    "Food": 450.25,
    "Transportation": 300.00,
    "Entertainment": 500.50
  }
}
```

### 10. Get All Categories
- **Method**: GET
- **Endpoint**: `/api/categories`
- **Purpose**: Get list of all unique categories used
- **Response**: Array of category names

## 🌍 Environment Setup

An environment named **"Expense Tracker - Local"** has been created with the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `base_url` | `http://localhost:8000` | Base URL for the API |
| `expense_id` | `1` | Sample expense ID for testing |

### Using Environment Variables

In your requests, use `{{base_url}}` instead of hardcoding the URL. This allows you to easily switch between different environments (local, staging, production).

**Example:**
```
{{base_url}}/api/expenses
```

## 🚀 Getting Started

### Step 1: Start Your Backend Server

```bash
cd backend
python main.py
```

The API should be running at `http://localhost:8000`

### Step 2: Open Postman

1. Open Postman Desktop or Web
2. Navigate to your "My Playground" workspace
3. Find the "Expense Tracker API" collection

### Step 3: Select Environment

1. In the top-right corner, select the environment dropdown
2. Choose "Expense Tracker - Local"

### Step 4: Run Requests

Start with the "Health Check" request to verify everything is working:

1. Click on "Health Check" request
2. Click the blue "Send" button
3. You should see a 200 OK response

## 📖 Testing Workflow

### Basic Workflow Example

1. **Create an Expense**
   - Use "Create Expense" request
   - Modify the body with your data
   - Note the `id` in the response

2. **View All Expenses**
   - Use "Get All Expenses" request
   - See your newly created expense

3. **Filter Expenses**
   - Use "Filter by Category" or "Filter by Date Range"
   - Adjust query parameters as needed

4. **Get Statistics**
   - Use "Get Expense Statistics" request
   - View total, count, and category breakdown

5. **Update an Expense**
   - Use "Update Expense" request
   - Change the ID in the URL to match your expense
   - Update the body fields

6. **Delete an Expense**
   - Use "Delete Expense" request
   - Change the ID to match the expense you want to delete

## 🔄 Advanced Features

### Using Collection Variables

You can save response data and use it in subsequent requests:

1. After creating an expense, add a test script:
```javascript
pm.test("Save expense ID", function () {
    var jsonData = pm.response.json();
    pm.environment.set("expense_id", jsonData.id);
});
```

2. Then use `{{expense_id}}` in other requests

### Pre-request Scripts

Generate dynamic data:

```javascript
// Generate random amount
pm.environment.set("random_amount", Math.random() * 100);

// Current timestamp
pm.environment.set("current_date", new Date().toISOString());
```

### Tests and Assertions

Add tests to verify responses:

```javascript
// Test status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response structure
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('amount');
});

// Test response time
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});
```

## 🎯 Common Use Cases

### Scenario 1: Monthly Expense Report

1. Use "Filter by Date Range" with start/end dates for the month
2. Use "Get Expense Statistics" with date parameters
3. Export results for reporting

### Scenario 2: Category Analysis

1. Use "Get All Categories" to see what categories exist
2. Use "Filter by Category" for each category
3. Use "Get Expense Statistics" to see category breakdown

### Scenario 3: Bulk Testing

1. Create multiple expenses using "Create Expense"
2. Use Collection Runner to run all requests at once
3. Use test scripts to validate each response

## 📊 Running Collection Tests

### Using Collection Runner

1. Click on "Expense Tracker API" collection
2. Click "Run" button
3. Select requests to run
4. Set iterations if needed
5. Click "Run Expense Tracker API"
6. View test results

### Newman (CLI Runner)

Export your collection and run from command line:

```bash
npm install -g newman
newman run expense-tracker-collection.json -e expense-tracker-local.json
```

## 🔐 Authentication (Future Enhancement)

Currently, no authentication is required. When authentication is added:

1. Add Authorization header to collection
2. Use environment variables for tokens
3. Set up auth request to get token
4. Use pre-request scripts to refresh tokens

## 🐛 Troubleshooting

### Issue: Connection Refused

**Solution**: Make sure your backend server is running on port 8000

```bash
cd backend
python main.py
```

### Issue: 404 Not Found

**Solution**: Verify the endpoint URL is correct and includes `/api` prefix for most endpoints

### Issue: 422 Unprocessable Entity

**Solution**: Check your request body format. Common issues:
- Missing required fields (description, amount, category)
- Invalid amount (must be > 0)
- Invalid date format (use ISO 8601)

### Issue: 500 Internal Server Error

**Solution**: Check backend logs for detailed error messages

## 📝 Best Practices

1. **Use Environment Variables**: Never hardcode URLs or IDs
2. **Add Tests**: Validate responses to catch issues early
3. **Document Requests**: Add descriptions to help team members
4. **Use Folders**: Organize related requests together
5. **Save Examples**: Save successful responses as examples
6. **Version Control**: Export collection to Git for tracking changes

## 🔗 Additional Resources

- **API Documentation**: http://localhost:8000/docs (when server is running)
- **Alternative Docs**: http://localhost:8000/redoc
- **GitHub Repository**: https://github.com/gitThingsDone/expense-tracker
- **Postman Learning Center**: https://learning.postman.com/

## 📧 Support

For issues or questions:
- Check the main README.md
- Review API documentation at `/docs`
- Check backend logs for errors

---

**Happy Testing! 🎉**

Last Updated: October 23, 2025

