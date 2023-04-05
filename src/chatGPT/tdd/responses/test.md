
```typescript
// 引数としてミリ秒を受け取り、それをテキストに変換する関数
function convertMillisecondsToText(milliseconds: number): string {
  const yearInMilliseconds = 31536000000;
  const monthInMilliseconds = 2678400000;
  const dayInMilliseconds = 86400000;
  const hourInMilliseconds = 3600000;
  const minuteInMilliseconds = 60000;

  let result = '';

  if (milliseconds < 0) {
    return result;
  }

  const years = Math.floor(milliseconds / yearInMilliseconds);
  if (years > 0) {
    result += `${years}年`;
  }

  const months = Math.floor((milliseconds % yearInMilliseconds) / monthInMilliseconds);
  if (months > 0) {
    result += `${months}ヶ月`;
  }

  const days = Math.floor((milliseconds % monthInMilliseconds) / dayInMilliseconds);
  if (days > 0) {
    result += `${days}日`;
  }

  const hours = Math.floor((milliseconds % dayInMilliseconds) / hourInMilliseconds);
  if (hours > 0) {
    const minutes = Math.floor((milliseconds % hourInMilliseconds) / minuteInMilliseconds);
    if (minutes > 0) {
      result += `${hours}時間${minutes}分`;
    } else {
      result += `${hours}時間0分`;
    }
  } else {
    const minutes = Math.floor((milliseconds % hourInMilliseconds) / minuteInMilliseconds);
    if (minutes > 0) {
      result += `${minutes}分`;
    } else {
      result += `0分`;
    }
  }

  return result;
}
```