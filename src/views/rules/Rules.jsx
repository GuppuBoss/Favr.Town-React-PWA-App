import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import notificationType from '../../constants/notification';
import getRules from '../../redux/actions/rulesActions';
import { getRulesData } from '../../redux/selectors/accountSelector';
import { getContentHeight } from '../../utils/window';
import RulesForm from './Rules.Form';
import classes from './rules.module.scss';

const Rules = () => {
  const dispatch = useDispatch();
  const rules = useSelector(getRulesData);

  useEffect(async () => {
    try {
      dispatch(getRules(dispatch));
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  return (
    <WrapperContainer>
      <MerchantHeaderB />

      <ContentSection
        className={classes.contentSection}
        style={{ height: getContentHeight() }}
      >
        {rules.item || rules.flags?.flag_defaults ? <RulesForm /> : undefined}
      </ContentSection>
      <StandardFooter />
    </WrapperContainer>
  );
};

export default Rules;
