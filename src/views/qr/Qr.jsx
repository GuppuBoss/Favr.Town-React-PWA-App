import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import toastNotification from '../../components/shared/alerts/toastNotification';
import BannerContainer from '../../components/shared/containers/BannerContainer';
import ContentSection from '../../components/shared/containers/ContentSection';
import WrapperContainer from '../../components/shared/containers/WrapperContainer';
import MerchantFooter from '../../components/shared/footers/MerchantFooter';
import PatronFooter from '../../components/shared/footers/PatronFooter';
import QrFooter from '../../components/shared/footers/QrFooter';
import CashierHeader from '../../components/shared/headers/CashierHeader';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import notificationType from '../../constants/notification';
import userGroupsTypes from '../../constants/users';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import { POST } from '../../services/api';
import getUserGroup from '../../utils/authUtil';
import { saveToClipBoard } from '../../utils/clipboard';
import useNetwork from '../../utils/useNetwork';
import classes from './qr.module.scss';
import QrInfo from './QrInfo';

const Qr = () => {
  const location = useLocation();
  const isOnline = useNetwork();
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const [isLoading, setIsLoading] = useState(false);
  const [qr, setQr] = useState(null);
  const queryParam = Object.fromEntries(new URLSearchParams(location.search));

  const fetchQr = async () => {
    setIsLoading(true);
    let data;
    try {
      if (!_.isEmpty(queryParam, true)) {
        data = await POST('qr', queryParam);
      } else {
        data = await POST('qr');
      }
    } catch (error) {
      if (isOnline) {
        toastNotification({
          type: notificationType.ERROR,
          message: 'something went wrong',
        });
      }
    }

    setQr(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchQr();
    return () => {};
  }, []);

  const handleShare = async () => {
    await saveToClipBoard(qr.item.url);
    toastNotification({
      type: notificationType.SUCCESS,
      message: 'URL COPIED',
    });
  };

  const handleDownload = () => {
    const qrDiv = document.getElementById('qr-image');

    html2canvas(qrDiv).then((canvas) => {
      const myImage = canvas.toDataURL();
      saveAs(myImage, 'qr.png');
    });
  };

  const getHeader = () => {
    if (userGroup === userGroupsTypes.PATRON) return <PartonHeaderB />;
    if (userGroup === userGroupsTypes.MERCHANT) return <MerchantHeaderB />;
    return <CashierHeader />;
  };

  const getFooter = () => {
    if (userGroup === userGroupsTypes.MERCHANT) return <MerchantFooter />;
    if (userGroup === userGroupsTypes.CASHIER && qr?.item?.QR)
      return <QrFooter />;
    if (userGroup === userGroupsTypes.PATRON) return <PatronFooter />;
    return null;
  };

  return (
    <WrapperContainer>
      {getHeader()}
      <ContentSection className={classes.contentSection}>
        <BannerContainer className={classes.bannerContainer}>
          <QrInfo
            handleDownload={handleDownload}
            handleShare={handleShare}
            isLoading={isLoading}
            qr={qr}
          />
        </BannerContainer>
      </ContentSection>
      {getFooter()}
    </WrapperContainer>
  );
};

export default Qr;
