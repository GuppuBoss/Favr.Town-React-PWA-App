/* eslint-disable react/boolean-prop-naming */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

import { getTime24HoursFromNow } from '../../../utils/timeUtil';

// const DateTimePickerStyleWrapper = withStyles(() => ({
//   PrivateTabIndicator: {
//     color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   },
// }))(MobileDateTimePicker);

const DateTimePickerWrapper = ({
  alignTextRight,
  autoUpdate,
  label,
  name,
  error,
  disabled,
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
              <MobileDateTimePicker
                componentsProps={
                  alignTextRight && {
                    inputProps: {
                      style: { textAlign: 'right' },
                    },
                  }
                }
                defaultValue={undefined}
                disabled={disabled}
                disableFuture={isFutureDateDisabled}
                disablePast={isPastDateDisabled}
                error={error}
                helperText={error?.message}
                id="date-picker-dialog"
                inputFormat={showDate ? 'MM/dd/yyyy hh:mm a' : 'MM/dd/yyyy'}
                inputVariant="outlined"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                label={label}
                margin={margin}
                minDate={getTime24HoursFromNow()}
                onChange={(_date, e) => {
                  handleOnBlur(onChange, _date, e);
                }}
                readOnly={isReadOnly}
                renderInput={(params) => <TextField {...params} />}
                {...rest}
                fullWidth
                value={new Date()}
              />
            );
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

DateTimePickerWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
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

export default DateTimePickerWrapper;

DateTimePickerWrapper.defaultProps = {
  isReadOnly: false,
};
