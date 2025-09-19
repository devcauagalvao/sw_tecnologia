export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Condominium {
  id: string;
  name: string;
  vlan: number;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  equipments: Equipment[];
  polygon: [number, number][];
  notices: Notice[];
  coverage: string;
  status: 'active' | 'maintenance' | 'planned';
}

export interface Equipment {
  id: string;
  type: 'router' | 'olt' | 'ont' | 'switch' | 'splitter';
  model: string;
  status: 'operational' | 'maintenance' | 'offline';
  installDate: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'error' | 'success';
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}