import { useDateFormat } from '@vueuse/core';

export function formatDate(dateString) {
  const date = new Date(parseInt(dateString));
  const formatted = useDateFormat(date, 'YYYY-MM-DD @ HH:mm', {
    locales: 'ja-JP',
  });
  return formatted.value;
}
