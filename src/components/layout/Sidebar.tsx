import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  MapIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  GlobeAltIcon,
  BellAlertIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  user?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen, user }) => {
  const menuItems = [
    { icon: MapIcon, label: 'Mapa', path: '/' },
    { icon: WrenchScrewdriverIcon, label: 'Equipamentos', path: '/equipamentos' },
    { icon: CpuChipIcon, label: 'Tecnologias', path: '/tecnologias' },
    { icon: GlobeAltIcon, label: 'VLans', path: '/vlan' },
    { icon: BellAlertIcon, label: 'Avisos', path: '/avisos' },
  ];

  const adminItems =
    user?.role === 'admin'
      ? [
          { icon: ChartBarIcon, label: 'Dashboard', path: '/dashboard' },
          { icon: UsersIcon, label: 'Usuários', path: '/users' },
          { icon: CogIcon, label: 'Configurações', path: '/settings' },
        ]
      : [];

  const allItems = [...menuItems, ...adminItems];

  const handleToggle = () => {
    if (isOpen) onClose();
    else if (onOpen) onOpen();
  };

  return (
    <>
      {/* Botão Toggle */}
      <motion.div
        initial={{ x: isOpen ? 0 : -40 }}
        animate={{ x: 0 }}
        className={`fixed top-1/2 transform -translate-y-1/2 z-[110] ${
          isOpen ? 'left-80' : 'left-0'
        } transition-all duration-300`}
      >
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-11 h-16 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-r-2xl shadow-lg hover:shadow-2xl transition-all"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-6 h-6 text-blue-600" />
          ) : (
            <ChevronRightIcon className="w-6 h-6 text-blue-600" />
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escuro no mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl shadow-2xl z-[100] flex flex-col border-r border-gray-200/60"
            >
              {/* Cabeçalho */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                  >
                    <CogIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg tracking-wide">
                      SWTecnologia
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Menu Principal
                    </p>
                  </div>
                </div>
              </div>

              {/* Usuário */}
              {user && (
                <motion.div
                  className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-blue-100 text-blue-700 rounded-full capitalize font-medium shadow-sm">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Menu */}
              <nav className="flex-1 px-5 py-6 space-y-2">
                {allItems.map((item, index) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                      }`
                    }
                  >
                    {/* Indicador lateral */}
                    {location.pathname === item.path && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-700 rounded-r"
                      />
                    )}

                    {/* Ícone */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex items-center z-10"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          location.pathname === item.path
                            ? 'bg-white/20'
                            : 'bg-blue-100 group-hover:bg-blue-200'
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            location.pathname === item.path
                              ? 'text-white'
                              : 'text-blue-600'
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Texto */}
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="font-medium z-10"
                    >
                      {item.label}
                    </motion.span>
                  </NavLink>
                ))}
              </nav>

              {/* Rodapé */}
              <div className="p-6 border-t border-gray-200/50 bg-white/60 backdrop-blur-md">
                <p className="text-center text-xs text-gray-500">
                  © 2025 GLV Informática Desenvolvimento
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
