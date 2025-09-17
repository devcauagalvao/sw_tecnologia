import { Condominium } from '../types';

export const mockCondominiums: Condominium[] = [
  {
    id: '1',
    name: 'Vilas do Golf',
    location: { lat: -23.2647, lng: -47.2996 },
    description: 'Condomínio residencial de alto padrão com infraestrutura completa de fibra óptica.',
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      {
        id: 'e1',
        type: 'olt',
        model: 'Huawei MA5608T',
        status: 'operational',
        installDate: '2023-01-15'
      },
      {
        id: 'e2',
        type: 'ont',
        model: 'Huawei HG8310M',
        status: 'operational',
        installDate: '2023-01-20'
      },
      {
        id: 'e3',
        type: 'router',
        model: 'TP-Link Archer AX73',
        status: 'operational',
        installDate: '2023-01-25'
      }
    ],
    notices: [
      {
        id: 'n1',
        title: 'Manutenção Programada',
        description: 'Manutenção preventiva nos equipamentos principais agendada para este domingo.',
        type: 'info',
        date: '2024-01-20',
        priority: 'medium'
      },
      {
        id: 'n2',
        title: 'Nova Velocidade Disponível',
        description: 'Pacotes de 1GB já disponíveis para todos os moradores.',
        type: 'success',
        date: '2024-01-18',
        priority: 'low'
      }
    ]
  },
  {
    id: '2',
    name: 'Residencial Jardim Europa',
    location: { lat: -23.2580, lng: -47.3120 },
    description: 'Moderno residencial com tecnologia de ponta em conectividade.',
    coverage: '100% Fibra Óptica',
    status: 'active',
    equipments: [
      {
        id: 'e4',
        type: 'olt',
        model: 'ZTE C300',
        status: 'operational',
        installDate: '2023-02-10'
      },
      {
        id: 'e5',
        type: 'splitter',
        model: 'Furukawa 1x32',
        status: 'operational',
        installDate: '2023-02-15'
      }
    ],
    notices: [
      {
        id: 'n3',
        title: 'Upgrade Concluído',
        description: 'Atualização dos equipamentos finalizada com sucesso.',
        type: 'success',
        date: '2024-01-19',
        priority: 'low'
      }
    ]
  },
  {
    id: '3',
    name: 'Condomínio Portal de Itu',
    location: { lat: -23.2720, lng: -47.2850 },
    description: 'Residencial familiar com excelente infraestrutura de internet.',
    coverage: '95% Fibra Óptica',
    status: 'maintenance',
    equipments: [
      {
        id: 'e6',
        type: 'olt',
        model: 'Intelbras OLT 1240G',
        status: 'maintenance',
        installDate: '2023-03-05'
      }
    ],
    notices: [
      {
        id: 'n4',
        title: 'Manutenção em Andamento',
        description: 'Equipe técnica trabalhando na resolução de instabilidades.',
        type: 'warning',
        date: '2024-01-21',
        priority: 'high'
      }
    ]
  }
];