export function formatDateYMD(
  day: string,
  month: string,
  year: string
): string {
  if (!year || !month || !day) {
    throw new Error('[formatDateYMD]: Invalid value as parameter.');
  }
  return `${year}-${month}-${day}`;
}

async function getLastMonthRange() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const firstDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    1
  );
  const lastDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth() + 1,
    0
  );

  return {
    since: firstDayOfLastMonth.toISOString().split("T")[0], // Data formatada (YYYY-MM-DD)
    until: lastDayOfLastMonth.toISOString().split("T")[0], // Data formatada (YYYY-MM-DD)
  };
}
