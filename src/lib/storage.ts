// Service API pour UECC

import { StoredRegistration, RegistrationData } from '@/types/registration';
import { getApiUrl } from './config';

const ADMIN_KEY = 'uecc_admin_session';

// Récupère toutes les inscriptions depuis l'API
export const getRegistrations = async (): Promise<StoredRegistration[]> => {
  const response = await fetch(getApiUrl('/registrations'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.registrations || [];
};



// Met à jour le statut de paiement via API
export const updatePaymentStatus = async (
  id: string,
  status: 'en_attente' | 'paye' | 'valide'
): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl(`/registrations/${id}/paiement`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ statutPaiement: status }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    return false;
  }
};

// Met à jour une inscription complète via API
export const updateRegistration = async (
  id: string,
  updates: Partial<StoredRegistration>
): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl(`/registrations/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'inscription:', error);
    return false;
  }
};

// --- GESTION DU STATUT DU SITE ---

export const getSiteStatus = async (): Promise<boolean> => {
  try {
    // On suppose un endpoint /settings/status
    const response = await fetch(getApiUrl('/settings/status'));
    if (!response.ok) return true; // Par défaut actif si l'endpoint n'existe pas encore
    const data = await response.json();
    return data.isActive !== false;
  } catch (error) {
    console.error('Erreur récupération statut site:', error);
    return true; // Fallback: site actif en cas d'erreur
  }
};

export const updateSiteStatus = async (isActive: boolean): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl('/settings/status'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive }),
    });
    return response.ok;
  } catch (error) {
    console.error('Erreur mise à jour statut site:', error);
    return false;
  }
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
