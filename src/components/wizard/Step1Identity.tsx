import { UseFormReturn } from 'react-hook-form';
import { RegistrationData, CELLULES } from '@/types/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, User, Phone, MapPin, Calendar, Home } from 'lucide-react';
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

const Step1Identity = ({ form }: StepProps) => {
  const { register, formState: { errors } } = form;

  // Classe utilitaire pour les inputs répétitifs
  const inputContainerClass = "relative flex flex-col gap-1.5 transition-all duration-300 group";
  const iconClass = "absolute left-3 top-[38px] w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sous-titre discret si nécessaire, le titre principal étant déjà géré par le Wizard */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Informations personnelles
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email - Full Width */}
        <div className={inputContainerClass}>
          <Label htmlFor="email" className="text-sm font-medium ml-1">Email professionnel ou personnel *</Label>
          <Mail className={iconClass} />
          <Input
            id="email"
            type="email"
            placeholder="etudiant@exemple.com"
            className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/30"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-destructive text-xs font-medium ml-1 animate-in fade-in">{errors.email.message}</p>
          )}
        </div>

        {/* Nom & Prénoms - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={inputContainerClass}>
            <Label htmlFor="nom" className="text-sm font-medium ml-1">Nom de famille *</Label>
            <User className={iconClass} />
            <Input
              id="nom"
              placeholder="Ex: KODJO"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('nom')}
            />
            {errors.nom && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.nom.message}</p>
            )}
          </div>

          <div className={inputContainerClass}>
            <Label htmlFor="prenoms" className="text-sm font-medium ml-1">Prénoms *</Label>
            <User className={iconClass} />
            <Input
              id="prenoms"
              placeholder="Ex: Jean Koffi"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('prenoms')}
            />
            {errors.prenoms && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.prenoms.message}</p>
            )}
          </div>
        </div>

        {/* Date et lieu de naissance, Ville de résidence - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={inputContainerClass}>
            <Label htmlFor="dateNaissance" className="text-sm font-medium ml-1">Date de naissance *</Label>
            <Calendar className={iconClass} />
            <Input
              id="dateNaissance"
              type="date"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('dateNaissance')}
            />
            {errors.dateNaissance && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.dateNaissance.message}</p>
            )}
          </div>

          <div className={inputContainerClass}>
            <Label htmlFor="lieuNaissance" className="text-sm font-medium ml-1">Lieu de naissance *</Label>
            <MapPin className={iconClass} />
            <Input
              id="lieuNaissance"
              placeholder="Ex: Cotonou"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('lieuNaissance')}
            />
            {errors.lieuNaissance && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.lieuNaissance.message}</p>
            )}
          </div>

          <div className={inputContainerClass}>
            <Label htmlFor="villeResidence" className="text-sm font-medium ml-1">Ville de résidence *</Label>
            <Home className={iconClass} />
            <Input
              id="villeResidence"
              placeholder="Ex: Porto-Novo"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              {...register('villeResidence')}
            />
            {errors.villeResidence && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.villeResidence.message}</p>
            )}
          </div>
        </div>

        {/* Téléphone & Cellule - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={inputContainerClass}>
            <Label htmlFor="telephone" className="text-sm font-medium ml-1">Numéro WhatsApp / Téléphone *</Label>
            <Phone className={iconClass} />
            <Input
              id="telephone"
              type="tel"
              inputMode="numeric"
              placeholder="01 00 00 00"
              maxLength={10}
              pattern="01[0-9]{8}"
              className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30"
              onInput={(e) => {
                // Only allow numeric characters
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
              }}
              {...register('telephone', {
                pattern: {
                  value: /^01[0-9]{8}$/,
                  message: 'Le numéro doit commencer par 01 et contenir exactement 10 chiffres'
                },
                minLength: {
                  value: 10,
                  message: 'Le numéro doit contenir exactement 10 chiffres'
                },
                maxLength: {
                  value: 10,
                  message: 'Le numéro doit contenir exactement 10 chiffres'
                }
              })}
            />
            {errors.telephone && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.telephone.message}</p>
            )}
          </div>

          <div className={inputContainerClass}>
            <Label htmlFor="celluleProvenance" className="text-sm font-medium ml-1">Cellule de provenance *</Label>
            <MapPin className={iconClass} />
            <Select
              value={form.watch('celluleProvenance')}
              onValueChange={(value) => form.setValue('celluleProvenance', value)}
            >
              <SelectTrigger className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/20 bg-slate-50/30">
                <SelectValue placeholder="Choisir une cellule" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                {CELLULES.map((cellule) => (
                  <SelectItem key={cellule} value={cellule} className="rounded-lg focus:bg-primary/10">
                    {cellule}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.celluleProvenance && (
              <p className="text-destructive text-xs font-medium ml-1">{errors.celluleProvenance.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Identity;