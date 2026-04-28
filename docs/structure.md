# Directory Structure

```
.
├── drizzle/                          — drizzle-kit が生成するデータベースマイグレーションファイル
│   ├── 0000_warm_harry_osborn.sql    — 初回マイグレーション: users テーブルを作成
│   ├── 0001_tense_tomorrow_man.sql   — users テーブルに email カラムを追加
│   └── meta/                         — マイグレーションジャーナルとスキーマスナップショット
└── src/
    ├── app/                          — Next.js App Router のページ、レイアウト、サーバーアクション
    │   ├── actions.ts                — サーバーアクション: createUser、updateUser、deleteUser（パス再検証付き）; User 型をエクスポート
    │   ├── globals.css               — グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート
    │   ├── layout.tsx                — ルートレイアウト: lang="ja"、ダークモードクラス、メタデータ、globals.css のインポート
    │   └── page.tsx                  — ホームページ（Server Component）: Drizzle ORM 経由で users を取得し UserTable をレンダリング
    ├── components/                   — 再利用可能な UI コンポーネント
    │   ├── add-user-form.tsx         — HeroUI の Input と Button を使ったユーザー追加フォーム
    │   ├── edit-user-modal.tsx       — HeroUI の Modal を使った既存ユーザー編集モーダル
    │   └── user-table.tsx            — クライアントコンポーネント: useOptimistic による即時 UI 更新とインライン削除確認モーダルを備えたユーザー一覧テーブル
    ├── lib/                          — 共有ユーティリティ
    │   └── db.ts                     — postgres-js と Drizzle ORM を使ったデータベースクライアント（コネクションプーリング付き）
    └── schema.ts                     — Drizzle ORM スキーマ: users テーブル（id, name, age, email）を定義
```
