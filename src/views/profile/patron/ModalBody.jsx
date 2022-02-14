/* eslint-disable react/jsx-max-depth */
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import resizeImage from 'resize-image';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import ReactCropper from '../../../components/shared/InputFields/ReactCropper';
import { toGrayScale } from '../../../utils/imageUtil';
import classes from './profile.module.scss';

const ModalBody = ({
  error,
  picture,
  handleClose,
  isGrayScale,
  aspectRatioX = 400,
  aspectRatioY = 400,
  uploadFunction,
}) => {
  const [image, setImage] = useState(picture);
  const [cropper, setCropper] = useState();

  const handleUpload = async () => {
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
  };

  return (
    <>
      <DialogContent className="remove-side-padding">
        <Grid
          className={classes.gridRoot}
          container
          justifyContent="space-between"
        >
          <Grid alignItems="center" container justifyContent="center">
            <Grid alignContent="center" item justifyContent="center">
              <ReactCropper
                aspectRatioX={aspectRatioX}
                aspectRatioY={aspectRatioY}
                cropper={cropper}
                image={image}
                setCropper={setCropper}
                setImage={setImage}
              />
              {error && <p className={classes.errorText}>{error.message}</p>}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="space-between">
          <Grid className={classes.buttonWrapper} item>
            <Button
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
              <StandardIcon alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

ModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  uploadFunction: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  isGrayScale: PropTypes.bool.isRequired,
  aspectRatioX: PropTypes.number.isRequired,
  aspectRatioY: PropTypes.number.isRequired,
};

ModalBody.defaultProps = {
  error: null,
};

export default ModalBody;
