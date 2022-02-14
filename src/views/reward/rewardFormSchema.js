import * as yup from 'yup';

const schema = yup
  .object({
    description: yup.string().required('is required').min(2),
    redeem: yup.string(),
    favr: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required('is required')
      .min(1),
    redeem_by: yup.date().required(),
  })
  .required();

export default schema;
