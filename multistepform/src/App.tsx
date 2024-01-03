import { useState, useRef } from 'react';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';
import { UseContextProvider } from './contexts/StepperContext';

import Details from './components/steps/Details';
import Final from './components/steps/Final';
import PersonalInformation from './components/steps/PersonalInformation';
import AccountForm from './components/steps/AccountForm';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps: string[] = [
    'Personal Information',
    'Address Information',
    'Account Information',
    'Complete',
  ];

  // Use refs to store the formik instances dynamically
  const personalInformationFormRef = useRef(null);
  const detailsFormRef = useRef(null);
  const accountFormFormRef = useRef(null);

  const displayStep = (step: number): JSX.Element => {
    switch (step) {
      case 1:
        return <PersonalInformation formRef={personalInformationFormRef} />;
      case 2:
        return <Details formRef={detailsFormRef} />;
      case 3:
        return <AccountForm formRef={accountFormFormRef} />;
      case 4:
        return <Final />;
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  const handleClick = async (direction?: 'next' | 'back'): Promise<void> => {
    if (direction === 'next') {
      const isFormValid = await validateForm();
      if (!isFormValid) {
        return;
      }
    }

    let newStep = currentStep;

    direction === 'next' ? (newStep += 1) : (newStep -= 1);

    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const validateForm = async (): Promise<boolean> => {
    const formik = getFormikInstance();
    if (formik) {
      await formik.validateForm();
      return formik.isValid;
    }

    return false;
  };

  const getFormikInstance = (): any => {
    switch (currentStep) {
      case 1:
        return personalInformationFormRef.current;
      case 2:
        return detailsFormRef.current;
      case 3:
        return accountFormFormRef.current;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default App;
