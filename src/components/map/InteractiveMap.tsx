import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '../map/modal';
import { Condominium } from '../types';

// ----------------- MOCK DE DADOS -----------------
const mockCondominiums: Condominium[] = [
  {
    id: 'vila-dos-manacas',
    name: 'Vila dos Manacás',
    vlan: 192,
    location: { lat: -23.2571, lng: -47.28304 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link AX73', status: 'operational', installDate: '2023-01-25' },
    ],
    polygon: [[-23.2568, -47.2833]],
  },
  {
    id: 'portal-dos-sabias',
    name: 'Portal Dos Sabias',
    vlan: 192,
    location: { lat: -23.411925449433493, lng: -47.35015500804215 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link AX73', status: 'operational', installDate: '2023-01-25' },
    ],
    polygon: [[-23.411925449433493, -47.35015500804215]],
  },
  {
    id: 'campos-2',
    name: 'Campos 2',
    vlan: 196,
    location: { lat: -23.412629546779417, lng: -47.394181529778194 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link AX73', status: 'operational', installDate: '2023-01-25' },
    ],
    polygon: [[-23.412629546779417, -47.394181529778194]],
  },
  {
    id: 'NairMaria',
    name: 'Nair Maria',
    vlan: 227,
    location: { lat: -23.180424656158106, lng: -47.26721388335353 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link AX73', status: 'operational', installDate: '2023-01-25' },
    ],
    polygon: [[-23.180424656158106, -47.26721388335353]],
  },
];

// ----------------- COMPONENTES AUXILIARES -----------------
const FitBounds: React.FC<{ positions: L.LatLngExpression[] }> = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds.pad(0.4));
    }
  }, [map, positions]);
  return null;
};

// Marcador Wi-Fi verde animado
const createWifiIcon = () => {
  const html = `
    <div style="
      width:50px;
      height:50px;
      border-radius:50%;
      background:#e5e7eb;
      display:flex;
      align-items:center;
      justify-content:center;
      position:relative;
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
      cursor:pointer;
      transition: transform 0.2s;
    ">
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:26px;">
        <span style="width:4px; height:4px; background:#4ade80; border-radius:2px; margin:1px 0; animation:wifiBar 1.2s infinite ease-in-out;"></span>
        <span style="width:6px; height:6px; background:#4ade80; border-radius:3px; margin:1px 0; animation:wifiBar 1.2s infinite ease-in-out 0.2s;"></span>
        <span style="width:8px; height:8px; background:#4ade80; border-radius:4px; margin:1px 0; animation:wifiBar 1.2s infinite ease-in-out 0.4s;"></span>
      </div>
    </div>
    <style>
      @keyframes wifiBar {
        0%, 40%, 100% { transform: scaleY(0.4); }
        20% { transform: scaleY(1); }
      }
    </style>
  `;
  return L.divIcon({
    html,
    className: 'custom-wifi-icon',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};

const InteractiveMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Condominium | null>(null);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef<L.Map | null>(null);

  const positions = useMemo(
    () => mockCondominiums.map(c => [c.location.lat, c.location.lng] as L.LatLngExpression),
    []
  );

  const filteredCondos = searchText
    ? mockCondominiums.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
    : [];

  const handleSelectCondo = (condo: Condominium) => {
    setSelectedRegion(condo);
    if (mapRef.current) {
      mapRef.current.setView([condo.location.lat, condo.location.lng], 16, { animate: true });
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 z-10">
      {/* Barra de pesquisa */}
      <div className="absolute top-6 right-8 z-40 flex flex-col space-y-2 w-80 max-w-full">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="#3B82F6" strokeWidth="2"/>
              <path d="M21 21L17 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Pesquisar condomínio..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-12 pr-10 py-3 rounded-xl border border-blue-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-lg font-medium transition w-full"
          />
          {searchText && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
              onClick={() => setSearchText('')}
              aria-label="Limpar"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        {searchText && (
          <div className="bg-white max-h-64 overflow-y-auto rounded-xl shadow-2xl mt-2 z-50 border border-blue-100">
            {filteredCondos.length === 0 && (
              <div className="px-5 py-3 text-gray-400">Nenhum condomínio encontrado.</div>
            )}
            {filteredCondos.map(c => (
              <div
                key={c.id}
                onClick={() => { handleSelectCondo(c); setSearchText(''); }}
                className="px-5 py-3 hover:bg-blue-100 cursor-pointer transition font-semibold"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mapa */}
      <MapContainer
        center={positions[0] || [-23.2571, -47.28304]}
        zoom={14}
        scrollWheelZoom
        style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, zIndex: 10 }}
        ref={mapRef}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={positions} />
        {mockCondominiums.map(c => (
          <Marker
            key={c.id}
            position={[c.location.lat, c.location.lng]}
            icon={createWifiIcon()}
            eventHandlers={{ click: () => handleSelectCondo(c) }}
          />
        ))}
        {selectedRegion?.polygon && (
          <Polygon
            positions={selectedRegion.polygon}
            pathOptions={{
              color: '#3B82F6',
              weight: 3,
              fillOpacity: 0.18,
              dashArray: '6',
            }}
          />
        )}
      </MapContainer>

      {/* Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center transition">
          {Modal ? (
            <Modal condo={selectedRegion} onClose={() => setSelectedRegion(null)} />
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">{selectedRegion.name}</h2>
              <p>{selectedRegion.description}</p>
              <button
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                onClick={() => setSelectedRegion(null)}
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
