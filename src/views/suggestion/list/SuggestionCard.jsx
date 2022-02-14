/* eslint-disable react/jsx-max-depth */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FollowIcon from '../../../assets/images/icons/icon_follow.svg';
import ShareIcon from '../../../assets/images/icons/icon_share.svg';
import trashIcon from '../../../assets/images/icons/icon_trash.svg';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import FooterButton from '../../../components/shared/footers/FooterButton';
import InputField from '../../../components/shared/InputFields/TextField';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import { PATCH } from '../../../services/api';
import { formatEpochTime } from '../../../utils/timeUtil';
// import BusinessCard from '../../search/BusinessCard';
import classes from './suggestion.module.scss';
import schema from './suggestionFormSchema';

const SuggestionCard = ({
  isPatron,
  flags,
  suggestion,
  deleteSuggestion,
  index,
  onShare,
  onLike,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleSubmit, control, formState, trigger, setError } = useForm({
    mode: 'onBlur',
    defaultValues: { comment: suggestion.comment },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onCommentChange = async (field, payload) => {
    const isValid = await trigger(field);
    if (isValid) {
      const data = await PATCH('suggestion', {
        pk: suggestion.pk,
        sk: suggestion.sk,
        ...payload,
      });
      if (data.error) {
        setError(field, {
          type: 'Submission',
          message: data.error,
        });
      }
    }
  };

  const getLikeDislike = () => {
    if (isPatron) {
      return (
        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-start"
          sm={4}
          xs={4}
        >
          <Button
            aria-label="like"
            disabled={!flags?.allow_like}
            onClick={() => {
              onLike({ pk: suggestion.pk, sk: suggestion.sk, index });
            }}
          >
            <StandardIcon alt="like" src={FollowIcon} />
          </Button>
          <Typography style={{ alignSelf: 'center' }} variant="body2">
            {suggestion?.stat_like}
          </Typography>
        </Grid>
      );
    }

    return (
      <>
        <Grid
          alignContent="center"
          container
          item
          justifyContent="flex-start"
          sm={4}
          xs={4}
        >
          <FooterButton
            aria-label="delete"
            disabled={!flags?.allow_remove}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <StandardIcon alt="share" src={trashIcon} />
          </FooterButton>
        </Grid>
        <Grid
          alignContent="center"
          container
          item
          justifyContent="center"
          sm={4}
          xs={4}
        >
          <Typography style={{ alignSelf: 'center' }} variant="body2">
            {suggestion?.stat_like}
          </Typography>
          <img alt="share" className="action-icon-mini" src={FollowIcon} />
        </Grid>
      </>
    );
  };

  // const {
  //   profile: { name, url, profilePicture, tags, about },
  // } = suggestion;

  const {
    profile: { url, profilePicture },
  } = suggestion;

  return (
    <Card className={classes.suggestionCard}>
      <CardContent>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item sm={3} xs={3}>
            <img
              alt="profileImage"
              className={classes.businessLogo}
              onClick={() => {
                if (url && !isPatron) {
                  navigate(url);
                }
              }}
              src={profilePicture}
            />
          </Grid>
          {/* <BusinessCard
            about={about}
            logo={profilePicture}
            name={name}
            onImageClick={() => {
              if (url && !isPatron) {
                window.location.href = url;
              }
            }}
            tags={tags}
          /> */}

          <Grid item sm={9} xs={9}>
            <TextFieldWithoutControl
              disabled
              label="suggestion"
              maxRows={6}
              minRows={3}
              multiline
              value={suggestion?.suggestion}
            />
          </Grid>
          <Grid container item justifyContent="flex-end">
            <Typography variant="body2">
              {suggestion?.profile?.login},{' '}
              {formatEpochTime(suggestion?.flag_created)}
            </Typography>
          </Grid>
          <Grid
            alignContent="center"
            container
            item
            justifyContent="space-between"
          >
            {getLikeDislike()}
            <Grid container item justifyContent="flex-end" sm={4} xs={4}>
              <Typography style={{ alignSelf: 'center' }} variant="body2">
                {suggestion?.stat_share}
              </Typography>
              <Button
                aria-label="share"
                disabled={!flags?.allow_share}
                onClick={() => {
                  onShare({ pk: suggestion.pk, sk: suggestion.sk, index });
                }}
              >
                <StandardIcon alt="share" src={ShareIcon} />
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12}>
            <form onSubmit={handleSubmit}>
              <InputField
                autoUpdate
                control={control}
                disabled={isPatron}
                error={formState.errors.comment}
                fullWidth
                isPassword={false}
                label="Comment (public)"
                maxRows={6}
                minRows={3}
                multiline
                name="comment"
                updateFunction={onCommentChange}
              />
            </form>
          </Grid>
        </Grid>
      </CardContent>
      <GenericAreYouSureModal
        handleClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
        onSubmit={() =>
          deleteSuggestion({ pk: suggestion.pk, sk: suggestion.sk, index })
        }
        warning="This will remove the selected suggestion."
      />
    </Card>
  );
};

SuggestionCard.propTypes = {
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  suggestion: PropTypes.object.isRequired,
  flags: PropTypes.shape({
    allow_like: PropTypes.bool.isRequired,
    allow_remove: PropTypes.bool.isRequired,
    allow_share: PropTypes.bool.isRequired,
  }).isRequired,
  isPatron: PropTypes.bool.isRequired,
  deleteSuggestion: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default SuggestionCard;
