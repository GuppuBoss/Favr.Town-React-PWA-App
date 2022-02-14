import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import trashIcon from '../../../assets/images/icons/icon_trash.svg';
import toastNotification from '../../../components/shared/alerts/toastNotification';
import BannerContainer from '../../../components/shared/containers/BannerContainer';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import StandardIcon from '../../../components/shared/customIcons/StandardIcon';
import FooterButton from '../../../components/shared/footers/FooterButton';
import StandardFooter from '../../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import notificationType from '../../../constants/notification';
import ROUTES from '../../../constants/routes';
import { globalLoaderWrapper } from '../../../redux/actions/commonActions';
import { DELETE, POST } from '../../../services/api';
import useNetwork from '../../../utils/useNetwork';
import SkeletonLoading from '../SkeletonLoading';
import classes from './locationDetail.module.scss';
import LocationForm from './LocationForm';

const LocationDetail = () => {
  const params = useParams();
  const navigate = useNavigate({ forceRefresh: true });
  const isOnline = useNetwork();
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocation = async () => {
    const data = await POST('location', { id: params.id });
    setLocation(data);
  };

  useEffect(async () => {
    setIsLoading(true);
    try {
      await fetchLocation({});
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

  const onGenericModalSubmit = async () => {
    const response = await dispatch(
      globalLoaderWrapper(dispatch, DELETE, 'location', {}, params)
    );

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }

    if (!response?.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: response.message,
      });
      setIsConfirmationModalOpen(false);
      navigate(ROUTES.LOCATIONS);
    }
  };

  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer} id="scrollableDiv">
          <div className={classes.root}>
            {location.item && (
              <LocationForm
                defaultValues={location.item}
                flags={location.flags}
                setLocation={setLocation}
              />
            )}
            {isLoading && <SkeletonLoading />}
          </div>
        </BannerContainer>
      </ContentSection>
      <StandardFooter>
        <div className={classes.locationDetailFooterButtonsWrapper}>
          <FooterButton onClick={() => setIsConfirmationModalOpen(true)}>
            <StandardIcon alt="delete" src={trashIcon} />
          </FooterButton>
        </div>
      </StandardFooter>
      {isConfirmationModalOpen && (
        <GenericAreYouSureModal
          handleClose={() => setIsConfirmationModalOpen(false)}
          isOpen={isConfirmationModalOpen}
          onSubmit={onGenericModalSubmit}
          warning="This will remove the cashier login credentials."
        />
      )}
    </WrapperContainer>
  );
};

export default LocationDetail;
