import * as yup from 'yup';

const schema = yup
  .object({
    question: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    end: yup.string().required('is Required'),
  })
  .required();

export default schema;
