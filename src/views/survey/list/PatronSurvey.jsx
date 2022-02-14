/* eslint-disable react/jsx-max-depth */
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import { formatEpochTime } from '../../../utils/timeUtil';
import BusinessCard from '../../search/BusinessCard';
import classes from '../survey.module.scss';

const PatronSurvey = ({ survey }) => {
  const {
    profile: { logo, businessName, tags, about },
    url,
  } = survey;
  const navigate = useNavigate();
  return (
    <Card className={classes.surveyCard}>
      <CardActionArea
        onClick={() => {
          if (url) {
            navigate(url);
          }
        }}
      >
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid
              // className={!isCoupon ? undefined : classes.couponWrapper}
              container
              item
              sm={12}
              spacing={2}
              xs={12}
            >
              <BusinessCard
                about={about}
                logo={logo}
                name={businessName}
                tags={tags}
              />
            </Grid>

            <Grid container item justifyContent="flex-end" sm={12} xs={12}>
              <Typography
                style={{ color: survey?.draft ? 'red' : 'green' }}
                variant="body2"
              >
                {survey?.draft ? 'DRAFT' : 'ACTIVE'}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextFieldWithoutControl
                disabled
                label="Question and background"
                maxRows={6}
                minRows={3}
                multiline
                value={survey?.question}
              />
            </Grid>
            <Grid container item justifyContent="space-between" sm={12} xs={12}>
              <Grid className={classes.selfAlign} item>
                <Typography variant="body2">Survey ends:</Typography>
              </Grid>
              <Grid item justifyContent="flex-end">
                <Typography variant="body2">
                  {formatEpochTime(survey?.end)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

PatronSurvey.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  survey: PropTypes.object.isRequired,
};

export default PatronSurvey;
