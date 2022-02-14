import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import TextFieldWithoutControl from '../../../components/shared/InputFields/TextFieldWithoutControl';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import { getUserData } from '../../../redux/selectors/accountSelector';
import { POST } from '../../../services/api';
import useNetwork from '../../../utils/useNetwork';
import SkeletonLoading from '../SkeletonCard';
import LocationCard from './LocationCard';
import LocationModalBody from './LocationModalBody';

const LocationsList = () => {
  const [value, setValue] = useState('');
  const isOnline = useNetwork();
  const userData = useSelector(getUserData);
  const [locations, setLocations] = useState({});
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLocations = async (payload) => {
    if (payload.ExclusiveStartKey) {
      const data = await POST('location', payload);
      setLocations({
        LastEvaluatedKey: data.LastEvaluatedKey,
        items: [...locations.items, ...data.items],
      });
      setFilteredList(locations.items);
    }
    if (!payload.ExclusiveStartKey) {
      const data = await POST('location');

      setLocations(data);
      setFilteredList(data.items);
    }
  };

  const filterData = (filterKey) => {
    if (!filterKey) {
      setFilteredList(locations?.items);
      return;
    }
    const filteredActions = locations?.items?.filter((location) => {
      return (
        location?.about?.toLowerCase()?.includes(filterKey?.toLowerCase()) ||
        location?.businessName
          ?.toLowerCase()
          ?.includes(filterKey?.toLowerCase())
      );
    });

    setFilteredList(filteredActions);
  };
  const handleFetchMore = async (payload) => {
    await fetchLocations(payload);
  };

  const onLocationCreate = (data) => {
    if (data?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: data.error,
      });
    }

    if (!data?.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: data.message || 'Location Created',
      });

      setLocations(data);
      setIsModalOpen(false);
    }
  };
  const handleOnChange = (e) => {
    setValue(e?.target?.value);
    _.debounce(() => {
      filterData(e.target.value);
    }, 2000)();
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      await fetchLocations({});
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

  useEffect(() => {
    filterData(value);
    return () => {};
  }, [locations]);

  return (
    <Grid
      alignContent="center"
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={2}
    >
      <Grid
        alignContent="center"
        alignItems="center"
        container
        item
        justifyContent="space-between"
      >
        <Grid item sm={11} xs={11}>
          <TextFieldWithoutControl
            label="Find Location"
            onChange={handleOnChange}
            value={value}
          />
        </Grid>
        <Grid item sm={1} xs={1}>
          <IconButton
            aria-label="close"
            onClick={() => setIsModalOpen(true)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item sm={12} xs={12}>
        {!isLoading && !filteredList?.length && (
          <Grid container item justifyContent="center" sm={12} xs={12}>
            <Typography variant="body2">New items will appear here</Typography>
          </Grid>
        )}

        <InfiniteScrollWrapper
          fetchMoreData={async () => {
            setIsLoading(true);
            try {
              await handleFetchMore({
                ExclusiveStartKey: locations?.LastEvaluatedKey,
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
          hasMore={!!locations?.LastEvaluatedKey}
          length={locations?.items?.length ? locations?.items?.length : 0}
          scrollableTarget="scrollableDiv"
        >
          {filteredList?.map((location) => (
            <LocationCard key={location.time} location={location} />
          ))}
        </InfiniteScrollWrapper>
        {isLoading && <SkeletonLoading />}
      </Grid>
      <GenericModal
        handleClose={() => setIsModalOpen(true)}
        isOpen={isModalOpen}
      >
        <LocationModalBody
          defaultBusinessName={userData?.item?.businessName}
          handleClose={() => setIsModalOpen(false)}
          onLocationCreate={onLocationCreate}
        />
      </GenericModal>
    </Grid>
  );
};

export default LocationsList;
