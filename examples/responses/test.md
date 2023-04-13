
```typescript
function convertMillisToText(millis: number): string {
  // convert milliseconds to years
  const years = Math.floor(millis / 31536000000);
  millis %= 31536000000;

  // convert milliseconds to months
  const months = Math.floor(millis / 2678400000);
  millis %= 2678400000;

  // convert milliseconds to days
  const days = Math.floor(millis / 86400000);
  millis %= 86400000;

  // convert milliseconds to hours
  const hours = Math.floor(millis / 3600000);
  millis %= 3600000;

  // convert milliseconds to minutes
  const minutes = Math.floor(millis / 60000);

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
    if (minutes > 0) {
      result += `${minutes}分`;
    } else {
      result += '0分';
    }
  } else if (minutes > 0) {
    result += `${minutes}分`;
  } else {
    result += '0分';
  }
  return result;
}
```