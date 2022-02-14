import { Grid } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import toastNotification from '../../components/shared/alerts/toastNotification';
import InfiniteScrollWrapper from '../../components/shared/display/InfiniteScrollWrapper';
import NoData from '../../components/shared/display/NoData';
import TextFieldWithoutControl from '../../components/shared/InputFields/TextFieldWithoutControl';
import notificationType from '../../constants/notification';
import { POST } from '../../services/api';
import useNetwork from '../../utils/useNetwork';
import ActionCard from './ActionCard';
import classes from './actions.module.scss';
import SkeletonLoading from './SkeletonLoading';

const ActionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('');
  const isOnline = useNetwork();
  const [actionsList, setActionsList] = useState({});
  const [filteredList, setFilteredList] = useState([]);
  const queryParam = Object.fromEntries(new URLSearchParams(location.search));

  const fetchActions = async (payload) => {
    if (payload.ExclusiveStartKey) {
      const data = await POST('action', payload);
      setActionsList({
        LastEvaluatedKey: data.LastEvaluatedKey,
        items: [...actionsList.items, ...data.items],
      });
      setFilteredList(actionsList.items);
    }
    if (!payload.ExclusiveStartKey) {
      const data = await POST('action', payload);

      setActionsList(data);
      setFilteredList(data.items);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      await fetchActions({ ...queryParam });
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }
    setIsLoading(false);
    return () => {};
  }, []);

  const filterData = (filterKey) => {
    const filteredActions = actionsList?.items?.filter((action) => {
      return action?.text?.toLowerCase()?.includes(filterKey?.toLowerCase());
    });

    setFilteredList(filteredActions);
  };

  const handleFetchMore = async (payload) => {
    await fetchActions(payload);
    filterData(value);
  };

  const handleOnChange = (e) => {
    setValue(e?.target?.value);
    _.debounce(() => {
      filterData(e.target.value);
    }, 2000)();
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.qrContainer}
        container
        justifyContent="center"
        spacing={3}
      >
        {actionsList?.items?.length !== 0 && (
          <Grid item sm={12} xs={12}>
            <TextFieldWithoutControl
              label="Find Action"
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
                  ExclusiveStartKey: actionsList?.LastEvaluatedKey,
                  ...queryParam,
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
            hasMore={!!actionsList?.LastEvaluatedKey}
            length={actionsList?.items?.length ? actionsList?.items?.length : 0}
            scrollableTarget="scrollableDiv"
          >
            {filteredList?.map((action) => (
              <ActionCard key={action.time} action={action} />
            ))}
          </InfiniteScrollWrapper>
          {isLoading && <SkeletonLoading />}
        </Grid>
      </Grid>
    </div>
  );
};

export default ActionList;
