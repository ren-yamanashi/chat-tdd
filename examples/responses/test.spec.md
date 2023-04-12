
テストコード

```typescript
import { expect } from 'vitest';

describe('convertMillisecondsToText', () => {
  it('case1: "exactly n years"', () => {
    expect(convertMillisecondsToText(31536000000 * 2)).toEqual('2年');
    expect(convertMillisecondsToText(31536000000 * 3)).toEqual('3年');
  });

  it('case2: "exactly n months"', () => {
    expect(convertMillisecondsToText(2678400000 * 5)).toEqual('5ヶ月');
    expect(convertMillisecondsToText(2678400000 * 7)).toEqual('7ヶ月');
  });

  it('case3: "exactly n days"', () => {
    expect(convertMillisecondsToText(86400000 * 10)).toEqual('10日');
    expect(convertMillisecondsToText(86400000 * 20)).toEqual('20日');
  });

  it('case4: "exactly n hours"', () => {
    expect(convertMillisecondsToText(3600000 * 6)).toEqual('6時間0分');
    expect(convertMillisecondsToText(3600000 * 18)).toEqual('18時間0分');
  });

  it('case5: "n hours and m minutes"', () => {
    expect(convertMillisecondsToText(3600000 + 60000 * 30)).toEqual('1時間30分');
    expect(convertMillisecondsToText(3600000 * 5 + 60000 * 15)).toEqual('5時間15分');
  });

  it('case6: "exactly n minutes"', () => {
    expect(convertMillisecondsToText(60000 * 15)).toEqual('15分');
    expect(convertMillisecondsToText(60000 * 45)).toEqual('45分');
  });

  it('case7: "0 minutes"', () => {
    expect(convertMillisecondsToText(0)).toEqual('0分');
  });

  it('case8: "negative values"', () => {
    expect(convertMillisecondsToText(-86400000 * 5)).toEqual('0分');
    expect(convertMillisecondsToText(-60000 * 15)).toEqual('0分');
  });
});
```