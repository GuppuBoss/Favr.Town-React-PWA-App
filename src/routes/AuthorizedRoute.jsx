import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ROUTES from '../constants/routes';
import { getAuthenticatedUser } from '../redux/selectors/accountSelector';
import getUserGroup from '../utils/authUtil';

const AuthenticatedRoute = ({ children, roles }) => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);
  const isAuthorized = roles.includes(userGroup);

  if (isAuthorized) {
    return children;
  }

  return <Navigate to={ROUTES.HOME} />;
};

export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
