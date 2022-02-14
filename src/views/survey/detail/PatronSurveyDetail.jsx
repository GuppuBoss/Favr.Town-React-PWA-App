import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import StandardButton from '../../../components/shared/buttons/StandardButton';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import GenericModal from '../../../components/shared/modals/GenericModal';
import { formatEpochTime } from '../../../utils/timeUtil';
import MerchantAboutHeadlines from '../../merchant/details/MerchantAboutHeadlines';
import BusinessCard from '../../search/BusinessCard';
import classes from '../survey.module.scss';
import SurveyChoice from './SurveyChoice';
import VoteModalBody from './VoteModalBody';

const PatronSurveyDetail = ({ survey, setSurvey }) => {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid
        // className={!isCoupon ? undefined : classes.couponWrapper}
        container
        item
        sm={12}
        spacing={2}
        xs={12}
      >
        <BusinessCard
          logo={survey?.item?.profile?.logo}
          name={survey?.item?.profile?.businessName}
          tags={survey?.item?.profile?.tags}
        />
      </Grid>
      {survey?.item?.image && (
        <Grid item sm={12} xs={12}>
          <Box className={classes.surveyImgContainer}>
            <img alt="choice" src={survey?.item?.image} />
          </Box>
        </Grid>
      )}
      <Grid item sm={12} xs={12}>
        <TextFieldWithoutControl
          disabled
          label="Question and background"
          maxRows={6}
          minRows={3}
          multiline
          value={survey?.item?.question}
        />
      </Grid>
      <Grid container item justifyContent="flex-end" sm={12} xs={12}>
        <Grid container item justifyContent="space-between" sm={12} xs={12}>
          <Grid className={classes.selfAlign} item>
            <Typography variant="body2">Survey ends:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {formatEpochTime(survey?.item?.end)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {survey?.flags?.flag_allow_vote && (
        <>
          <MerchantAboutHeadlines headline="Results" />
          <Grid container item justifyContent="center" sm={12} xs={12}>
            <Grid className={classes.selfAlign} item sm={3} xs={3}>
              <StandardButton onClick={() => setIsVoteModalOpen(true)}>
                Vote
              </StandardButton>
            </Grid>
          </Grid>
        </>
      )}
      {!survey?.flags?.flag_allow_vote && (
        <>
          <MerchantAboutHeadlines headline="Results" />
          <Grid>
            {survey?.item?.choices?.map((choice, index) => (
              <SurveyChoice
                key={choice.id}
                choice={choice}
                index={index}
                isPatron
                pk={survey.pk}
                sk={survey.sk}
              />
            ))}
          </Grid>
        </>
      )}
      <GenericModal
        handleClose={() => setIsVoteModalOpen(false)}
        isOpen={isVoteModalOpen}
      >
        <VoteModalBody
          choices={survey?.item?.choices}
          handleClose={() => setIsVoteModalOpen(false)}
          pk={survey?.item?.pk}
          setSurvey={setSurvey}
          sk={survey?.item?.sk}
        />
      </GenericModal>
    </Grid>
  );
};
PatronSurveyDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  survey: PropTypes.object.isRequired,
  setSurvey: PropTypes.func.isRequired,
};

export default PatronSurveyDetail;
