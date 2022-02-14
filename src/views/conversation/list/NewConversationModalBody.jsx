/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import InputField from '../../../components/shared/InputFields/TextField';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { PUT } from '../../../services/api';
import classes from './conversation.module.scss';
import schema from './newConversationFormSchema';

const NewConversationModalBody = ({
  handleClose,
  queryParam,
  isPatron,
  setConversation,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      topic: '',
      message: '',
      link: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'conversation', {
        ...data,
        link: data.link || undefined,
        to: isPatron ? queryParam?.merchant_pk : queryParam?.patron_pk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
    if (!response?.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message || 'Success',
      });
      if (isPatron) {
        setConversation((prevData) => ({
          ...prevData,
          items: [response.item, ...prevData.items],
        }));
      }
      handleClose(false);
    }
  };
  return (
    <form id="new-conversation-form" onSubmit={handleSubmit(onSubmit)}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">New Conversation</Typography>
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
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.topic}
              fullWidth
              isPassword={false}
              label="Topic"
              maxRows={6}
              minRows={3}
              multiline
              name="topic"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.message}
              fullWidth
              isPassword={false}
              label="Message"
              maxRows={6}
              minRows={3}
              multiline
              name="message"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              autoUpdate={false}
              control={control}
              error={formState.errors.link}
              fullWidth
              isPassword={false}
              label="URL"
              name="link"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="remove-side-padding">
        <Grid container justifyContent="flex-end">
          <Button
            aria-label="log-out"
            className={classes.iconButton}
            type="submit"
          >
            <StandardIcon alt="upload" src={UploadIcon} />
          </Button>
        </Grid>
      </DialogActions>
    </form>
  );
};

NewConversationModalBody.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  queryParam: PropTypes.object.isRequired,
  isPatron: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  setConversation: PropTypes.object.isRequired,
};

export default NewConversationModalBody;
