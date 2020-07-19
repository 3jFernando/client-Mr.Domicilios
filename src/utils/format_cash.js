export default function FORMAT_CASH (number) {
  const formatNumber = Intl.NumberFormat('es-ES', {
    style: 'currency', currency: 'COL'
  });
  return formatNumber.format(number);
}