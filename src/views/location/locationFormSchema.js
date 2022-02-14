import * as yup from 'yup';

const schema = yup
  .object({
    businessName: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    street: yup
      .string()
      .required('is Required')
      .min(2, 'Must be atleast 2 char'),
    city: yup.string().required('is Required').min(2, 'Must be atleast 2 char'),
    state: yup
      .string()
      .required('is Required')
      .min(2, 'Must be atleast 2 char'),
    zip: yup.string().required('is Required'),
  })
  .required();

export default schema;
