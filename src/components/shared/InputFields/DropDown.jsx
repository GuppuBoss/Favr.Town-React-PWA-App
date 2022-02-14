import './override.scss';

import { Chip, FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

import classes from './inputField.module.scss';

const DropDown = ({
  value,
  isMultiple,
  isUpdateOnBlur,
  setValue,
  name,
  label,
  error,
  control,
  children,
  options,
  updateFunction,
  panelWidth,
  ...props
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
        width: panelWidth,
      },
    },
  };

  const handleOnBlur = async (onChange, e) => {
    onChange(e);

    if (isUpdateOnBlur) {
      updateFunction(name, { [name]: e.target.value });
    }
  };

  const labelId = `${name}-label`;
  return (
    <FormControl error={error?.message} {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <>
              <Select
                label={label}
                labelId={labelId}
                MenuProps={MenuProps}
                multiple={isMultiple}
                onBlur={(e) => {
                  handleOnBlur(field.onBlur, e);
                }}
                // eslint-disable-next-line react/jsx-handler-names
                onChange={(e) => {
                  if (isMultiple) {
                    if (e.target.value[e.target.value.length - 1] !== 0) {
                      setValue(e.target.value);
                      field.onChange(e);
                    }
                  } else {
                    field.onChange(e);
                  }
                }}
                renderValue={
                  isMultiple
                    ? (selected) => (
                        <div className={classes.chips}>
                          {selected.map((selectedValue) => (
                            <Chip
                              key={selectedValue}
                              className={classes.chip}
                              label={selectedValue}
                            />
                          ))}
                        </div>
                      )
                    : undefined
                }
                size="small"
                value={isMultiple ? value : field.value}
              >
                {children}
              </Select>
              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.shape().isRequired,
  isMultiple: PropTypes.bool.isRequired,
  isUpdateOnBlur: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  updateFunction: PropTypes.func.isRequired,
  panelWidth: PropTypes.number,
  // children: PropTypes.element().isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

DropDown.defaultProps = {
  error: null,
  panelWidth: 250,
};

export default DropDown;
