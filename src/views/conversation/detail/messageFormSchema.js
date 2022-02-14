import * as yup from 'yup';

const websiteRegex = /^https?:\/\//;

const schema = yup
  .object({
    message: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    link: yup.string().matches(websiteRegex, {
      message: 'Invalid URL',
      excludeEmptyString: true,
    }),
  })
  .required();

export default schema;
