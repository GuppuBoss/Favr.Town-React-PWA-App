import * as yup from 'yup';

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

const schema = yup
  .object({
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
    accept_gift_birthday: yup.boolean().required(),
    accept_gift_mailin: yup.boolean().required(),
    salutation: yup.string(),
    cell: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    birthday: yup.date().required(),
  })
  .required();

export default schema;
