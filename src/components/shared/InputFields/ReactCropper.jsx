// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';
import './Cropper.scss';

import PropTypes from 'prop-types';
import React from 'react';
import Cropper from 'react-cropper';

const ReactCropper = ({
  image,
  aspectRatioX = 600,
  aspectRatioY = 600,
  setCropper,
}) => {
  return (
    <div>
      <br />
      <Cropper
        aspectRatio={aspectRatioX / aspectRatioY}
        autoCropArea={1}
        background={false}
        checkOrientation={false}
        className="cropper"
        guides={false}
        initialAspectRatio={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        responsive
        src={image}
        viewMode={0}
      />
    </div>
  );
};

ReactCropper.propTypes = {
  image: PropTypes.string.isRequired,
  aspectRatioX: PropTypes.number.isRequired,
  aspectRatioY: PropTypes.number.isRequired,
  setCropper: PropTypes.func.isRequired,
};

export default ReactCropper;
