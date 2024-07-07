# rails-react-graphql-todo

## アプリ概要
Ruby on Rails × React × GraphQL TODOアプリ<br>

### 技術スタック
- Ruby 3.3
- Ruby on Rails 7
- TypeScript
- React 18
- MySQL 8.0
- Tailwind CSS 3.4.4

## 環境構築
### envファイルの作成
```
cd backend
cp .env.example .env
```
.envファイルの記述内容は、管理者に問い合わせる

### envファイルの作成
```
cd backend/config
touch master.key
```
master.keyファイルの記述内容は、管理者に問い合わせる

### Dockerコンテナ　ビルド・起動・アクセス
rails-react-graphql-todoディレクトリ直下で、下記コマンドを実行する。<br>

コンテナのビルド
```
docker-compose build
```

コンテナの起動
```
docker-compose up -d
```

### バックエンド
apiコンテナにアクセス
```
docker compose exec api bash
```

bundleインストール
```
$ bundle install
```

テーブルの作成
```
$ bundle exec ridgepole --config config/database.yml --env development --file db/Schemafile --apply
```

シーダーの実行
```
$ bundle exec rails db:seed
```

schema.graphql・schema.jsonの更新
```
$ bundle exec rake graphql:schema:dump
```

### フロントエンド
frontコンテナにアクセス
```
docker compose exec front bash
```

npmインストール
```
npm install
```

コンパイル(開発環境)
```
npm run dev
```

ビルド(本番環境)
```
npm run build
```

graphql.tsの更新
```
npm run codegen
```

### ブラウザ
トップページ：http://localhost:3000 <br>
GraphQL Playground：http://localhost:3001/graphiql
