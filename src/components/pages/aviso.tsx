import React from 'react';
import { ExclamationTriangleIcon, WifiIcon } from '@heroicons/react/24/outline';

interface EquipamentoAviso {
  equipamento: string;
  tipo: 'ONU' | 'ROUTER' | 'OUTRO';
  areasNaoSuportadas: string[];
  observacoes: string;
}

const avisos: EquipamentoAviso[] = [
  {
    equipamento: 'ONU GPON ZXHN F660',
    tipo: 'ONU',
    areasNaoSuportadas: ['Zona Rural', 'Bairro Novo Horizonte'],
    observacoes: 'Não suporta conexões acima de 300Mbps em regiões com cabos antigos.',
  },
  {
    equipamento: 'Router Wi-Fi AC1200',
    tipo: 'ROUTER',
    areasNaoSuportadas: ['Prédios com interferência de sinal'],
    observacoes: 'Pode apresentar instabilidade em ambientes com múltiplos dispositivos conectados simultaneamente.',
  },
  {
    equipamento: 'Transmissor FiberLink X10',
    tipo: 'OUTRO',
    areasNaoSuportadas: ['Bairro Industrial', 'Zona de Obras'],
    observacoes: 'Limite de alcance máximo de 5 km sem repetidor.',
  },
];

const AvisoEquipamentos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Avisos de Equipamentos</h1>
      <p className="text-gray-700 max-w-2xl text-center mb-8">
        Esta página lista informações importantes sobre equipamentos, suas limitações e locais onde podem não funcionar corretamente. 
        Leia atentamente antes de instalar ou configurar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {avisos.map((aviso, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl border border-gray-300 bg-white shadow-md flex flex-col"
          >
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">{aviso.equipamento}</h2>
            </div>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Tipo:</span> {aviso.tipo}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Áreas sem suporte:</span> {aviso.areasNaoSuportadas.join(', ')}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Observações:</span> {aviso.observacoes}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-10 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all">
        Atualizar Lista
      </button>
    </div>
  );
};

export default AvisoEquipamentos;
