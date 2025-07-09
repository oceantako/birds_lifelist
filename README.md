
# Hono

## swagger

OpenAPIHono を使う 🔥
http://localhost:3000/api/swagger
で表示可能

## 環境変数

1. dotenv をインストール

```
npm i dotenv
```

2. dotenv/config を import することで、.env 内の設定を読み込めるようになる

```
【.env】
API_KEY=your-secret-key

```

```
import "dotenv/config";
app.get("/env", (c) => {
  const apiKey = process.env.API_KEY || "default-key";
  return c.text(`API Key: ${apiKey}`);
});
```

## S3

SDK for JavaScript (v3) 公式

https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html#basics

1. IAM ポリシーの作成
2. IAM ユーザーの作成
3. アクセスキーとシークレットキーの作成と取得
4. 実装 😃

```
npm install @aws-sdk/client-s3
```

## Debug

1. .vscode/launch.json を作成
2. dev コマンドに --inspect 追加
3. npm run dev した後に F5

## 参考サイト

ディレクトリ構成
https://zenn.dev/yodaka/articles/ad49f29a54ceba