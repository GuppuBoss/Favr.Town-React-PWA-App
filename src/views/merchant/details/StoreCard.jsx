import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import notificationType from '../../../constants/notification';
import { setMerchantLocation } from '../../../redux/actions/patronActions';
import classes from './merchantDetails.module.scss';

const StoreCard = (props) => {
  const dispatch = useDispatch();
  const handleStoreSelect = async (merchantPk, id) => {
    try {
      const response = await dispatch(
        setMerchantLocation(dispatch, { id, merchant_pk: merchantPk }, true)
      );

      if (response?.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: response?.error,
        });
      }

      if (!response?.error) {
        toastNotification({
          type: notificationType.SUCCESS,
          message: 'Location selected',
        });
      }
      props.handleClose(false);
    } catch (e) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'Something went wrong',
      });
    }
  };

  return (
    <Card className={classes.storeCard}>
      <CardActionArea>
        <CardContent
          onClick={() => {
            handleStoreSelect(props.merchantPk, props?.store?.id);
          }}
        >
          <Grid container justifyContent="center">
            <Grid className={classes.storeText} item>
              {props?.store?.store}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

StoreCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
  merchantPk: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default StoreCard;
