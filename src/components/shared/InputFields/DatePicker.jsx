/* eslint-disable react/boolean-prop-naming */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const DatePickerWrapper = ({
  alignTextRight,
  autoUpdate,
  label,
  name,
  error,
  control,
  isFutureDateDisabled,
  isPastDateDisabled,
  updateFunction,
  isReadOnly,
  showDate,
  margin = 'normal',
  ...props
}) => {
  const handleOnBlur = async (onChange, _date, e) => {
    onChange(_date, e);
    if (autoUpdate) {
      updateFunction(name, { [name]: _date });
    }
  };

  return (
    <FormControl {...props}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ...rest } }) => {
            return (
              <MobileDatePicker
                componentsProps={
                  alignTextRight && {
                    inputProps: {
                      style: { textAlign: 'right' },
                    },
                  }
                }
                disableFuture={isFutureDateDisabled}
                disablePast={isPastDateDisabled}
                helperText={error?.message}
                id="date-picker-dialog"
                inputFormat={showDate ? 'MM/dd/yyyy hh:mm a' : 'MM/dd/yyyy'}
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                label={label}
                margin={margin}
                onChange={(_date, e) => {
                  handleOnBlur(onChange, _date, e);
                }}
                onError={() => {
                  return error;
                }}
                readOnly={isReadOnly}
                renderInput={(params) => <TextField {...params} />}
                {...rest}
              />
            );
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

DatePickerWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isFutureDateDisabled: PropTypes.bool.isRequired,
  isPastDateDisabled: PropTypes.bool.isRequired,
  autoUpdate: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  control: PropTypes.shape().isRequired,
  updateFunction: PropTypes.func.isRequired,
  alignTextRight: PropTypes.bool.isRequired,
  margin: PropTypes.string.isRequired,
  showDate: PropTypes.bool.isRequired,
};

export default DatePickerWrapper;

DatePickerWrapper.defaultProps = {
  isReadOnly: false,
};
