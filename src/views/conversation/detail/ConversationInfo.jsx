/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import UploadIcon from '../../../assets/images/icons/icon_upload.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import StandardButton from '../../../components/shared/buttons/StandardButton';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../../components/shared/display/NoData';
import InputField from '../../../components/shared/InputFields/TextField';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { GET, PATCH } from '../../../services/api';
import useNetwork from '../../../utils/useNetwork';
import { getContentHeight } from '../../../utils/window';
import classes from './conversationDetails.module.scss';
import schema from './messageFormSchema';
import Messages from './Messages';
import SkeletonCard, {
  MyMessageSkeleton,
  YourMessages,
} from './SkeletonLoading';

const defaultValues = {
  message: '',
  link: '',
};

const ConversationInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isOnline = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [conversationDetail, setConversationDetail] = useState({});
  const dispatch = useDispatch();
  const { handleSubmit, control, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const fetchConversationDetail = async (payload) => {
    if (payload.ExclusiveStartKey) {
      const data = await GET('conversation', {
        ...payload,
        id,
      });

      await setConversationDetail((preValue) => {
        return {
          items: [...preValue.items, ...data.items],
          LastEvaluatedKey: data.LastEvaluatedKey,
        };
      });
    }
    if (!payload.ExclusiveStartKey) {
      const data = await GET('conversation', {
        id,
      });

      setConversationDetail(data);
    }
  };

  const handleFetchMore = async (payload) => {
    await fetchConversationDetail(payload);
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      await fetchConversationDetail({});
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }
    setIsLoading(false);

    return () => {};
  }, []);
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      ur: data.link || undefined,
    };
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'conversation', payload, {
        id,
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
        message: response.error,
      });

      reset(defaultValues);
      setConversationDetail(response);

      setIsResponseModalOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item sm={12} xs={12}>
          {isLoading && <SkeletonCard />}
          {!isLoading && (
            <Grid container spacing={2}>
              <Grid container item justifyContent="center" sm={2} xs={2}>
                <img
                  alt="user"
                  className={classes.conversationIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(conversationDetail?.item?.partner?.url);
                  }}
                  src={
                    conversationDetail?.item?.partner?.profilePicture ||
                    conversationDetail?.item?.partner?.logo
                  }
                />
              </Grid>
              <Grid className="align-self-center" item sm={9} xs={9}>
                <Typography variant="body2">
                  {conversationDetail?.item?.partner?.login}
                </Typography>
                {conversationDetail?.item?.time && (
                  <Typography style={{ fontWeight: 600 }} variant="body2">
                    {conversationDetail?.item?.topic}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container item justifyContent="flex-end" sm={12} xs={12}>
          <StandardButton
            onClick={() => setIsResponseModalOpen(true)}
            variant="contained"
          >
            Respond
          </StandardButton>
        </Grid>
        <GenericModal
          handleClose={() => setIsResponseModalOpen(false)}
          isOpen={isResponseModalOpen}
        >
          <form id="profile_form_id" onSubmit={handleSubmit(onSubmit)}>
            <MuiDialogTitle disableTypography>
              <Typography variant="h6">Respond</Typography>

              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={() => setIsResponseModalOpen(false)}
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
                    error={formState.errors.message}
                    fullWidth
                    isPassword={false}
                    label="Response"
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
                    label="URL (optional)"
                    name="link"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="remove-side-padding">
              <Grid container item justifyContent="flex-end" sm={12} xs={12}>
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
        </GenericModal>

        {
          // Message Content
        }
        <Grid
          className={classes.messageList}
          id="divScrollable"
          item
          sm={12}
          style={{ height: getContentHeight(328) }}
          xs={12}
        >
          {!isLoading && !conversationDetail?.item?.conversation?.length && (
            <NoData />
          )}
          <InfiniteScrollWrapper
            fetchMoreData={async () => {
              setIsLoading(true);
              try {
                await handleFetchMore({
                  ExclusiveStartKey: conversationDetail?.LastEvaluatedKey,
                });
              } catch (error) {
                if (isOnline) {
                  toastNotification({
                    type: notificationType.ERROR,
                    message: 'something went wrong',
                  });
                }
              }

              setIsLoading(false);
            }}
            hasMore={false}
            length={3}
            scrollableTarget="divScrollable"
          >
            {conversationDetail?.item?.conversation?.map((message) => (
              <Messages key={message.time} message={message} />
            ))}

            {isLoading && <YourMessages />}
            {isLoading && <MyMessageSkeleton />}
          </InfiniteScrollWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConversationInfo;
