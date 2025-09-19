import React from 'react';
import { Condominium } from '../../types';

interface ModalProps {
  condo: Condominium | null;
  onClose: () => void;
}

type StatusKey = 'active' | 'maintenance' | 'planned';

const statusMap: Record<StatusKey, { text: string; color: string; icon: JSX.Element }> = {
  active: { 
    text: 'Ativo', 
    color: 'bg-green-500', 
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg>
    )
  },
  maintenance: { 
    text: 'Manutenção', 
    color: 'bg-yellow-400', 
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
      </svg>
    )
  },
  planned: { 
    text: 'Planejado', 
    color: 'bg-blue-500', 
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
      </svg>
    )
  },
};

const Modal: React.FC<ModalProps> = ({ condo, onClose }) => {
  if (!condo) return null;

  const status =
    statusMap[(condo.status as StatusKey)] ||
    { 
      text: condo.status, 
      color: 'bg-gray-400', 
      icon: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      )
    };

  return (
    <div
      className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-[95vw] max-w-xl animate-fade-in"
      style={{ 
        animation: 'fade-in 0.3s',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '4px solid rgba(59, 131, 246, 0.79)',
      }}
    >
      {/* Botão de fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-4xl font-bold transition"
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
