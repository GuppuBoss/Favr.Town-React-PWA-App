import { Grid, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import toastNotification from '../../../components/shared/alerts/toastNotification';
import ContentSection from '../../../components/shared/containers/ContentSection';
import WrapperContainer from '../../../components/shared/containers/WrapperContainer';
import InfiniteScrollWrapper from '../../../components/shared/display/InfiniteScrollWrapper';
import PatronsFooter from '../../../components/shared/footers/PatronsFooter';
import MerchantHeaderB from '../../../components/shared/headers/MerchantHeaderB';
import notificationType from '../../../constants/notification';
import { POST } from '../../../services/api';
import useNetwork from '../../../utils/useNetwork';
import { getContentHeight } from '../../../utils/window';
import classes from '../patrons.module.scss';
import PatronItem from './PatronItem';
import SkeletonPatronItem from './SkeletonPatronItem';

export const contentSctionExtraStyle = {
  backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.89) 0 100%), url(https://img.favr.town/app/patrons-bg.png)`,
  height: getContentHeight(),
};

const isPhoneRegex = (value) => {
  if (value.length > 9 && !value.includes('@')) return true;
  return false;
};
const emailValidationRegex =
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const EMPTY_PATRONS_TEXT = '(new followers will appear here)';

const Patrons = () => {
  const isOnline = useNetwork();
  const [patrons, setPatrons] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isEmptyPatrons, seIsEmptyPatrons] = useState(false);

  const handleSearchInput = async (e) => {
    const { name, value } = e.target;

    if (value.length === 0) {
      setIsLoading(true);

      const response = await POST('patron');
      setPatrons({
        items: response.items || [],
        LastEvaluatedKey: response.LastEvaluatedKey,
      });
      setIsLoading(false);
    } else if (name === 'name' && value.length > 1) {
      setIsLoading(true);
      const payload = { [name]: value.split(' ').join(',') };
      const response = await POST('patron', payload);
      setPatrons({
        items: response.items || [],
        LastEvaluatedKey: response.LastEvaluatedKey,
      });
      setIsLoading(false);
    } else if (
      name === 'cellOrEmail' &&
      (isPhoneRegex(value) || emailValidationRegex.test(value))
    ) {
      setIsLoading(true);

      const response = await POST('patron', { cellOrEmail: value });
      setPatrons({
        items: response.items || [],
        LastEvaluatedKey: response.LastEvaluatedKey,
      });
      setIsLoading(false);
    }
  };

  const fetchPatrons = async (payload) => {
    setIsLoading(true);
    try {
      seIsEmptyPatrons(false);

      const result = await POST('patron', payload);
      if (result.items?.length === 0) {
        seIsEmptyPatrons(true);
      } else {
        seIsEmptyPatrons(false);
        setPatrons(
          patrons?.items
            ? {
                LastEvaluatedKey: result.LastEvaluatedKey,
                items: [...patrons.items, ...result.items],
              }
            : result
        );
      }
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
    await fetchPatrons({});
    return () => {};
  }, []);

  return (
    <WrapperContainer>
      <MerchantHeaderB />
      <ContentSection id="scrollableDiv" style={contentSctionExtraStyle}>
        <div className={classes.patronsMainContent}>
          <Grid className={classes.searchContainer} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone/email"
                name="cellOrEmail"
                onChange={_.debounce(handleSearchInput, 1500)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name (last, first)"
                name="name"
                onChange={_.debounce(handleSearchInput, 1500)}
                variant="outlined"
              />
            </Grid>
            <Grid container item justifyContent="flex-end">
              <Typography className={classes.searchText} variant="body2">
                Search
              </Typography>
            </Grid>
          </Grid>
          {isLoading && !patrons?.items?.length && <SkeletonPatronItem />}
          {isEmptyPatrons && (
            <Typography variant="body1">{EMPTY_PATRONS_TEXT}</Typography>
          )}
          <InfiniteScrollWrapper
            fetchMoreData={() => {
              fetchPatrons({
                ExclusiveStartKey: patrons?.LastEvaluatedKey,
              });
            }}
            hasMore={!!patrons?.LastEvaluatedKey}
            length={patrons?.items?.length ? patrons?.items?.length : 0}
            // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop
            Loading={<SkeletonPatronItem />}
            scrollableTarget="scrollableDiv"
          >
            {patrons?.items &&
              patrons.items.map((patron) => (
                <PatronItem key={patron.url} patron={patron} />
              ))}
          </InfiniteScrollWrapper>
        </div>
      </ContentSection>
      <PatronsFooter />
    </WrapperContainer>
  );
};

export default Patrons;
