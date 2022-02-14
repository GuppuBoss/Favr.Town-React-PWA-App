/* eslint-disable react/jsx-max-depth */
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import resizeImage from 'resize-image';

import UploadIcon from '../../../../assets/images/icons/icon_upload.svg';
import { toGrayScale } from '../../../../utils/imageUtil';
import StandardIcon from '../../customIcons/StandardIcon';
import ReactCropper from '../ReactCropper';
import classes from './upload.module.scss';

const ModalBody = ({
  aspectRatioX,
  aspectRatioY,
  error,
  picture,
  handleClose,
  isGrayScale,
  uploadFunction,
  setOpenModal,
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
        setOpenModal(false);
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
              <StandardIcon alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

ModalBody.propTypes = {
  aspectRatioX: PropTypes.number,
  aspectRatioY: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  uploadFunction: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  isGrayScale: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

ModalBody.defaultProps = {
  aspectRatioX: 600,
  aspectRatioY: 600,
  error: null,
};

export default ModalBody;
