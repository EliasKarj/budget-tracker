import React, { useReducer, useState, useMemo } from "react";
import { CSVLink } from "react-csv";
import TransactionForm from "./components/TransactionForm";
import TransactionFilters from "./components/TransactionFilters";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

const initialState = [];

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Budget Tracker</h1>

        {/* Form and Filters side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm onAdd={handleAdd} />
          <TransactionFilters filter={filter} setFilter={setFilter} />
        </div>

        <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
        <Charts transactions={filteredTransactions} />

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
