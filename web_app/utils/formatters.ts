import moment from 'moment';

export const formatDateTimeToBr = (date: string): String => {
  if (!date) return '';
  return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY - HH:mm:ss');
};
export const formatDateToBr = (date: string): String => {
  if (!date) return '';
  return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
};

export const formatHourToBr = (hour: string): String => {
  if (!hour) return '';
  return moment(hour, 'HH:mm:ss').format('HH:mm');
};

export const formatDateToUs = (date: string): String => {
  if (!date) return '';
  return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
};
