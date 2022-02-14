import * as yup from 'yup';

const websiteRegex = /^https?:\/\//;

const schema = yup
  .object({
    text: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    link: yup.string().matches(websiteRegex, {
      message: 'Enter a valid website',
      excludeEmptyString: true,
    }),
  })
  .required();

export default schema;
