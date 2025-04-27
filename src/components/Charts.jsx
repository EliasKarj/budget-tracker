import React, { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Charts({ transactions }) {
  const expensesByCategory = useMemo(() => {
    const groups = {};
    transactions.forEach((txn) => {
      if (txn.type === "expense") {
        groups[txn.category] = (groups[txn.category] || 0) + txn.amount;
      }
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const incomeExpenseByMonth = useMemo(() => {
    const groups = {};
    transactions.forEach((txn) => {
      const month = txn.date.slice(0, 7);
      if (!groups[month]) groups[month] = { month, income: 0, expense: 0 };
      groups[month][txn.type] += txn.amount;
    });
    return Object.values(groups);
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 text-center">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={expensesByCategory} dataKey="value" nameKey="name" outerRadius={80}>
              {expensesByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 text-center">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={250}>
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

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 text-center">Savings Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={incomeExpenseByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={(d) => d.income - d.expense} stroke="#4ade80" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
