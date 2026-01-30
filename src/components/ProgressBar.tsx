import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressBar = ({ currentStep, totalSteps, labels }: ProgressBarProps) => {
  const defaultLabels = ['Identité', 'Parcours', 'Engagement', 'Activités', 'Photo'];
  const stepLabels = labels || defaultLabels;

  return (
    <div className="w-full mb-8">
      {/* Progress line */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />
        
        {/* Active line */}
        <div 
          className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Steps */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isPending = stepNum > currentStep;

          return (
            <div key={i} className="relative flex flex-col items-center z-10">
              <div
                className={`progress-step ${
                  isCompleted ? 'progress-step-completed' : 
                  isActive ? 'progress-step-active' : 
                  'progress-step-pending'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  stepNum
                )}
              </div>
              <span 
                className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  isActive ? 'text-primary' : 
                  isCompleted ? 'text-accent-foreground' : 
                  'text-muted-foreground'
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
