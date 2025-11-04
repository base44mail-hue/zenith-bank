
import React from 'react';
import type { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  const getIcon = () => {
    switch(category.toLowerCase()) {
      case 'food & drink': return '☕️';
      case 'income': return '💰';
      case 'shopping': return '🛒';
      case 'bills': return '🧾';
      case 'transport': return '🚗';
      case 'groceries': return '🍎';
      case 'health': return '❤️‍🩹';
      case 'entertainment': return '🎟️';
      case 'housing': return '🏠';
      case 'transfers': return '🔄';
      default: return '💼';
    }
  };
  return <div className="text-xl w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">{getIcon()}</div>;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { date, description, amount, type, category } = transaction;
  const isIncome = type === 'income';

  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
      <CategoryIcon category={category} />
      <div className="flex-1 ml-4">
        <p className="font-semibold text-gray-800">{description}</p>
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
      <div className={`font-bold text-lg ${isIncome ? 'text-green-600' : 'text-gray-800'}`}>
        {isIncome ? '+' : '-'}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};
