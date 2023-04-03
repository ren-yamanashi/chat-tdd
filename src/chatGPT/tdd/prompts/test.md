あなたは、TypeScriptプログラマーです。
以下のyamlファイルに従って、TypeScriptコードを生成して下さい。
また、生成されたTypeScriptコードのみ出力し、コード外で自然言語を使用しないでください。

~~~yaml
Prompt:
引数としてミリ秒を受け取り、それをテキストに変換する関数を作成してください。以下の分岐条件とコーディング規約に従ってください。

branch condition:
- n年mヶ月ではなく、n年のみ出力
- nヶ月m日ではなく、nヶ月のみ出力
- n日m時間ではなく、n日のみ出力
- n分m秒ではなく、n分のみ出力
- ちょうどn時間の場合は、n時間0分と出力
- n時間m分の場合は、n時間m分と出力

Coding convention:
- ハードコーディングは避け、変数を使用する
- 可読性を重視してコーディングを行う

[Cases]
case1: "exactly n years"
  inputs: 
    - {
        input: 31536000000 * 2,
        output: "2年"
      }
    - {
        input: 31536000000 * 3,
        output: "3年"
      }

case2: "exactly n months"
  inputs:
    - {
        input: 2678400000 * 5,
        output: "5ヶ月"
      }
    - {
        input: 2678400000 * 7,
        output: "7ヶ月"
      }

case3: "exactly n days"
  inputs:
    - {
        input: 86400000 * 10,
        output: '10日'
      }
    - {
        input: 86400000 * 20,
        output: "20日"
      }

case4: "exactly n hours"
  inputs:
    - {
        input: 3600000 * 6,
        output: '6時間0分'
      }
    - {
        input: 3600000 * 18,
        output: '18時間0分'
      }

case5: "n hours and m minutes"
  inputs:
    - {
        input: 3600000 + 60000 * 30,
        output: '1時間30分'
      }
    - {
        input: 3600000 * 5 + 60000 * 15,
        output: '5時間15分'
      }

case6: "exactly n minutes"
  inputs:
    - {
        input: 60000 * 15,
        output: '15分'
      }
    - {
        input: 60000 * 45,
        output: '45分'
      }

case7: "0 minutes"
  inputs:
    - {
        input: 0,
        output: '0分'
      }

case8: "negative values"
  inputs:
    - {
        input: -86400000 * 5,
        output: '0分'
      }
    - {
        input: -60000 * 15,
        output: '0分'
      }
~~~
