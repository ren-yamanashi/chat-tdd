

// テストコード
import { assertEquals } from 'vitest';

assertEquals(convertMillisToText(31536000000 * 2), '2年');
assertEquals(convertMillisToText(31536000000 * 3), '3年');
assertEquals(convertMillisToText(2678400000 * 5), '5ヶ月');
assertEquals(convertMillisToText(2678400000 * 7), '7ヶ月');
assertEquals(convertMillisToText(86400000 * 10), '10日');
assertEquals(convertMillisToText(86400000 * 20), '20日');
assertEquals(convertMillisToText(3600000 * 6), '6時間0分');
assertEquals(convertMillisToText(3600000 * 18), '18時間0分');
assertEquals(convertMillisToText(3600000 + 60000 * 30), '1時間30分');
assertEquals(convertMillisToText(3600000 * 5 + 60000 * 15), '5時間15分');
assertEquals(convertMillisToText(60000 * 15), '15分');
assertEquals(convertMillisToText(60000 * 45), '45分');
assertEquals(convertMillisToText(0), '0分');
assertEquals(convertMillisToText(-86400000 * 5), '0分');
assertEquals(convertMillisToText(-60000 * 15), '0分');