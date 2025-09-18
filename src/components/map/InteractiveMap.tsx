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
    equipments: [],
    polygon: [[-23.2568, -47.2833]],
  },
  {
    id: 'portal-dos-sabias',
    name: 'Portal Dos Sabias',
    vlan: 192,
    location: { lat: -23.411925449433493, lng: -47.35015500804215 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[-23.411925449433493, -47.35015500804215]],
  },
  {
    id: 'campos-2',
    name: 'Campos 2',
    vlan: 196,
    location: { lat: -23.412629546779417, lng: -47.394181529778194 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[-23.412629546779417, -47.394181529778194]],
  },
  {
    id: 'NairMaria',
    name: 'Nair Maria',
    vlan: 227,
    location: { lat: -23.180424656158106, lng: -47.26721388335353 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[-23.180424656158106, -47.26721388335353]],
  },

    {
    id: 'PQAmerica',
    name: 'PQAmerica',
    vlan: 221,
    location: { lat: -23.270368256674534,  lng: -47.2727737975025 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[-23.270368256674534, -47.2727737975025]],
  },

   {
    id: 'Torres de Itu',
    name: 'Torres de Itu',
    vlan: 189,
    location: { lat: -23.267456154150906,  lng: -47.28419386265731},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[-23.267456154150906, -47.28419386265731]],
  },

{
    id: 'Palmeiras Imperiais',
    name: 'Palmeiras Imperiais',
    vlan: 189,
    location: { lat: -23.226915168554,   lng: -47.3222304160444},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[  -23.226915168554, -47.3222304160444,]],
  },

  {
    id: 'Montis',
    name: 'Montis',
    vlan: 192,
    location: { lat: -23.281586668536182, lng: -47.27683252089721},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[  -23.281586668536182, -47.27683252089721]],
  },


    {
    id: 'Ilha dos Corais',
    name: 'Ilha dos Corais',
    vlan: 194,
    location: { lat: -23.26975710988793, lng: -47.27683252089721},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.26975710988793,  -47.27683252089721]],
  },

    
    {
    id: 'Vilas do Golf',
    name: 'Vilas do Golf',
    vlan: 188,
    location: { lat: -23.312240355084445,  lng: -47.2883669591068},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.312240355084445,  -47.2883669591068]],
  },


   {
    id: 'Grand Parc',
    name: 'Grand Parc',
    vlan: 183,
    location: { lat: -23.286295520528686,  lng:  -47.280397603702625},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.286295520528686,  -47.280397603702625]],
  },

   {
    id: 'Nova Center',
    name: 'Nova Center',
    vlan: 50,
    location: { lat: -23.281707188255716,   lng:  -47.29010300503428},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.281707188255716,  -47.29010300503428,]],
  },


   {
    id: 'Carolina',
    name: 'Carolina',
    vlan: 184,
    location: { lat: -23.311916912800726,   lng: -47.324252730336084},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.311916912800726, -47.324252730336084]],
  },

   {
    id: 'Bretagne',
    name: 'Bretagne',
    vlan: 185,
    location: { lat: -23.24007660474858,   lng:   -47.32483221695294},
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.24007660474858,    -47.32483221695294]],
  },

 {
    id: 'Terras Leonardi',
    name: 'Terras Leonardi',
    vlan: 184,
    location: { lat: -23.35351560634927,   lng:   -47.30227858784367 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.35351560634927,  -47.30227858784367 ]],
  },

{
    id: 'CDHU',
    name: 'CDHU',
    vlan: 181,
    location: { lat: -23.29523284778951,   lng:   -47.304217413824944 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.29523284778951,  -47.304217413824944 ]],
  },

  {
    id: 'Pinheiro',
    name: 'Pinheiro',
    vlan: 180,
    location: { lat: -23.295125250001878, lng:   -47.277589673323305 },
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [],
    polygon: [[   -23.295125250001878,  -47.277589673323305 ]],
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

// Ícone Wi-Fi customizado chamativo
const createWifiIcon = () => {
  const html = `
    <div style="
      width:58px;
      height:58px;
      border-radius:50%;
      background:#e5e7eb;
      border:3px solid #32CD32;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:0 4px 15px rgba(0,0,0,0.25);
      position:relative;
      transition: transform 0.2s ease;
    ">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M8.5 16.55a5.5 5.5 0 0 1 7 0"/>
        <path d="M12 20h.01"/>
      </svg>
      <span style="
        position:absolute;
        width:100%;
        height:100%;
        border-radius:50%;
        border:2px solid rgba(34,197,94,0.6);
        animation:pulse 1.6s infinite;
      "></span>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        70% { transform: scale(1.4); opacity: 0; }
        100% { transform: scale(1); opacity: 0; }
      }
    </style>
  `;
  return L.divIcon({
    html,
    className: 'custom-wifi-icon',
    iconSize: [58, 58],
    iconAnchor: [29, 29],
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
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {Modal ? (
      <Modal condo={selectedRegion} onClose={() => setSelectedRegion(null)} />
    ) : (
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl max-w-lg w-full mx-4 text-center border border-gray-200">
        {/* Botão de fechar no canto */}
        <button
          onClick={() => setSelectedRegion(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white shadow-sm transition duration-200"
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
          {selectedRegion.name}
        </h2>

        {/* Conteúdo */}
        <p className="text-gray-600 text-lg leading-relaxed">
          {selectedRegion.coverage}
        </p>

        {/* Botão principal */}
        <button
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition duration-200"
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
