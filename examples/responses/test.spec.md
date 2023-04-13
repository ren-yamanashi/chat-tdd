
```typescript
import { expect } from 'vitest';

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

expect(convertMillisecondsToText(31536000000 * 2)).toBe('2年');
expect(convertMillisecondsToText(31536000000 * 3)).toBe('3年');
expect(convertMillisecondsToText(2678400000 * 5)).toBe('5ヶ月');
expect(convertMillisecondsToText(2678400000 * 7)).toBe('7ヶ月');
expect(convertMillisecondsToText(86400000 * 10)).toBe('10日');
expect(convertMillisecondsToText(86400000 * 20)).toBe('20日');
expect(convertMillisecondsToText(3600000 * 6)).toBe('6時間0分');
expect(convertMillisecondsToText(3600000 * 18)).toBe('18時間0分');
expect(convertMillisecondsToText(3600000 + 60000 * 30)).toBe('1時間30分');
expect(convertMillisecondsToText(3600000 * 5 + 60000 * 15)).toBe('5時間15分');
expect(convertMillisecondsToText(60000 * 15)).toBe('15分');
expect(convertMillisecondsToText(60000 * 45)).toBe('45分');
expect(convertMillisecondsToText(0)).toBe('0分');
expect(convertMillisecondsToText(-86400000 * 5)).toBe('0分');
expect(convertMillisecondsToText(-60000 * 15)).toBe('0分');
```