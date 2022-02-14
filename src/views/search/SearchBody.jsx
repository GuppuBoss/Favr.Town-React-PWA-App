import { Button, Grid } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import newHostIcon from '../../assets/images/icons/icon_host_new.svg';
import toastNotification from '../../components/shared/alerts/toastNotification';
import StandardIcon from '../../components/shared/customIcons/StandardIcon';
import InfiniteScrollWrapper from '../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../components/shared/display/NoData';
import GenericModal from '../../components/shared/modals/GenericModal';
import notificationType from '../../constants/notification';
import { getBusinessSearchResult } from '../../redux/actions/patronActions';
import useNetwork from '../../utils/useNetwork';
import AddMerchant from '../merchant/inviteMerchant/AddMerchant';
import BusinessCard from './BusinessCard';
import BusinessCardWrapper from './BusinessWrapper';
import classes from './search.module.scss';
import SearchButton from './SearchButton';
import SkeletonCard from './SkeletonCard';

const SearchBody = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOnline = useNetwork();
  const [isAddMerchantModalOpen, setIsAddMerchantModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const queryParam = Object.fromEntries(new URLSearchParams(location.search));

  const fetchSearchResult = async (payload) => {
    setIsLoading(true);
    try {
      setSearchData([]);

      const result = await dispatch(getBusinessSearchResult(dispatch, payload));
      setSearchData(result);
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }
    setIsLoading(false);
  };

  const fetchMoreSearchResult = async (payload) => {
    setIsLoading(true);
    try {
      const result = await dispatch(getBusinessSearchResult(dispatch, payload));
      setSearchData({
        LastEvaluatedKey: result.LastEvaluatedKey,
        items: [...searchData.items, ...result.items],
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
  };

  useEffect(async () => {
    if (!_.isEmpty(queryParam, true)) {
      await fetchSearchResult(queryParam);
    }
    return () => {};
  }, []);

  return (
    <div className={classes.searchBodyWrapper}>
      <Grid className={classes.alignCenter} container spacing="2">
        <Grid item xs={10}>
          <SearchButton
            label="Search Business"
            onChange={(e) => {
              fetchSearchResult({
                businessName: e.target.value,
                ...queryParam,
              });
              setSearchValue(e.target.value);
            }}
            value={searchValue}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            aria-label="button"
            className={classes.addBusinessButton}
            onClick={() => {
              setIsAddMerchantModalOpen(true);
            }}
            type="submit"
          >
            <StandardIcon alt="create" isAddButton src={newHostIcon} />
          </Button>
        </Grid>
        <Grid container item={12}>
          {isLoading && !searchData?.items?.length && <SkeletonCard />}
          {!isLoading && !searchData?.items?.length && <NoData />}
          <InfiniteScrollWrapper
            fetchMoreData={() => {
              fetchMoreSearchResult({
                businessName: searchValue,
                ExclusiveStartKey: searchData?.LastEvaluatedKey,
              });
            }}
            hasMore={!!searchData?.LastEvaluatedKey}
            length={searchData?.items?.length ? searchData?.items?.length : 0}
            // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
            Loading={<SkeletonCard />}
            scrollableTarget="scrollableDiv"
          >
            {searchData?.items &&
              searchData?.items.map((business) => {
                return (
                  <BusinessCardWrapper
                    key={business.businessName}
                    url={business.url}
                  >
                    <BusinessCard
                      about={business.about}
                      logo={business.logo}
                      name={business.businessName}
                      tags={business.tags}
                      url={business.url}
                    />
                  </BusinessCardWrapper>
                );
              })}
          </InfiniteScrollWrapper>
        </Grid>
        <GenericModal
          handleClose={() => setIsAddMerchantModalOpen(false)}
          isOpen={isAddMerchantModalOpen}
        >
          <AddMerchant handleClose={() => setIsAddMerchantModalOpen(false)} />
        </GenericModal>
      </Grid>
    </div>
  );
};

export default SearchBody;
