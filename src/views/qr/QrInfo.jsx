/* eslint-disable react/react-in-jsx-scope */
import { Button, Grid, Typography } from '@mui/material';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useState } from 'react';

import DownloadIcon from '../../assets/images/icons/icon_download.svg';
import ShareIcon from '../../assets/images/icons/icon_share.svg';
import StandardIcon from '../../components/shared/customIcons/StandardIcon';
import FooterButton from '../../components/shared/footers/FooterButton';
import GenericModal from '../../components/shared/modals/GenericModal';
import useNetwork from '../../utils/useNetwork';
import classes from './qr.module.scss';
import ModalBody from './QrModalBody';
import SkeletonLoading from './SkeletonLoading';

const QrInfo = ({ qr, isLoading, handleDownload, handleShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOnline = useNetwork();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.qrContainer}
        container
        justifyContent="center"
        spacing={2}
      >
        {isLoading && <SkeletonLoading />}
        {!isLoading && qr && (
          <>
            <Grid
              className={classes.qrWrapper}
              id="qr-image"
              item
              sm={7}
              xs={10}
            >
              {qr?.item?.QR && parse(qr?.item?.QR)}
            </Grid>
            <Grid
              className={classes.buttonWrapper}
              container
              item
              justifyContent="space-between"
              sm={7}
              xs={10}
            >
              <FooterButton onClick={handleShare}>
                <StandardIcon alt="share" src={ShareIcon} />
              </FooterButton>

              <Button
                className={classes.normalButtonWrapper}
                disabled={!isOnline}
                onClick={() => setIsOpen(true)}
                variant="contained"
              >
                SCAN
              </Button>
              <FooterButton onClick={handleDownload}>
                <StandardIcon alt="download" src={DownloadIcon} />
              </FooterButton>
            </Grid>
          </>
        )}
        {!isLoading && !qr && (
          <Grid container item justifyContent="center" sm={12} xs={12}>
            <Typography variant="body2">No Data</Typography>
          </Grid>
        )}
      </Grid>
      <GenericModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalBody handleClose={setIsOpen} />
      </GenericModal>
    </div>
  );
};

QrInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  qr: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
};

export default QrInfo;
