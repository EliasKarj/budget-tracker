import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Transactions</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((txn) => (
          <li key={txn.id} className="flex justify-between items-center py-4">
            <div className="text-gray-600">
              {txn.date} | {txn.type} | {txn.category} | {txn.description} | ${txn.amount}
            </div>
            <button onClick={() => onDelete(txn.id)} className="text-red-500 hover:text-red-700 font-semibold">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
