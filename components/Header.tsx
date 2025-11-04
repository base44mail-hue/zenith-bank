
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 sm:p-6 shadow-sm flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-primary">Welcome Back, Alex!</h2>
        <p className="text-gray-500 text-sm">Here's your financial overview for today.</p>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
        <img src="https://picsum.photos/seed/user/40/40" alt="User Avatar" className="w-10 h-10 rounded-full ml-4 border-2 border-primary" />
      </div>
    </header>
  );
};
