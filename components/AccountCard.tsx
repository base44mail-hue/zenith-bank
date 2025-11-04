
import React from 'react';
import type { Account } from '../types';

interface AccountCardProps {
  account: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const { name, type, balance, accountNumber } = account;
  const isChecking = type === 'Checking';

  return (
    <div className={`rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300 ${isChecking ? 'bg-gradient-to-br from-blue-900 to-primary' : 'bg-gradient-to-br from-green-900 to-teal-800'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-light text-gray-300">{type} Account</p>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <div className="text-2xl font-bold">
           {isChecking ? 'CB' : 'SV'}
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-3xl lg:text-4xl font-bold tracking-wider">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-sm font-mono text-gray-400 mt-2">{accountNumber}</p>
      </div>
    </div>
  );
};
