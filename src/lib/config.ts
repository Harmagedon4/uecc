// Configuration de l'application UECC
export const config = {
  // URL de base de l'API backend
  API_BASE_URL: 'https://uecc-backend.vercel.app/',

  // Endpoints API
  endpoints: {
    registrations: '/registrations',
  },
} as const;

// Fonction utilitaire pour construire les URLs complètes
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};
