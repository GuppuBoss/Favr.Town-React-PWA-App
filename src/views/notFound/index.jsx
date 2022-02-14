/* eslint-disable react/jsx-max-depth */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import promoIcon from '../../assets/images/icons/promo.svg';
import BannerContainer from '../../components/shared/containers/BannerContainer';
import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import classes from './notFound.module.scss';

const NotFound = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const isPatron = userGroup === userGroupsTypes.PATRON;

  return (
    <WrapperContainer>
      {isPatron && <PartonHeaderB />}
      {!isPatron && <MerchantHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item sm={6} xs={6}>
                <img alt="promo" className={classes.promo} src={promoIcon} />
              </Grid>
              <Grid item sm={6} style={{ marginTop: 'auto' }} xs={6}>
                <Typography variant="h4">404</Typography>
                <Typography variant="body2">
                  Hmm.. we can&apos;t find this ingredient.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </BannerContainer>
      </ContentSection>

      <StandardFooter />
    </WrapperContainer>
  );
};

export default NotFound;
