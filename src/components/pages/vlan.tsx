import React, { useState } from 'react';

interface Vlan {
  id: number;
  name: string;
  ip: number;
}

// Todas as VLANs Fibra
const fibraVlans: Vlan[] = [
  { id: 1, name: 'FIBRA-MANACAS', ip: 192 },

  { id: 2, name: 'FIBRA-STARITA', ip: 192 },

  { id: 3, name: 'FIBRA-PORTALSABIAS', ip: 192 },

  { id: 4, name: 'FIBRA-CAMPOS2', ip: 196 },

  { id: 5, name: 'FIBRA-NAIRMARIA', ip: 227 },

  { id: 6, name: 'FIBRA-PQAMERICA', ip: 221 },
  
  { id: 7, name: 'FIBRA-TORRESDEITU', ip: 189 },
  { id: 8, name: 'FIBRA-PALMEIRAS', ip: 199 },
  { id: 9, name: 'FIBRA-MONTIS', ip: 192 },
  { id: 10, name: 'FIBRA-ILHADOSCORAIS', ip: 194 },
  { id: 11, name: 'FIBRA-GOLF', ip: 188 },
  { id: 12, name: 'FIBRA-GRANDPARC', ip: 183 },
  { id: 13, name: 'FIBRA-NOVACENTER', ip: 50 },
  { id: 14, name: 'FIBRA-CAROLINA', ip: 184 },
  { id: 15, name: 'FIBRA-BRETAGNE', ip: 185 },
  { id: 16, name: 'FIBRA-TERRASLEONARDI', ip: 184 },
  { id: 17, name: 'FIBRA-CDHU', ip: 181 },
  { id: 18, name: 'FIBRA-PINHEIRINHO', ip: 180 },
  { id: 19, name: 'FIBRA-CONDSTAMARIA', ip: 180 },
  { id: 20, name: 'FIBRA-COND.ACACIAS', ip: 180 },
  { id: 21, name: 'FIBRA-JDPAULISTA', ip: 179 },
  { id: 22, name: 'FIBRA-ILHASMEDITERRANEO', ip: 178 },
  { id: 23, name: 'FIBRA-VILADAPAZ', ip: 231 },
  { id: 24, name: 'FIBRA-SAINTPAUL', ip: 177 },
  { id: 25, name: 'FIBRA-ILHADOSOL', ip: 175 },
  { id: 26, name: 'FIBRA-AEROPORTO', ip: 174 },
  { id: 27, name: 'FIBRA-STAMONICA', ip: 173 },
  { id: 28, name: 'FIBRA-SW', ip: 50 },
  { id: 29, name: 'FIBRA-ILHADASFLORES', ip: 239 },
  { id: 30, name: 'FIBRA-ILHADEPASCOA', ip: 179 },
  { id: 31, name: 'FIBRA-RECPASSAROS', ip: 172 },
  { id: 32, name: 'FIBRA-7QUEDAS', ip: 171 },
  { id: 33, name: 'FIBRA-MADREPAULINA', ip: 226 },
  { id: 34, name: 'FIBRA-SPLENDOR', ip: 170 },
  { id: 35, name: 'FIBRA-LACASTELLE', ip: 169 },
  { id: 36, name: 'FIBRA-SWEVIA', ip: 168 },
  { id: 37, name: 'FIBRA-CERAMICAGLOBO', ip: 184 },
  { id: 38, name: 'FIBRA-SAOGERONIMO', ip: 167 },
  { id: 39, name: 'FIBRA-MILANO', ip: 169 },
  { id: 40, name: 'FIBRA-VILAPROGRESSO', ip: 239 },
  { id: 41, name: 'FIBRA-EDVILMA', ip: 50 },
  { id: 42, name: 'FIBRA-EDINCA', ip: 163 },
  { id: 43, name: 'FIBRA-JDROSINHA', ip: 189 },
  { id: 44, name: 'FIBRA-PANORAMA', ip: 223 },
  { id: 45, name: 'FIBRA-PLANALTO', ip: 227 },
  { id: 46, name: 'FIBRA-VILAESPANHA', ip: 50 },
  { id: 47, name: 'FIBRA-CERAMICAITUANA', ip: 239 },
  { id: 48, name: 'FIBRA-OASIS', ip: 162 },
  { id: 49, name: 'FIBRA-MARIAFERNANDA', ip: 161 },
  { id: 50, name: 'FIBRA-NOVOCENTRO', ip: 161 },
  { id: 51, name: 'FIBRA-VILADETRENTO', ip: 160 },
];

const ModernVlanTable: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredVlans = fibraVlans.filter(
    (vlan) =>
      vlan.name.toLowerCase().includes(search.toLowerCase()) ||
      vlan.ip.toString().includes(search)
  );

  return (
    <div className="p-10 bg-gradient-to-br from-white via-blue-50 to-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700 text-center drop-shadow-lg tracking-tight">
        Todas as VLANs Fibra
      </h1>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome ou IP..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full max-w-md px-5 py-3 rounded-2xl shadow-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
      />

      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full border-separate border-spacing-y-4">
          <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
            <tr>
              <th className="px-6 py-4 text-left text-blue-600 uppercase tracking-wider text-sm font-bold">
                ID
              </th>
              <th className="px-6 py-4 text-left text-blue-600 uppercase tracking-wider text-sm font-bold">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-blue-600 uppercase tracking-wider text-sm font-bold">
                IP
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVlans.map((vlan, idx) => (
              <tr
                key={vlan.id}
                className={`transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl cursor-pointer rounded-2xl ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                }`}
                style={{ boxShadow: '0 2px 12px 0 rgba(59,130,246,0.08)' }}
              >
                <td className="px-6 py-4 text-blue-700 font-bold text-lg">
                  {vlan.id}
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold text-base">
                  {vlan.name}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-base shadow">
                    {vlan.ip}
                  </span>
                </td>
              </tr>
            ))}
            {filteredVlans.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400 text-lg">
                  Nenhuma VLAN encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-10 text-gray-500 text-base text-center max-w-2xl">
        Use a barra de pesquisa para encontrar rapidamente qualquer VLAN pelo nome ou pelo IP.
      </p>
    </div>
  );
};

export default ModernVlanTable;
