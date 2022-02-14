import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import Dropdown from '../../components/shared/InputFields/DropDown';
import notificationType from '../../constants/notification';
import getRules, { patchRules } from '../../redux/actions/rulesActions';
import { getRulesData } from '../../redux/selectors/accountSelector';
import classes from './rules.module.scss';

const RulesForm = () => {
  const dispatch = useDispatch();
  const rules = useSelector(getRulesData);
  const [defaultValues, setDefaultValues] = useState(null);
  // const [formDefaults, setFormDefaults]=useState({});

  const { control, trigger, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...rules.item,
    },
  });

  useEffect(async () => {
    try {
      dispatch(getRules(dispatch));
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  const filterFlagsWithName = (ruleName) => {
    if (rules.flags?.flag_defaults[ruleName].source) {
      return rules.flags?.flag_defaults[ruleName].source;
    }
    return [];
  };

  const updateRules = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid && payload[field] !== rules.item[field]) {
      const data = await dispatch(patchRules(dispatch, payload));
      if (data.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: data.error,
        });
      }
    } else {
      const data = await dispatch(
        patchRules(dispatch, {
          [field]: rules.flags?.flag_defaults[field].default,
        })
      );
      setDefaultValues([field, rules.flags?.flag_defaults[field].default]);
      // setValue did not work here
      if (data.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: data.error,
        });
      }
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setValue(defaultValues[0], defaultValues[1]);
    }
  }, [defaultValues]);

  const getDropDownOptions = (dropDownOptions) => {
    return dropDownOptions.map((option) => (
      <MenuItem key={`salutation-dropdown-${option}`} value={option}>
        {option}
      </MenuItem>
    ));
  };
  return (
    <div className={classes.rulesSectionWrapper}>
      <form className={classes.rulesFormWrapper}>
        {rules.flags?.flag_defaults
          ? Object.keys(rules.flags.flag_defaults).map((key) => {
              return (
                <div key={key} className={classes.rulesInputContainer}>
                  <span className={classes.rulesLabelWrapper}>
                    {rules.flags.flag_defaults[key].label}
                  </span>
                  <div className={classes.rulesDropDawnWrapper}>
                    <Dropdown
                      control={control}
                      defaultValue={rules.item?.rule_welcome}
                      fullWidth
                      id={key}
                      isMultiple={false}
                      isUpdateOnBlur
                      label={undefined}
                      name={key}
                      panelWidth={150}
                      updateFunction={updateRules}
                      variant="outlined"
                    >
                      {getDropDownOptions(filterFlagsWithName(key))}
                    </Dropdown>
                  </div>
                </div>
              );
            })
          : undefined}
      </form>
    </div>
  );
};

export default RulesForm;
