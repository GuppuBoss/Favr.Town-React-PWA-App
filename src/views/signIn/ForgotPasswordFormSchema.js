import * as yup from 'yup';

const schema = yup
  .object({
    loginOrEmail: yup
      .string()
      .required('is Required')
      .min(4, 'Must be at least 4 char'),
  })
  .required();

export default schema;
