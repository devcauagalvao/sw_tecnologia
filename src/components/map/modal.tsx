import React from 'react';
import { Condominium } from '../../types';

interface ModalProps {
  condo: Condominium | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ condo, onClose }) => {
  if (!condo) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      {/* Fundo escuro clicável */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Conteúdo do modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-md sm:w-96 z-50 animate-fadeIn scale-100 md:scale-105 transition-transform duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{condo.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <p className="text-gray-500 mb-4">{condo.address}</p>

        <div className="flex items-center mb-4">
          <span className="font-semibold mr-2">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              condo.status === 'active'
                ? 'bg-green-500'
                : condo.status === 'maintenance'
                ? 'bg-yellow-500'
                : condo.status === 'planned'
                ? 'bg-blue-500'
                : 'bg-gray-400'
            }`}
          >
            {condo.status.toUpperCase()}
          </span>
        </div>

        <div className="mb-6">
          <span className="font-semibold">Equipamentos:</span>
          <ul className="list-disc list-inside text-gray-600 mt-1">
            {condo.equipments.map((eq, i) => (
              <li key={i}>{eq}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
