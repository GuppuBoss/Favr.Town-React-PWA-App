import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NewMessageIcon from '../../../assets/images/icons/icon_message_new.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import FooterButton from '../../../components/shared/footers/FooterButton';
import PatronFooter from '../../../components/shared/footers/PatronFooter';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import GenericModal from '../../../components/shared/modals/GenericModal';
import notificationType from '../../../constants/notification';
import userGroupsTypes from '../../../constants/users';
import { getAuthenticatedUser } from '../../../redux/selectors/accountSelector';
import { POST } from '../../../services/api';
import getUserGroup from '../../../utils/authUtil';
import useNetwork from '../../../utils/useNetwork';
import classes from './conversation.module.scss';
import ConversationList from './ConversationList';
import NewConversationModalBody from './NewConversationModalBody';

const Conversations = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userGroup = getUserGroup(authenticatedUser);

  const getHeader = () => {
    if (userGroup === userGroupsTypes.PATRON) return <PartonHeaderB />;
    if (userGroup === userGroupsTypes.MERCHANT) return <MerchantHeaderB />;
    return null;
  };

  // const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useNetwork();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [conversation, setConversation] = useState({});

  const queryParam = Object.fromEntries(new URLSearchParams(location.search));

  const fetchConversations = async (payload) => {
    if (payload.ExclusiveStartKey) {
      const data = await POST('conversation', {
        ...payload,
        ...queryParam,
      });

      await setConversation((preValue) => {
        return {
          items: [...preValue.items, ...data.items],
          LastEvaluatedKey: data.LastEvaluatedKey,
          flags: data.flags,
        };
      });
    }
    if (!payload.ExclusiveStartKey) {
      const data = await POST('conversation', { ...queryParam });

      setConversation(data);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      await fetchConversations({});
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
    const filteredActions = conversation?.items?.filter(
      (conversationDetail) => {
        return conversationDetail?.topic
          ?.toLowerCase()
          ?.includes(filterKey?.toLowerCase());
      }
    );

    setFilteredList(filteredActions);
  };

  const handleFetchMore = async (payload) => {
    await fetchConversations(payload);
  };

  useEffect(() => {
    filterData(value);
    return () => {};
  }, [conversation]);

  const handleOnChange = (e) => {
    setValue(e?.target?.value);
    _.debounce(() => {
      filterData(e.target.value);
    }, 2000)();
  };

  const getFooter = () => {
    if (userGroup === userGroupsTypes.PATRON)
      return (
        <PatronFooter
          handleNewConversation={() => setIsModalOpen(true)}
          newFlags={conversation?.flags}
        />
      );
    if (userGroup === userGroupsTypes.MERCHANT)
      return (
        <StandardFooter>
          {(conversation?.flags?.flag_allow_new || true) &&
            queryParam.patron_pk && (
              <div className={classes.conversationFooterButtonsWrapper}>
                <FooterButton onClick={() => setIsModalOpen(true)}>
                  <StandardIcon alt="upload" isAddButton src={NewMessageIcon} />
                </FooterButton>
              </div>
            )}
        </StandardFooter>
      );
    return null;
  };

  return (
    <WrapperContainer>
      {getHeader()}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <ConversationList
            conversation={conversation}
            filteredList={filteredList}
            handleFetchMore={handleFetchMore}
            handleOnChange={handleOnChange}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            value={value}
          />
        </BannerContainer>
      </ContentSection>
      {getFooter()}

      <GenericModal
        handleClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        <NewConversationModalBody
          handleClose={() => setIsModalOpen(false)}
          isPatron={userGroup === userGroupsTypes.PATRON}
          queryParam={queryParam}
          setConversation={setConversation}
        />
      </GenericModal>
    </WrapperContainer>
  );
};

export default Conversations;
