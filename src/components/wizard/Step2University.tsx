import { UseFormReturn } from 'react-hook-form';
import { RegistrationData, ANNEES_ETUDE } from '@/types/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, School, BookOpen, Fingerprint, Briefcase } from 'lucide-react';
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

const Step2University = ({ form }: StepProps) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const anneeEtude = watch('anneeEtude');

  const inputContainerClass = "relative flex flex-col gap-1.5 transition-all duration-300 group";
  const iconClass = "absolute left-3 top-[38px] w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header de section */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Cursus Académique
        </p>
      </div>

      <div className="grid gap-6">
        {/* Université / Établissement */}
        <div className={inputContainerClass}>
          <Label htmlFor="universite" className="text-sm font-medium ml-1 text-slate-700">
            Centre / Institut / Université *
          </Label>
          <School className={iconClass} />
          <Input
            id="universite"
            placeholder="Ex: Université d'Abomey-Calavi (UAC)..."
            className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
            {...register('universite')}
          />
          {errors.universite && (
            <p className="text-destructive text-xs font-medium ml-1">{errors.universite.message}</p>
          )}
        </div>

        {/* Filière */}
        <div className={inputContainerClass}>
          <Label htmlFor="filiere" className="text-sm font-medium ml-1 text-slate-700">
            Filière d'étude *
          </Label>
          <BookOpen className={iconClass} />
          <Input
            id="filiere"
            placeholder="Ex: Génie Logiciel, Sciences Économiques..."
            className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
            {...register('filiere')}
          />
          {errors.filiere && (
            <p className="text-destructive text-xs font-medium ml-1">{errors.filiere.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Année d'étude (Select) */}
          <div className={inputContainerClass}>
            <Label htmlFor="anneeEtude" className="text-sm font-medium ml-1 text-slate-700">
              Année actuelle *
            </Label>
            <GraduationCap className={iconClass} />
            <Select
              value={anneeEtude}
              onValueChange={(value) => setValue('anneeEtude', value)}
            >
              <SelectTrigger className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30">
                <SelectValue placeholder="Choisir l'année" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                {ANNEES_ETUDE.map((annee) => (
                  <SelectItem key={annee} value={annee} className="rounded-lg focus:bg-primary/10">
                    {annee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.anneeEtude && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.anneeEtude.message}</p>
            )}
          </div>

          {/* Matricule */}
          <div className={inputContainerClass}>
            <Label htmlFor="matricule" className="text-sm font-medium ml-1 text-slate-700">
              N° Matricule *
            </Label>
            <Fingerprint className={iconClass} />
            <Input
              id="matricule"
              placeholder="Votre matricule officiel"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('matricule')}
            />
            {errors.matricule && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.matricule.message}</p>
            )}
          </div>
        </div>

        {/* Profession (Optionnel) */}
        <div className={inputContainerClass}>
          <Label htmlFor="profession" className="text-sm font-medium ml-1 text-slate-700">
            Profession <span className="text-slate-400 font-normal">(facultatif)</span>
          </Label>
          <Briefcase className={iconClass} />
          <Input
            id="profession"
            placeholder="Si vous travaillez parallèlement à vos études"
            className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
            {...register('profession')}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2University;