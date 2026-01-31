import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoredRegistration } from '@/types/registration';
import { getRegistrations, updatePaymentStatus, isAdminAuthenticated, adminLogout } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  LogOut,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  Download,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import ueccLogo from '@/assets/uecc-logo.jpeg';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<StoredRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<StoredRegistration | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérification auth
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Chargement des données
  const loadData = () => {
    const data = getRegistrations();
    setRegistrations(data.sort((a, b) => 
      new Date(b.dateInscription).getTime() - new Date(a.dateInscription).getTime()
    ));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrage
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        searchQuery === '' ||
        reg.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.prenoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.telephone.includes(searchQuery) ||
        reg.numeroDossier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || reg.statutPaiement === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchQuery, statusFilter]);

  // Stats
  const stats = useMemo(() => ({
    total: registrations.length,
    enAttente: registrations.filter((r) => r.statutPaiement === 'en_attente').length,
    paye: registrations.filter((r) => r.statutPaiement === 'paye').length,
    valide: registrations.filter((r) => r.statutPaiement === 'valide').length,
  }), [registrations]);

  const handleStatusChange = (id: string, newStatus: 'en_attente' | 'paye' | 'valide') => {
    const success = updatePaymentStatus(id, newStatus);
    if (success) {
      toast({
        title: 'Statut mis à jour',
        description: `Le dossier a été marqué comme "${newStatus.replace('_', ' ')}"`,
      });
      loadData();
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const handleExportExcel = () => {
    try {
      // Préparer les données pour l'export
      const dataToExport = filteredRegistrations.map((reg) => ({
        'N° Dossier': reg.numeroDossier,
        'Date d\'inscription': formatDate(reg.dateInscription),
        'Nom': reg.nom,
        'Prénoms': reg.prenoms,
        'Email': reg.email,
        'Téléphone': reg.telephone,
        'Cellule provenance': reg.celluleProvenance,
        'Université': reg.universite,
        'Filière': reg.filiere,
        'Année d\'étude': reg.anneeEtude,
        'Matricule': reg.matricule,
        'Profession': reg.profession || '',
        'Situation matrimoniale': reg.situationMatrimoniale,
        'Grade église': reg.gradeEglise,
        'Paroisse origine': reg.paroisseOrigine,
        'Charge paroisse origine': reg.chargeParoisseOrigine,
        'Paroisse accueil': reg.paroisseAccueil,
        'Charge paroisse accueil': reg.chargeParoisseAccueil,
        'Année découverte UECC': reg.anneeDecouverteUECC,
        'Cellule UECC': reg.celluleUECCMilite,
        'Responsable cellule époque': reg.responsableCelluleEpoque,
        'Poste occupé UECC': reg.posteOccupeUECC,
        'Responsable actuel cellule': reg.responsableActuelCellule,
        'Dernière activité UECC': reg.derniereActiviteUECC,
        'Année activité': reg.anneeActivite,
        'Superviseur': reg.superviseur,
        'Président comité': reg.presidentComite,
        'Est choriste': reg.estChoriste ? 'Oui' : 'Non',
        'Rôle choriste': reg.roleChoriste || '',
        'Maître de chœur': reg.maitreChoeur || '',
        'Connaissance chœur UECC': reg.connaissanceUECCChoir ? 'Oui' : 'Non',
        'Intéressé intégrer': reg.interesseIntegrer ? 'Oui' : 'Non',
        'Référence paiement': reg.referencePaiement || '',
        'Statut paiement': reg.statutPaiement === 'en_attente' ? 'En attente' :
                         reg.statutPaiement === 'paye' ? 'Payé' : 'Validé',
      }));

      // Créer le workbook
      const ws = XLSX.utils.json_to_sheet(dataToExport);

      // Définir les largeurs des colonnes
      const colWidths = [
        { wch: 15 }, // N° Dossier
        { wch: 20 }, // Date
        { wch: 20 }, // Nom
        { wch: 25 }, // Prénoms
        { wch: 30 }, // Email
        { wch: 15 }, // Téléphone
        { wch: 25 }, // Cellule provenance
        { wch: 30 }, // Université
        { wch: 25 }, // Filière
        { wch: 15 }, // Année étude
        { wch: 15 }, // Matricule
        { wch: 25 }, // Profession
        { wch: 25 }, // Situation matrimoniale
        { wch: 20 }, // Grade église
        { wch: 30 }, // Paroisse origine
        { wch: 30 }, // Charge paroisse origine
        { wch: 30 }, // Paroisse accueil
        { wch: 30 }, // Charge paroisse accueil
        { wch: 10 }, // Année découverte
        { wch: 25 }, // Cellule UECC
        { wch: 30 }, // Responsable cellule époque
        { wch: 25 }, // Poste occupé
        { wch: 30 }, // Responsable actuel
        { wch: 35 }, // Dernière activité
        { wch: 15 }, // Année activité
        { wch: 25 }, // Superviseur
        { wch: 25 }, // Président comité
        { wch: 12 }, // Est choriste
        { wch: 20 }, // Rôle choriste
        { wch: 25 }, // Maître de chœur
        { wch: 25 }, // Connaissance chœur
        { wch: 20 }, // Intéressé intégrer
        { wch: 20 }, // Référence paiement
        { wch: 15 }, // Statut paiement
      ];
      ws['!cols'] = colWidths;

      // Créer le workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Inscriptions UECC');

      // Générer le nom du fichier avec la date
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
      const filename = `inscriptions_uecc_${dateStr}.xlsx`;

      // Télécharger le fichier
      XLSX.writeFile(wb, filename);

      toast({
        title: 'Export réussi',
        description: `${filteredRegistrations.length} inscription(s) exportée(s) vers Excel`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      toast({
        title: 'Erreur d\'export',
        description: 'Une erreur est survenue lors de l\'export Excel',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paye':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Payé</Badge>;
      case 'valide':
        return <Badge className="bg-green-500 hover:bg-green-600">Validé</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={ueccLogo} alt="UECC" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-serif font-bold text-lg text-foreground">
                  Administration UECC
                </h1>
                <p className="text-xs text-muted-foreground">
                  Gestion des inscriptions
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-uecc flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total inscrits</p>
            </div>
          </div>

          <div className="card-uecc flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.enAttente}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>

          <div className="card-uecc flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.paye}</p>
              <p className="text-xs text-muted-foreground">Payés</p>
            </div>
          </div>

          <div className="card-uecc flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.valide}</p>
              <p className="text-xs text-muted-foreground">Validés</p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="card-uecc mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, téléphone ou n° dossier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="paye">Payé</SelectItem>
                <SelectItem value="valide">Validé</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="outline" onClick={handleExportExcel}>
              <Download className="w-4 h-4 mr-2" />
              Exporter Excel
            </Button>
          </div>
        </div>

        {/* Tableau */}
        <div className="card-uecc overflow-hidden p-0">
          {filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {registrations.length === 0
                  ? 'Aucune inscription pour le moment'
                  : 'Aucun résultat ne correspond à votre recherche'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Photo</TableHead>
                    <TableHead>Nom Prénom</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Université</TableHead>
                    <TableHead className="hidden lg:table-cell">Cellule</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell>
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="block w-10 h-10 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors"
                        >
                          {reg.photoUrl ? (
                            <img
                              src={reg.photoUrl}
                              alt={`${reg.prenoms} ${reg.nom}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-xs">
                              ?
                            </div>
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {reg.nom} {reg.prenoms}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {reg.numeroDossier}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{reg.email}</p>
                          <p className="text-muted-foreground">{reg.telephone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          <p className="truncate max-w-[150px]">{reg.universite}</p>
                          <p className="text-muted-foreground truncate max-w-[150px]">
                            {reg.filiere}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm">{reg.celluleUECCMilite}</span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={reg.statutPaiement}
                          onValueChange={(value: 'en_attente' | 'paye' | 'valide') =>
                            handleStatusChange(reg.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8">
                            {getStatusBadge(reg.statutPaiement)}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en_attente">En attente</SelectItem>
                            <SelectItem value="paye">Payé</SelectItem>
                            <SelectItem value="valide">Validé</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {formatDate(reg.dateInscription)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRegistration(reg)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Dialog détails */}
        <Dialog
          open={!!selectedRegistration}
          onOpenChange={() => setSelectedRegistration(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span className="font-serif">Détails de l'inscription</span>
                {selectedRegistration && getStatusBadge(selectedRegistration.statutPaiement)}
              </DialogTitle>
            </DialogHeader>

            {selectedRegistration && (
              <div className="space-y-6">
                {/* Photo */}
                <div className="flex justify-center">
                  {selectedRegistration.photoUrl ? (
                    <img
                      src={selectedRegistration.photoUrl}
                      alt="Photo du membre"
                      className="max-h-64 rounded-lg shadow-lg object-contain"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                      Pas de photo
                    </div>
                  )}
                </div>

                {/* Informations générales */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Informations générales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="N° Dossier" value={selectedRegistration.numeroDossier} />
                    <InfoItem label="Date d'inscription" value={formatDate(selectedRegistration.dateInscription)} />
                    <InfoItem label="Statut paiement" value={
                      selectedRegistration.statutPaiement === 'en_attente' ? 'En attente' :
                      selectedRegistration.statutPaiement === 'paye' ? 'Payé' : 'Validé'
                    } />
                  </div>
                </div>

                {/* Section 1: Identité */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Identité</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="Nom" value={selectedRegistration.nom} />
                    <InfoItem label="Prénoms" value={selectedRegistration.prenoms} />
                    <InfoItem label="Date de naissance" value={selectedRegistration.dateNaissance || '-'} />
                    <InfoItem label="Lieu de naissance" value={selectedRegistration.lieuNaissance || '-'} />
                    <InfoItem label="Ville de résidence" value={selectedRegistration.villeResidence || '-'} />
                    <InfoItem label="Email" value={selectedRegistration.email} />
                    <InfoItem label="Téléphone" value={selectedRegistration.telephone} />
                    <InfoItem label="Cellule de provenance" value={selectedRegistration.celluleProvenance} />
                  </div>
                </div>

                {/* Section 2: Parcours universitaire */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Parcours universitaire</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="Centre/Institut/Université" value={selectedRegistration.universite} />
                    <InfoItem label="Filière d'étude" value={selectedRegistration.filiere} />
                    <InfoItem label="Année actuelle" value={selectedRegistration.anneeEtude} />
                    <InfoItem label="N° Matricule" value={selectedRegistration.matricule || '-'} />
                    <InfoItem label="Profession" value={selectedRegistration.profession || '-'} />
                  </div>
                </div>

                {/* Section 3: Engagement paroissial */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Engagement paroissial</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="Statut matrimonial" value={selectedRegistration.situationMatrimoniale} />
                    <InfoItem label="Grade dans l'Église" value={selectedRegistration.gradeEglise} />
                    <InfoItem label="Paroisse d'origine" value={selectedRegistration.paroisseOrigine} />
                    <InfoItem label="Ville paroisse origine" value={selectedRegistration.paroisseOrigineVille || '-'} />
                    <InfoItem label="Pays paroisse origine" value={selectedRegistration.paroisseOriginePays || '-'} />
                    <InfoItem label="Chargé paroisse origine" value={selectedRegistration.chargeParoisseOrigine} />
                    <InfoItem label="Paroisse d'accueil" value={selectedRegistration.paroisseAccueil} />
                    <InfoItem label="Ville paroisse accueil" value={selectedRegistration.paroisseAccueilVille || '-'} />
                    <InfoItem label="Pays paroisse accueil" value={selectedRegistration.paroisseAccueilPays || '-'} />
                    <InfoItem label="Chargé paroisse accueil" value={selectedRegistration.chargeParoisseAccueil} />
                    <InfoItem label="Année découverte UECC" value={selectedRegistration.anneeDecouverteUECC} />
                    <InfoItem label="Cellule UECC actuelle" value={selectedRegistration.celluleUECCMilite} />
                    <InfoItem label="Responsable cellule (à l'époque)" value={selectedRegistration.responsableCelluleEpoque} />
                    <InfoItem label="Poste occupé UECC" value={selectedRegistration.posteOccupeUECC} />
                    <InfoItem label="Responsable actuel cellule" value={selectedRegistration.responsableActuelCellule} />
                  </div>
                </div>

                {/* Section 4: Activités & Chorale */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Activités & Chorale</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="Dernière activité UECC" value={selectedRegistration.derniereActiviteUECC} />
                    <InfoItem label="Année de l'activité" value={selectedRegistration.anneeActivite} />
                    <InfoItem label="Superviseur direct" value={selectedRegistration.superviseur} />
                    <InfoItem label="Président du comité" value={selectedRegistration.presidentComite} />
                    <InfoItem label="Est choriste" value={selectedRegistration.estChoriste ? 'Oui' : 'Non'} />
                    {selectedRegistration.estChoriste && (
                      <>
                        <InfoItem label="Rôle/Pupitre" value={selectedRegistration.roleChoriste || '-'} />
                        <InfoItem label="Maître de chœur" value={selectedRegistration.maitreChoeur || '-'} />
                        <InfoItem label="Connaît UECC-CHOIR" value={selectedRegistration.connaissanceUECCChoir ? 'Oui' : 'Non'} />
                        <InfoItem label="Intéressé à intégrer" value={selectedRegistration.interesseIntegrer ? 'Oui' : 'Non'} />
                      </>
                    )}
                  </div>
                </div>

                {/* Section 5: Paiement */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Paiement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem label="Référence de paiement" value={selectedRegistration.referencePaiement || '-'} />
                    <InfoItem label="Certification exactitude" value={selectedRegistration.certificationExactitude ? 'Oui' : 'Non'} />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

// Composant helper pour afficher les infos
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground text-xs">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

export default AdminDashboard;
