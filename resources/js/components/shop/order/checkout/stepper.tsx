
import type { Step } from './types';

interface StepperProps {
    steps: Step[];
    activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
    return (
        <div className="mb-10 flex w-full items-center justify-center gap-0">
            {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl font-bold transition-all ${
                            activeStep === i
                                ? 'scale-110 border-ambyRed-500 bg-ambyRed-500 text-white shadow-xl'
                                : 'border-gray-300 bg-gray-100 text-gray-700'
                        } `}
                    >
                        {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="h-1 w-16 bg-gray-300" />}
                </div>
            ))}
        </div>
    );
}


