import * as yup from 'yup';

// const emailRegex =
//   /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;

const websiteRegex = /^https?:\/\//;
const schema = yup
  .object({
    businessName: yup
      .string()
      .required('First Name is Required')
      .min(3, 'Must be at least 3 char'),
    lanes: yup.array().min(1, 'Select one or more').of(yup.string()).required(),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    website: yup.string().matches(websiteRegex, {
      message: 'Enter a valid website',
      excludeEmptyString: true,
    }),
  })
  .required();

export default schema;
