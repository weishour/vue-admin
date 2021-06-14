import moment from 'moment';
import { DATE_TIME_FORMAT, DATE_FORMAT } from '/@app/constants';

export function formatToDateTime(
  date: moment.MomentInput = null,
  format = DATE_TIME_FORMAT
): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = null, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

export const dateUtil = moment;
