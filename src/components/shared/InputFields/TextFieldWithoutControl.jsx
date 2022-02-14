/* eslint-disable react/boolean-prop-naming */

import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const TextFieldWithoutControl = ({
  ref,
  label,
  onChange,
  alignTextRight,
  ...rest
}) => {
  return (
    <TextField
      ref={ref}
      fullWidth
      id="standard-basic"
      InputProps={
        alignTextRight && {
          inputProps: {
            style: { textAlign: 'right' },
          },
        }
      }
      label={label}
      onChange={onChange}
      size="small"
      variant="outlined"
      {...rest}
    />
  );
};

TextFieldWithoutControl.propTypes = {
  ref: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  alignTextRight: PropTypes.bool.isRequired,
};

export default TextFieldWithoutControl;
