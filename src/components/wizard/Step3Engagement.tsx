import { UseFormReturn } from 'react-hook-form';
import { RegistrationData, SITUATIONS_MATRIMONIALES, GRADES_EGLISE } from '@/types/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Church, MapPin, Calendar, Star, UserCheck, ShieldCheck } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StepProps {
  form: UseFormReturn<RegistrationData>;
}

const Step3Engagement = ({ form }: StepProps) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const situationMatrimoniale = watch('situationMatrimoniale');
  const gradeEglise = watch('gradeEglise');

  const inputContainerClass = "relative flex flex-col gap-1.5 transition-all duration-300 group";
  const iconClassLarge = "absolute left-3 top-[38px] w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10";
  const iconClassSmall = "absolute left-3 top-[30px] w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10";

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* --- SECTION 1: STATUT --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-slate-800 tracking-tight">Statut & Rang</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Statut matrimoniale *</Label>
            <Heart className={iconClassLarge} />
            <Select value={situationMatrimoniale} onValueChange={(v) => setValue('situationMatrimoniale', v)}>
              <SelectTrigger className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {SITUATIONS_MATRIMONIALES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.situationMatrimoniale && <p className="text-destructive text-xs ml-1">{errors.situationMatrimoniale.message}</p>}
          </div>

          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Grade dans l'Église *</Label>
            <Star className={iconClassSmall} />
            <Input {...register('gradeEglise')} placeholder="Votre grade" className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
            {errors.gradeEglise && <p className="text-destructive text-xs ml-1">{errors.gradeEglise.message}</p>}
          </div>
        </div>
      </div>

      {/* --- SECTION 2: PAROISSES --- */}
      <div className="space-y-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Church className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-slate-800 tracking-tight">Ancrage Paroissial</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Origine */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest px-1">Origine</p>
            <div className={inputContainerClass}>
              <Label className="text-xs font-semibold ml-1">Paroisse *</Label>
              <MapPin className={iconClassSmall} />
              <Input {...register('paroisseOrigine')} placeholder="Nom de la paroisse" className="pl-10 h-11 rounded-xl bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={inputContainerClass}>
                <Label className="text-xs font-semibold ml-1">Ville *</Label>
                <MapPin className={iconClassSmall} />
                <Input {...register('paroisseOrigineVille')} placeholder="Ville" className="pl-10 h-11 rounded-xl bg-white" />
              </div>
              <div className={inputContainerClass}>
                <Label className="text-xs font-semibold ml-1">Pays *</Label>
                <MapPin className={iconClassSmall} />
                <Input {...register('paroisseOriginePays')} placeholder="Pays" className="pl-10 h-11 rounded-xl bg-white" />
              </div>
            </div>
            <div className={inputContainerClass}>
              <Label className="text-xs font-semibold ml-1">Chargé *</Label>
              <UserCheck className={iconClassSmall} />
              <Input {...register('chargeParoisseOrigine')} placeholder="Nom complet" className="pl-10 h-11 rounded-xl bg-white" />
            </div>
          </div>

          {/* Accueil */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-black text-primary/60 tracking-widest px-1">Accueil (Université)</p>
            <div className={inputContainerClass}>
              <Label className="text-xs font-semibold ml-1">Paroisse *</Label>
              <MapPin className={iconClassSmall} />
              <Input {...register('paroisseAccueil')} placeholder="Paroisse actuelle" className="pl-10 h-11 rounded-xl bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={inputContainerClass}>
                <Label className="text-xs font-semibold ml-1">Ville *</Label>
                <MapPin className={iconClassSmall} />
                <Input {...register('paroisseAccueilVille')} placeholder="Ville" className="pl-10 h-11 rounded-xl bg-white" />
              </div>
              <div className={inputContainerClass}>
                <Label className="text-xs font-semibold ml-1">Pays *</Label>
                <MapPin className={iconClassSmall} />
                <Input {...register('paroisseAccueilPays')} placeholder="Pays" className="pl-10 h-11 rounded-xl bg-white" />
              </div>
            </div>
            <div className={inputContainerClass}>
              <Label className="text-xs font-semibold ml-1">Chargé *</Label>
              <UserCheck className={iconClassSmall} />
              <Input {...register('chargeParoisseAccueil')} placeholder="Nom complet" className="pl-10 h-11 rounded-xl bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: PARCOURS UECC --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-slate-800 tracking-tight">Parcours UECC</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Année découverte *</Label>
            <Calendar className={iconClassSmall} />
            <Input {...register('anneeDecouverteUECC')} placeholder="Ex: 2021" className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
          </div>

          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Cellule actuelle *</Label>
            <MapPin className={iconClassSmall} />
            <Input {...register('celluleUECCMilite')} placeholder="Cellule de militantisme" className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
          </div>

          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Responsable (à l'époque) *</Label>
            <UserCheck className={iconClassSmall} />
            <Input {...register('responsableCelluleEpoque')} placeholder="Nom du responsable" className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
          </div>

          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Poste occupé *</Label>
            <Star className={iconClassSmall} />
            <Input {...register('posteOccupeUECC')} placeholder="Ex: Membre simple, SG..." className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
          </div>
        </div>

        <div className={inputContainerClass}>
          <Label className="text-sm font-medium ml-1">Responsable actuel de la cellule *</Label>
          <UserCheck className={iconClassSmall} />
          <Input {...register('responsableActuelCellule')} placeholder="Nom du responsable actuel" className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default Step3Engagement;