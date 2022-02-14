import React from 'react';

import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import { getContentHeight } from '../../utils/window';
import ProgramButtons from './Program.buttons';
import classes from './program.module.scss';

const Program = () => {
  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection
        className={classes.contentSection}
        style={{ height: getContentHeight() }}
      >
        <ProgramButtons />
      </ContentSection>
      <StandardFooter />
    </WrapperContainer>
  );
};

export default Program;
