import React from 'react';
import { useSelector } from 'react-redux';

import BannerContainer from '../../components/shared/containers/BannerContainer';
import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import PatronFooter from '../../components/shared/footers/PatronFooter';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import userGroupsTypes from '../../constants/users';
import {
  getAuthenticatedUser,
  getUserData,
} from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import ActionList from './ActionList';
import classes from './actions.module.scss';

const Actions = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userData = useSelector(getUserData);

  const userGroup = getUserGroup(authenticatedUser);
  const isPatron = userGroup === userGroupsTypes.PATRON;
  return (
    <WrapperContainer>
      {isPatron && <PartonHeaderB />}
      {!isPatron && <MerchantHeaderB />}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <ActionList />
        </BannerContainer>
      </ContentSection>
      <StandardFooter />
      {isPatron && <PatronFooter isActionDisabled newFlags={userData?.flags} />}
    </WrapperContainer>
  );
};

export default Actions;
