import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStepperContext } from '../../contexts/StepperContext';

interface AccountFormProps {
  formRef: React.MutableRefObject<any>;
}

const AccountForm: React.FC<AccountFormProps> = ({ formRef }) => {
  const { setUserData } = useStepperContext();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must be a strong password (at least 8 characters, one letter, one number, and one special character)'
        ),
    }),
    onSubmit: (values) => {
      // Save form data to context or perform other actions
      setUserData((prevUserData) => ({ ...prevUserData, ...values }));
      // You can also perform additional actions like submitting to a server
    },
  });
  
  formRef.current = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="mx-2 w-full flex-1">
          <label htmlFor="username" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Username
          </label>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Username"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div>
          )}
        </div>
        <div className="mx-2 w-full flex-1">
          <label htmlFor="password" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Password
          </label>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
