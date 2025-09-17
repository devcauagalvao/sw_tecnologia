import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  MapIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen, user }) => {
  const menuItems = [
    { icon: HomeIcon, label: 'Início', href: '#home', color: 'text-blue-600' },
    { icon: MapIcon, label: 'Mapa Interativo', href: '#map', color: 'text-green-600' },
    { icon: InformationCircleIcon, label: 'Sobre', href: '#about', color: 'text-purple-600' },
    { icon: WrenchScrewdriverIcon, label: 'Serviços', href: '#services', color: 'text-orange-600' },
    { icon: PhoneIcon, label: 'Contato', href: '#contact', color: 'text-red-600' },
  ];

  const adminItems = user?.role === 'admin' ? [
    { icon: ChartBarIcon, label: 'Dashboard', href: '#dashboard', color: 'text-indigo-600' },
    { icon: UsersIcon, label: 'Usuários', href: '#users', color: 'text-pink-600' },
    { icon: CogIcon, label: 'Configurações', href: '#settings', color: 'text-gray-600' },
  ] : [];

  const allItems = [...menuItems, ...adminItems];

  const handleToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      if (onOpen) onOpen();
    }
  };

  return (
    <>
      <div
        className={`
          fixed top-1/2 transform -translate-y-1/2
          ${isOpen ? 'left-80' : 'left-0'}
          z-[110]
          transition-all duration-300
        `}
      >
        <button
          onClick={handleToggle}
          className={`
            flex items-center justify-center w-8 h-16 bg-white border border-gray-200 rounded-r-xl shadow-lg
            hover:bg-blue-50 transition-colors
            ${isOpen ? '' : 'border-l-0'}
          `}
          style={{ outline: 'none' }}
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-6 h-6 text-blue-600" />
          ) : (
            <ChevronRightIcon className="w-6 h-6 text-blue-600" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <CogIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">SWTecnologia</h2>
                    <p className="text-sm text-gray-500">Menu Principal</p>
                  </div>
                </div>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {allItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-blue-700 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <p className="text-center text-sm text-gray-500">
                  © 2024 SWTecnologia
                  <br />
                  <span className="text-xs">Versão 1.0.0</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;