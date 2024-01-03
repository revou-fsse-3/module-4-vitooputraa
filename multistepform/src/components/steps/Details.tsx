import React from 'react';
import { useStepperContext } from '../../contexts/StepperContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface DetailsProps {
  formRef: React.MutableRefObject<any>;
}

const Details: React.FC<DetailsProps> = ({ formRef }) => {
  const { userData, setUserData } = useStepperContext();

  const formik = useFormik({
    initialValues: {
      address: userData.address || '',
      city: userData.city || '',
      state: userData.state || '',
      zipCode: userData.zipCode || '',
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Street Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string()
        .required('Zip Code is required')
        .matches(/^\d{5}$/, 'Invalid Zip Code format (should be 5 digits)'),
    }),
    onSubmit: (values) => {
      setUserData((prevUserData) => ({ ...prevUserData, ...values }));
    },
  });

  formRef.current = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="w-full mx-2 flex-1">
          <label htmlFor="address" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Street Address
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="Street Address"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>
          )}
        </div>
        <div className="w-full mx-2 flex-1">
          <label htmlFor="city" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            City
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder="City"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>
          )}
        </div>
        <div className="w-full mx-2 flex-1">
          <label htmlFor="state" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            State
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="state"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              placeholder="State"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.state}</div>
          )}
        </div>
        <div className="w-full mx-2 flex-1">
          <label htmlFor="zipCode" className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Zip Code
          </label>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipCode}
              placeholder="Zip Code"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            />
          </div>
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.zipCode}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Details;
