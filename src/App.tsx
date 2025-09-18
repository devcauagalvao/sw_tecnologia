import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from './components/layout/Sidebar';
import HomePage from './components/pages/HomePage';
import MapPage from './components/pages/MapPage';
import VlanPage from './components/pages/vlan';
import TecnologiasPage from './components/pages/Tecnologias';
import EquipamentosPage from './components/pages/equipamentos';
import AvisosPage from './components/pages/aviso';

import AuthModal from './components/auth/AuthModal';
import { AuthContext, useAuthState } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const auth = useAuthState();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const handleGoToMap = () => navigate('/map');

  return (
    <div className="min-h-screen bg-gray-50">


      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        user={auth.user}
      />

      <main className="relative pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/vlan" element={<VlanPage />} />
          <Route path="/tecnologias" element={<TecnologiasPage />} />
          <Route path="/equipamentos" element={<EquipamentosPage />} />
          <Route path="/avisos" element={<AvisosPage />} />
        </Routes>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={auth.login}
        onRegister={auth.register}
      />

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={handleGoToMap}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

const App: React.FC = () => {
  const auth = useAuthState();

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <AppContent />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
