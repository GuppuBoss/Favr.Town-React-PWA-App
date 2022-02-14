import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';

import ROUTES from '../constants/routes';

const AuthenticatedRoute = ({ children, isAuthenticated, ...rest }) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      // eslint-disable-next-line react/no-unstable-nested-components
      element={
        isAuthenticated ? (
          // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
          { children }
        ) : (
          // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
          <Navigate
            to={`${ROUTES.SIGN_IN}?redirectpath=${location.pathname}&search=${location.search}`}
          />
        )
      }
      // render={() => {
      //   return isAuthenticated ? (
      //     children
      //   ) : (
      //     <Navigate
      //       to={`${ROUTES.SIGN_IN}?redirectpath=${location.pathname}&search=${location.search}`}
      //     />
      //   );
      // }}
    />
  );
};

export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
