export function getExponentialDecayScore(
  searchCount: number,
  lastSearchDate: string,
  lambda: number = 0.1,
  now: Date = new Date()
): number {
  if (!lastSearchDate || isNaN(new Date(lastSearchDate).getTime())) return 0;

  const msPerHour = 1000 * 60 * 60;
  const lastDate = new Date(lastSearchDate);
  const timeSinceLastSearch = (now.getTime() - lastDate.getTime()) / msPerHour;

  if (timeSinceLastSearch < 0) return 0; // avoid future dates

  const score = searchCount * Math.exp(-lambda * timeSinceLastSearch);
  return score;
}
