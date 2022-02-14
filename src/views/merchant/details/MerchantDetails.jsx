import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import MerchantDetailFooter from '../../../components/shared/footers/MerchantDetailFooter';
import PartonHeaderB from '../../../components/shared/headers/PartonHeaderB';
import GenericAreYouSureModal from '../../../components/shared/modals/GenericAreYouSureModal';
import notificationType from '../../../constants/notification';
import {
  getMerchantDetails,
  shareAction,
  unfollowMerchant,
} from '../../../redux/actions/patronActions';
import { getMerchantInfo } from '../../../redux/selectors/accountSelector';
import { saveToClipBoard } from '../../../utils/clipboard';
import { getContentHeight } from '../../../utils/window';
import classes from './merchantDetails.module.scss';
import ListContent from './MerchantInfo';

const MerchantDetails = () => {
  const merchantDetails = useSelector(getMerchantInfo);
  const params = useParams();
  const dispatch = useDispatch();
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

  const followAction = async () => {
    const response = await dispatch(
      getMerchantDetails(dispatch, { id: params.id, follow: true }, true)
    );

    if (!response.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'Followed',
      });
    }

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const unFollowAction = async () => {
    const response = await dispatch(
      unfollowMerchant(
        dispatch,
        { merchant_pk: merchantDetails?.item?.pk },
        true
      )
    );

    if (!response.error) {
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'Removed',
      });

      setIsUnfollowModalOpen(false);
    }

    if (response?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: response.error,
      });
    }
  };

  const followUnFollowAction = async () => {
    if (!merchantDetails?.flags?.following) {
      await followAction();
    } else {
      setIsUnfollowModalOpen(true);
    }
  };

  const shareActionFunction = async () => {
    const result = await dispatch(
      shareAction(
        dispatch,
        {
          share: {
            pk: merchantDetails?.item.pk,
            sk: merchantDetails?.item?.sk,
          },
        },
        true
      )
    );

    if (!result.error) {
      const url = result?.item?.url;
      await saveToClipBoard(url);
      toastNotification({
        type: notificationType.SUCCESS,
        message: 'url copied',
      });
    }

    if (result?.error) {
      toastNotification({
        type: notificationType.ERROR,
        message: result.error,
      });
    }
  };

  return (
    <div className={classes.merchantsListPageWrapper}>
      <PartonHeaderB />
      <div
        className={classes.merchantsListContainer}
        id="scrollableDiv"
        style={{ height: getContentHeight() }}
      >
        <ListContent
          shareAction={shareActionFunction}
          unFollowAction={followUnFollowAction}
        />
      </div>
      <GenericAreYouSureModal
        handleClose={() => setIsUnfollowModalOpen(false)}
        isOpen={isUnfollowModalOpen}
        onSubmit={unFollowAction}
        warning="Unfollowing this merchant removes any earned favr or unclaimed rewards!"
      />
      <MerchantDetailFooter merchantDetails={merchantDetails?.item} />
    </div>
  );
};

export default MerchantDetails;
