const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expense_Traker = require("./expenseTracker");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/expense_tracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add expense
app.post("/add", (req, res) => {
  const { title, amount } = req.body;

  expense_Traker
    .create({ title, amount })
    .then((result) => {
      console.log("Expense created:", result);
      res.status(201).json({ message: "Expense added", data: result });
    })
    .catch((err) => {
      console.error("Error creating expense:", err);
      res.status(500).json({ error: "Failed to add expense" });
    });
});

// Get all expenses
app.get("/get", (req, res) => {
  expense_Traker
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching expenses:", err);
      res.status(500).json({ error: "Failed to fetch expenses" });
    });
});

// Delete expense
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  expense_Traker
    .findByIdAndDelete(id)
    .then((result) => {
      res.json({ message: "Expense deleted", data: result });
    })
    .catch((err) => {
      console.error("Error deleting expense:", err);
      res.status(500).json({ error: "Failed to delete expense" });
    });
});

// Update expense
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  expense_Traker
    .findByIdAndUpdate(id, { title, amount }, { new: true })
    .then((result) => {
      res.json({ message: "Expense updated", data: result });
    })
    .catch((err) => {
      console.error("Error updating expense:", err);
      res.status(500).json({ error: "Failed to update expense" });
    });
});

// Start server
app.listen(3001, () => console.log("Server is running on port 3001"));
