import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import ImageViewerAndUpload from '../../../components/shared/InputFields/image/ImageViewerAndUpload';
import SwitchComponent from '../../../components/shared/InputFields/Switch';
import InputField from '../../../components/shared/InputFields/TextField';
import ChangeDraftModal from '../../../components/shared/modals/ChangeDraftModal';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import notificationType from '../../../constants/notification';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, PATCH } from '../../../services/api';
import { getEpochMilliSec, getEpochSec } from '../../../utils/timeUtil';
import classes from '../survey.module.scss';
import SurveyChoice from './SurveyChoice';
import surveySchema from './surveySchema';

const MerchantSurveyDetail = ({ survey, setSurvey }) => {
  // const defaultValues = {
  //   question: '',
  //   end: new Date(),
  // };
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [shouldShowConfirmationModal, setShouldShowConfirmationModal] =
    useState(false);
  const [choices, setChoices] = useState(survey?.item?.choices || []);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(survey?.item?.image);
  const { control, formState, trigger, setError } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...survey?.item,
      end: getEpochMilliSec(survey.item.end),
    },
    resolver: yupResolver(surveySchema),
  });

  const updateSurvey = async (field, payload) => {
    const isValid = await trigger(field);

    if (isValid) {
      const data = await PATCH('survey', payload, { sk: survey?.item?.sk });
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  useEffect(() => {
    setChoices(survey?.item?.choices || []);
    return () => {};
  }, [survey]);

  const updateDate = async (field, payload) => {
    const isValid = await trigger(field);
    const epochSec = getEpochSec(payload[field]);

    if (isValid) {
      const d = new Date(payload[field]);
      d.setHours(24, 0, 0, 0);
      const data = await PATCH(
        'survey',
        { [field]: epochSec },
        { sk: survey?.item?.sk }
      );
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: 'Error saving data',
        });
      }
    }
  };

  // image Delete
  const handleImageDelete = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'image', {
        url: selectedImage,
        sk: survey.item.sk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setShouldShowConfirmationModal(false);
      setSelectedImage(undefined);
    }
  };

  const handleImageUpload = async (payload) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'image', {
        image: payload,
        type: 'survey',
        sk: survey.item.sk,
      })
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response.error) {
      setSelectedImage(response.item.image);
    }
  };

  const updateDraft = async (payload) => {
    const result = await dispatch(
      globalLoaderWrapper(dispatch, PATCH, 'survey', payload, {
        sk: survey?.item?.sk,
      })
    );

    if (!result?.error) {
      setSurvey(result);
    }
    return result;
  };
  const onDraftChange = async (field, payload) => {
    if (!payload[field]) {
      setIsDraftModalOpen(true);
    }
  };

  const isDraftDisabled = () => {
    if (!survey?.item?.draft) {
      return true;
    }
    if (!survey?.item?.choices) {
      return true;
    }

    return survey?.item?.choices?.length === 0;
  };

  return (
    <Grid container spacing={2}>
      <Grid container item justifyContent="flex-end" sm={12} xs={12}>
        <Grid className={classes.selfAlign} item sm={2} xs={2}>
          <Typography
            style={{ color: survey?.item?.draft ? 'red' : 'green' }}
            variant="body2"
          >
            {survey?.item?.draft ? 'DRAFT' : 'ACTIVE'}
          </Typography>
        </Grid>
        <Grid item sm={2} xs={2}>
          <SwitchComponent
            control={control}
            disabled={isDraftDisabled()}
            error={formState.errors.accept_gift_birthday}
            fullWidth
            isPassword={false}
            label="Switch"
            name="draft"
            updateFunction={onDraftChange}
            value={survey?.item?.draft}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} xs={12}>
        <Box className={classes.surveyImgContainer}>
          <ImageViewerAndUpload
            aspectRatioX={800}
            aspectRatioY={600}
            defaultPicture={selectedImage}
            deleteFunction={() => setShouldShowConfirmationModal(true)}
            isGrayScale
            uploadFunction={handleImageUpload}
          />
        </Box>
      </Grid>
      <Grid item sm={12} xs={12}>
        <InputField
          autoUpdate
          control={control}
          error={formState.errors.question}
          fullWidth
          isPassword={false}
          label="Question and background"
          maxRows={6}
          minRows={3}
          multiline
          name="question"
          updateFunction={updateSurvey}
        />
      </Grid>
      <Grid container item justifyContent="flex-end" sm={12} xs={12}>
        <Grid container item justifyContent="space-between" sm={12} xs={12}>
          <Grid className={classes.selfAlign} item sm={3} xs={4}>
            <Typography variant="body2">Survey ends:</Typography>
          </Grid>
          <Grid item sm={6} xs={8}>
            <DateTimePickerWrapper
              alignTextRight
              autoUpdate
              control={control}
              error={formState.errors.end}
              fullWidth
              isFutureDateDisabled={false}
              margin="none"
              name="end"
              showDate
              updateFunction={updateDate}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item justifyContent="space-between" sm={12} xs={12}>
        <Typography className={classes.selfAlign} variant="body2">
          Choices
        </Typography>
        <Grid
          className={classes.selfAlign}
          item
          justifyContent="center"
          sm={8}
          xs={7}
        >
          <hr className="mt-2" />
        </Grid>
        <IconButton
          aria-label="close"
          className={classes.profileImageDeleteIcon}
          onClick={() => {
            setChoices((preChoice) => {
              return [
                {
                  text: undefined,
                  image: undefined,
                  answer_count: 0,
                  answer_percent: 0,
                },
                ...preChoice,
              ];
            });
          }}
          size="small"
        >
          <AddIcon aria-label="close" />
        </IconButton>
      </Grid>
      <Grid>
        {choices?.map((choice, index) => (
          <SurveyChoice
            key={choice.id}
            choice={choice}
            choices={choices}
            index={index}
            setChoices={setChoices}
            setSurvey={setSurvey}
            sk={survey.item.sk}
          />
        ))}
      </Grid>
      <GenericAreYouSureModal
        handleClose={() => {
          setShouldShowConfirmationModal(false);
        }}
        isOpen={shouldShowConfirmationModal}
        onSubmit={handleImageDelete}
      />
      <ChangeDraftModal
        handleClose={() => {
          setIsDraftModalOpen(false);
        }}
        isOpen={isDraftModalOpen}
        updateFunction={updateDraft}
      />
    </Grid>
  );
};
MerchantSurveyDetail.propTypes = {
  setSurvey: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  survey: PropTypes.object.isRequired,
};

export default MerchantSurveyDetail;
