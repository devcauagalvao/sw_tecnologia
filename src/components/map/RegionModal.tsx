import React from 'react';
import { motion } from 'framer-motion';
import {
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import Modal from '../ui/Modal';
import { Condominium } from '../../types';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  condominium: Condominium | null;
}

const RegionModal: React.FC<RegionModalProps> = ({ isOpen, onClose, condominium }) => {
  if (!condominium) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'offline': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'offline': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'warning': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNoticeColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getEquipmentTypeLabel = (type: string) => {
    const types = {
      'router': 'Roteador',
      'olt': 'OLT',
      'ont': 'ONT',
      'switch': 'Switch',
      'splitter': 'Splitter'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={condominium.name} size="lg">
      <div className="space-y-6">
        {/* Header with coverage info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{condominium.name}</h3>
              <p className="text-gray-600 mb-4">{condominium.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <WifiIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{condominium.coverage}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  condominium.status === 'active' ? 'bg-green-100 text-green-800' :
                  condominium.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {condominium.status === 'active' ? 'Ativo' :
                   condominium.status === 'maintenance' ? 'Em Manutenção' : 'Planejado'}
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Lat: {condominium.location.lat}</p>
              <p>Lng: {condominium.location.lng}</p>
            </div>
          </div>
        </motion.div>

        {/* Equipments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CpuChipIcon className="w-5 h-5 mr-2 text-blue-600" />
            Equipamentos ({condominium.equipments.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {condominium.equipments.map((equipment, index) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(equipment.status)}
                    <h5 className="font-semibold text-gray-900">
                      {getEquipmentTypeLabel(equipment.type)}
                    </h5>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                    {equipment.status === 'operational' ? 'Operacional' :
                     equipment.status === 'maintenance' ? 'Manutenção' : 'Offline'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Modelo:</strong> {equipment.model}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Instalado em: {new Date(equipment.installDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notices Section */}
        {condominium.notices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
              Avisos e Notificações ({condominium.notices.length})
            </h4>
            <div className="space-y-3">
              {condominium.notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`border rounded-lg p-4 ${getNoticeColor(notice.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getNoticeIcon(notice.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{notice.title}</h5>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            notice.priority === 'high' ? 'bg-red-100 text-red-800' :
                            notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {notice.priority === 'high' ? 'Alta' :
                             notice.priority === 'medium' ? 'Média' : 'Baixa'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{notice.description}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {new Date(notice.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end space-x-3 pt-4 border-t border-gray-200"
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Fechar
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Solicitar Suporte
          </button>
        </motion.div>
      </div>
    </Modal>
  );
};

export default RegionModal;