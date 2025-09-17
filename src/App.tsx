import React, { useState, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import HomePage from './components/pages/HomePage';
import MapPage from './components/pages/MapPage';
import AuthModal from './components/auth/AuthModal';
import { AuthContext, useAuthState } from './hooks/useAuth';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'map'>('home');
  
  const auth = useAuthState();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handlePageChange = (page: 'home' | 'map') => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <Navbar
          onMenuToggle={toggleSidebar}
          onAuthClick={openAuthModal}
          user={auth.user}
          onLogout={auth.logout}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          user={auth.user}
        />

        {/* Main Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage />
              </motion.div>
            )}
            {currentPage === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <MapPage />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          onLogin={auth.login}
          onRegister={auth.register}
        />

        {/* Navigation Dots */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
          <button
            onClick={() => handlePageChange('home')}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentPage === 'home' 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
          <button
            onClick={() => handlePageChange('map')}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentPage === 'map' 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        </div>

        {/* Floating Action Button for Map */}
        {currentPage === 'home' && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            onClick={() => handlePageChange('map')}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </motion.button>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;