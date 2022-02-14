/* eslint-disable react/jsx-max-depth */
import { CircularProgress, Grid, ListSubheader } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropDown from '../../../components/shared/InputFields/DropDown';
import TextFieldWrapper from '../../../components/shared/InputFields/TextField';
import { getSettingsAction } from '../../../redux/actions/patronActions';
import { getSettings } from '../../../redux/selectors/accountSelector';
import classes from './addMerchant.module.scss';

const AddMerchantForm = ({ formState, control, value, setValue }) => {
  const dispatch = useDispatch();
  const settings = useSelector(getSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    await dispatch(getSettingsAction(dispatch));
    setIsLoading(false);
    return () => {};
  }, []);

  const getTags = (lane) => {
    if (lane) {
      const laneArray = Object.keys(lane);
      const arrayOfArray = laneArray.map((laneName) => {
        return [laneName, ...lane[laneName]];
      });

      return arrayOfArray;
    }
    return [];
  };

  const optionsElements = () => {
    const tagsArray = settings?.lane && getTags(settings.lane);
    if (!tagsArray && isLoading) {
      return (
        <div>
          <ListSubheader className={classes.loader}>
            <CircularProgress />
          </ListSubheader>
        </div>
      );
    }

    if (tagsArray) {
      return tagsArray?.map((lane) => {
        return lane.map((specialtyValue, index) => {
          if (index === 0) {
            return (
              <ListSubheader
                key={specialtyValue}
                className={classes.listSubHeader}
                onClick={(e) => e.preventDefault()}
                value={0}
              >
                {specialtyValue}
              </ListSubheader>
            );
          }
          return (
            <MenuItem key={specialtyValue} value={specialtyValue}>
              {specialtyValue}
            </MenuItem>
          );
        });
      });
    }

    return (
      <div>
        <ListSubheader key="No Data" className={classes.listSubHeader}>
          No Data
        </ListSubheader>
      </div>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextFieldWrapper
          autoUpdate={false}
          control={control}
          error={formState.errors.businessName}
          fullWidth
          label="Business Name"
          name="businessName"
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          autoUpdate={false}
          control={control}
          error={formState.errors.lanes}
          fullWidth
          isMultiple
          isUpdateOnBlur={false}
          label="Product Lane(s)"
          name="lanes"
          options={settings}
          setValue={setValue}
          value={value}
          variant="outlined"
        >
          {optionsElements()}
        </DropDown>
      </Grid>
      <Grid item xs={12}>
        <TextFieldWrapper
          autoUpdate={false}
          control={control}
          error={formState.errors.email}
          fullWidth
          label="Merchant Email"
          name="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWrapper
          autoUpdate={false}
          control={control}
          error={formState.errors.website}
          fullWidth
          label="Website"
          name="website"
        />
      </Grid>
    </Grid>
  );
};

AddMerchantForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formState: PropTypes.object.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
  control: PropTypes.func.isRequired,
};

export default AddMerchantForm;
