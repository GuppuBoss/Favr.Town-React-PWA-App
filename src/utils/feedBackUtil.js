import { isEmpty } from 'lodash';

const getFeedbackMessage = (data) => {
  if (isEmpty(data)) {
    return 'something went wrong';
  }

  if (data.message) return data.message;

  if (data.error) return data.error;

  return 'something went wrong';
};

export default getFeedbackMessage;
