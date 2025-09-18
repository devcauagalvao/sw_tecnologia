import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  MapIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  user?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen, user }) => {
  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: MapIcon, label: 'Equipamentos', path: '/equipamentos' },
    { icon: InformationCircleIcon, label: 'Tecnologias', path: '/tecnologias' },
    { icon: WrenchScrewdriverIcon, label: 'VLans', path: '/vlan' },
    { icon: PhoneIcon, label: 'Avisos', path: '/avisos' },
  ];

  const adminItems = user?.role === 'admin' ? [
    { icon: ChartBarIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: UsersIcon, label: 'Usuários', path: '/users' },
    { icon: CogIcon, label: 'Configurações', path: '/settings' },
  ] : [];

  const allItems = [...menuItems, ...adminItems];

  const handleToggle = () => {
    if (isOpen) onClose();
    else if (onOpen) onOpen();
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ x: isOpen ? 0 : -40 }}
        animate={{ x: 0 }}
        className={`fixed top-1/2 transform -translate-y-1/2 z-[110] ${isOpen ? 'left-80' : 'left-0'} transition-all duration-300`}
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center justify-center w-10 h-16 bg-white border border-gray-200 rounded-r-2xl shadow-md hover:shadow-xl transition-all`}
        >
          {isOpen ? <ChevronLeftIcon className="w-6 h-6 text-blue-600" /> : <ChevronRightIcon className="w-6 h-6 text-blue-600" />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-[100] flex flex-col border-r border-gray-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-md"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <CogIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="font-bold text-gray-800 text-lg tracking-wide">SWTecnologia</h2>
                    <p className="text-xs text-gray-500 font-medium">Menu Principal</p>
                  </div>
                </div>
              </div>

              {/* User Info */}
              {user && (
                <motion.div
                  className="p-6 border-b border-gray-200 bg-gray-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-blue-100 text-blue-700 rounded-full capitalize font-medium">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <nav className="flex-1 px-5 py-6 space-y-2">
                {allItems.map((item, index) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 ${
                        isActive ? 'bg-blue-100 text-blue-700 font-semibold shadow' : ''
                      }`
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </motion.div>
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </NavLink>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <p className="text-center text-xs text-gray-500">
                  © 2025 GLV INFORMATICA DESENVOLVIMENTO
                  <br />
                  <span className="text-xs text-gray-400">Versão 1.0.0</span>
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
