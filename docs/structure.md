---
title: ディレクトリ構成
description: プロジェクトのディレクトリ構成と各ファイルの役割を示すドキュメント
updated: 2026-05-02
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
│   ├── app/                           — Next.js App Router のページとレイアウト
│   │   ├── globals.css                — グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート
│   │   ├── layout.tsx                 — ルートレイアウト: lang="ja"、ダークモードクラス、メタデータ、globals.css のインポート
│   │   ├── actions.ts                 — Server Actions: addTodo（フォームデータから todos テーブルへの挿入）
│   │   └── page.tsx                   — ホームページ（Client Component）
│   ├── components/
│   │   ├── AddTodoModal.tsx           — ToDo 追加モーダル（HeroUI Modal + Form）の Client Component
│   │   └── TodosTable.tsx             — TanStack Table を使用した ToDo 一覧の Client Component
│   ├── lib/
│   │   └── db.ts                      — Drizzle ORM クライアントファクトリ: DATABASE_URL から postgres 接続を生成して返す
│   └── schema.ts                      — Drizzle ORM スキーマ: todos テーブル（id, title, completed, createdAt）を定義
├── .env.local                         — 環境変数: DATABASE_URL など（git 管理外）
├── biome.json                         — Biome 設定: フォーマット（タブ/ダブルクォート）・リント・インポート整序
├── drizzle.config.ts                  — Drizzle Kit 設定: スキーマパス、出力先（.drizzle/）、PostgreSQL 接続
├── next.config.ts                     — Next.js 設定（現在は空のデフォルト設定）
├── postcss.config.mjs                 — PostCSS 設定: Tailwind CSS v4 プラグイン（@tailwindcss/postcss）を指定
└── tsconfig.json                      — TypeScript 設定: パスエイリアス @/* → ./src/*
```
