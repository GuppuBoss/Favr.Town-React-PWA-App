import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import DialogWrapper from '../../../components/shared/modals/GenericModal';
import classList from '../../../components/shared/modals/modal.module.scss';

const PurchaseModal = ({
  handlePatronPurchaseModalClose,
  isPatronPurchaseModalOpen,
  purchaseAction,
}) => {
  return (
    <DialogWrapper
      handleClose={handlePatronPurchaseModalClose}
      isOpen={isPatronPurchaseModalOpen}
    >
      <>
        <Box fontWeight={600} mb={2}>
          ARE YOU SURE?
        </Box>
        <div className={classList.areYouSureModalButtonWrapper}>
          <button
            className={classList.normalButtonWrapper}
            onClick={handlePatronPurchaseModalClose}
            type="button"
          >
            CANCEL
          </button>
          <button
            className={classList.normalButtonWrapper}
            onClick={purchaseAction}
            type="button"
          >
            CONFIRM
          </button>
        </div>
      </>
    </DialogWrapper>
  );
};

export default PurchaseModal;

PurchaseModal.propTypes = {
  handlePatronPurchaseModalClose: PropTypes.func.isRequired,
  isPatronPurchaseModalOpen: PropTypes.bool.isRequired,
  purchaseAction: PropTypes.func.isRequired,
};
