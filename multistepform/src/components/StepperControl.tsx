import React from 'react';

interface StepperControlProps {
  handleClick: (action?: 'next' | 'back' ) => void;
  currentStep: number;
  steps: string[];
}

const StepperControl: React.FC<StepperControlProps> = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-red-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-red-700 hover:text-white"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}

export default StepperControl;
