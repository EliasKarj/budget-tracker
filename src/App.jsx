import React, { useReducer, useState, useMemo, useEffect } from "react";
import { CSVLink } from "react-csv";
import TransactionForm from "./components/TransactionForm";
import TransactionFilters from "./components/TransactionFilters";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

function transactionReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "EDIT":
      return state.map((txn) => (txn.id === action.payload.id ? action.payload : txn));
    case "DELETE":
      return state.filter((txn) => txn.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [transactions, dispatch] = useReducer(transactionReducer, initialState);
  const [filter, setFilter] = useState({ type: "", category: "", minAmount: "", maxAmount: "", dateFrom: "", dateTo: "" });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchType = filter.type ? txn.type === filter.type : true;
      const matchCategory = filter.category ? txn.category === filter.category : true;
      const matchAmount = (!filter.minAmount || txn.amount >= +filter.minAmount) && (!filter.maxAmount || txn.amount <= +filter.maxAmount);
      const matchDate = (!filter.dateFrom || new Date(txn.date) >= new Date(filter.dateFrom)) && (!filter.dateTo || new Date(txn.date) <= new Date(filter.dateTo));
      return matchType && matchCategory && matchAmount && matchDate;
    });
  }, [transactions, filter]);

  const handleAdd = (form) => {
    dispatch({ type: "ADD", payload: { ...form, id: Date.now(), amount: +form.amount } });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        
        {/* Top Summary */}
        <div className="flex flex-col md:flex-row justify-around text-center text-xl font-bold text-gray-700">
          <div>💰 Income: <span className="text-green-500">${totalIncome}</span></div>
          <div>💸 Expenses: <span className="text-red-500">${totalExpenses}</span></div>
          <div>🏦 Balance: <span className="text-blue-500">${balance}</span></div>
        </div>

        <h1 className="text-5xl font-extrabold text-center text-blue-700 mt-4">Budget Tracker</h1>

        {/* Form and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm onAdd={handleAdd} />
          <TransactionFilters filter={filter} setFilter={setFilter} />
        </div>

        {/* Transactions List */}
        <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />

        {/* Charts */}
        <Charts transactions={filteredTransactions} />

        {/* CSV Export */}
        <div className="flex justify-center">
          <CSVLink data={filteredTransactions} filename="transactions.csv">
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow">
              Export to CSV
            </button>
          </CSVLink>
        </div>
      </div>
    </div>
  );
}
