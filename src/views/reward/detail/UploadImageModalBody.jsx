/* eslint-disable react/jsx-max-depth */
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import resizeImage from 'resize-image';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import ReactCropper from '../../../components/shared/InputFields/ReactCropper';
import { toGrayScale } from '../../../utils/imageUtil';
import classes from '../rewards.module.scss';

const aspectRatioX = 800;
const aspectRatioY = 600;

const ModalBody = ({ handleClose, picture, uploadFunction, isGrayScale }) => {
  const [image, setImage] = useState(picture);
  const [cropper, setCropper] = useState();

  const handleUpload = async () => {
    if (cropper.getCroppedCanvas()) {
      let finalImage;
      if (cropper?.getCroppedCanvas()) {
        if (isGrayScale) {
          const data = cropper.getCroppedCanvas({
            fillColor: '#000000',
          });
          toGrayScale(data, data);
          finalImage = data.toDataURL();
        } else {
          finalImage = cropper.getCroppedCanvas().toDataURL();
        }

        const imageToResize = new Image();
        imageToResize.src = finalImage;

        imageToResize.onload = async () => {
          const resizedImage = resizeImage.resize(
            imageToResize,
            aspectRatioX,
            aspectRatioY,
            resizeImage.PNG
          );

          await uploadFunction(resizedImage.split(',')[1]);
        };
      }
    }
  };

  return (
    <>
      <DialogContent style={{ overflowY: 'hidden' }}>
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
        >
          <Grid alignItems="center" container justifyContent="center">
            <Grid alignContent="center" container item justifyContent="center">
              <ReactCropper
                aspectRatioX={aspectRatioX}
                aspectRatioY={aspectRatioY}
                cropper={cropper}
                image={image}
                setCropper={setCropper}
                setImage={setImage}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="space-between">
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              component="span"
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" />
            </Button>
          </Grid>
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              component="span"
              onClick={handleUpload}
            >
              <img alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

ModalBody.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  uploadFunction: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  isGrayScale: PropTypes.bool.isRequired,
};

export default ModalBody;
