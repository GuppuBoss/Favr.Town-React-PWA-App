import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import miximizeIcon from '../../../assets/images/icons/maximize.svg';
import minimizeIcon from '../../../assets/images/icons/minimize.svg';
import ImageModal from '../../../components/shared/modals/ImageModal';
import HorizontalScroll from './HorizontalScroll';
import MerchantAboutHeadlines from './MerchantAboutHeadlines';
import classes from './merchantDetails.module.scss';

const About = ({ merchantDetails, onStoreClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState({
    isOpen: false,
    image: '',
  });
  return (
    <>
      {!isExpanded && (
        <Grid item sm={12} xs={12}>
          <Typography className={classes.expandWrapper} variant="body2">
            {merchantDetails?.about?.slice(0, 40)}...
            <img
              alt="maximize"
              className={classes.expand}
              onClick={() => {
                setIsExpanded(true);
              }}
              src={miximizeIcon}
              style={{ width: '20px', cursor: 'pointer' }}
            />
          </Typography>
        </Grid>
      )}
      {isExpanded && (
        <>
          <Grid item sm={12} xs={12}>
            <Typography className={classes.expandWrapper} variant="body2">
              {merchantDetails?.about}
            </Typography>
          </Grid>
          <Grid container item justifyContent="flex-end" sm={12} xs={12}>
            <Typography className={classes.expandWrapper} variant="body2">
              {merchantDetails?.stat_follower
                ? merchantDetails?.stat_follower
                : 0}{' '}
              followers
            </Typography>
          </Grid>

          <MerchantAboutHeadlines headline="Album" />

          <HorizontalScroll container direction="row" item sm={12} xs={12}>
            {merchantDetails?.album?.map((value) => (
              <div key={value} className={classes.album}>
                <img
                  alt="profileImage"
                  className={classes.albumImage}
                  onClick={() =>
                    setIsImageModalOpen({ isOpen: true, image: value })
                  }
                  src={value}
                />
              </div>
            ))}
          </HorizontalScroll>
          {merchantDetails?.my_store?.store && (
            <>
              <MerchantAboutHeadlines headline="My store" />

              <Grid item sm={12} xs={12}>
                <Typography
                  className={classes.storeText}
                  onClick={() => onStoreClick(true)}
                  variant="body2"
                >
                  {merchantDetails?.my_store?.store}
                </Typography>
              </Grid>
            </>
          )}
          <Grid container item justifyContent="flex-end">
            <img
              alt="profileImage"
              onClick={() => {
                setIsExpanded(false);
              }}
              src={minimizeIcon}
              style={{ width: '20px', cursor: 'pointer' }}
            />
          </Grid>
          <ImageModal
            handleClose={() =>
              setIsImageModalOpen({ isOpen: false, image: '' })
            }
            image={isImageModalOpen.image}
            isOpen={isImageModalOpen.isOpen}
          />
        </>
      )}
    </>
  );
};

About.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchantDetails: PropTypes.object.isRequired,
  onStoreClick: PropTypes.func.isRequired,
};

export default About;
