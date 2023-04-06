してリファクタリングしてください。

```typescript
const MILLISECONDS_PER_YEAR = 31536000000;
const MILLISECONDS_PER_MONTH = 2678400000;
const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;

const convertMillisecondsToText = (milliseconds: number): string => {
  if (milliseconds < 0) {
    return '0分';
  }

  const years = Math.floor(milliseconds / MILLISECONDS_PER_YEAR);
  const months = Math.floor((milliseconds % MILLISECONDS_PER_YEAR) / MILLISECONDS_PER_MONTH);
  const days = Math.floor((milliseconds % MILLISECONDS_PER_MONTH) / MILLISECONDS_PER_DAY);
  const hours = Math.floor((milliseconds % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR);
  const minutes = Math.floor((milliseconds % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

  let result = '';
  if (years > 0) {
    result += `${years}年`;
  }
  if (months > 0) {
    result += `${months}ヶ月`;
  }
  if (days > 0) {
    result += `${days}日`;
  }
  if (hours > 0) {
    result += `${hours}時間`;
  }
  if (minutes > 0) {
    result += `${minutes}分`;
  }
  if (minutes === 0 && hours > 0) {
    result += `${hours}時間0分`;
  }

  return result;
}
```