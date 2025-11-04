
import React from 'react';
import type { Account, Transaction } from '../types';
import { AccountCard } from './AccountCard';
import { TransactionItem } from './TransactionItem';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface DashboardProps {
  accounts: Account[];
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ accounts, transactions }) => {
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const spendingData = transactions
    .filter(t => t.type === 'expense')
    // Fix: Explicitly type the accumulator in the reduce function to ensure correct type inference.
    .reduce((acc: Record<string, number>, t) => {
      const category = t.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(spendingData).map(([name, value]) => ({
    name,
    spending: value,
  })).sort((a,b) => b.spending - a.spending).slice(0,5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Accounts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Spending Summary</h2>
           <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`}/>
              <Legend />
              <Bar dataKey="spending" fill="#0D3B66" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
          <div className="space-y-2">
            {recentTransactions.length > 0 ? (
              recentTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
            ) : (
              <p className="text-gray-500">No recent transactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
