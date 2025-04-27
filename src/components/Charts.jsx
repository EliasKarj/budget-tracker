import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Charts({ transactions }) {
  const expensesByCategory = useMemo(() => {
    const groups = {};
    transactions.forEach(txn => {
      if (txn.type === 'expense') {
        groups[txn.category] = (groups[txn.category] || 0) + txn.amount;
      }
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const incomeExpenseByMonth = useMemo(() => {
    const groups = {};
    transactions.forEach(txn => {
      const month = txn.date.slice(0, 7);
      if (!groups[month]) groups[month] = { month, income: 0, expense: 0 };
      groups[month][txn.type] += txn.amount;
    });
    return Object.values(groups);
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div>
        <h2 className="font-bold mb-2">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={expensesByCategory} dataKey="value" nameKey="name" outerRadius={100}>
              {expensesByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="font-bold mb-2">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="font-bold mb-2">Savings Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomeExpenseByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={(d) => d.income - d.expense} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
