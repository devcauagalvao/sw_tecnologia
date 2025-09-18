import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface Pon {
  name: string;
  description: string;
}

interface Olt {
  name: string;
  ip: string;
  type: 'EPON' | 'GPON';
  pons: Pon[];
}

// Dados
const olts: Olt[] = [
  {
    name: 'PALMEIRAS EPON',
    ip: '10.20.30.21',
    type: 'EPON',
    pons: [
      { name: 'PON1', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON2', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON3', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON4', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON5', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON6', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON7', description: 'Dentro Palmeiras - EPON' },
      { name: 'PON8', description: 'Dentro Palmeiras - EPON' },
    ],
  },
  {
    name: 'PALMEIRAS GPON',
    ip: '10.20.30.25',
    type: 'GPON',
    pons: [
      { name: 'PON1', description: 'NADA - GPON' },
      { name: 'PON2', description: 'GRAN CLUB - GPON' },
      { name: 'PON3', description: 'NADA - GPON' },
      { name: 'PON4', description: 'ILHA DAS FLORES - PROGRESSO - VILA PADRE BENTO(Av.7 QUEDAS) - GPON' },
      { name: 'PON5', description: 'ILHA DAS FLORES - PROGRESSO - VILA PADRE BENTO(Av.7 QUEDAS) - GPON' },
      { name: 'PON6', description: 'SANTA MADRE PAULINA - GPON' },
      { name: 'PON7', description: 'SANTA MADRE PAULINA - GPON' },
      { name: 'PON8', description: 'SANTA MADRE PAULINA - ITAPECERICA - ROD. DO AÇUCAR/ROD. Rocha Moutonnée - GUARAÚ  - GPON' },
    ],
  },
  {
    name: 'Sao_Geronimo EPON',
    ip: '10.20.30.17',
    type: 'EPON',
    pons: [
      { name: 'PON1', description: 'ITAPERECICA - ITUAU - EPON' },
      { name: 'PON2', description: 'NADA' },
      { name: 'PON3', description: 'NADA' },
      { name: 'PON4', description: 'NADA' },
    ],
  },
  {
    name: 'SeteQuedas EPON',
    ip: '10.20.30.26',
    type: 'EPON',
    pons: [
      { name: 'PON1', description: 'Vila PADRE BENTO - Av. 7QUEDAS/ BAIRRO/CHACARA 7QUEDAS - AIRSOFT CAPIVARAS - ARGIPLAN - SAINT PAUL - BAIRRO BRASIL - EPON' },
      { name: 'PON2', description: 'Chacara SETE QUEDAS - RESIDENCIAL SETE QUEDAS - VILA NOVA - ESTRADA SETE QUEDAS - VAREJAO - EPON' },
      { name: 'PON3', description: 'Chacara sete quedas - Vila Padre Bento - sete quedas - itaim guaçu - EPON' },
      { name: 'PON4', description: 'NADA' },
    ],
  },
  {
    name: 'Sabias GPON',
    ip: '10.20.30.14',
    type: 'GPON',
    pons: [
      { name: 'PON1', description: 'Salto Ville - Solar dos Sabiás - GPON' },
      { name: 'PON2', description: 'Salto Ville - Solar dos Sabiás - GPON' },
      { name: 'PON3', description: 'Salto Ville - Solar dos Sabiás - GPON' },
      { name: 'PON4', description: 'Jardim Marília - Guarujá - GPON' },
      { name: 'PON5', description: 'Rio Branco - Jd. Marília - Jardim Cidade IV  - Jardim da Cidade IV - Jd. Cidade - GPON' },
      { name: 'PON6', description: 'Cond. Universo - Centro Salto-SP - GPON' },
    ],
  },
  {
    name: 'Theodora GPON',
    ip: '10.20.30.18',
    type: 'GPON',
    pons: [
      { name: 'PON1', description: 'Liberdade - Ceramica do Rosário - Chacara marquesa - estrada velha de itu a salto - ceramica navarro - Jardim santa monica - residencial santa monica - parque das rosas - canjica - residencial são camilo, associação são camilo - Cangica - GPON' },
      { name: 'PON2', description: 'Saint Paul - Bernardini - Brasil - GPON' },
      { name: 'PON3', description: 'Saint Paul - Bernardini - Brasil - GPON' },
      { name: 'PON4', description: 'Saint Paul - Bernardini - Brasil - GPON' },
      { name: 'PON5', description: 'Saint Paul - Bernardini - Brasil - GPON' },
      { name: 'PON6', description: 'Plaza Shopping - São Luiz - Jardim Paraiso - Campus Office  - GPON' },
      { name: 'PON7', description: 'NADA  - GPON' },
      { name: 'PON8', description: 'NADA  - GPON' },
    ],
  },
];

const TecnologiaPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-700 text-center drop-shadow-lg tracking-tight">
        Tecnologias de OLT
      </h1>

      <div className="space-y-6 max-w-6xl mx-auto">
        {olts.map((olt, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl"
          >
            <button
              onClick={() => toggleOpen(idx)}
              className={`w-full px-7 py-5 flex justify-between items-center text-left font-semibold text-gray-800 transition-colors duration-200 ${
                olt.type === 'EPON'
                  ? 'bg-gradient-to-r from-blue-50 to-white'
                  : 'bg-gradient-to-r from-green-50 to-white'
              } hover:bg-blue-100/40`}
              style={{ fontSize: '1.15rem' }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold text-blue-700">{olt.name}</span>
                <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-100 ml-2">{olt.ip}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ml-2 ${olt.type === 'EPON' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {olt.type}
                </span>
              </div>
              {openIndex === idx ? (
                <ChevronUpIcon className="h-6 w-6 text-blue-400 transition-transform duration-200" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-blue-400 transition-transform duration-200" />
              )}
            </button>

            {openIndex === idx && (
              <div className="px-7 py-5 border-t border-gray-100 bg-gradient-to-r from-white to-blue-50 animate-fade-in">
                {olt.pons.map((pon, i) => (
                  <div key={i} className="mb-3 flex items-start gap-2">
                    <span className="font-semibold text-blue-600">{pon.name}:</span>
                    <span className="text-gray-700">{pon.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="mt-14 max-w-4xl mx-auto p-7 bg-gradient-to-r from-indigo-50 via-white to-blue-50 rounded-2xl shadow-xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
          <span className="text-3xl">🔹</span> Resumo
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
          <li>EPON ↔ EPON <span className="text-green-600 font-bold">✅</span></li>
          <li>GPON ↔ GPON <span className="text-green-600 font-bold">✅</span></li>
          <li>EPON ↔ GPON <span className="text-red-500 font-bold">❌</span> <span className="text-gray-500">(incompatível, exceto se for XPON)</span></li>
          <li>XPON ↔ GPON/EPON <span className="text-green-600 font-bold">✅</span></li>
        </ul>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.4s;
        }
      `}</style>
    </div>
  );
};

export default TecnologiaPage;
