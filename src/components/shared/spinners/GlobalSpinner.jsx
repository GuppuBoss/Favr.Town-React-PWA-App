import './spinner.scss';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';

const GlobalSpinner = ({ isOpen }) => {
  return (
    <div>
      <Backdrop className="global-spinner-backdrop" open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default GlobalSpinner;

GlobalSpinner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
