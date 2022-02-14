/* eslint-disable react/jsx-max-depth */
import './override.scss';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import classes from './merchantDetails.module.scss';
import StoreCard from './StoreCard';
import StoreSkeletonCard from './StoreSkeletonCard';

const StoreModalBody = ({ handleClose, merchantPk, fetchMerchantStore }) => {
  const [storeInfo, setStoreInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
    const data = await fetchMerchantStore({
      merchant_pk: merchantPk,
      short: true,
    });

    setStoreInfo(data.items);
    setIsLoading(false);
    return () => {};
  }, []);
  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Select My Store</Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={() => handleClose(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
        >
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              Select preferred store:
            </Grid>
            <Grid item sm={12} xs={12}>
              {isLoading && <StoreSkeletonCard />}
              {!isLoading && !storeInfo.length && (
                <Typography variant="body2">No data</Typography>
              )}
              {storeInfo?.map((store) => (
                <StoreCard
                  key={store.id}
                  handleClose={handleClose}
                  merchantPk={merchantPk}
                  store={store}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

StoreModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  merchantPk: PropTypes.string.isRequired,
  fetchMerchantStore: PropTypes.func.isRequired,
};

export default StoreModalBody;
