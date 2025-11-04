
import React, { useState } from 'react';
import type { Account } from '../types';

interface TransferProps {
  accounts: Account[];
  onTransfer: (fromId: string, toId: string, amount: number) => void;
}

export const Transfer: React.FC<TransferProps> = ({ accounts, onTransfer }) => {
  const [fromAccount, setFromAccount] = useState<string>(accounts[0]?.id || '');
  const [toAccount, setToAccount] = useState<string>(accounts[1]?.id || '');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!fromAccount || !toAccount) {
      setError('Please select both accounts.');
      return;
    }
    if (fromAccount === toAccount) {
      setError('Cannot transfer to the same account.');
      return;
    }
    
    const sourceAccount = accounts.find(acc => acc.id === fromAccount);
    if (sourceAccount && sourceAccount.balance < transferAmount) {
      setError('Insufficient funds for this transfer.');
      return;
    }
    
    onTransfer(fromAccount, toAccount, transferAmount);
    setSuccess(`Successfully transferred $${transferAmount.toFixed(2)}!`);
    setAmount('');
  };

  return (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transfer Funds</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700">From</label>
                    <select id="fromAccount" value={fromAccount} onChange={e => setFromAccount(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                        {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} - ${acc.balance.toFixed(2)}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700">To</label>
                    <select id="toAccount" value={toAccount} onChange={e => setToAccount(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                        {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} - ${acc.balance.toFixed(2)}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input 
                            type="number" 
                            id="amount" 
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" 
                            placeholder="0.00"
                            step="0.01"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                    Confirm Transfer
                </button>
            </form>
        </div>
    </div>
  );
};
