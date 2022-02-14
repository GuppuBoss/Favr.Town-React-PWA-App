import * as yup from 'yup';

const schema = yup
  .object({
    login: yup
      .string()
      .required('is Required')
      .min(6, 'Must be at least 6 char'),
    email: yup
      .string()
      .required('is Required')
      .min(3, 'Must be at least 3 char'),
    password: yup
      .string()
      .required('is Required')
      .min(6, 'Must be atleast 6 char'),
  })
  .required();

export default schema;
