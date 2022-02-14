import * as yup from 'yup';

// const emailValidationRegex = `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$`;

const schema = yup
  .object({
    email: yup.string().email('Enter a valid email').required('is required'),
    code: yup.string().required('is required'),
  })
  .required();

export default schema;
