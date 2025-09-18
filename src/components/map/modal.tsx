import React from 'react';
import { Condominium } from '../types';

interface ModalProps {
  condo: Condominium | null;
  onClose: () => void;
}

const statusMap = {
  active: { text: 'Ativo', color: 'bg-green-500', icon: '✅' },
  maintenance: { text: 'Manutenção', color: 'bg-yellow-400', icon: '🛠️' },
  planned: { text: 'Planejado', color: 'bg-blue-500', icon: '🗓️' },
};

const Modal: React.FC<ModalProps> = ({ condo, onClose }) => {
  if (!condo) return null;

  const status = statusMap[condo.status] || { text: condo.status, color: 'bg-gray-400', icon: '❔' };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-2xl p-8 w-[95vw] max-w-xl animate-fade-in"
      style={{ animation: 'fade-in 0.3s' }}
    >
      {/* Botão de fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold transition"
        aria-label="Fechar"
      >
        ×
      </button>

      {/* Nome e status */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl font-bold text-blue-700">{condo.name}</span>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${status.color} flex items-center gap-1`}>
          {status.icon} {status.text}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-gray-600 mb-4">{condo.description}</p>

      {/* Cobertura e VLAN */}
      <div className="flex gap-4 mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium text-sm">
          Cobertura: {condo.coverage}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium text-sm">
          VLAN: {condo.vlan}
        </span>
      </div>

      {/* Equipamentos */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Equipamentos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {condo.equipments.map(eq => (
            <div key={eq.id} className="bg-gray-50 rounded-xl p-3 shadow flex flex-col gap-1 border border-gray-100">
              <span className="font-bold text-blue-600">{eq.type}</span>
              <span className="text-gray-700">{eq.model}</span>
              <span className="text-xs text-gray-500">Instalado em: {eq.installDate}</span>
              <span className={`text-xs font-semibold ${eq.status === 'operational' ? 'text-green-600' : 'text-red-600'}`}>
                {eq.status === 'operational' ? 'Operacional' : 'Inativo'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Localização */}
      <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
        <svg width="20" height="20" fill="none" stroke="currentColor" className="mr-1">
          <circle cx="10" cy="10" r="8" strokeWidth="2"/>
          <circle cx="10" cy="10" r="3" strokeWidth="2"/>
        </svg>
        Lat: {condo.location.lat} | Lng: {condo.location.lng}
      </div>

      {/* Animação fade-in */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default Modal;
