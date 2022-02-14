import React from 'react';

import trashIcon from '../../../assets/images/icons/icon_trash.svg';

const TrashIcon = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <img alt="trash" src={trashIcon} {...props} />;
};

export default TrashIcon;
