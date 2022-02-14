import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import FollowIcon from '../../../assets/images/icons/icon_follow.svg';
import ShareIcon from '../../../assets/images/icons/icon_share.svg';
import StandardIcon from '../customIcons/StandardIcon';
import classes from './footer.module.scss';
import FooterButton from './FooterButton';

const PatronSurveyDetailFooter = ({
  handleLike,
  handleShare,
  like,
  share,
  pk,
  sk,
  isShareDisabled,
}) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.doubleFooterButtonWrapper}>
        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-start"
          sm={3}
          xs={3}
        >
          <FooterButton onClick={() => handleLike({ pk, sk })}>
            <StandardIcon alt="follow" src={FollowIcon} />
          </FooterButton>
          <Typography className={classes.footerText} variant="body2">
            {like}
          </Typography>
        </Grid>

        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-end"
          sm={3}
          xs={3}
        >
          <Typography className={classes.footerText} variant="body2">
            {share}
          </Typography>
          <FooterButton
            isDisabled={isShareDisabled}
            onClick={() => handleShare({ pk, sk })}
          >
            <StandardIcon alt="share" src={ShareIcon} />
          </FooterButton>
        </Grid>
      </div>
    </div>
  );
};

PatronSurveyDetailFooter.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  isShareDisabled: PropTypes.bool.isRequired,
  like: PropTypes.number.isRequired,
  share: PropTypes.number.isRequired,
  pk: PropTypes.string.isRequired,
  sk: PropTypes.string.isRequired,
};

export default PatronSurveyDetailFooter;
