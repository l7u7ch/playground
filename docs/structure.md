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
│   ├── 0002_aspiring_sharon_ventura.sql — todos テーブルを作成（id, title, completed, createdAt）、users テーブルを削除
│   ├── 0003_overjoyed_master_chief.sql  — todos テーブルに deadline カラムを追加（timestamp、nullable）
│   ├── 0004_pink_retro_girl.sql        — priority ENUM 型を作成し、todos テーブルに priority カラムを追加
│   └── meta/                          — マイグレーションジャーナルとスキーマスナップショット
├── docs/
│   └── structure.md                   — このファイル: プロジェクト構成ドキュメント
├── src/
│   ├── app/                           — Next.js App Router のページとレイアウト
│   │   ├── globals.css                — グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート
│   │   ├── layout.tsx                 — ルートレイアウト: lang="ja"、ダークモードクラス、メタデータ、globals.css のインポート
│   │   ├── actions.ts                 — Server Actions: addTodo（title・deadline・priority を todos テーブルへ挿入）、updateTodoPriority（todo の priority をインライン更新）
│   │   └── page.tsx                   — ホームページ（Server Component）: todos を createdAt 順に全件取得して TodosTable へ渡す
│   ├── components/
│   │   ├── AddTodoModal.tsx           — ToDo 追加モーダル（HeroUI Modal + Form）の Client Component: title・deadline・priority を入力
│   │   └── TodosTable.tsx             — TanStack Table を使用した ToDo 一覧の Client Component: deadline カラムの表示（相対時間トグル・期限超過警告🔴）・priority カラムの表示（色分け・インライン編集ドロップダウン）・検索・ソート・ページネーション対応
│   ├── lib/
│   │   └── db.ts                      — Drizzle ORM クライアントファクトリ: DATABASE_URL から postgres 接続を生成して返す
│   └── schema.ts                      — Drizzle ORM スキーマ: todosPriority ENUM（low/medium/high）と todos テーブル（id, title, completed, createdAt, deadline, priority）を定義
├── .env.local                         — 環境変数: DATABASE_URL など（git 管理外）
├── biome.json                         — Biome 設定: フォーマット（タブ/ダブルクォート）・リント・インポート整序
├── drizzle.config.ts                  — Drizzle Kit 設定: スキーマパス、出力先（.drizzle/）、PostgreSQL 接続
├── next.config.ts                     — Next.js 設定（現在は空のデフォルト設定）
├── postcss.config.mjs                 — PostCSS 設定: Tailwind CSS v4 プラグイン（@tailwindcss/postcss）を指定
└── tsconfig.json                      — TypeScript 設定: パスエイリアス @/* → ./src/*
```
