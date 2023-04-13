
```typescript
function convertMillisecondsToText(milliseconds: number): string {
  const oneYearInMilliseconds = 31536000000;
  const oneMonthInMilliseconds = 2678400000;
  const oneDayInMilliseconds = 86400000;
  const oneHourInMilliseconds = 3600000;
  const oneMinuteInMilliseconds = 60000;
  
  const years = Math.floor(milliseconds / oneYearInMilliseconds);
  const months = Math.floor((milliseconds % oneYearInMilliseconds) / oneMonthInMilliseconds);
  const days = Math.floor((milliseconds % oneMonthInMilliseconds) / oneDayInMilliseconds);
  const hours = Math.floor((milliseconds % oneDayInMilliseconds) / oneHourInMilliseconds);
  const minutes = Math.floor((milliseconds % oneHourInMilliseconds) / oneMinuteInMilliseconds);
  
  let text = '';
  if (years > 0) {
    text += `${years}年`;
  }
  if (months > 0) {
    text += `${months}ヶ月`;
  }
  if (days > 0) {
    text += `${days}日`;
  }
  if (hours > 0) {
    text += `${hours}時間`;
  }
  if (minutes > 0) {
    text += `${minutes}分`;
  }
  if (minutes === 0 && hours === 0 && days === 0 && months === 0 && years === 0) {
    text += '0分';
  }
  
  return text;
}
```