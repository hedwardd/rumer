import { getYear, getMonth, format } from 'date-fns';

// Jan 3 – 5, 2020
// Jan 28 – Feb 5, 2020
// Dec 29, 2020 - Jan 2, 2021
const formatDateInterval = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (getYear(startDate) === getYear(endDate)) {
    if (getMonth(startDate) === getMonth(endDate)) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`;
    }
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  }
  return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
};

export default formatDateInterval;
