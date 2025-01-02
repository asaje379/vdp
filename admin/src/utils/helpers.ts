import { formatPrice } from 'usual_fn';

export async function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(seconds), seconds * 1000);
  });
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(new Date(date));
}

export function formatDateShort(date: string) {
  return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
}

export function dateForInput(_date: string) {
  if (!_date) return '';

  const date = new Date(_date);
  return `${prefixWithFourZero(date.getFullYear())}-${prefixWithOneZero(
    date.getMonth() + 1,
  )}-${prefixWithOneZero(date.getDate())}`;
}

export function datetimeForInput(_date: string) {
  const datePart = dateForInput(_date);
  const date = new Date(_date);
  return `${datePart} ${prefixWithOneZero(date.getHours())}:${prefixWithOneZero(
    date.getMinutes(),
  )}`;
}

function prefixWithOneZero(value: number) {
  return value < 10 ? '0' + value : '' + value;
}

function prefixWithFourZero(value: number) {
  if (value < 10) return '000' + value;
  if (value < 100) return '00' + value;
  if (value < 1000) return '0' + value;
  return '' + value;
}

export function formatAmount(amount: number) {
  return formatPrice({ amount, device: '' });
}

export function clsx(...args: string[]) {
  return args.filter((it) => !!it).join(' ');
}
