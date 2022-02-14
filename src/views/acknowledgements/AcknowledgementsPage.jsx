import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import StandardFooter from '../../components/shared/footers/StandardFooter';
import MerchantHeaderB from '../../components/shared/headers/MerchantHeaderB';
import PartonHeaderB from '../../components/shared/headers/PartonHeaderB';
import userGroupsTypes from '../../constants/users';
import data from '../../licenses.json';
import { getAuthenticatedUser } from '../../redux/selectors/accountSelector';
import getUserGroup from '../../utils/authUtil';
import classes from './acknowledgementsPage.module.scss';

const TermsPage = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  const [licenseList, setLicenseList] = useState([]);
  useEffect(() => {
    const dataList = Object.keys(data).map((key) => {
      return { name: key, otherDetails: data[key] };
    });
    setLicenseList(dataList);
  }, []);

  const parseSourceName = (name) => {
    const splitedName = name.split('@');
    if (splitedName.length === 3) {
      return splitedName[1];
    }
    return splitedName[0];
  };

  return (
    <div className={classes.acknowledgementsPageWrapper}>
      {userGroup === userGroupsTypes.PATRON ? (
        <PartonHeaderB />
      ) : (
        <MerchantHeaderB />
      )}
      <div className={classes.acknowledgementsContentWrapper}>
        <div className={classes.acknowledgementsWrapper}>
          <p className={classes.acknowledgementModalTitle}>
            We <FavoriteOutlinedIcon className={classes.favoriteIcon} /> Open
            Source
          </p>
          <ul style={{ listStyle: 'none' }}>
            {licenseList.map((itemKey) => (
              <li key={itemKey} className="listItem">
                <span />
                <div className="listContainer">
                  <p className="secondary">
                    <a
                      href={itemKey?.otherDetails?.repository}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {parseSourceName(itemKey?.name)}
                    </a>{' '}
                    <a
                      href={itemKey?.otherDetails?.licenseUrl}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {itemKey.otherDetails.licenses}
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <StandardFooter />
    </div>
  );
};

export default TermsPage;
