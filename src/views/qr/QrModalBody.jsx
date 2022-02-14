import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

const QrModalBody = ({ handleClose }) => {
  // eslint-disable-next-line no-console
  const handleError = (e) => console.log(`e`, e);
  const navigate = useNavigate();
  const { href } = window.location;
  const baseUrl = href.replace('/qr', '');
  const handleScan = (data) => {
    if (data && data.includes(baseUrl)) {
      const path = data.replace(baseUrl, '');
      navigate(path);
    }
  };
  return (
    <>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">QR Code Scanner</Typography>
        <IconButton
          aria-label="close"
          className="margin-left-auto"
          onClick={() => handleClose(false)}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent className="remove-side-padding">
        <QrReader
          delay={2000}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </DialogContent>
    </>
  );
};

QrModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default QrModalBody;
