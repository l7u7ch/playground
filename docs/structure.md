---
title: ディレクトリ構成
description: src/ ディレクトリの構成と各ファイルの役割を示すドキュメント
updated: 2026-05-03
---

関連ドキュメント: [ユビキタス言語](./ubiquitous-language.md)

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
│   ├── EstimateCell.tsx
│   ├── PriorityCell.tsx
│   ├── StatusCell.tsx
│   ├── TodosContextMenu.tsx
│   ├── TodosToolbar.tsx
│   ├── TodosView.tsx
│   └── useColumns.tsx
├── inbox/
│   ├── actions.ts
│   └── db.ts
└── schema.ts
```

## ファイル一覧

| ファイル                            | 説明                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`                   | グローバルスタイル: Tailwind CSS と HeroUI スタイルのインポート                                                                             |
| `app/layout.tsx`                    | ルートレイアウト: `lang="ja"`、ダークモードクラス、メタデータ                                                                               |
| `app/page.tsx`                      | ホームページ（Server Component）: todos を全件取得して TodosView へ渡す                                                                     |
| `components/AddTodoModal.tsx`       | ToDo 追加モーダル（HeroUI Modal + Form）: title・deadline・priority・estimate を入力                                                        |
| `components/ConfirmDialog.tsx`      | 削除確認モーダル: `isOpen`・`isDeleting`・`onCancel`・`onConfirm` を受け取る汎用ダイアログ                                                  |
| `components/EditTodoModal.tsx`      | ToDo 編集モーダル: 既存値をプリセットし title・deadline・priority・status・estimate を更新                                                  |
| `components/EstimateCell.tsx`       | Tシャツサイズインライン編集ドロップダウン: `Estimate` 型・`ESTIMATE_LABEL/CLASS` 定数を export                                              |
| `components/PriorityCell.tsx`       | 優先度インライン編集ドロップダウン: `Priority` 型・`PRIORITY_ORDER/LABEL/CLASS` 定数を export                                               |
| `components/StatusCell.tsx`         | ステータスインライン編集ドロップダウン: `Status` 型（`todo/doing/done`）・`STATUS_LABEL/CLASS` 定数を export                                |
| `components/TodosContextMenu.tsx`   | 右クリックコンテキストメニュー: 指定座標に表示し「編集」「削除」アクションを提供                                                            |
| `components/TodosToolbar.tsx`       | ツールバー: 検索フィルタ入力・カラム表示切替メニュー・AddTodoModal を統合                                                                   |
| `components/TodosView.tsx`          | TanStack Table を使った ToDo 一覧: ソート・検索・カラム表示切替・右クリックコンテキストメニュー・編集/削除ダイアログを統括                  |
| `components/useColumns.tsx`         | TanStack Table 列定義フック: `Todo` 型・`COLUMN_LABELS`・`useColumns` を export（id/title/status/priority/estimate/deadline/createdAt 列）  |
| `inbox/actions.ts`                  | Server Actions: `addTodo`・`updateTodo`・`updateTodoPriority`・`updateTodoStatus`・`updateTodoEstimate`・`deleteTodo`                       |
| `inbox/db.ts`                       | Drizzle ORM クライアントファクトリ: `DATABASE_URL` から postgres 接続を生成                                                                 |
| `schema.ts`                         | Drizzle ORM スキーマ: `statusEnum`（`todo/doing/done`）・`priorityEnum`（`critical/high/medium/low/lowest`）・`estimateEnum`（`xs/s/m/l/xl`）と `todos` テーブルを定義 |

## ディレクトリルール

| ディレクトリ  | ルール                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/`        | Next.js 13+ の App Router によるルーティング層。`page.tsx` / `layout.tsx` などの規約ファイルでページ・レイアウトを定義する。Server Components がデフォルト。 |
| `components/` | 複数のページ・レイアウトをまたいで使用する再利用可能な UI コンポーネント置き場。                                                                             |
| `inbox/`      | 作業中・未整理の一時ファイル置き場。整理が完了したら適切なディレクトリへ移動すること。                                                                       |
