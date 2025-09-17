import { Condominium } from '../types';

export const mockCondominiums: Condominium[] = [
  {
    id: 'vila-dos-manacas',
    name: 'Vila dos Manacás',
    vlan: 192,
    location: { lat: -23.2571, lng: -47.28304 },
    description: 'Condomínio residencial tranquilo com infraestrutura moderna.',
    coverage: '100% Fibra Óptica',
    status: 'active', // Pode ser 'active', 'maintenance', 'planned', etc.
    equipments: [
      { id: 'e1', type: 'OLT', model: 'Huawei MA5608T', status: 'operational', installDate: '2023-01-15' },
      { id: 'e2', type: 'ONT', model: 'Huawei HG8310M', status: 'operational', installDate: '2023-01-20' },
      { id: 'e3', type: 'Router', model: 'TP-Link Archer AX73', status: 'operational', installDate: '2023-01-25' }
    ],
    notices: [
      {
        id: 'n1',
        title: 'Manutenção Programada',
        description: 'Manutenção preventiva nos equipamentos principais agendada para este domingo.',
        type: 'info', // info, success, warning, error
        date: '2024-01-20',
        priority: 'medium' // low, medium, high
      },
      {
        id: 'n2',
        title: 'Nova Velocidade Disponível',
        description: 'Pacotes de 1GB já disponíveis para todos os moradores.',
        type: 'success',
        date: '2024-01-18',
        priority: 'low'
      }
    ],
    // Pode definir o polígono se quiser mostrar no mapa, ou manter vazio
    polygon: [
      [-23.2568, -47.2833],
      [-23.2568, -47.2827],
      [-23.2574, -47.2827],
      [-23.2574, -47.2833]
    ]
  }
];
