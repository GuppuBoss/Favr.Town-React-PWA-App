import * as yup from 'yup';

const websiteRegex = /^https?:\/\//;
const laneRegex = /^\S+[A-Z_]{2,30}\S$/;
const schema = yup
  .object({
    businessName: yup
      .string()
      .required('required')
      .min(2, 'Must be at least 2 char'),
    about: yup.string(),
    firstName: yup
      .string()
      .required('required')
      .min(2, 'Must be at least 2 char'),
    lastName: yup
      .string()
      .required('required')
      .min(2, 'Must be at least 2 char'),
    city: yup.string(),
    state: yup.string(),
    zip: yup.string(),
    salutation: yup.string(),
    website: yup.string().matches(websiteRegex, {
      message: 'Enter a valid website',
      excludeEmptyString: true,
    }),
    lane: yup.string().matches(laneRegex, {
      message: 'Enter a valid lane',
      excludeEmptyString: false,
    }),
    specialty: yup.string().matches(laneRegex, {
      message: 'Enter a valid specialty',
      excludeEmptyString: true,
    }),
  })
  .required();

export default schema;
