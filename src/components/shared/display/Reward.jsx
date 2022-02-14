import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';

import rewardIcon from '../../../assets/images/icons/icon_logo.svg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './reward.module.scss';

const Reward = ({ percent, onClickFunction }) => {
  return (
    <div className={classes.rewardListWrapper}>
      <CircularProgress
        className={classes.emptyProgress}
        size={65}
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        thickness={6}
        value={100}
        variant="determinate"
      />
      <CircularProgress
        className={
          onClickFunction
            ? classes.buttonProgress
            : classes.buttonProgressDisabled
        }
        onClick={() => onClickFunction && onClickFunction()}
        size={65}
        thickness={6}
        value={percent}
        variant="static"
      />
      <StandardIcon alt="reward" className={classes.reward} src={rewardIcon} />
    </div>
  );
};

Reward.propTypes = {
  percent: PropTypes.number.isRequired,
  onClickFunction: PropTypes.func.isRequired,
};

export default Reward;
