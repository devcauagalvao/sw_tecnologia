import React, { useState } from 'react';

interface Equipamento {
  name: string;
  type: 'GPON' | 'XPON';
}

// Dados
const equipamentos: Equipamento[] = [
  { name: 'ONU 110B', type: 'XPON' },
  { name: 'ONU 110', type: 'GPON' },
  { name: 'ONU R1', type: 'XPON' },
  { name: 'ONU G/EPON', type: 'XPON' },
  { name: 'ONT Huawei', type: 'GPON' },
  { name: 'ONT 2Flex', type: 'XPON' },
  { name: 'ONT Wifiber 121AC', type: 'XPON' },
  { name: 'ONT Wifiber 1200r', type: 'XPON' },
  { name: 'ONT Wifiber AX1800', type: 'GPON' },
  { name: 'ONT Wifiber AX3000', type: 'GPON' },
];

const EquipamentosPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'GPON' | 'XPON'>('ALL');

  const filteredEquipamentos =
    filter === 'ALL' ? equipamentos : equipamentos.filter((eq) => eq.type === filter);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Equipamentos de Rede</h1>

      {/* Filtros */}
      <div className="flex justify-center gap-4 mb-8">
        {['ALL', 'GPON', 'XPON'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as 'ALL' | 'GPON' | 'XPON')}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {f === 'ALL' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {/* Lista de equipamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredEquipamentos.map((eq, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl shadow-md border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
              eq.type === 'GPON' ? 'bg-green-50' : 'bg-blue-50'
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800">{eq.name}</h2>
            <p className="text-gray-600 mt-1">{eq.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipamentosPage;
