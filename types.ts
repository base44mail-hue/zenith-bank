export enum View {
  Dashboard = 'Dashboard',
  Transactions = 'Transactions',
  Transfer = 'Transfer',
  AiAssistant = 'AI Assistant',
  AdminPanel = 'Admin Panel',
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings';
  balance: number;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}