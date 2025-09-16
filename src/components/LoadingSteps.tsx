import React from 'react';
import { Check, Loader2, Globe, Search, Brain } from 'lucide-react';

interface LoadingStepsProps {
  currentStep: number;
  estimatedTime?: number;
}

const steps = [
  {
    id: 1,
    icon: Globe,
    title: 'Scraping URL',
    description: 'Fetching webpage content'
  },
  {
    id: 2,
    icon: Search,
    title: 'Analyzing Content',
    description: 'Processing HTML structure'
  },
  {
    id: 3,
    icon: Brain,
    title: 'Extracting Data',
    description: 'AI-powered profile analysis'
  }
];

export const LoadingSteps: React.FC<LoadingStepsProps> = ({ currentStep, estimatedTime }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;
          
          return (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                ${isCompleted 
                  ? 'bg-success border-success text-success-foreground' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-primary-foreground animate-pulse' 
                    : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold transition-colors duration-300 ${
                  isCompleted 
                    ? 'text-success' 
                    : isCurrent 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                }`}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {estimatedTime && (
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Estimated time remaining: <span className="font-medium">{estimatedTime}s</span>
          </p>
          <div className="mt-2 w-full bg-muted rounded-full h-1">
            <div className="progress-flow h-1 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};