import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import SuggestionFooter from '../../../components/shared/footers/SuggestionFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import userGroupsTypes from '../../../constants/users';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { DELETE, POST, PUT } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import { saveToClipBoard } from '../../../utils/clipboard';
import useNetwork from '../../../utils/useNetwork';
import CreateSuggestionModalBody from './CreateSuggestionModalBody';
import classes from './suggestion.module.scss';
import SuggestionList from './SuggestionList';

const Suggestions = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);
  const isOnline = useNetwork();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParam = Object.fromEntries(new URLSearchParams(location.search));
  const [value, setValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [suggestions, setSuggestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSuggestionModalOpen, setIsAddSuggestionModalOpen] =
    useState(false);

  const fetchSuggestion = async (payload) => {
    setIsLoading(true);
    try {
      const data = await POST('suggestion', payload);

      setSuggestions(data);
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

  const isPatron = userGroup === userGroupsTypes.PATRON;

  const getHeader = () => {
    if (userGroup === userGroupsTypes.PATRON) {
      return <PartonHeaderB />;
    }

    return <MerchantHeaderB />;
  };

  const fetchMore = async () => {
    await fetchSuggestion({
      ExclusiveStartKey: suggestions?.LastEvaluatedKey,
      ...queryParam,
    });
  };

  const deleteSuggestion = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'suggestion', { pk, sk })
    );

    if (!response.error) {
      suggestions?.items.splice(index, 1);
      const updatedSuggestions = { ...suggestions };
      setSuggestions(updatedSuggestions);
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const onShare = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { share: { pk, sk } })
    );

    if (!response.error) {
      const updatedSuggestions = { ...suggestions };
      updatedSuggestions.items[index].stat_share = response.item.stat_share;
      setSuggestions(updatedSuggestions);

      await saveToClipBoard(response.item.url);
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'URL copied',
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const onLike = async ({ pk, sk, index }) => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, PUT, 'action', { like: { pk, sk } })
    );

    if (!response.error) {
      const updatedSuggestions = { ...suggestions };
      updatedSuggestions.items[index].stat_like = response.item.stat_like;
      setSuggestions(updatedSuggestions);
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'Liked',
      });
    }

    if (response.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  useEffect(async () => {
    await fetchSuggestion({ ...queryParam });
    return () => {};
  }, []);

  const filterData = (filterKey) => {
    const filteredActions = suggestions?.items?.filter((suggestionDetail) => {
      return suggestionDetail?.suggestion
        ?.toLowerCase()
        ?.includes(filterKey?.toLowerCase());
    });

    setFilteredList(filteredActions);
  };

  useEffect(() => {
    filterData(value);
    return () => {};
  }, [suggestions]);

  const handleOnChange = (e) => {
    setValue(e?.target?.value);
    _.debounce(() => {
      filterData(e.target.value);
    }, 2000)();
  };

  const handleSuggestionCreate = async (payload) => {
    try {
      const response = await dispatch(
        globalLoaderWrapper(dispatch, PUT, 'suggestion', {
          merchant_pk: `merchant#${queryParam?.merchant_pk}`,
          ...payload,
        })
      );

      if (!response?.error) {
        setSuggestions(response);

        toastNotification({
          type: notificationType.SUCCESS,
          message: response.message,
        });

        setIsAddSuggestionModalOpen(false);
      }

      if (response.error) {
        toastNotification({
          type: notificationType.ERROR,
          message: response.error,
        });
      }
    } catch (e) {
      toastNotification({ type: notificationType.ERROR, message: e.message });
    }
  };

  return (
    <WrapperContainer>
      {getHeader()}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <SuggestionList
            deleteSuggestion={deleteSuggestion}
            filteredList={filteredList}
            handleFetchMore={fetchMore}
            handleOnChange={handleOnChange}
            isLoading={isLoading}
            isPatron={isPatron}
            onLike={onLike}
            onShare={onShare}
            suggestions={suggestions}
            value={value}
          />
        </BannerContainer>
      </ContentSection>
      <GenericModal
        handleClose={() => setIsAddSuggestionModalOpen(false)}
        isOpen={isAddSuggestionModalOpen}
      >
        <CreateSuggestionModalBody
          handleClose={() => setIsAddSuggestionModalOpen(false)}
          handleUpload={handleSuggestionCreate}
        />
      </GenericModal>
      <SuggestionFooter
        isDisabled={!suggestions?.flags?.allow_create}
        onClick={() => setIsAddSuggestionModalOpen(true)}
      />
    </WrapperContainer>
  );
};

export default Suggestions;
