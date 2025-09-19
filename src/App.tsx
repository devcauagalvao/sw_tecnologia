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
import Suporte from './components/pages/suporte';

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

      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/vlan" element={<VlanPage />} />
          <Route path="/tecnologias" element={<TecnologiasPage />} />
          <Route path="/equipamentos" element={<EquipamentosPage />} />
          <Route path="/avisos" element={<AvisosPage />} />
          <Route path="/suporte" element={<Suporte />} />
        </Routes>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={auth.login}
        onRegister={auth.register}
      />
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
