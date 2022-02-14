import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './modal.module.scss';

const GenericModal = (props) => {
  return (
    <Dialog
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={props.handleClose}
      open={props.isOpen}
      scroll="paper"
    >
      <div className={classes.modalWrapper}>{props.children}</div>
    </Dialog>
  );
};

GenericModal.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default GenericModal;
