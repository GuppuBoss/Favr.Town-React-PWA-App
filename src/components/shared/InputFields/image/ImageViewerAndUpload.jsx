import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { defaultProfilePic } from '../../../../constants/default';
import TrashIcon from '../../customIcons/TrashIcon';
import ModalWrapper from '../../modals/GenericModal';
import ModalBody from './ModalBody';
import classes from './upload.module.scss';

const ImageViewerAndUpload = ({
  aspectRatioX,
  aspectRatioY,
  defaultPicture,
  deleteFunction,
  error,
  uploadFunction,
  imageClassName,
}) => {
  const [image, setImage] = useState(defaultPicture);
  const [openModal, setOpenModal] = useState(false);
  const uploadRef = useRef(null);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setOpenModal(true);
      e.target.value = null;
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const shouldDisableDelete = () => {
    return defaultPicture === defaultProfilePic || !defaultPicture;
  };

  return (
    <>
      <input
        ref={uploadRef}
        onChange={onChange}
        style={{ display: 'none' }}
        type="file"
      />

      {defaultPicture && (
        <>
          <img
            alt="profileImage"
            className={imageClassName}
            // height="200px"
            src={defaultPicture}
            // width="200px"
          />
          <IconButton
            aria-label="close"
            className={classes.imageDeleteIcon}
            disabled={shouldDisableDelete()}
            onClick={deleteFunction}
            size="small"
          >
            <TrashIcon />
          </IconButton>
        </>
      )}
      <IconButton
        aria-label="close"
        className={classes.imageAddIcon}
        onClick={() => {
          uploadRef.current.click();
        }}
        size="small"
      >
        <AddIcon />
      </IconButton>
      {!defaultPicture && 'Upload optional image'}
      <ModalWrapper handleClose={handleModalClose} isOpen={openModal}>
        <ModalBody
          aspectRatioX={aspectRatioX}
          aspectRatioY={aspectRatioY}
          deleteFunction={deleteFunction}
          error={error}
          handleClose={handleModalClose}
          isGrayScale
          picture={image}
          setOpenModal={setOpenModal}
          uploadFunction={uploadFunction}
        />
      </ModalWrapper>
    </>
  );
};

ImageViewerAndUpload.propTypes = {
  // eslint-disable-next-line react/require-default-props
  aspectRatioX: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  aspectRatioY: PropTypes.number,
  defaultPicture: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  uploadFunction: PropTypes.func.isRequired,
  imageClassName: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

ImageViewerAndUpload.defaultProps = {
  error: null,
};

export default ImageViewerAndUpload;
