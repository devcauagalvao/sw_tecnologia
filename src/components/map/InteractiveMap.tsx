import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockCondominiums } from '../../utils/mockData';
import { Condominium } from '../../types';

interface InteractiveMapProps {
  onRegionClick: (condominium: Condominium) => void;
}

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

const createDivIcon = (color: string, active = false) => {
  // small inline SVG approximating the SignalIcon (white)
  const svg = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12C4.5 8.5 8 6 12 6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 16C8 14 10 13 12 13" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 20C11 19.2 11.8 18.5 12.6 18" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="21" r="1.2" fill="white"/>
    </svg>
  `;
  const ring = active ? 'box-shadow:0 0 0 6px rgba(59,130,246,0.18);' : '';
  const html = `
    <div style="
      width:64px;height:64px;border-radius:16px;
      display:flex;align-items:center;justify-content:center;
      background:${color};${ring}
      box-shadow:0 8px 18px rgba(15,23,42,0.12);
    ">
      ${svg}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-div-icon',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -36]
  });
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onRegionClick }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(13);
  const mapRef = useRef<L.Map | null>(null);

  const positions = useMemo(() => {
    return mockCondominiums
      .map((c) => [c.location.lat, c.location.lng] as L.LatLngExpression)
      .filter(Boolean);
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'maintenance': return '#F59E0B';
      case 'planned': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const handleMarkerClick = (condo: Condominium) => {
    setSelectedRegion(condo.id);
    onRegionClick(condo);
    // center map on click slightly
    if (mapRef.current && mapRef.current.setView) {
      mapRef.current.setView([condo.location.lat, condo.location.lng], Math.max(mapRef.current.getZoom(), 13), { animate: true });
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      {/* Mantém os controles e o layout visual original */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <button
          onClick={() => {
            if (mapRef.current) {
              const z = Math.min(mapRef.current.getZoom() + 1, 19);
              mapRef.current.setZoom(z);
              setMapZoom(z);
            }
          }}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => {
            if (mapRef.current) {
              const z = Math.max(mapRef.current.getZoom() - 1, 2);
              mapRef.current.setZoom(z);
              setMapZoom(z);
            }
          }}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          -
        </button>
      </div>

      {/* Título */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 5 5 5 9c0 6.2 7 13 7 13s7-6.8 7-13c0-4-3-7-7-7z" fill="#3B82F6" />
              <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#fff" />
            </svg>
            Região de Itu, SP
          </h3>
          <p className="text-sm text-gray-600">Clique nos marcadores para mais detalhes</p>
        </div>
      </div>

      <MapContainer
        center={positions[0] || [-23.2589, -47.2999]}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        scrollWheelZoom={true}
        className="leaflet-container custom-map"
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds positions={positions} />

      </MapContainer>
    </div>
  );
};

export default InteractiveMap;