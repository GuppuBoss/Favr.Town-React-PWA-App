import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../../components/shared/display/NoData';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import SkeletonCard from './SkeletonLoading';
import classes from './suggestion.module.scss';
import SuggestionCard from './SuggestionCard';

const SuggestionList = ({
  handleOnChange,
  value,
  filteredList,
  suggestions,
  isLoading,
  handleFetchMore,
  deleteSuggestion,
  isPatron,
  onShare,
  onLike,
}) => {
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={2}>
        {suggestions?.length !== 0 && (
          <Grid item sm={12} xs={12}>
            <TextFieldWithoutControl
              label="FInd Suggestion"
              onChange={handleOnChange}
              value={value}
            />
          </Grid>
        )}
        <Grid item sm={12} xs={12}>
          {!isLoading && !filteredList?.length && <NoData />}

          <InfiniteScrollWrapper
            fetchMoreData={async () => {
              await handleFetchMore();
            }}
            hasMore={!!suggestions?.LastEvaluatedKey}
            length={suggestions?.items?.length ? suggestions?.items?.length : 0}
            scrollableTarget="scrollableDiv"
          >
            {filteredList?.map((suggestion, index) => (
              <SuggestionCard
                key={suggestion.sk}
                deleteSuggestion={deleteSuggestion}
                flags={suggestions.flags}
                index={index}
                isPatron={isPatron}
                onLike={onLike}
                onShare={onShare}
                suggestion={suggestion}
              />
            ))}
            {isLoading && <SkeletonCard />}
          </InfiniteScrollWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

SuggestionList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suggestions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPatron: PropTypes.bool.isRequired,
  handleFetchMore: PropTypes.func.isRequired,
  deleteSuggestion: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filteredList: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SuggestionList;
