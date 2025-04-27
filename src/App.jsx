import React, { useReducer, useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TransactionFilters from './components/TransactionFilters';
import Charts from './components/Charts';

const initialState = [];

function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'EDIT':
      return state.map(txn => txn.id === action.payload.id ? action.payload : txn);
    case 'DELETE':
      return state.filter(txn => txn.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [transactions, dispatch] = useReducer(transactionReducer, initialState);
  const [filter, setFilter] = useState({ type: '', category: '', minAmount: '', maxAmount: '', dateFrom: '', dateTo: '' });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchType = filter.type ? txn.type === filter.type : true;
      const matchCategory = filter.category ? txn.category === filter.category : true;
      const matchAmount = (!filter.minAmount || txn.amount >= +filter.minAmount) && (!filter.maxAmount || txn.amount <= +filter.maxAmount);
      const matchDate = (!filter.dateFrom || new Date(txn.date) >= new Date(filter.dateFrom)) && (!filter.dateTo || new Date(txn.date) <= new Date(filter.dateTo));
      return matchType && matchCategory && matchAmount && matchDate;
    });
  }, [transactions, filter]);

  const handleAdd = (form) => {
    dispatch({ type: 'ADD', payload: { ...form, id: Date.now(), amount: +form.amount } });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Manager</h1>

      <TransactionForm onAdd={handleAdd} />
      <TransactionFilters filter={filter} setFilter={setFilter} />
      <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
      <Charts transactions={filteredTransactions} />

      <div className="mt-6">
        <CSVLink data={filteredTransactions} filename="transactions.csv">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Export to CSV</button>
        </CSVLink>
      </div>
    </div>
  );
}
