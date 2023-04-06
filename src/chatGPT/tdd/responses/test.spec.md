

テストコード：

import { expect } from 'vitest';

describe('convertMillisecondsToText', () => {
  it('case1: "exactly n years"', () => {
    expect(convertMillisecondsToText(31536000000 * 2)).toBe('2年');
    expect(convertMillisecondsToText(31536000000 * 3)).toBe('3年');
  });

  it('case2: "exactly n months"', () => {
    expect(convertMillisecondsToText(2678400000 * 5)).toBe('5ヶ月');
    expect(convertMillisecondsToText(2678400000 * 7)).toBe('7ヶ月');
  });

  it('case3: "exactly n days"', () => {
    expect(convertMillisecondsToText(86400000 * 10)).toBe('10日');
    expect(convertMillisecondsToText(86400000 * 20)).toBe('20日');
  });

  it('case4: "exactly n hours"', () => {
    expect(convertMillisecondsToText(3600000 * 6)).toBe('6時間0分');
    expect(convertMillisecondsToText(3600000 * 18)).toBe('18時間0分');
  });

  it('case5: "n hours and m minutes"', () => {
    expect(convertMillisecondsToText(3600000 + 60000 * 30)).toBe('1時間30分');
    expect(convertMillisecondsToText(3600000 * 5 + 60000 * 15)).toBe('5時間15分');
  });

  it('case6: "exactly n minutes"', () => {
    expect(convertMillisecondsToText(60000 * 15)).toBe('15分');
    expect(convertMillisecondsToText(60000 * 45)).toBe('45分');
  });

  it('case7: "0 minutes"', () => {
    expect(convertMillisecondsToText(0)).toBe('0分');
  });

  it('case8: "negative values"', () => {
    expect(convertMillisecondsToText(-86400000 * 5)).toBe('0分');
    expect(convertMillisecondsToText(-60000 * 15)).toBe('0分');
  });
});