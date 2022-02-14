/* eslint-disable camelcase */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-sort-props */
import './override.scss';

import { Grid, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import shareIcon from '../../../assets/images/icons/icon_share.svg';
import trashIcon from '../../../assets/images/icons/icon_trash.svg';
import StandardButton from '../../../components/shared/buttons/StandardButton';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ExpirationComponent from '../../../components/shared/display/ExpirationComponent';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import BusinessCard from '../../search/BusinessCard';
import classes from './coupons.module.scss';

const CouponCard = ({ coupon, shareAction, deleteAction }) => {
  const {
    redeem,
    claimed,
    link,
    redeem_url,
    text,
    redeem_by,
    image,
    pk,
    sk,
    profile,
    id,
    flag_allow_redeem,
    flag_allow_remove,
  } = coupon;
  const navigate = useNavigate();
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  return (
    <Card className={classes.couponCard}>
      <img alt="coupon" src={couponIcon} className={classes.couponIcon} />
      <CardContent>
        <Grid container spacing={2}>
          <BusinessCard
            name={profile?.businessName}
            logo={profile?.logo}
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            tags={profile?.tags}
            about={profile?.about}
            onImageClick={() => {}}
          />
          <Grid item sm={12} xs={12}>
            <Typography variant="body2">{text}</Typography>
          </Grid>
          {link && (
            <Grid item sm={12} xs={12}>
              <Typography variant="body2">{link}</Typography>
            </Grid>
          )}
          <Grid item sm={12} xs={12}>
            <Typography variant="body2">{redeem}</Typography>
          </Grid>
          <ExpirationComponent expirationTime={redeem_by} claimed={claimed} />

          {image && (
            <Grid item sm={12} xs={12}>
              <img alt="reward" className={classes.couponImage} src={image} />
            </Grid>
          )}
          <Grid item container justifyContent="space-between">
            <IconButton
              aria-label="close"
              className={classes.profileImageDeleteIcon}
              disabled={!flag_allow_remove}
              size="medium"
              onClick={() => setIsDeleteConfirmationModalOpen(true)}
            >
              <StandardIcon alt="delete" src={trashIcon} />
            </IconButton>
            {flag_allow_redeem && (
              <StandardButton
                variant="contained"
                style={{ height: '35px', alignSelf: 'center' }}
                disabled={!redeem_url && !flag_allow_redeem}
                onClick={() => {
                  if (redeem_url) {
                    navigate(redeem_url);
                  }
                }}
              >
                Redeem
              </StandardButton>
            )}
            <IconButton
              aria-label="close"
              className={classes.profileImageDeleteIcon}
              size="medium"
              onClick={() => shareAction(pk, sk)}
            >
              <img alt="qr" src={shareIcon} style={{ height: '35px' }} />
            </IconButton>
          </Grid>
        </Grid>
        <GenericAreYouSureModal
          isOpen={isDeleteConfirmationModalOpen}
          handleClose={() => setIsDeleteConfirmationModalOpen(false)}
          onSubmit={() => deleteAction(id)}
          warning="This will remove the selected coupon."
        />
      </CardContent>
    </Card>
  );
};

CouponCard.propTypes = {
  coupon: PropTypes.shape({
    redeem: PropTypes.string.isRequired,
    claimed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    redeem_url: PropTypes.string.isRequired,
    pk: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    sk: PropTypes.string.isRequired,
    flag_allow_redeem: PropTypes.bool.isRequired,
    flag_allow_remove: PropTypes.bool.isRequired,
    redeem_by: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    profile: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  shareAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
};

export default CouponCard;
