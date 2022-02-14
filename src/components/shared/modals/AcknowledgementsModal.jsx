import CloseIcon from '@mui/icons-material/Close';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import data from '../../../licenses.json';
import classes from './modal.module.scss';

const AcknowledgementModal = (props) => {
  const [licenseList, setLicenseList] = useState([]);
  useEffect(() => {
    const dataList = Object.keys(data).map((key) => {
      return { name: key, otherDetails: data[key] };
    });
    setLicenseList(dataList);
  }, []);

  const getUrl = (license) => {
    if (!Object.keys(license.otherDetails)) return null;
    if (license.otherDetails.licenseUrl) {
      return license.otherDetails.licenseUrl;
    }
    if (license.otherDetails.repository) {
      return license.otherDetails.repository;
    }
    return null;
  };

  return (
    <Dialog maxWidth="md" onClose={props.handleClose} open={props.isOpen}>
      <div className={classes.acknowledgementModalContentWrapper}>
        <div className={classes.closeIconWrapper}>
          <CloseIcon fontSize="large" onClick={props.handleClose} />
        </div>
        <div className={classes.acknowledgementModalTitleWrapper}>
          <p className={classes.acknowledgementModalTitle}>
            We <FavoriteOutlinedIcon className={classes.favoriteIcon} /> Open
            Source
          </p>
        </div>
        <div>
          {licenseList.map((license) => {
            return (
              <div key={license.name} className={classes.licenseWrapper}>
                <Link target="_blank" to={{ pathname: getUrl(license) }}>
                  <p className={classes.repoWrapper}>{license.name}</p>
                </Link>
                <p className={classes.licenseTypeWrapper}>
                  {license.otherDetails.licenses}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default AcknowledgementModal;

AcknowledgementModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
