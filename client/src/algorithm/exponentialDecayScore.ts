export function getExponentialDecayScore(
  searchCount: number,
  lastSearchDate: Date,
  lambda: number = 0.1,
  now: Date = new Date()
): number {
  const msPerHour = 1000 * 60 * 60;
  const timeSinceLastSearch =
    (now.getTime() - lastSearchDate.getTime()) / msPerHour;
  const score = searchCount * Math.exp(-lambda * timeSinceLastSearch);
  return score;
}
