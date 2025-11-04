
import type { Account, Transaction } from './types';

export const ACCOUNTS: Account[] = [
  {
    id: 'A1',
    name: 'Primary Checking',
    type: 'Checking',
    balance: 5480.25,
    accountNumber: '**** **** **** 1234',
  },
  {
    id: 'A2',
    name: 'High-Yield Savings',
    type: 'Savings',
    balance: 25100.50,
    accountNumber: '**** **** **** 5678',
  },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'T1', date: '2024-07-26', description: 'Starbucks', amount: -6.75, type: 'expense', category: 'Food & Drink' },
  { id: 'T2', date: '2024-07-26', description: 'Monthly Salary', amount: 3500.00, type: 'income', category: 'Income' },
  { id: 'T3', date: '2024-07-25', description: 'Amazon.com', amount: -75.99, type: 'expense', category: 'Shopping' },
  { id: 'T4', date: '2024-07-24', description: 'Netflix Subscription', amount: -15.49, type: 'expense', category: 'Bills' },
  { id: 'T5', date: '2024-07-23', description: 'Gas Station', amount: -45.30, type: 'expense', category: 'Transport' },
  { id: 'T6', date: '2024-07-22', description: 'Whole Foods Market', amount: -120.45, type: 'expense', category: 'Groceries' },
  { id: 'T7', date: '2024-07-21', description: 'Freelance Project Payment', amount: 850.00, type: 'income', category: 'Income' },
  { id: 'T8', date: '2024-07-20', description: 'Gym Membership', amount: -40.00, type: 'expense', category: 'Health' },
  { id: 'T9', date: '2024-07-18', description: 'Concert Tickets', amount: -150.00, type: 'expense', category: 'Entertainment' },
  { id: 'T10', date: '2024-07-15', description: 'Electric Bill', amount: -85.60, type: 'expense', category: 'Bills' },
  { id: 'T11', date: '2024-07-12', description: 'Dinner with friends', amount: -62.50, type: 'expense', category: 'Food & Drink' },
  { id: 'T12', date: '2024-07-10', description: 'Uber Ride', amount: -18.75, type: 'expense', category: 'Transport' },
  { id: 'T13', date: '2024-07-05', description: 'Stock Dividend', amount: 55.20, type: 'income', category: 'Investments' },
  { id: 'T14', date: '2024-07-02', description: 'Rent Payment', amount: -1800.00, type: 'expense', category: 'Housing' },
];
