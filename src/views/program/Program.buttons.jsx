import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import toastNotification from '../../components/shared/alerts/toastNotification';
import StyledCheckIcon from '../../components/shared/customIcons/StyledCheckIcon';
import StyledWarnIcon from '../../components/shared/customIcons/StyledWarnIcon';
import notificationType from '../../constants/notification';
import getProgram from '../../redux/actions/programActions';
import { getProgramData } from '../../redux/selectors/accountSelector';
import { formatEpochTime } from '../../utils/timeUtil';
import classes from './program.module.scss';

const ProgramButtons = () => {
  const dispatch = useDispatch();
  const programData = useSelector(getProgramData);

  const timestampDecoder = (optionName) => {
    if (programData.item) {
      if (programData.item[optionName].updated) {
        const decodedTime = formatEpochTime(
          programData.item[optionName].updated,
          `MM/dd/yy', 'HH:mm`
        );
        return (
          <span className={classes.buttonUpdatedWrapper}>{decodedTime}</span>
        );
      }
    }
    return undefined;
  };

  useState(async () => {
    try {
      dispatch(getProgram(dispatch));
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  const navigate = useNavigate();

  const navigateToRulesPage = () => {
    navigate('/rules');
  };

  const navigateToRewardsPage = () => {
    navigate('/rewards');
  };

  const navigateToNewsPage = () => {
    navigate('/news');
  };

  const navigateToSurveyPage = () => {
    navigate('/surveys');
  };

  const navigateToStatisticsPage = () => {
    navigate('/statistics');
  };

  const navigateToSuggestionsPage = () => {
    navigate('/suggestions');
  };

  return (
    <div className={classes.programSectionWrapper}>
      <div className={classes.buttonsContentWrapper}>
        <div className={classes.buttonsGroupWrapper}>
          <div className={`${classes.buttonsWrapper} ${classes.marginRight}`}>
            <button
              className={`${classes.normalButtonWrapper}  ${classes.topleftButton}`}
              onClick={navigateToRulesPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}> RULES</h4>
              {timestampDecoder('rules')}
            </button>
            <div className={classes.topIcon}>
              {programData.item?.rules?.complete ? (
                <StyledCheckIcon />
              ) : (
                <StyledWarnIcon />
              )}
            </div>
          </div>
          <div className={`${classes.buttonsWrapper} ${classes.marginLeft}`}>
            <button
              className={`${classes.normalButtonWrapper} ${classes.toprightButton}`}
              onClick={navigateToRewardsPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}>REWARDS</h4>
              {timestampDecoder('rewards')}
            </button>
            <div className={classes.topIcon}>
              {programData.item?.rewards?.complete ? (
                <StyledCheckIcon />
              ) : (
                <StyledWarnIcon />
              )}
            </div>
          </div>
        </div>

        <div className={classes.buttonsGroupWrapper}>
          <div className={`${classes.buttonsWrapper} ${classes.marginRight}`}>
            <button
              className={`${classes.normalButtonWrapper}  ${classes.middleButton}`}
              onClick={navigateToNewsPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}>NEWS AND COUPONS</h4>
              {timestampDecoder('news')}
            </button>
            <div className={classes.middleIcon}>
              {programData.item?.news?.complete ? (
                <StyledCheckIcon />
              ) : (
                <StyledWarnIcon />
              )}
            </div>
          </div>
          <div className={`${classes.buttonsWrapper} ${classes.marginLeft}`}>
            <button
              className={`${classes.normalButtonWrapper}  ${classes.middleButton}`}
              onClick={navigateToSurveyPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}>SURVEYS</h4>
              {timestampDecoder('survey')}
            </button>
            {programData.item?.survey?.complete ? (
              <div className={classes.middleIconWrapper}>
                <StyledCheckIcon />
                {programData?.item?.survey?.new && (
                  <span className={classes.redDot}>.</span>
                )}
              </div>
            ) : (
              <div className={classes.middleIcon}>
                <StyledWarnIcon />
              </div>
            )}
          </div>
        </div>

        <div className={classes.bottomButtonsGroupWrapper}>
          <div className={`${classes.buttonsWrapper}  ${classes.selfAlign}`}>
            <button
              className={`${classes.normalButtonWrapper} ${classes.topleftButton}`}
              onClick={navigateToStatisticsPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}>STATISTICS</h4>
              {timestampDecoder('statistics')}
            </button>
            <div className={classes.topIcon}>
              {programData.item?.statistics?.complete ? (
                <StyledCheckIcon />
              ) : (
                <StyledWarnIcon />
              )}
            </div>
          </div>

          <div
            className={`${classes.buttonsWrapper} ${classes.marginBottomLeft}`}
          >
            <button
              className={`${classes.normalButtonWrapper} ${classes.middleButton}`}
              onClick={navigateToSuggestionsPage}
              type="button"
            >
              <h4 className={classes.buttonNameWrapper}>SUGGESTIONS</h4>
              {timestampDecoder('suggestions')}
            </button>
            {programData.item?.suggestions?.complete ? (
              <div className={classes.middleIconWrapper}>
                <StyledCheckIcon />
                {programData.item?.suggestions?.new && (
                  <span className={classes.redDot}>.</span>
                )}
              </div>
            ) : (
              <div className={classes.middleIcon}>
                <StyledWarnIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramButtons;
