import React, { useState } from 'react';
import type { Account } from '../types';

interface AdminPanelProps {
  accounts: Account[];
  onAddFunds: (accountId: string, amount: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ accounts, onAddFunds }) => {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleAmountChange = (accountId: string, value: string) => {
    setAmounts(prev => ({ ...prev, [accountId]: value }));
  };

  const handleAddClick = (accountId: string) => {
    const amountStr = amounts[accountId] || '0';
    const amount = parseFloat(amountStr);
    if (!isNaN(amount) && amount > 0) {
      onAddFunds(accountId, amount);
      const accountName = accounts.find(a => a.id === accountId)?.name;
      setSuccessMessage(`Successfully added $${amount.toFixed(2)} to ${accountName}.`);
      setAmounts(prev => ({ ...prev, [accountId]: '' }));
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel - Account Overview</h2>
      
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add Funds</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map(account => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={amounts[account.id] || ''}
                      onChange={e => handleAmountChange(account.id, e.target.value)}
                      className="w-32 focus:ring-primary focus:border-primary text-sm border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleAddClick(account.id)}
                      className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};