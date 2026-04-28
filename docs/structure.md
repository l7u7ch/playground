---
title: ディレクトリ構成
description: プロジェクトのディレクトリ構成と各ファイルの役割を示すドキュメント
updated: 2026-04-29 04:14
---

```
.
├── .drizzle/                          — drizzle-kit が生成するデータベースマイグレーションファイル
│   ├── 0000_warm_harry_osborn.sql     — 初回マイグレーション: users テーブルを作成（id, name, age）
│   ├── 0001_tense_tomorrow_man.sql    — users テーブルに email カラムを追加
│   └── meta/                          — マイグレーションジャーナルとスキーマスナップショット
├── docs/
│   └── structure.md                   — このファイル: プロジェクト構成ドキュメント
├── src/
│   ├── app/                           — Next.js App Router のページ、レイアウト、サーバーアクション
│   │   ├── actions.ts                 — サーバーアクション: createUser、updateUser、deleteUser（パス再検証付き）; User 型・ActionResult<T> 型をエクスポート
│   │   ├── globals.css                — グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート
│   │   ├── layout.tsx                 — ルートレイアウト: lang="ja"、ダークモードクラス、メタデータ、globals.css のインポート
│   │   └── page.tsx                   — ホームページ（Server Component）: 現在はプレースホルダー実装
│   ├── components/                    — 再利用可能な UI コンポーネント
│   │   ├── add-user-form.tsx          — HeroUI の Input と Button を使ったユーザー追加フォーム
│   │   ├── edit-user-modal.tsx        — HeroUI の Modal を使った既存ユーザー編集モーダル
│   │   └── user-table.tsx             — クライアントコンポーネント: useOptimistic による即時 UI 更新とカスタムインライン削除確認モーダルを備えたユーザー一覧テーブル
│   └── schema.ts                      — Drizzle ORM スキーマ: users テーブル（id, name, age, email）を定義
├── .env.local                         — 環境変数: DATABASE_URL など（git 管理外）
├── biome.json                         — Biome 設定: フォーマット（タブ/ダブルクォート）・リント・インポート整序
├── drizzle.config.ts                  — Drizzle Kit 設定: スキーマパス、出力先（.drizzle/）、PostgreSQL 接続
├── next.config.ts                     — Next.js 設定（現在は空のデフォルト設定）
└── tsconfig.json                      — TypeScript 設定: パスエイリアス @/* → ./src/*
```
