import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../../components/shared/display/NoData';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import notificationType from '../../../constants/notification';
import useNetwork from '../../../utils/useNetwork';
import classes from './conversation.module.scss';
import ConversationCard from './ConversationCard';
import SkeletonLoading from './SkeletonLoading';

const ConversationList = ({
  handleOnChange,
  value,
  isLoading,
  filteredList,
  setIsLoading,
  handleFetchMore,
  conversation,
}) => {
  const isOnline = useNetwork();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={2}>
        {conversation?.items?.length !== 0 && (
          <Grid item sm={12} xs={12}>
            <TextFieldWithoutControl
              label="Find Conversation"
              onChange={handleOnChange}
              value={value}
            />
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          {!isLoading && !filteredList.length && <NoData />}
          <InfiniteScrollWrapper
            fetchMoreData={async () => {
              setIsLoading(true);
              try {
                await handleFetchMore({
                  ExclusiveStartKey: conversation?.LastEvaluatedKey,
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
            hasMore={!!conversation?.LastEvaluatedKey}
            length={
              conversation?.items?.length ? conversation?.items?.length : 0
            }
            scrollableTarget="scrollableDiv"
          >
            {filteredList?.map((conversationDetail) => (
              <ConversationCard
                key={conversationDetail.time}
                conversation={conversationDetail}
              />
            ))}
          </InfiniteScrollWrapper>
          {isLoading && <SkeletonLoading />}
        </Grid>
      </Grid>
    </div>
  );
};

ConversationList.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  handleFetchMore: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filteredList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  conversation: PropTypes.object.isRequired,
};

export default ConversationList;
