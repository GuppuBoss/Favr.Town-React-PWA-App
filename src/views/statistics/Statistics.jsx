import React from 'react';

import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import { getContentHeight } from '../../utils/window';
import StatisticsDataComponent from './Statistics.Data';
import classes from './statistics.module.scss';

const Statistics = () => {
  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection
        className={classes.contentSection}
        style={{ height: getContentHeight() }}
      >
        <StatisticsDataComponent />
      </ContentSection>
      <StandardFooter />
    </WrapperContainer>
  );
};

export default Statistics;
