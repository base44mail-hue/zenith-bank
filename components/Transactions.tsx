
import React, { useState } from 'react';
import type { Transaction } from '../types';
import { TransactionItem } from './TransactionItem';

interface TransactionsProps {
  transactions: Transaction[];
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredTransactions = sortedTransactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
          {(['all', 'income', 'expense'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                filter === f ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
        ) : (
          <p className="text-gray-500 text-center py-8">No transactions found for this filter.</p>
        )}
      </div>
    </div>
  );
};
