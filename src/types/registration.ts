// Types pour l'inscription UECC

export interface RegistrationData {
  // Étape 1: Identité
  email: string;
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  villeResidence: string;
  telephone: string;
  celluleProvenance: string;

  // Étape 2: Parcours universitaire
  universite: string;
  filiere: string;
  anneeEtude: string;
  matricule?: string;
  profession?: string;

  // Étape 3: Engagement paroissial
  situationMatrimoniale: string;
  gradeEglise: string;
  paroisseOrigine: string;
  chargeParoisseOrigine: string;
  paroisseAccueil: string;
  chargeParoisseAccueil: string;
  anneeDecouverteUECC: string;
  celluleUECCMilite: string;
  responsableCelluleEpoque: string;
  posteOccupeUECC: string;
  responsableActuelCellule: string;

  // Étape 4: Activités & Chorale
  derniereActiviteUECC: string;
  anneeActivite: string;
  superviseur: string;
  presidentComite: string;
  paroisseOrigineVille: string;
  paroisseOriginePays: string;
  paroisseAccueilVille: string;
  paroisseAccueilPays: string;
  estChoriste: boolean;
  roleChoriste?: string;
  maitreChoeur?: string;
  connaissanceUECCChoir?: boolean;
  interesseIntegrer?: boolean;

  // Étape 5: Photo & Paiement
  photoUrl: string;
  referencePaiement?: string;
  certificationExactitude: boolean;

  // Métadonnées
  id?: string;
  numeroDossier?: string;
  dateInscription?: string;
  statutPaiement?: 'en_attente' | 'paye' | 'valide';
}

export interface StoredRegistration extends RegistrationData {
  id: string;
  numeroDossier: string;
  dateInscription: string;
  statutPaiement: 'en_attente' | 'paye' | 'valide';
}

export const ANNEES_ETUDE = [
  '1ère année',
  '2ème année',
  'Licence 3',
  'Master 1',
  'Master 2',
  'Doctorat',
  'Déjà en activité',
  'Autre',
];

export const SITUATIONS_MATRIMONIALES = [
  'Célibataire',
  'Marié(e)',
  'Fiancé(e)',
  'Union libre',
  'En concubinage',
  'Divorcé(e)',
  'Veuf(ve)',
];

export const GRADES_EGLISE = [
  'Fidèle',
  'Choriste',
  'Évangéliste',
  'Diacre',
  'Ancien',
  'Pasteur',
  'Prophète',
  'Autre',
];

export const CELLULES = [
  'Abomey-calavi (UAC)',
  'Parakou (UP)',
  'Lokossa',
  'CU Porto-Novo',
  'Abomey',
  'Dassa',
  'ENEAM',
  'FSS',
  'Natitingou',
  'UNA Porto-Novo',
  'Ketou',
  'Sakété',
  'Autres',
];
