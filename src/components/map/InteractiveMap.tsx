import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from './modal'; // Certifique-se que o caminho está correto
import { Condominium } from '../types';

const mockCondominiums: Condominium[] = [
  {
    id: 'vila-dos-manacas',
    name: 'Vila dos Manacás',
    vlan: 192,
    location: { lat: -23.2571, lng: -47.28304 },
    description: 'Condomínio residencial tranquilo com infraestrutura moderna.',
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link AX73', status: 'operational', installDate: '2023-01-25' },
    ],
    polygon: [
      [-23.2568, -47.2833],
      [-23.2568, -47.2827],
      [-23.2574, -47.2827],
      [-23.2574, -47.2833],
    ],
  },
];

// Ajusta o mapa para caber todos os marcadores
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

// Cria marcador menor e mais clean
const createDivIcon = (color: string, active = false) => {
  const ring = active ? 'box-shadow: 0 0 0 6px rgba(59,130,246,0.3);' : '';
  const html = `
    <div style="
      width:40px;
      height:40px;
      border-radius:50%;
      background:${color};
      display:flex;
      align-items:center;
      justify-content:center;
      ${ring};
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
      cursor:pointer;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C4.5 8.5 8 6 12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 16C8 14 10 13 12 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 20C11 19.2 11.8 18.5 12.6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="21" r="1" fill="white"/>
      </svg>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const statusColor = (status: string) => {
  switch (status) {
    case 'active': return '#10B981';
    case 'maintenance': return '#F59E0B';
    case 'planned': return '#3B82F6';
    default: return '#6B7280';
  }
};

const InteractiveMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Condominium | null>(null);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef<L.Map | null>(null);

  const positions = useMemo(() => mockCondominiums.map(c => [c.location.lat, c.location.lng] as L.LatLngExpression), []);

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
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-200 shadow-lg">

      {/* Barra de pesquisa */}
      <div className="absolute top-4 right-4 z-40 flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Pesquisar condomínio..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        {searchText && (
          <div className="bg-white max-h-60 overflow-y-auto rounded-lg shadow-md mt-1 z-50">
            {filteredCondos.map(c => (
              <div
                key={c.id}
                onClick={() => { handleSelectCondo(c); setSearchText(''); }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
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
        style={{ height: '100%', width: '100%', position: 'relative', zIndex: 10 }}
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
            icon={createDivIcon(statusColor(c.status), selectedRegion?.id === c.id)}
            eventHandlers={{ click: () => handleSelectCondo(c) }}
          />
        ))}

        {selectedRegion?.polygon && (
          <Polygon positions={selectedRegion.polygon} pathOptions={{ color: '#3B82F6', weight: 2, fillOpacity: 0.15 }} />
        )}
      </MapContainer>

      {/* Modal */}
      <Modal condo={selectedRegion} onClose={() => setSelectedRegion(null)} />
    </div>
  );
};

export default InteractiveMap;
