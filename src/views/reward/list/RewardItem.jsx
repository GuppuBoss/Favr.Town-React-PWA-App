import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import TrashIcon from '../../../components/shared/customIcons/TrashIcon';
import DateTimePickerWrapper from '../../../components/shared/InputFields/DateTimePicker';
import TextFieldWrapper from '../../../components/shared/InputFields/TextField';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import classes from '../rewards.module.scss';

const RewardItem = (props) => {
  const navigate = useNavigate();
  const {
    deleteRewardModalOpen,
    handleDeleteRewardModalCose,
    handleDeleteRewardModalOpen,
    handleRewardDelete,
    rewardData,
  } = props;
  const { control } = useForm({
    defaultValues: {
      ...rewardData,
      redeem_by: new Date(rewardData.redeem_by * 1000),
      redeem: rewardData.redeem || '',
    },
  });

  const detailPage = () => {
    if (rewardData.url) {
      navigate(rewardData.url);
    }
  };

  return (
    <Card className={classes.rewardCard}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          onClick={detailPage}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextFieldWrapper
              autoUpdate={false}
              control={control}
              disabled
              fullWidth
              label="Reward description"
              maxRows={6}
              minRows={3}
              multiline
              name="description"
            />
          </Grid>
          {/* <Grid
            alignItems="center"
            container
            item
            justifyContent="space-between"
            spacing={1}
          > */}
          <Grid item md={5} xs={12}>
            <TextFieldWrapper
              alignTextRight
              autoUpdate={false}
              control={control}
              disabled
              fullWidth
              label="Favr value"
              multiline={false}
              name="favr"
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <DateTimePickerWrapper
              alignTextRight
              autoUpdate
              control={control}
              disabled
              fullWidth
              isFutureDateDisabled={false}
              label="Redeem by"
              margin="none"
              name="redeem_by"
              showDate
            />
          </Grid>
        </Grid>
        {/* </Grid> */}
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          mt={1}
        >
          <IconButton
            aria-label="close"
            onClick={() => handleDeleteRewardModalOpen(rewardData.sk)}
            size="small"
          >
            <TrashIcon />
          </IconButton>
          <Box display="flex">
            Claimed:
            <Typography style={{ marginLeft: '5px' }} variant="body1">
              0
            </Typography>
          </Box>
        </Box>
        <GenericAreYouSureModal
          handleClose={handleDeleteRewardModalCose}
          isOpen={deleteRewardModalOpen === rewardData.sk}
          onSubmit={() => handleRewardDelete(rewardData.sk)}
          warning="This will remove the selected reward."
        />
      </CardContent>
    </Card>
  );
};

export default RewardItem;

RewardItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rewardData: PropTypes.object.isRequired,
  handleDeleteRewardModalOpen: PropTypes.func.isRequired,
  handleDeleteRewardModalCose: PropTypes.func.isRequired,
  handleRewardDelete: PropTypes.func.isRequired,
  deleteRewardModalOpen: PropTypes.string.isRequired,
};
