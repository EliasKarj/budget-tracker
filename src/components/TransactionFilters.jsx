import React from 'react';

const categories = ['Groceries', 'Rent', 'Entertainment', 'Salary', 'Other'];

export default function TransactionFilters({ filter, setFilter }) {
  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-xl font-semibold">Filters</h2>
      <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}>
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat}>{cat}</option>)}
      </select>
      <input type="number" placeholder="Min Amount" onChange={e => setFilter({ ...filter, minAmount: e.target.value })} />
      <input type="number" placeholder="Max Amount" onChange={e => setFilter({ ...filter, maxAmount: e.target.value })} />
      <input type="date" placeholder="From" onChange={e => setFilter({ ...filter, dateFrom: e.target.value })} />
      <input type="date" placeholder="To" onChange={e => setFilter({ ...filter, dateTo: e.target.value })} />
    </div>
  );
}
