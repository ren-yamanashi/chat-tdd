
```typescript
function convertMillisecondsToText(milliseconds: number): string {
  const years = Math.floor(milliseconds / 31536000000);
  const months = Math.floor((milliseconds % 31536000000) / 2678400000);
  const days = Math.floor((milliseconds % 2678400000) / 86400000);
  const hours = Math.floor((milliseconds % 86400000) / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);

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
    if (minutes > 0) {
      output += `${minutes}分`;
    } else {
      output += '0分';
    }
  } else if (minutes > 0) {
    output += `${minutes}分`;
  } else {
    output += '0分';
  }

  return output;
}
```