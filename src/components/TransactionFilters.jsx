import React from "react";

const categories = ["Groceries", "Rent", "Entertainment", "Salary", "Other"];

export default function TransactionFilters({ filter, setFilter }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Filters</h2>
      <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} className="border p-2 rounded w-full">
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="border p-2 rounded w-full">
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input type="number" placeholder="Min Amount" onChange={(e) => setFilter({ ...filter, minAmount: e.target.value })} className="border p-2 rounded w-full" />
      <input type="number" placeholder="Max Amount" onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value })} className="border p-2 rounded w-full" />
      <input type="date" onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })} className="border p-2 rounded w-full" />
      <input type="date" onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })} className="border p-2 rounded w-full" />
    </div>
  );
}
