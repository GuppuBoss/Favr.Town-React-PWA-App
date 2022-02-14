import React from 'react';

import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderA from '../../../components/shared/headers/MerchantHeaderA';

const AddSurvey = () => {
  return (
    <WrapperContainer>
      <MerchantHeaderA />
      <ContentSection>
        <p>Add Survey goes here</p>
        <BannerContainer />
      </ContentSection>
      <StandardFooter />
    </WrapperContainer>
  );
};

export default AddSurvey;
