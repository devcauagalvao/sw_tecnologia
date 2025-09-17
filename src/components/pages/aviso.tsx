import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AvisoPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center border border-yellow-300 animate-fadeIn">
        <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Atenção!</h1>
        <p className="text-gray-700 mb-6">
          Esta ação pode causar alterações significativas no sistema. Certifique-se de que você
          entende os impactos antes de prosseguir.
        </p>
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-400 transition-all">
          Entendi
        </button>
      </div>
    </div>
  );
};

export default AvisoPage;
