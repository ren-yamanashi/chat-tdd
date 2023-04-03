
```typescript
const MILLISECONDS_PER_YEAR = 31536000000;
const MILLISECONDS_PER_MONTH = 2678400000;
const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;

function convertMillisecondsToText(milliseconds: number): string {
  if (milliseconds < 0) {
    return '0分';
  }

  const years = Math.floor(milliseconds / MILLISECONDS_PER_YEAR);
  const months = Math.floor((milliseconds % MILLISECONDS_PER_YEAR) / MILLISECONDS_PER_MONTH);
  const days = Math.floor((milliseconds % MILLISECONDS_PER_MONTH) / MILLISECONDS_PER_DAY);
  const hours = Math.floor((milliseconds % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR);
  const minutes = Math.floor((milliseconds % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

  let output = '';
  if (years > 0) {
    output += `${years}年`;
  }
  if (months > 0) {
    output += `${months}ヶ月`;
  }
  if (days > 0) {
    output += `${days}日`;
  }
  if (hours > 0) {
    output += `${hours}時間`;
  }
  if (minutes > 0) {
    output += `${minutes}分`;
  }
  if (hours > 0 && minutes === 0) {
    output += '0分';
  }

  return output;
}
```