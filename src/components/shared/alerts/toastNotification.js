import { toast } from 'react-toastify';

import notificationType from '../../../constants/notification';

const toastNotification = ({ message, type, position }) => {
  const toastOption = {
    position: position || 'top-center',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === notificationType.ERROR) {
    return toast.error(message, toastOption);
  }
  if (type === notificationType.SUCCESS) {
    return toast.success(message, toastOption);
  }

  return toast(message, toastOption);
};

export default toastNotification;
