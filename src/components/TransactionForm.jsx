import React, { useState } from "react";

const categories = ["Groceries", "Rent", "Entertainment", "Salary", "Other"];

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: "expense", category: "Groceries", description: "", amount: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    onAdd(form);
    setForm({ type: "expense", category: "Groceries", description: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Add Transaction</h2>
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border p-2 rounded w-full">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 rounded w-full">
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded w-full" />
      <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border p-2 rounded w-full" />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border p-2 rounded w-full" />
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-4">
        Add Transaction
      </button>
    </form>
  );
}
