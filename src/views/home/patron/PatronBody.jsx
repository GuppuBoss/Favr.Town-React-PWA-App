import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import couponIcon from '../../../assets/images/icons/coupon.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import TagCloudWrapper from '../../../components/shared/display/TagCloud';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
import { getSettingsAction } from '../../../redux/actions/patronActions';
import { getSettings } from '../../../redux/selectors/accountSelector';
import useNetwork from '../../../utils/useNetwork';
import classes from './patron.module.scss';
import SkeletonLoading from './SkeletonLoading';

const colorOption = {
  luminosity: 'dark',
  hue: 'monochrome',
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PatronBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOnline = useNetwork();
  const settings = useSelector(getSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    try {
      await dispatch(getSettingsAction(dispatch));
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }
    setIsLoading(false);
    return () => {};
  }, []);

  const getTags = (lane) => {
    if (lane) {
      const laneArray = Object.keys(lane);

      return laneArray.map((eachLane) => {
        return {
          value: eachLane.split('_').join(' '),
          count: randomInteger(20, 40),
        };
      });
    }
    return [];
  };
  const handleLaneClicked = (tag) => {
    navigate(`${ROUTES.SEARCH}?lane=${tag.value}`);
  };

  return (
    <div className={classes.patronBodyWrapper}>
      <Grid container spacing="2">
        <Grid item sm={12} xs={12}>
          <IconButton
            aria-label="close"
            className={classes.profileImageAddIcon}
            onClick={() => navigate(ROUTES.SEARCH)}
            size="medium"
          >
            <SearchIcon style={{ fontSize: 35 }} />
          </IconButton>
        </Grid>
        {isLoading && <SkeletonLoading />}
        {!isLoading && settings?.lane && (
          <Grid item sm={12}>
            <TagCloudWrapper
              key="test"
              colorOptions={colorOption}
              maxSize={40}
              minSize={20}
              onClick={handleLaneClicked}
              tags={getTags(settings.lane)}
            />
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          <IconButton
            aria-label="close"
            className={classes.profileImageAddIcon}
            onClick={() => navigate(ROUTES.COUPON_BOOK)}
            size="medium"
          >
            <img alt="coupon" className={classes.couponIcon} src={couponIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default PatronBody;
