export function formatDate(date: Date | string | null): string {

  if (!date) {
    return '';
  }

  const _date = new Date(date);

  if (isNaN(_date.getTime())) {
    console.error('Invalid date provided:', date);
    return '';
  }

  const year = _date.getFullYear();
  let month = '' + (_date.getMonth() + 1);
  let day = '' + _date.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}

export function isAtLeastEighteen(birthDate: Date): boolean {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }

  return age >= 18;
}