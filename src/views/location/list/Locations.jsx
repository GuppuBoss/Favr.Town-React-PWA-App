import React from 'react';

import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import classes from './locations.module.scss';
import LocationsList from './LocationsList';

const Locations = () => {
  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            <LocationsList />
          </div>
        </BannerContainer>
      </ContentSection>
      <StandardFooter />
    </WrapperContainer>
  );
};

export default Locations;
