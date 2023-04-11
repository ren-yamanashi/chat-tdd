
```TypeScript
function convertMillisecondsToText(milliseconds: number): string {
  const years = Math.floor(milliseconds / 31536000000);
  const months = Math.floor((milliseconds % 31536000000) / 2678400000);
  const days = Math.floor(((milliseconds % 31536000000) % 2678400000) / 86400000);
  const hours = Math.floor((((milliseconds % 31536000000) % 2678400000) % 86400000) / 3600000);
  const minutes = Math.floor(((((milliseconds % 31536000000) % 2678400000) % 86400000) % 3600000) / 60000);

  let result = "";

  if (milliseconds < 0) {
    return result;
  }

  if (years !== 0) {
    result += `${years}年`;
  }

  if (months !== 0) {
    result += `${months}ヶ月`;
  }

  if (days !== 0) {
    result += `${days}日`;
  }

  if (hours !== 0) {
    if (minutes === 0) {
      result += `${hours}時間0分`;
    } else {
      result += `${hours}時間${minutes}分`;
    }
  }

  if (minutes !== 0 && hours === 0) {
    result += `${minutes}分`;
  }

  return result;
}
```