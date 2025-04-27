import React, { useState } from 'react';

const categories = ['Groceries', 'Rent', 'Entertainment', 'Salary', 'Other'];

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: 'expense', category: 'Groceries', description: '', amount: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    onAdd(form);
    setForm({ type: 'expense', category: 'Groceries', description: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        {categories.map(cat => <option key={cat}>{cat}</option>)}
      </select>
      <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
    </form>
  );
}
