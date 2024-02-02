export function formatTimeSeconds(milliseconds: number) {
  const ms = Math.max(0, milliseconds);
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatTime(milliseconds: number) {
  const ms = Math.max(0, milliseconds);
  const hours = Math.floor(ms / 360000);
  const minutes = Math.floor((ms % 360000) / 60000);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
