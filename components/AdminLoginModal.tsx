import React, { useState } from 'react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '1324') {
      onSuccess();
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Admin Access</h2>
        <p className="text-center text-gray-500 mb-6">Enter the password to access the admin panel.</p>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Password"
              autoFocus
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};