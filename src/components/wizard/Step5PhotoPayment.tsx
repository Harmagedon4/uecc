import { useState, useCallback, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationData } from '@/types/registration';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Upload, Camera, AlertCircle, CreditCard, CheckCircle2, X } from 'lucide-react';
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from 'kkiapay';

interface StepProps {
  form: UseFormReturn<RegistrationData>;
  isPaid: boolean;
  onPaymentSuccess: (response: any) => void;
}

const Step5PhotoPayment = ({ form, isPaid, onPaymentSuccess }: StepProps) => {
  const { formState: { errors }, setValue, watch } = form;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // On observe les valeurs en temps réel
  const certificationExactitude = watch('certificationExactitude');
  const photoUrl = watch('photoUrl');

  // Synchronisation de l'aperçu si photoUrl existe déjà (ex: retour arrière)
  useEffect(() => {
    if (photoUrl && !previewUrl) {
      setPreviewUrl(photoUrl);
    }
  }, [photoUrl, previewUrl]);

  useEffect(() => {
    const successHandler = (response: any) => onPaymentSuccess(response);
    addKkiapayListener("success", successHandler);
    return () => removeKkiapayListener("success", successHandler);
  }, [onPaymentSuccess]);

  const handlePayment = () => {
    openKkiapayWidget({
      amount: 1500,
      api_key: "cb68ee90fdf211f0a625e1f4e1128ff2",
      sandbox: true,
      phone: "22997000000",
      name: "Inscription UECC",
      data: "Frais de Badge",
    });
  };

  const handleFileChange = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        setValue('photoUrl', result, { shouldValidate: true }); // On force la validation immédiate
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Temporary button for testing payment success */}
      <Button onClick={() => onPaymentSuccess({})} variant="outline" className="w-full">
        Simuler Succès Paiement (Test)
      </Button>

      {/* --- SECTION PHOTO --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-slate-800 tracking-tight">Identité Visuelle</h3>
        </div>

        <div className={`group relative border-2 border-dashed rounded-[2.5rem] transition-all duration-300 ${
          photoUrl ? 'border-green-400 bg-green-50/30' : errors.photoUrl ? 'border-destructive bg-destructive/5' : 'border-slate-200 hover:border-primary/40 bg-slate-50/50'
        }`}>
          {photoUrl ? (
            <div className="p-4 flex flex-col items-center">
              <div className="relative">
                <img src={previewUrl || photoUrl} alt="Preview" className="w-48 h-48 object-cover rounded-3xl shadow-2xl border-4 border-white" />
                <button 
                  type="button"
                  onClick={() => { setPreviewUrl(null); setValue('photoUrl', '', { shouldValidate: true }); }}
                  className="absolute -top-2 -right-2 bg-white text-destructive p-2 rounded-full shadow-lg hover:bg-destructive hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-4 text-sm font-semibold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Photo prête pour le badge
              </p>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-12 cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-slate-700">Cliquez pour ajouter votre photo</p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-medium">Portrait en soutane recommandé</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0]!)} />
            </label>
          )}
        </div>
        
        {/* Correction 2: L'alerte ne s'affiche QUE s'il y a une erreur ET que le champ est vide */}
        {errors.photoUrl && !photoUrl && (
          <p className="text-destructive text-xs font-semibold text-center animate-in fade-in flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" /> Photo obligatoire
          </p>
        )}
      </div>

      {/* --- SECTION PAIEMENT --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold">Frais d'inscription</h3>
              <p className="text-slate-400 text-sm">Badge magnétique & Adhésion annuelle</p>
            </div>
            <div className="text-right">
              <span className="block text-3xl font-black text-primary">1 500 FCFA</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Net à payer</span>
            </div>
          </div>

          {!isPaid ? (
            <Button
              type="button"
              onClick={handlePayment}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Procéder au paiement
            </Button>
          ) : (
            <div className="w-full h-14 bg-green-500 rounded-2xl flex items-center justify-center gap-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold">Paiement validé avec succès</span>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-4 text-slate-500 opacity-60">
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MTN</div>
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MOOV</div>
             <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
          </div>
        </div>
      </div>

      {/* --- CERTIFICATION --- */}
      <div className={`p-6 rounded-2xl transition-all duration-300 ${certificationExactitude ? 'bg-primary/5 border border-primary/20 shadow-sm' : errors.certificationExactitude ? 'bg-destructive/5 border border-destructive/20' : 'bg-slate-50 border border-slate-100'}`}>
        <div className="flex items-start gap-4">
          <Checkbox 
            id="certif"
            checked={certificationExactitude}
            onCheckedChange={(v) => setValue('certificationExactitude', v as boolean, { shouldValidate: true })}
            className="w-5 h-5 mt-1 rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <div className="space-y-1">
            <Label htmlFor="certif" className="text-sm font-bold text-slate-800 cursor-pointer">
              Je certifie l'exactitude des informations fournies
            </Label>
            <p className="text-xs text-slate-500 leading-relaxed">
              En cochant cette case, vous confirmez que les données saisies correspondent à votre situation réelle.
            </p>
          </div>
        </div>
        
        {/* Correction 1: L'alerte ne s'affiche QUE s'il y a une erreur ET que la case n'est pas cochée */}
        {errors.certificationExactitude && !certificationExactitude && (
          <p className="mt-3 text-destructive text-xs font-semibold flex items-center gap-1 animate-in slide-in-from-top-1">
            <AlertCircle className="w-3 h-3" /> Vous devez certifier l'exactitude des informations
          </p>
        )}
      </div>
    </div>
  );
};

export default Step5PhotoPayment;