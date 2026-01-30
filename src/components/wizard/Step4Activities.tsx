import { UseFormReturn } from 'react-hook-form';
import { RegistrationData } from '@/types/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CalendarDays, Trophy, Users, Music, Mic2, Star, Info } from 'lucide-react';

interface StepProps {
  form: UseFormReturn<RegistrationData>;
}

const Step4Activities = ({ form }: StepProps) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const estChoriste = watch('estChoriste');
  const connaissanceUECCChoir = watch('connaissanceUECCChoir');

  const inputContainerClass = "relative flex flex-col gap-1.5 transition-all duration-300 group";
  const iconClass = "absolute left-3 top-[38px] w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10";

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* --- SECTION: DERNIÈRE ACTIVITÉ --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-slate-800 tracking-tight">Dernière Participation</h3>
        </div>

        <div className="grid gap-6">
          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Événement ou Activité *</Label>
            <Trophy className={iconClass} />
            <Input 
              {...register('derniereActiviteUECC')}
              placeholder="Ex: Congrès National, Retraite..." 
              className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200"
            />
            {errors.derniereActiviteUECC && <p className="text-destructive text-xs ml-1">{errors.derniereActiviteUECC.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={inputContainerClass}>
              <Label className="text-sm font-medium ml-1">Année *</Label>
              <CalendarDays className={iconClass} />
              <Input 
                {...register('anneeActivite')}
                placeholder="AAAA" 
                className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200"
              />
            </div>
            <div className={inputContainerClass}>
              <Label className="text-sm font-medium ml-1">Superviseur direct *</Label>
              <Users className={iconClass} />
              <Input 
                {...register('superviseur')}
                placeholder="Nom du responsable" 
                className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200"
              />
            </div>
          </div>

          <div className={inputContainerClass}>
            <Label className="text-sm font-medium ml-1">Président du Comité d'Organisation *</Label>
            <Star className={iconClass} />
            <Input 
              {...register('presidentComite')}
              placeholder="Nom du président" 
              className="pl-10 h-12 rounded-xl bg-slate-50/30 border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* --- SECTION: CHORALE (INTERACTIF) --- */}
      <div className={`transition-all duration-500 rounded-[2rem] p-6 md:p-8 ${estChoriste ? 'bg-primary/5 border border-primary/10 shadow-inner' : 'bg-slate-50 border border-slate-100'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl transition-colors ${estChoriste ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
              <Music className="w-6 h-6" />
            </div>
            <div>
              <Label htmlFor="estChoriste" className="text-lg font-bold text-slate-900 cursor-pointer">
                Profil Choriste
              </Label>
              <p className="text-sm text-slate-500 italic">Êtes-vous membre d'une chorale ?</p>
            </div>
          </div>
          <Switch 
            id="estChoriste"
            checked={estChoriste}
            onCheckedChange={(v) => setValue('estChoriste', v)}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        {estChoriste && (
          <div className="mt-8 space-y-6 animate-in zoom-in-95 fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={inputContainerClass}>
                <Label className="text-sm font-semibold ml-1">Rôle / Pupitre</Label>
                <Mic2 className={iconClass} />
                <Input 
                  {...register('roleChoriste')}
                  placeholder="Ex: Ténor, Alto..." 
                  className="pl-10 h-11 rounded-xl bg-white border-slate-200"
                />
              </div>
              <div className={inputContainerClass}>
                <Label className="text-sm font-semibold ml-1">Maître de Chœur</Label>
                <Users className={iconClass} />
                <Input 
                  {...register('maitreChoeur')}
                  placeholder="Nom du MC" 
                  className="pl-10 h-11 rounded-xl bg-white border-slate-200"
                />
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700">Connaissez-vous UECC-CHOIR ?</span>
                </div>
                <Switch 
                  checked={connaissanceUECCChoir}
                  onCheckedChange={(v) => setValue('connaissanceUECCChoir', v)}
                />
              </div>

              {connaissanceUECCChoir && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 animate-in slide-in-from-top-2">
                  <span className="text-sm font-medium text-slate-700">Souhaitez-vous intégrer la chorale nationale ?</span>
                  <Switch 
                    checked={watch('interesseIntegrer')}
                    onCheckedChange={(v) => setValue('interesseIntegrer', v)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4Activities;