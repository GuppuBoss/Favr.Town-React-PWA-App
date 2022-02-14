import * as yup from 'yup';

const websiteRegex = /^https?:\/\//;

const schema = yup
  .object({
    text: yup
      .string()
      .required('is Required')
      .min(2, 'Must be at least 2 char'),
    url: yup.string().matches(websiteRegex, {
      message: 'Enter a valid website',
      excludeEmptyString: true,
    }),
    redeem_by: yup.string().required('is Required'),
  })
  .required();

export default schema;
