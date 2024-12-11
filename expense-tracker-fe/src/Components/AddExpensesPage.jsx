import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddExpensesPage() {
  const [expense, setExpense] = useState({ id: null, category: "", amount: "", comments: "" });
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch Total Amount
  const fetchTotalAmount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/expenses/total-amount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotal(response.data);
    } catch (error) {
      console.error("Error fetching total amount:", error);
    }
  };

  // Add or Update Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (expense.id) {
        // Update existing expense
        await axios.put(`http://localhost:8080/api/expenses/${expense.id}`, expense, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add new expense
        await axios.post("http://localhost:8080/api/expenses", expense, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setExpense({ id: null, category: "", amount: "", comments: "" }); // Reset form
      fetchExpenses();
      fetchTotalAmount();
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  // Handle Edit
  const handleEdit = (exp) => {
    setExpense(exp); // Populate the form with the selected expense
  };

  // Handle Delete
const handleDelete = async (exp) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:8080/api/expenses/${exp.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExpenses();
    fetchTotalAmount();
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};


  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchExpenses();
    fetchTotalAmount();
  }, []);

  return (
    <div>
      <h2>{expense.id ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Comments"
          value={expense.comments}
          onChange={(e) => setExpense({ ...expense, comments: e.target.value })}
        />
        <button type="submit">{expense.id ? "Update Expense" : "Add Expense"}</button>
      </form>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.category} - ${exp.amount} ({exp.comments})
            <button 
              onClick={() => handleEdit(exp)}
              style={{
                backgroundColor: "#61dafb",
                color: "#fff",
                border: "none",
                width: "20%",
                padding: "3px 8px", // Reduced padding for a smaller button
                fontSize: "12px", // Smaller font size
                cursor: "pointer",
              }}
              >Edit</button>
              <button 
              type="button"
              onClick={() => handleDelete(exp)}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                width: "20%",
                padding: "3px 8px", // Reduced padding for a smaller button
                fontSize: "12px", // Smaller font size
                cursor: "pointer",
              }}
              >Delete</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>
      <button
        onClick={handleLogout}
        style={{ backgroundColor: "#f44336", color: "#fff", border: "none", padding: "8px 16px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}

export default AddExpensesPage;
