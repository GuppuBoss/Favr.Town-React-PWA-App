import { TextField } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const SearchButton = ({ label, onChange }) => {
  return (
    <TextField
      fullWidth
      id="standard-basic"
      label={label}
      onChange={_.debounce(onChange, 2000)}
      variant="outlined"
    />
  );
};

SearchButton.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchButton;
