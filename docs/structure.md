# Directory Structure

- [src/app/](../src/app/) — Next.js App Router のページ、レイアウト、サーバーアクション
  - [layout.tsx](../src/app/layout.tsx) — ルートレイアウト: lang="ja"、ダークモードクラス、メタデータ、globals.css のインポート
  - [page.tsx](../src/app/page.tsx) — ホームページ（Server Component）: Drizzle ORM 経由で users を取得し UserTable をレンダリング
  - [actions.ts](../src/app/actions.ts) — サーバーアクション: `createUser`、`updateUser`、`deleteUser`（パス再検証付き）; `User` 型をエクスポート
  - [globals.css](../src/app/globals.css) — グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート

- [src/components/](../src/components/) — 再利用可能な UI コンポーネント
  - [user-table.tsx](../src/components/user-table.tsx) — クライアントコンポーネント: `useOptimistic` による即時 UI 更新とインライン削除確認モーダルを備えたユーザー一覧テーブル
  - [add-user-form.tsx](../src/components/add-user-form.tsx) — HeroUI の Input と Button を使ったユーザー追加フォーム
  - [edit-user-modal.tsx](../src/components/edit-user-modal.tsx) — HeroUI の Modal を使った既存ユーザー編集モーダル

- [src/lib/](../src/lib/) — 共有ユーティリティ
  - [db.ts](../src/lib/db.ts) — postgres-js と Drizzle ORM を使ったデータベースクライアント（コネクションプーリング付き）

- [src/schema.ts](../src/schema.ts) — Drizzle ORM スキーマ: `users` テーブル（id, name, age, email）を定義

- [drizzle/](../drizzle/) — drizzle-kit が生成するデータベースマイグレーションファイル
  - [0000_warm_harry_osborn.sql](../drizzle/0000_warm_harry_osborn.sql) — 初回マイグレーション: users テーブルを作成
  - [0001_tense_tomorrow_man.sql](../drizzle/0001_tense_tomorrow_man.sql) — users テーブルに email カラムを追加
  - [meta/](../drizzle/meta/) — マイグレーションジャーナルとスキーマスナップショット
