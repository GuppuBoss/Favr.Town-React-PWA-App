import * as yup from 'yup';

const schema = yup
  .object({
    login: yup
      .string()
      .required('is Required')
      .min(4, 'Must be at least 4 char'),
    password: yup
      .string()
      .required('is Required')
      .min(6, 'Must be at least 6 char'),
  })
  .required();

export default schema;
