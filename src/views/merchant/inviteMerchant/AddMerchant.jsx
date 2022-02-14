import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import notificationType from '../../../constants/notification';
import { requestAddMerchant } from '../../../redux/actions/patronActions';
import classes from './addMerchant.module.scss';
import AddMerchantForm from './AddMerchantForm';
import schema from './addMerchantFormSchema';

const addMerchantDefaultValues = {
  businessName: '',
  lanes: [],
  email: '',
  website: '',
};

const AddMerchant = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState([]);
  const { handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: addMerchantDefaultValues,
  });

  const onButtonClick = () => {
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      businessName: data.businessName,
      website: data.website ? data.website : undefined,
      lanes: data.lanes,
      email: data.email,
    };
    const result = await dispatch(requestAddMerchant(dispatch, payload));

    if (!result.error) {
      reset(addMerchantDefaultValues);
      toastNotification({
        type: notificationType.SUCCESS,
        message: result.message,
      });
      setValue([]);
      handleClose();
    }

    if (result?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: result.error,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <form id="profile_form_id" onSubmit={handleSubmit(onSubmit)}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Add Merchant</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            handleClose();
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>

      <DialogContent className="remove-side-padding">
        <GenericAreYouSureModal
          handleClose={handleModalClose}
          isOpen={isModalOpen}
          onSubmit={() => handleSubmit(onSubmit)}
          warning="This will send an email to the provided address, telling them
          about FAVR.TOWN, and giving them the opportunity to join.
          You'll earn FAVR if they do."
        />
        <AddMerchantForm
          control={control}
          formState={formState}
          setValue={setValue}
          value={value}
        />
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="flex-end">
          <Grid className={classes.buttonWrapper} item>
            <Button
              aria-label="log-out"
              className={classes.iconButton}
              onClick={handleSubmit(onButtonClick)}
            >
              <StandardIcon alt="upload" src={UploadIcon} />
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  );
};

AddMerchant.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddMerchant;
