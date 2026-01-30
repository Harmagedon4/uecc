import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adminLogin } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Lock, Loader2, Eye, EyeOff, ShieldCheck, Mail } from 'lucide-react';
import ueccLogo from '@/assets/uecc-logo.jpeg';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

type LoginForm = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Un peu plus long pour l'effet "sécurité"

    const success = adminLogin(data.email, data.password);

    if (success) {
      toast({
        title: 'Accès autorisé',
        description: 'Initialisation du tableau de bord...',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Erreur d\'authentification',
        description: 'Les identifiants ne correspondent à aucun compte administrateur.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[slate-50] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Motifs décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        
        {/* Bouton Retour Stylisé */}
        <Link
          to="/"
          className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-all mb-10"
        >
          <div className="p-2 rounded-full group-hover:bg-primary/5 transition-colors mr-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
          Retour à l'accueil
        </Link>

        {/* Panneau de Connexion */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          <div className="p-8 md:p-12">
            {/* Header Login */}
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <img
                  src={ueccLogo}
                  alt="Logo UECC"
                  className="w-16 h-16 object-contain rounded-2xl shadow-sm relative z-10 bg-white p-1"
                />
                <div className="absolute -inset-2 bg-primary/10 rounded-3xl blur-md" />
              </div>
              
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Administration
              </h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Veuillez vous authentifier pour accéder au portail
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Champ Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Identifiant Professionnel
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@uecc.bj"
                    className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-[11px] font-bold ml-1 animate-in slide-in-from-top-1">{errors.email.message}</p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Clé de Sécurité
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="h-14 pl-12 pr-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-[11px] font-bold ml-1 animate-in slide-in-from-top-1">{errors.password.message}</p>
                )}
              </div>

              {/* Bouton Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-slate-900 hover:bg-primary text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-primary/20 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Authentification...
                  </>
                ) : (
                  'Accéder au Dashboard'
                )}
              </Button>
            </form>
          </div>

          {/* Footer Card - POC Hint */}
          <div className="bg-slate-50/80 p-6 border-t border-slate-100">
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl border border-slate-200">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary font-bold text-[10px]">POC</div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Utilisez <span className="font-bold text-slate-700">admin@uecc.bj</span> et <span className="font-bold text-slate-700">UECCadmin2025!</span> pour tester les fonctionnalités de gestion.
              </p>
            </div>
          </div>
        </div>

        {/* Footer externe */}
        <p className="text-center text-slate-400 text-xs mt-8">
          © 2026 UECC Administration — Système d'Inscription Centralisé
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;