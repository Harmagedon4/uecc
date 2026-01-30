// Service de stockage localStorage pour le prototype UECC

import { StoredRegistration, RegistrationData } from '@/types/registration';

const STORAGE_KEY = 'uecc_registrations';
const ADMIN_KEY = 'uecc_admin_session';

// Génère un ID unique
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Génère un numéro de dossier lisible
const generateNumeroDossier = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `UECC-${year}-${random}`;
};

// Récupère toutes les inscriptions
export const getRegistrations = (): StoredRegistration[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Vérifie si un email existe déjà
export const emailExists = (email: string): boolean => {
  const registrations = getRegistrations();
  return registrations.some(r => r.email.toLowerCase() === email.toLowerCase());
};

// Ajoute une nouvelle inscription
export const addRegistration = (data: RegistrationData): StoredRegistration => {
  const registrations = getRegistrations();
  
  const newRegistration: StoredRegistration = {
    ...data,
    id: generateId(),
    numeroDossier: generateNumeroDossier(),
    dateInscription: new Date().toISOString(),
    statutPaiement: 'en_attente',
  };

  registrations.push(newRegistration);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  
  return newRegistration;
};

// Met à jour le statut de paiement
export const updatePaymentStatus = (
  id: string, 
  status: 'en_attente' | 'paye' | 'valide'
): boolean => {
  const registrations = getRegistrations();
  const index = registrations.findIndex(r => r.id === id);
  
  if (index === -1) return false;
  
  registrations[index].statutPaiement = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  
  return true;
};

// Supprime une inscription
export const deleteRegistration = (id: string): boolean => {
  const registrations = getRegistrations();
  const filtered = registrations.filter(r => r.id !== id);
  
  if (filtered.length === registrations.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Auth admin (POC simple)
const ADMIN_CREDENTIALS = {
  email: 'admin@uecc.bj',
  password: 'UECCadmin2025!',
};

export const adminLogin = (email: string, password: string): boolean => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(ADMIN_KEY, 'authenticated');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === 'authenticated';
};
