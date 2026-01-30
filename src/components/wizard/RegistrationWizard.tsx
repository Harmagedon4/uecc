import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { RegistrationData } from '@/types/registration';
import { addRegistration, emailExists } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProgressBar from '@/components/ProgressBar';
import Step1Identity from './Step1Identity';
import Step2University from './Step2University';
import Step3Engagement from './Step3Engagement';
import Step4Activities from './Step4Activities';
import Step5PhotoPayment from './Step5PhotoPayment';

// Schémas de validation par étape
const step1Schema = z.object({
  email: z.string().trim().email('Email invalide').max(255),
  nom: z.string().trim().min(2, 'Nom requis (min 2 caractères)').max(100),
  prenoms: z.string().trim().min(2, 'Prénoms requis').max(150),
  telephone: z.string().trim().min(8, 'Téléphone invalide').max(20),
  celluleProvenance: z.string().trim().min(2, 'Cellule requise').max(100),
});

const step2Schema = z.object({
  universite: z.string().trim().min(2, 'Université requise').max(200),
  filiere: z.string().trim().min(2, 'Filière requise').max(100),
  anneeEtude: z.string().min(1, 'Année d\'étude requise'),
  matricule: z.string().trim().min(1, 'Matricule requis').max(50),
  profession: z.string().max(100).optional(),
});

const step3Schema = z.object({
  situationMatrimoniale: z.string().min(1, 'Situation matrimoniale requise'),
  gradeEglise: z.string().min(1, 'Grade requis'),
  paroisseOrigine: z.string().trim().min(2, 'Paroisse requise').max(150),
  chargeParoisseOrigine: z.string().trim().min(2, 'Nom du chargé requis').max(100),
  paroisseAccueil: z.string().trim().min(2, 'Paroisse requise').max(150),
  chargeParoisseAccueil: z.string().trim().min(2, 'Nom du chargé requis').max(100),
  anneeDecouverteUECC: z.string().trim().min(4, 'Année invalide').max(4),
  celluleUECCMilite: z.string().trim().min(2, 'Cellule requise').max(100),
  responsableCelluleEpoque: z.string().trim().min(2, 'Nom requis').max(100),
  posteOccupeUECC: z.string().trim().min(2, 'Poste requis').max(100),
  responsableActuelCellule: z.string().trim().min(2, 'Nom requis').max(100),
});

const step4Schema = z.object({
  derniereActiviteUECC: z.string().trim().min(2, 'Activité requise').max(200),
  anneeActivite: z.string().trim().min(4, 'Année invalide').max(4),
  superviseur: z.string().trim().min(2, 'Superviseur requis').max(100),
  presidentComite: z.string().trim().min(2, 'Président requis').max(100),
  estChoriste: z.boolean(),
  roleChoriste: z.string().max(100).optional(),
  maitreChoeur: z.string().max(100).optional(),
  connaissanceUECCChoir: z.boolean().optional(),
  interesseIntegrer: z.boolean().optional(),
});

const step5Schema = z.object({
  photoUrl: z.string().min(1, 'Photo obligatoire'),
  referencePaiement: z.string().max(100).optional(),
  certificationExactitude: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez certifier l\'exactitude des informations' }),
  }),
});

// Schéma complet
const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];
const TOTAL_STEPS = 5;

const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegistrationData>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nom: '',
      prenoms: '',
      telephone: '',
      celluleProvenance: '',
      universite: '',
      filiere: '',
      anneeEtude: '',
      matricule: '',
      profession: '',
      situationMatrimoniale: '',
      gradeEglise: '',
      paroisseOrigine: '',
      chargeParoisseOrigine: '',
      paroisseAccueil: '',
      chargeParoisseAccueil: '',
      anneeDecouverteUECC: '',
      celluleUECCMilite: '',
      responsableCelluleEpoque: '',
      posteOccupeUECC: '',
      responsableActuelCellule: '',
      derniereActiviteUECC: '',
      anneeActivite: '',
      superviseur: '',
      presidentComite: '',
      estChoriste: false,
      roleChoriste: '',
      maitreChoeur: '',
      connaissanceUECCChoir: false,
      interesseIntegrer: false,
      photoUrl: '',
      referencePaiement: '',
      certificationExactitude: false,
    },
  });

  const validateCurrentStep = async (): Promise<boolean> => {
    const currentSchema = stepSchemas[currentStep - 1];
    const fieldsToValidate = Object.keys(currentSchema.shape);
    const result = await form.trigger(fieldsToValidate as any);

    // Vérification email unique à l'étape 1
    if (currentStep === 1 && result) {
      const email = form.getValues('email');
      if (emailExists(email)) {
        form.setError('email', { message: 'Cet email est déjà utilisé' });
        return false;
      }
    }

    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePaymentSuccess = (response: any) => {
    setIsPaid(true);
    toast({
      title: "Paiement validé",
      description: "Vous pouvez maintenant finaliser votre inscription.",
    });
  };

  const handleSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const registration = addRegistration(data);
      
      toast({
        title: '✅ Inscription réussie !',
        description: `Votre numéro de dossier : ${registration.numeroDossier}`,
      });

      navigate('/confirmation', { 
        state: { 
          numeroDossier: registration.numeroDossier,
          nom: data.nom,
          prenoms: data.prenoms 
        } 
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Identity form={form} />;
      case 2:
        return <Step2University form={form} />;
      case 3:
        return <Step3Engagement form={form} />;
      case 4:
        return <Step4Activities form={form} />;
      case 5:
        return <Step5PhotoPayment form={form} isPaid={isPaid} onPaymentSuccess={handlePaymentSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </button>
          <h1 className="text-3xl font-serif font-bold text-primary">
            Inscription UECC
          </h1>
        </div>

        {/* Barre de progression */}
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Formulaire */}
        <div className="card-uecc">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {renderStep()}

            {/* Boutons navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="btn-uecc flex items-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isPaid}
                  className="btn-uecc flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : !isPaid ? (
                    <>
                      <Send className="w-4 h-4" />
                      Paiement requis pour finaliser
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Soumettre
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizard;
