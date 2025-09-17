import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import InteractiveMap from '../map/InteractiveMap';
import RegionModal from '../map/RegionModal';
import { Condominium } from '../../types';

const MapPage: React.FC = () => {
  const [selectedCondominium, setSelectedCondominium] = useState<Condominium | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegionClick = (condominium: Condominium) => {
    setSelectedCondominium(condominium);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCondominium(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mr-4">
              <MapIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Mapa Interativo</h1>
              <p className="text-gray-600">Região de Itu, São Paulo</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore nossa cobertura de fibra óptica na região. Clique nas áreas destacadas para ver detalhes sobre equipamentos, status da rede e avisos importantes.
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Regiões Ativas', value: '2', color: 'green', subtitle: 'Operando normalmente' },
            { title: 'Em Manutenção', value: '1', color: 'yellow', subtitle: 'Serviço temporariamente interrompido' },
            { title: 'Cobertura Total', value: '98%', color: 'blue', subtitle: 'Da região coberta' }
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 bg-${card.color}-500 rounded-full mr-3`}></div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className={`text-2xl font-bold text-${card.color}-600`}>{card.value}</p>
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Map */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <InteractiveMap onRegionClick={handleRegionClick} />
        </motion.div>

        {/* Instructions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Como usar o mapa interativo</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-blue-600 rounded-full"></span>Clique nas regiões destacadas para ver informações detalhadas</li>
                <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-blue-600 rounded-full"></span>Use os controles de zoom para explorar áreas específicas</li>
                <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-blue-600 rounded-full"></span>As cores indicam o status atual da rede em cada localização</li>
                <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-blue-600 rounded-full"></span>Visualize equipamentos instalados e avisos importantes</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Region Modal */}
      <RegionModal isOpen={isModalOpen} onClose={handleCloseModal} condominium={selectedCondominium} />
    </div>
  );
};

export default MapPage;
