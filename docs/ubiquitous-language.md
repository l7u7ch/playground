---
title: ユビキタス言語
description: このプロジェクトで使用するドメイン用語の定義・意味・値域を一覧化したドキュメント
updated: 2026-05-03
---

このドキュメントは DDD（ドメイン駆動設計）のユビキタス言語として、プロジェクト内で登場するドメイン用語を明文化したものです。コード・設計・会話のすべてにわたってこの定義を共有し、認識のずれを防ぎます。

## エンティティ

### Todo

管理対象となる作業の 1 単位。`id` で識別され、タイトル・進捗状態・優先度・規模感・締め切りを持つ。

| フィールド  | 型           | 必須 | デフォルト | 説明                   |
| ----------- | ------------ | :--: | ---------- | ---------------------- |
| `id`        | number       |  ○   | 自動採番   | 一意識別子             |
| `title`     | string       |  ○   | —          | 作業の名称・説明       |
| `status`    | Status       |  ○   | `todo`     | 進捗状態               |
| `priority`  | Priority     |  ○   | `medium`   | 重要度                 |
| `estimate`  | Estimate     |  ○   | `m`        | 規模感                 |
| `deadline`  | Date \| null |  ✗   | null       | 締め切り日時           |
| `createdAt` | Date         |  ○   | 作成時刻   | 登録日時（自動セット） |

**実装参照:** [`src/schema.ts`](../src/schema.ts) / [`src/components/useColumns.tsx`](../src/components/useColumns.tsx)

---

## 値オブジェクト

### Status（ステータス）

Todo の進捗状態を表す。3 段階の遷移を持つ。

| 値      | ラベル | 意味             |
| ------- | ------ | ---------------- |
| `todo`  | ToDo   | 未着手（初期値） |
| `doing` | Doing  | 作業中           |
| `done`  | Done   | 完了             |

**実装参照:** [`src/components/StatusCell.tsx`](../src/components/StatusCell.tsx)

---

### Priority（優先度）

Todo の重要度・緊急度を表す。数値が小さいほど高優先。

| 値         | ラベル   | 順序 | 意味                 |
| ---------- | -------- | :--: | -------------------- |
| `critical` | Critical |  0   | 最緊急。即対応が必要 |
| `high`     | High     |  1   | 高優先度             |
| `medium`   | Medium   |  2   | 通常（デフォルト）   |
| `low`      | Low      |  3   | 低優先度             |
| `lowest`   | Lowest   |  4   | 最低優先度           |

**実装参照:** [`src/components/PriorityCell.tsx`](../src/components/PriorityCell.tsx)

---

### Estimate（見積）

T シャツサイジング方式による作業規模の相対的な見積。絶対的な時間ではなく、チーム内の共通感覚として使う。

| 値   | ラベル | 意味の目安                |
| ---- | ------ | ------------------------- |
| `xs` | XS     | 極小（数分〜1時間程度）   |
| `s`  | S      | 小（半日程度）            |
| `m`  | M      | 中（1日程度・デフォルト） |
| `l`  | L      | 大（数日程度）            |
| `xl` | XL     | 極大（1週間以上）         |

**実装参照:** [`src/components/EstimateCell.tsx`](../src/components/EstimateCell.tsx)

---

## ドメイン操作

Todo に対して行える操作の一覧。いずれも Server Actions として実装されている。

| 操作名               | 説明                          |
| -------------------- | ----------------------------- |
| `addTodo`            | 新規 Todo を作成する          |
| `updateTodo`         | Todo の全フィールドを更新する |
| `updateTodoStatus`   | Todo のステータスのみ更新する |
| `updateTodoPriority` | Todo の優先度のみ更新する     |
| `updateTodoEstimate` | Todo の見積のみ更新する       |
| `deleteTodo`         | Todo を削除する               |

**実装参照:** [`src/inbox/actions.ts`](../src/inbox/actions.ts)
