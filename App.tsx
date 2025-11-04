import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Transfer } from './components/Transfer';
import { AiAssistant } from './components/AiAssistant';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { View } from './types';
import { ACCOUNTS, TRANSACTIONS } from './constants';
import type { Account, Transaction } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleTransfer = (fromId: string, toId: string, amount: number) => {
    setAccounts(prevAccounts => {
      const newAccounts = [...prevAccounts];
      const fromAccount = newAccounts.find(acc => acc.id === fromId);
      const toAccount = newAccounts.find(acc => acc.id === toId);
      if (fromAccount && toAccount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
      }
      return newAccounts;
    });
    const fromAccount = accounts.find(acc => acc.id === fromId);
    const toAccount = accounts.find(acc => acc.id === toId);

    const newTransactions: Transaction[] = [
      {
        id: `T${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: `Transfer to ${toAccount?.name}`,
        amount: -amount,
        type: 'expense',
        category: 'Transfers',
      },
      {
        id: `T${Date.now()+1}`,
        date: new Date().toISOString().split('T')[0],
        description: `Transfer from ${fromAccount?.name}`,
        amount: amount,
        type: 'income',
        category: 'Transfers',
      }
    ];
    setTransactions(prev => [...newTransactions, ...prev]);
  };

  const handleAddFunds = (accountId: string, amount: number) => {
      setAccounts(prevAccounts => {
          const newAccounts = [...prevAccounts];
          const targetAccount = newAccounts.find(acc => acc.id === accountId);
          if (targetAccount) {
              targetAccount.balance += amount;
          }
          return newAccounts;
      });
      
      const newTransaction: Transaction = {
        id: `T${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: `Admin Deposit`,
        amount: amount,
        type: 'income',
        category: 'Deposits',
      };
      setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
    setActiveView(View.AdminPanel);
  };

  const renderContent = () => {
    switch (activeView) {
      case View.Dashboard:
        return <Dashboard accounts={accounts} transactions={transactions} />;
      case View.Transactions:
        return <Transactions transactions={transactions} />;
      case View.Transfer:
        return <Transfer accounts={accounts} onTransfer={handleTransfer} />;
      case View.AiAssistant:
        return <AiAssistant transactions={transactions} />;
      case View.AdminPanel:
        return isAdminLoggedIn ? <AdminPanel accounts={accounts} onAddFunds={handleAddFunds} /> : <Dashboard accounts={accounts} transactions={transactions} />;
      default:
        return <Dashboard accounts={accounts} transactions={transactions} />;
    }
  };

  return (
    <div className="bg-light min-h-screen flex flex-col md:flex-row text-dark">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isAdmin={isAdminLoggedIn}
        onAdminTrigger={() => setShowAdminLogin(true)}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      {showAdminLogin && (
        <AdminLoginModal 
            onClose={() => setShowAdminLogin(false)}
            onSuccess={handleAdminLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;