import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

interface NavbarProps {
  onMenuToggle: () => void;
  onAuthClick: () => void;
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onAuthClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Equipamentos', path: '/equipamentos' },
    { name: 'Tecnologias', path: '/tecnologias' },
    { name: 'VLans', path: '/vlan' },
    { name: 'Avisos', path: '/avisos' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-md'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left spacer */}
          <div className="w-1/3" />

          {/* Center - Navigation Links */}
          <div className="w-1/3 flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-blue-600 font-medium transition-colors relative ${
                      isActive ? 'text-blue-600 font-semibold' : ''
                    }`
                  }
                >
                  <motion.span whileHover={{ scale: 1.05 }}>{link.name}</motion.span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side - account */}
          <div className="w-1/3 flex items-center justify-end space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  leftIcon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                  className="hidden sm:inline-flex"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                variant="primary"
                size="sm"
                leftIcon={<UserIcon className="w-4 h-4" />}
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
