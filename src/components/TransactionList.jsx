import React from 'react';

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map(txn => (
          <li key={txn.id} className="border p-2 rounded flex justify-between">
            <span>{txn.date} | {txn.type} | {txn.category} | {txn.description} | ${txn.amount}</span>
            <button onClick={() => onDelete(txn.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
