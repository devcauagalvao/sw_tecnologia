import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, SignalIcon } from '@heroicons/react/24/outline';
import { mockCondominiums } from '../../utils/mockData';
import { Condominium } from '../../types';

interface InteractiveMapProps {
  onRegionClick: (condominium: Condominium) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onRegionClick }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleRegionClick = (condominium: Condominium) => {
    setSelectedRegion(condominium.id);
    onRegionClick(condominium);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'maintenance': return 'Manutenção';
      case 'planned': return 'Planejado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          +
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          -
        </motion.button>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
            Região de Itu, SP
          </h3>
          <p className="text-sm text-gray-600">Clique nas regiões para mais detalhes</p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Status da Rede</h4>
          <div className="space-y-2">
            {[
              { status: 'active', label: 'Ativo', count: 2 },
              { status: 'maintenance', label: 'Manutenção', count: 1 },
              { status: 'planned', label: 'Planejado', count: 0 }
            ].map(({ status, label, count }) => (
              <div key={status} className="flex items-center space-x-2 text-xs">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                <span className="text-gray-700">{label} ({count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <motion.div
        className="w-full h-full relative"
        animate={{ scale: zoom }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 70%),
            linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)
          `
        }}
      >
        {/* Simulated map regions */}
        {mockCondominiums.map((condominium, index) => {
          const positions = [
            { top: '30%', left: '40%' }, // Vilas do Golf
            { top: '55%', left: '25%' }, // Jardim Europa
            { top: '70%', left: '60%' }  // Portal de Itu
          ];

          const position = positions[index] || { top: '50%', left: '50%' };

          return (
            <motion.div
              key={condominium.id}
              className="absolute cursor-pointer"
              style={position}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRegionClick(condominium)}
            >
              {/* Connection lines */}
              {index > 0 && (
                <motion.div
                  className="absolute w-20 h-0.5 bg-gradient-to-r from-blue-300 to-green-300 -z-10"
                  style={{
                    top: '50%',
                    left: '-80px',
                    transform: 'translateY(-50%) rotate(-15deg)',
                    opacity: 0.6
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.5, duration: 0.8 }}
                />
              )}

              {/* Region marker */}
              <div className="relative">
                <motion.div
                  className={`
                    w-16 h-16 rounded-2xl shadow-lg cursor-pointer
                    ${selectedRegion === condominium.id ? 'ring-4 ring-blue-300' : ''}
                    ${getStatusColor(condominium.status)} 
                    flex items-center justify-center
                  `}
                  animate={{
                    scale: selectedRegion === condominium.id ? 1.1 : 1,
                  }}
                >
                  <SignalIcon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Region info */}
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-3 min-w-48"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h4 className="font-semibold text-gray-900 text-sm">{condominium.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{condominium.coverage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(condominium.status)}`}>
                      {getStatusText(condominium.status)}
                    </span>
                    <span className="text-xs text-gray-500">{condominium.equipments.length} equipamentos</span>
                  </div>
                </motion.div>

                {/* Pulse animation for active regions */}
                {condominium.status === 'active' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-green-500 opacity-30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Central connection hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-xl flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">ITU</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveMap;