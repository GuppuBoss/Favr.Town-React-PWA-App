import ROUTES from '../constants/routes';

const handleError = (error, history) => {
  if (error.status === 404) {
    history.push(ROUTES.NOT_FOUND);
    // eslint-disable-next-line no-param-reassign
    history.length = 1;
  }
};

export default handleError;
