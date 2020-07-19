export default function FORMAT_DATE (date) {
  const formatDate = Intl.DateTimeFormat('es-ES');
  return formatDate.format(new Date(date));
} 