import PropTypes from 'prop-types';
import React from 'react';

import { getContentHeight } from '../../../utils/window';
import classes from './container.module.scss';

const BannerContainer = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      className={classes.bannerContainer}
      style={{ height: getContentHeight() }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </div>
  );
};

export default BannerContainer;

BannerContainer.propTypes = {
  children: PropTypes.node,
};

BannerContainer.defaultProps = {
  children: '',
};
