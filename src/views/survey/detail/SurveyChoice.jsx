/* eslint-disable react/jsx-max-depth */
import { Box, Card, Grid, IconButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import TrashIcon from '../../../components/shared/customIcons/TrashIcon';
import ImageViewerAndUpload from '../../../components/shared/InputFields/image/ImageViewerAndUpload';
import InputField from '../../../components/shared/InputFields/TextField';
import DeleteChoiceModal from '../../../components/shared/modals/DeleteChoiceModal';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, PATCH } from '../../../services/api';
import classes from '../survey.module.scss';
import LinearProgress from './LinearProgress';

const SurveyChoice = ({
  choice,
  isPatron,
  index,
  choices,
  sk,
  setChoices,
  setSurvey,
}) => {
  const defaultValues = {
    text: choice?.text,
  };
  const dispatch = useDispatch();
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(choice?.image);
  const { control, formState, trigger, setError } = useForm({
    mode: 'onBlur',
    defaultValues,
  });
  // image Delete
  const handleImageDelete = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'image', {
        url: selectedImage,
        // sk: survey.item.sk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setSelectedImage(undefined);
    }
  };

  useEffect(() => {
    setSelectedImage(choice?.image);
    return () => {};
  }, [choice]);

  const updateProfile = async (field, payload) => {
    const isValid = await trigger(field);

    const queryParam = choice?.id ? { sk, id: choice.id } : { sk };

    const updatePaylod = choice?.image
      ? { ...payload, image: choice?.image }
      : payload;
    if (isValid) {
      const data = await PATCH('surveyChoice', updatePaylod, queryParam);
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }

      if (!data?.error) {
        setSurvey(data);
      }
    }
  };

  const handleImageUpload = async (payload) => {
    const choicesPayload = [...choices];
    choicesPayload[index] = {
      ...choicesPayload[index],
      image: payload,
    };

    const queryParam = choice?.id ? { sk, id: choice.id } : { sk };

    const response = await dispatch(
      globalLoaderWrapper(
        dispatch,
        PATCH,
        'surveyChoice',
        {
          text: choice.text,
          image: payload,
        },
        queryParam
      )
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setSurvey(response);
      // setSelectedImage(response?.item?.choices[index]?.image);
    }
  };

  return (
    <Card className={classes.choiceCard}>
      <CardContent>
        <Grid container justifyContent="center" spacing={2}>
          {isPatron && selectedImage && (
            <Grid item sm={12} xs={12}>
              <Box className={classes.surveyImgContainer}>
                <img alt="choice" src={selectedImage} />
              </Box>
            </Grid>
          )}
          {!isPatron && (
            <Grid item sm={12} xs={12}>
              <Box className={classes.surveyImgContainer}>
                <ImageViewerAndUpload
                  aspectRatioX={800}
                  aspectRatioY={600}
                  defaultPicture={selectedImage}
                  deleteFunction={handleImageDelete}
                  isGrayScale
                  uploadFunction={handleImageUpload}
                />
              </Box>
            </Grid>
          )}
          {((isPatron && choice?.text) || !isPatron) && (
            <Grid item sm={12} xs={12}>
              <InputField
                autoUpdate
                control={control}
                disabled={isPatron}
                error={formState.errors.text}
                fullWidth
                isPassword={false}
                label="Text"
                maxRows={6}
                minRows={1}
                multiline
                name="text"
                updateFunction={updateProfile}
              />
            </Grid>
          )}
          <Grid container item justifyContent="space-between" sm={12} xs={12}>
            {!isPatron && (
              <Grid item sm={1} xs={1}>
                <IconButton
                  aria-label="close"
                  className={classes.profileImageDeleteIcon}
                  onClick={() => {
                    if (!choice?.id) {
                      choices.splice(index, 1);
                      setChoices([...choices]);
                    } else setIsDeleteConfirm(true);
                  }}
                  size="small"
                >
                  <TrashIcon />
                </IconButton>
              </Grid>
            )}
            <Grid
              className={classes.selfAlign}
              item
              sm={isPatron ? 12 : 11}
              xs={isPatron ? 12 : 11}
            >
              <LinearProgress index={index} value={choice?.vote_percent} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <DeleteChoiceModal
        handleClose={() => {
          setIsDeleteConfirm(false);
        }}
        id={choice.id}
        isOpen={isDeleteConfirm}
        path="surveyChoice"
        setSurvey={setSurvey}
        sk={sk}
      />
    </Card>
  );
};

SurveyChoice.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  choice: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  choices: PropTypes.array.isRequired,
  isPatron: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  sk: PropTypes.string.isRequired,
  setSurvey: PropTypes.func.isRequired,
  setChoices: PropTypes.func.isRequired,
};

export default SurveyChoice;
