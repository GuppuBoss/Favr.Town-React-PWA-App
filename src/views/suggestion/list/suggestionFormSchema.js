import * as yup from 'yup';

const schema = yup
  .object({
    comment: yup.string(),
  })
  .required();

export default schema;
