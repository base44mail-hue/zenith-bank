import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { DashboardIcon, TransactionsIcon, TransferIcon, AiAssistantIcon, AdminIcon } from './icons/Icon';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isAdmin: boolean;
  onAdminTrigger: () => void;
}

const NavItem: React.FC<{
  view: View;
  icon: React.ReactNode;
  activeView: View;
  onClick: (view: View) => void;
}> = ({ view, icon, activeView, onClick }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-accent text-primary shadow-md'
          : 'text-secondary hover:bg-white/10'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span className="ml-4 font-semibold text-sm">{view}</span>
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isAdmin, onAdminTrigger }) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (logoClicks > 0) {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = window.setTimeout(() => {
        setLogoClicks(0);
      }, 1500); // Reset clicks after 1.5 seconds of inactivity
    }
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [logoClicks]);

  const handleLogoClick = () => {
    const newClickCount = logoClicks + 1;
    setLogoClicks(newClickCount);
    if (newClickCount === 5) {
      onAdminTrigger();
      setLogoClicks(0);
    }
  };

  const navItems = [
    { view: View.Dashboard, icon: <DashboardIcon className="w-6 h-6" /> },
    { view: View.Transactions, icon: <TransactionsIcon className="w-6 h-6" /> },
    { view: View.Transfer, icon: <TransferIcon className="w-6 h-6" /> },
    { view: View.AiAssistant, icon: <AiAssistantIcon className="w-6 h-6" /> },
  ];

  const adminNavItem = { view: View.AdminPanel, icon: <AdminIcon className="w-6 h-6" /> };

  return (
    <aside className="bg-primary text-secondary w-full md:w-64 p-4 flex-shrink-0">
      <div className="flex items-center mb-8 cursor-pointer" onClick={handleLogoClick} title="Zenith Bank Home">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-primary text-xl">
          Z
        </div>
        <h1 className="text-xl font-bold ml-3">Zenith Bank</h1>
      </div>
      <nav className="mt-4">
        {navItems.map(item => (
          <NavItem
            key={item.view}
            view={item.view}
            icon={item.icon}
            activeView={activeView}
            onClick={setActiveView}
          />
        ))}
        {isAdmin && (
            <NavItem
                key={adminNavItem.view}
                view={adminNavItem.view}
                icon={adminNavItem.icon}
                activeView={activeView}
                onClick={setActiveView}
            />
        )}
      </nav>
    </aside>
  );
};