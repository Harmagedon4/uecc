import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, Copy, Home, Mail, Sparkles, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ueccLogo from '@/assets/uecc-logo.jpeg';

interface ConfirmationState {
  numeroDossier: string;
  nom: string;
  prenoms: string;
}

const Confirmation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as ConfirmationState | null;

  if (!state?.numeroDossier) {
    return <Navigate to="/" replace />;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.numeroDossier);
    toast({
      title: 'Copié !',
      description: 'Numéro de dossier prêt à être partagé.',
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Header de Célébration */}
        <div className="text-center mb-10 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-white rounded-full p-4 shadow-xl border border-green-100">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 text-yellow-500 animate-bounce" />
          </div>

          <img src={ueccLogo} alt="UECC" className="w-12 h-12 object-contain mx-auto mb-4 grayscale opacity-50" />
          
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Félicitations !
          </h1>
          <p className="text-lg text-slate-500">
            Ravi de vous compter parmi nous, <span className="text-primary font-bold">{state.prenoms}</span>.
          </p>
        </div>

        {/* Carte de Dossier "Style Certificat" */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-primary/5 mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Identifiant Unique</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-mono font-black text-slate-800 tracking-tighter">
                    {state.numeroDossier}
                  </span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-primary"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="h-px md:h-12 w-24 md:w-px bg-slate-100" />

              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Traitement en cours</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic text-center md:text-right">
                  Validation administrative sous 48h
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-dashed border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Email de suivi</h4>
                  <p className="text-xs text-slate-500 mt-1">Un récapitulatif a été envoyé à votre adresse.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Paiement Sécurisé</h4>
                  <p className="text-xs text-slate-500 mt-1">Transaction vérifiée par KkiaPay.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Secondaires */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 hover:bg-slate-50 font-bold group">
                <Home className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Retour Accueil
              </Button>
            </Link>
            <Link to="/inscription" className="flex-1">
              <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold group">
                Nouvelle Inscription
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          
        </div>

      </div>
    </div>
  );
};

export default Confirmation;