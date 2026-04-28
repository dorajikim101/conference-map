export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function eventDateRange(startDate: string, endDate?: string) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = endDate ? new Date(`${endDate}T00:00:00Z`) : start;

  const startText = `${start.getUTCFullYear()}년 ${start.getUTCMonth() + 1}월 ${start.getUTCDate()}일`;

  if (startDate === endDate || !endDate) {
    return startText;
  }

  const endText =
    start.getUTCFullYear() === end.getUTCFullYear()
      ? `${end.getUTCMonth() + 1}월 ${end.getUTCDate()}일`
      : `${end.getUTCFullYear()}년 ${end.getUTCMonth() + 1}월 ${end.getUTCDate()}일`;

  return `${startText} ~ ${endText}`;
}
