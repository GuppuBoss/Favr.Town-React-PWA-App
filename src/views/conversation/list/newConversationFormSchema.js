import * as yup from 'yup';

const websiteRegex = /^https?:\/\//;

const schema = yup
  .object({
    topic: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    message: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    url: yup.string().matches(websiteRegex, {
      message: 'Enter a valid website',
      excludeEmptyString: true,
    }),
  })
  .required();

export default schema;
