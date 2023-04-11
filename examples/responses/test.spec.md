

```TypeScript
import { expect } from 'vitest';

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

describe('convertMillisecondsToText', () => {
  it('exactly n years', () => {
    expect(convertMillisecondsToText(31536000000 * 2)).toBe('2年');
    expect(convertMillisecondsToText(31536000000 * 3)).toBe('3年');
  });

  it('exactly n months', () => {
    expect(convertMillisecondsToText(2678400000 * 5)).toBe('5ヶ月');
    expect(convertMillisecondsToText(2678400000 * 7)).toBe('7ヶ月');
  });

  it('exactly n days', () => {
    expect(convertMillisecondsToText(86400000 * 10)).toBe('10日');
    expect(convertMillisecondsToText(86400000 * 20)).toBe('20日');
  });

  it('exactly n hours', () => {
    expect(convertMillisecondsToText(3600000 * 6)).toBe('6時間0分');
    expect(convertMillisecondsToText(3600000 * 18)).toBe('18時間0分');
  });

  it('n hours and m minutes', () => {
    expect(convertMillisecondsToText(3600000 + 60000 * 30)).toBe('1時間30分');
    expect(convertMillisecondsToText(3600000 * 5 + 60000 * 15)).toBe('5時間15分');
  });

  it('exactly n minutes', () => {
    expect(convertMillisecondsToText(60000 * 15)).toBe('15分');
    expect(convertMillisecondsToText(60000 * 45)).toBe('45分');
  });

  it('0 minutes', () => {
    expect(convertMillisecondsToText(0)).toBe('0分');
  });

  it('negative values', () => {
    expect(convertMillisecondsToText(-86400000 * 5)).toBe('0分');
    expect(convertMillisecondsToText(-60000 * 15)).toBe('0分');
  });
});

```