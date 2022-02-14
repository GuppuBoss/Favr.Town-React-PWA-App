import React from 'react';
import { useSelector } from 'react-redux';

import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import PatronFooter from '../../../components/shared/footers/PatronFooter';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import userGroupsTypes from '../../../constants/users';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import getUserGroup from '../../../utils/authUtil';
import classes from './conversationDetails.module.scss';
import ConversationInfo from './ConversationInfo';

const ConversationDetail = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const getHeader = () => {
    if (userGroup === userGroupsTypes.PATRON) return <PartonHeaderB />;
    if (userGroup === userGroupsTypes.MERCHANT) return <MerchantHeaderB />;
    return null;
  };

  const getFooter = () => {
    if (userGroup === userGroupsTypes.PATRON) return <PatronFooter />;
    if (userGroup === userGroupsTypes.MERCHANT) return <StandardFooter />;
    return <StandardFooter />;
  };

  return (
    <WrapperContainer>
      {getHeader()}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer}>
          <ConversationInfo />
        </BannerContainer>
      </ContentSection>
      {getFooter()}
    </WrapperContainer>
  );
};

export default ConversationDetail;
