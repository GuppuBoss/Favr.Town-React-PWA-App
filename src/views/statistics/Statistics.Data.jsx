import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import toastNotification from '../../components/shared/alerts/toastNotification';
import notificationType from '../../constants/notification';
import getStatistics from '../../redux/actions/statisticsActions';
import { getStatisticsData } from '../../redux/selectors/accountSelector';
import classes from './statistics.module.scss';

const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

const StatisticsDataComponent = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(getStatisticsData);
  const date = new Intl.DateTimeFormat('en-US', dateOptions).format(
    statistics.timeStamp
  );

  useEffect(async () => {
    try {
      dispatch(getStatistics(dispatch));
    } catch (error) {
      toastNotification({
        type: notificationType.ERROR,
        message: 'something went wrong',
      });
    }
  }, []);

  return (
    <div className={classes.staticsSectionWrapper}>
      <h2 className={classes.staticsSectionHeader}>favr.town numbers</h2>
      <div className={classes.staticsSectionDataWrapper}>
        <div className={classes.statisticsTopWrapper}>
          <div className={classes.statisticsLineWrapper}>
            <h4 className={classes.staticsNameWrapper}>joined</h4>
            <span className={classes.staticsValueWrapper}>{date}</span>
          </div>
          <div className={classes.statisticsLineWrapper}>
            <h4 className={classes.staticsNameWrapper}>follower</h4>
            <span className={classes.staticsValueWrapper}>
              {statistics.item?.conversation}
            </span>
          </div>
        </div>
        <div className={classes.staticsBottomWrapper}>
          {Object.entries(statistics.item ? statistics.item : {}).map(
            ([key, value]) =>
              key !== 'follower' && key !== 'joined' ? (
                <div key={key} className={classes.statisticsLineWrapper}>
                  <h4 className={classes.staticsNameWrapper}>{key}</h4>
                  <span className={classes.staticsValueWrapper}>{value}</span>
                </div>
              ) : undefined
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsDataComponent;
