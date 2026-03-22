import { Ban, Lock, AlertTriangle } from 'lucide-react';
import ueccLogo from '@/assets/uecc-logo.jpeg';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Motif d'arrière-plan agressif */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#dc2626_0,#dc2626_20px,transparent_20px,transparent_40px)]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Identification du Site */}
        <div className="flex flex-col items-center gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl" />
            <img src={ueccLogo} alt="Logo UECC" className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full border-4 border-red-900/50 bg-white p-2 relative z-10 shadow-2xl" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-300 tracking-wide uppercase drop-shadow-md">
            Union des Étudiants Chrétiens Célestes
          </h2>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-600 blur-[60px] opacity-40 animate-pulse" />
          <Ban className="w-32 h-32 text-red-600 relative z-10" />
        </div>

        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          BLOQUÉ
        </h1>

        <div className="bg-red-950/80 border-2 border-red-600 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-red-900/50 backdrop-blur-xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center gap-3 mb-6 text-red-500">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-xl font-bold uppercase tracking-widest">Avis de suspension de service</span>
            <AlertTriangle className="w-8 h-8" />
          </div>

          <p className="text-2xl md:text-4xl font-bold text-white mb-8 leading-tight">
            L'accès à cette plateforme a été suspendu par le développeur.
          </p>
          
          <div className="bg-black/40 rounded-xl p-6 border border-red-500/30">
            <p className="text-lg md:text-xl text-red-200 font-medium leading-relaxed">
              Pour rétablir l'accès, le propriétaire exige le paiement immédiat du <span className="text-white font-black bg-red-600 px-2 py-0.5 rounded">RESTANT DÛ</span> ainsi que les <span className="text-white font-black bg-red-600 px-2 py-0.5 rounded">INDEMNITÉS DE RETARD</span>.
            </p>
          </div>

          <p className="mt-8 text-sm font-mono text-red-400/80 uppercase tracking-widest">
            Contactez le prestataire technique pour régularisation.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-2 text-red-700/50 font-black text-xs uppercase tracking-[1em]">
          <Lock className="w-4 h-4" />
          System Locked
          <Lock className="w-4 h-4" />
        </div>

      </div>
    </div>
  );
};

export default Index;


// import { Link } from 'react-router-dom';
// import { ArrowRight, Users, Shield, CheckCircle2, CreditCard, IdCard } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import ueccLogo from '@/assets/uecc-logo.jpeg';

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 flex flex-col">
//       {/* Background Decor */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
//         <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
//       </div>

//       {/* Hero Section */}
//       <main className="flex-grow container mx-auto px-4 pt-16 pb-24">
//         <div className="max-w-5xl mx-auto text-center">
          
//           {/* Badge & Logo */}
//           <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
//             <div className="relative inline-block group">
//               <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
//               <img
//                 src={ueccLogo}
//                 alt="Logo UECC"
//                 className="relative w-40 h-40 md:w-52 md:h-52 object-contain mx-auto transition-transform duration-500 hover:scale-105"
//               />
//             </div>
            
//             <div className="mt-8 space-y-4">
//               <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
//                 <span className="text-primary block mb-2">Union des Étudiants</span>
//                 <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
//                   Chrétiens Célestes
//                 </span>
//               </h1>
              
//               <div className="flex flex-col items-center gap-3">
//                 <p className="text-xl text-muted-foreground font-medium max-w-xl">
//                   Portail officiel d'identification et de recensement des membres de la communauté estudiantine.
//                 </p>
//                 <div className="h-1 w-20 bg-primary/30 rounded-full" />
//                 <p className="text-sm font-serif italic text-primary/80 tracking-wide uppercase">
//                   « Unis dans la foi, ensemble pour l'excellence »
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Action Center */}
//           <div className="mt-12 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000 delay-300">
//             <Link to="/inscription" className="w-full max-w-xs">
//               <Button 
//                 size="lg" 
//                 className="w-full py-8 text-xl font-semibold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95 group overflow-hidden relative"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
//                 <Users className="mr-3 w-6 h-6" />
//                 S'inscrire
//                 <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
//               </Button>
//             </Link>
            
//             <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
//               <span className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-green-500" /> 5 étapes
//               </span>
//               <span className="w-1 h-1 bg-slate-300 rounded-full" />
//               <span className="flex items-center gap-1.5">
//                 <CreditCard className="w-4 h-4 text-blue-500" /> 1 500 FCFA
//               </span>
//             </div>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
//             <FeatureCard 
//               icon={<CheckCircle2 className="w-6 h-6 text-primary" />}
//               title="Inscription Simple"
//               desc="Processus fluide et guidé conçu pour une expérience utilisateur sans friction."
//             />
//             <FeatureCard 
//               icon={<CreditCard className="w-6 h-6 text-primary" />}
//               title="Paiement Mobile"
//               desc="Réglez vos frais en toute sécurité via MTN Mobile Money ou Moov Money."
//             />
//             <FeatureCard 
//               icon={<IdCard className="w-6 h-6 text-primary" />}
//               title="Badge Digital"
//               desc="Accédez à votre carte de membre officielle dès la validation de votre dossier."
//             />
//           </div>
//         </div>
//       </main>

//       {/* Modern Footer */}
//       <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md py-10">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="text-center md:text-left">
//               <p className="font-semibold text-slate-900">UECC Bénin</p>
//               <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} — Excellence Académique et Spirituelle</p>
//             </div>
            
//             <Link
//               to="/admin-login"
//               className="group flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-slate-600 hover:text-primary"
//             >
//               <Shield className="w-4 h-4 transition-transform group-hover:rotate-12" />
//               Espace Administration
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Sub-component for clean code
// const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
//   <div className="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//     <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-300">
//       {icon}
//     </div>
//     <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
//     <p className="text-slate-500 leading-relaxed text-sm">
//       {desc}
//     </p>
//   </div>
// );

// export default Index;