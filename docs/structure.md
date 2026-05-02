---
title: ディレクトリ構成
description: src/ ディレクトリの構成と各ファイルの役割を示すドキュメント
updated: 2026-05-03 08:36
---

## 構成

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddTodoModal.tsx
│   ├── ConfirmDialog.tsx
│   ├── EditTodoModal.tsx
│   ├── PriorityCell.tsx
│   ├── TodosTable.tsx
│   └── useColumns.tsx
├── inbox/
│   ├── actions.ts
│   └── db.ts
└── schema.ts
```

## ファイル一覧

| ファイル                       | 説明                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `app/globals.css`              | グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート                                          |
| `app/layout.tsx`               | ルートレイアウト: `lang="ja"`、ダークモードクラス、メタデータ                                            |
| `app/page.tsx`                 | ホームページ（Server Component）: todos を全件取得して TodosTable へ渡す                                 |
| `components/AddTodoModal.tsx`  | ToDo 追加モーダル（HeroUI Modal + Form）: title・deadline・priority を入力                               |
| `components/ConfirmDialog.tsx` | 削除確認モーダル: `isOpen`・`isDeleting`・`onCancel`・`onConfirm` を受け取る汎用ダイアログ               |
| `components/EditTodoModal.tsx` | ToDo 編集モーダル: 既存値をプリセットし title・deadline・priority を更新                                 |
| `components/PriorityCell.tsx`  | 優先度インライン編集ドロップダウン: `Priority` 型・`PRIORITY_ORDER/CLASS` 定数を export                  |
| `components/TodosTable.tsx`    | TanStack Table を使った ToDo 一覧: 検索・ソート・カラム表示切替・右クリックコンテキストメニュー          |
| `components/useColumns.tsx`    | TanStack Table 列定義フック: `COLUMN_LABELS`・`formatRelativeTime`・`useColumns` を export               |
| `inbox/actions.ts`             | Server Actions: `addTodo`・`updateTodo`・`updateTodoPriority`・`deleteTodo`                              |
| `inbox/db.ts`                  | Drizzle ORM クライアントファクトリ: `DATABASE_URL` から postgres 接続を生成                              |
| `schema.ts`                    | Drizzle ORM スキーマ: `todosPriority` ENUM（`critical/high/medium/low/lowest`）と `todos` テーブルを定義 |

## ディレクトリルール

| ディレクトリ  | ルール                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/`        | Next.js 13+ の App Router によるルーティング層。`page.tsx` / `layout.tsx` などの規約ファイルでページ・レイアウトを定義する。Server Components がデフォルト。 |
| `components/` | 複数のページ・レイアウトをまたいで使用する再利用可能な UI コンポーネント置き場。                                                                             |
| `inbox/`      | 作業中・未整理の一時ファイル置き場。整理が完了したら適切なディレクトリへ移動すること。                                                                       |
