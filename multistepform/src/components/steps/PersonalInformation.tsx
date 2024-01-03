import React from 'react';
import { useStepperContext } from '../../contexts/StepperContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface PersonalInformationProps {
  formRef: React.MutableRefObject<any>;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ formRef }) => {
  const { userData, setUserData } = useStepperContext();

  const formik = useFormik({
    initialValues: {
      fullName: userData.fullName || '',
      emailAddress: userData.emailAddress || '',
      dateOfBirth: userData.dateOfBirth || '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      emailAddress: Yup.string().email('Invalid email format').required('Email Address is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
    }),
    onSubmit: (values) => {
      setUserData((prevUserData) => ({ ...prevUserData, ...values }));
    },
  });

  formRef.current = formik;
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col ">
        <div className="w-full mx-2 flex-1">
          <label htmlFor="fullName" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Full Name
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Full Name"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.fullName}</div>
          )}
        </div>
        <div className="w-full mx-2 flex-1">
          <label htmlFor="emailAddress" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Email Address
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="emailAddress"
              name="emailAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailAddress}
              placeholder="Email Address"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.emailAddress && formik.errors.emailAddress && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.emailAddress}</div>
          )}
        </div>
        <div className="w-full mx-2 flex-1">
          <label htmlFor="dateOfBirth" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Date of Birth
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
              placeholder="Date of Birth"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.dateOfBirth}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
