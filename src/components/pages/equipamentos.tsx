import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon, DevicePhoneMobileIcon, WifiIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Equipamento {
  name: string;
  type: 'GPON' | 'XPON';
  description: string;
  maxUsers: number;
  speed: string;
  image: string; // URL da imagem
}

// Dados
const equipamentos: Equipamento[] = [
  { name: 'ONU 110B', type: 'XPON', description: 'Equipamento XPON compacto para residências ou pequenas empresas.', maxUsers: 64, speed: '1 Gbps', image: '/images/onu110b.jpg' },
  { name: 'ONU 110', type: 'GPON', description: 'GPON padrão, confiável para conexões residenciais.', maxUsers: 32, speed: '2.5 Gbps', image: '/images/onu110.jpg' },
  { name: 'ONU R1', type: 'XPON', description: 'Modelo XPON econômico, fácil instalação.', maxUsers: 16, speed: '1 Gbps', image: '/images/onur1.jpg' },
  { name: 'ONU G/EPON', type: 'XPON', description: 'Suporte a múltiplos protocolos G/EPON, indicado para empresas médias.', maxUsers: 64, speed: '1 Gbps', image: '/images/onugepon.jpg' },
  { name: 'ONT Huawei', type: 'GPON', description: 'ONT GPON Huawei com alta estabilidade e suporte Wi-Fi integrado.', maxUsers: 32, speed: '2.5 Gbps', image: '/images/onthuawei.jpg' },
  { name: 'ONT 2Flex', type: 'XPON', description: 'XPON flexível, suporta múltiplos provedores e configurações.', maxUsers: 48, speed: '1 Gbps', image: '/images/ont2flex.jpg' },
  { name: 'ONT Wifiber 121AC', type: 'XPON', description: 'XPON com Wi-Fi AC integrado, ideal para residências modernas.', maxUsers: 32, speed: '1 Gbps', image: '/images/ontwifiber121ac.jpg' },
  { name: 'ONT Wifiber 1200r', type: 'XPON', description: 'Alta performance XPON, cobertura ampla de sinal.', maxUsers: 64, speed: '1.2 Gbps', image: '/images/ontwifiber1200r.jpg' },
  { name: 'ONT Wifiber AX1800', type: 'GPON', description: 'GPON com Wi-Fi AX1800, excelente para streaming e jogos.', maxUsers: 32, speed: '1.8 Gbps', image: '/images/ontwifiberax1800.jpg' },
  { name: 'ONT Wifiber AX3000', type: 'GPON', description: 'GPON premium com Wi-Fi AX3000, máximo desempenho para empresas e residências grandes.', maxUsers: 64, speed: '3 Gbps', image: '/images/ontwifiberax3000.jpg' },
];

const EquipamentosPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'GPON' | 'XPON'>('ALL');
  const [selected, setSelected] = useState<Equipamento | null>(null);

  const filteredEquipamentos =
    filter === 'ALL' ? equipamentos : equipamentos.filter((eq) => eq.type === filter);

  return (
    <div className="p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center drop-shadow-md">
        Equipamentos de Rede
      </h1>

      {/* Filtros */}
      <div className="flex justify-center gap-4 mb-10">
        {['ALL', 'GPON', 'XPON'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as 'ALL' | 'GPON' | 'XPON')}
            className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-300 hover:scale-105 ${
              filter === f
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f === 'ALL' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {/* Lista de equipamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredEquipamentos.map((eq, idx) => (
          <motion.div
            key={idx}
            className="relative p-6 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer bg-white border border-gray-100"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(eq)}
          >
            <div className="absolute top-4 right-4 flex items-center space-x-1">
              {eq.type === 'GPON' ? (
                <DevicePhoneMobileIcon className="w-5 h-5 text-blue-600" />
              ) : (
                <WifiIcon className="w-5 h-5 text-gray-500" />
              )}
              <span className={`text-xs font-semibold ${eq.type === 'GPON' ? 'text-blue-700' : 'text-gray-700'}`}>
                {eq.type}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">{eq.name}</h2>
            <p className="text-gray-600 text-sm mb-3">{eq.description}</p>

            <div className="flex flex-col gap-1 mt-3 text-gray-500 text-xs">
              <span>Capacidade Máxima: <strong>{eq.maxUsers} usuários</strong></span>
              <span>Velocidade Máxima: <strong>{eq.speed}</strong></span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-blue-700 mb-3">{selected.name}</h2>
              <img src={selected.image} alt={selected.name} className="w-full h-48 object-contain mb-4 rounded-lg" />
              <p className="text-gray-600 mb-2">{selected.description}</p>
              <p className="text-gray-500 text-sm">Capacidade Máxima: <strong>{selected.maxUsers} usuários</strong></p>
              <p className="text-gray-500 text-sm">Velocidade Máxima: <strong>{selected.speed}</strong></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EquipamentosPage;
