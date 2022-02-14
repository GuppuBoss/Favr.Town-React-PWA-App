/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';
import './Cropper.scss';

import PropTypes from 'prop-types';
import React from 'react';
import Cropper from 'react-cropper';

const ReactCropper = ({ image, setCropper }) => {
  return (
    <div>
      <br />
      <Cropper
        autoCropArea={1}
        background={false}
        checkOrientation={false}
        className="cropper"
        guides={false}
        initialAspectRatio={4 / 3}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        preview=".img-preview"
        responsive
        src={image}
        viewMode={0}
      />
    </div>
  );
};

ReactCropper.propTypes = {
  image: PropTypes.string.isRequired,
  setCropper: PropTypes.func.isRequired,
};

export default ReactCropper;
