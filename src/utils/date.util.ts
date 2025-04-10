export function formatDateForApi(date: Date | string | null): string {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.error('Invalid date provided to formatDateForApi:', date);
    return '';
  }
  
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

export function parseApiDate(dateString: string | null): Date | null {
  if (!dateString) return null;
  
  const cleanDateString = dateString.split('T')[0];
  
  const date = new Date(cleanDateString);
  
  if (isNaN(date.getTime())) {
    console.error('Invalid date string provided to parseApiDate:', dateString);
    return null;
  }
  
  return date;
}

export function formatDateForDisplay(date: Date | string | null): string {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    console.error('Invalid date provided to formatDateForDisplay:', date);
    return '';
  }
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };
  
  return d.toLocaleDateString(undefined, options);
}

export function formatDateForInput(date: Date | string | null): string {
  return formatDateForApi(date);
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