import * as yup from 'yup';

const schema = yup
  .object({
    password: yup
      .string()
      .required('is Required')
      .min(6, 'Minimum 6 characters'),
  })
  .required();

export default schema;
