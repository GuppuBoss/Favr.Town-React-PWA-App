/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';

export const formatEpochTime = (time, dateFormat) => {
  return format(time * 1000, dateFormat || 'MM/dd/yyyy h:mm a');
};

export const formatDate = (date, dateFormat) => {
  return format(date, dateFormat || 'MM/dd/yyyy h:mm a');
};

export const getEpochSec = (date, setTime) => {
  const d = new Date(date);
  if (setTime) {
    d.setHours(setTime, 0, 0, 0);
  }

  return d.getTime() / 1000;
};

export const getEpochMilliSec = (epochSec) => {
  return epochSec * 1000;
};

export const getTime24HoursFromNow = () => {
  return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
};
