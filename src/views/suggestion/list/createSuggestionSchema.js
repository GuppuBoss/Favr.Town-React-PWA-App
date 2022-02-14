import * as yup from 'yup';

const schema = yup
  .object({
    suggestion: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
  })
  .required();

export default schema;
