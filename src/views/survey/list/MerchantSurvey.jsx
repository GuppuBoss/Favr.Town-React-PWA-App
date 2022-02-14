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

import shareIcon from '../../../assets/images/icons/icon_share.svg';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import { formatEpochTime } from '../../../utils/timeUtil';
import classes from '../survey.module.scss';

const MerchantSurvey = ({ survey }) => {
  const navigate = useNavigate();

  return (
    <Card className={classes.surveyCard}>
      <CardActionArea
        onClick={() => {
          if (survey?.url) {
            navigate(survey.url);
          }
        }}
      >
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
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
              <Grid className={classes.selfAlign} sm={5} xs={4}>
                <Typography variant="body2">Survey ends</Typography>
              </Grid>
              <Grid item sm={7} xs={8}>
                <TextFieldWithoutControl
                  alignTextRight
                  disabled
                  value={formatEpochTime(survey?.end)}
                />
              </Grid>
            </Grid>

            <Grid
              alignContent="center"
              container
              item
              justifyContent="flex-end"
              sm={12}
              xs={12}
            >
              <Typography className={classes.selfAlign} variant="body2">
                {survey?.stat_share || 0}
              </Typography>
              <img alt="share" className="action-icon-mini" src={shareIcon} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MerchantSurvey.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  survey: PropTypes.object.isRequired,
};

export default MerchantSurvey;
