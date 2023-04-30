# README
# AI Travel Planner - AI旅行プラン作成アプリ

## アプリケーション概要
 AI Travel Plannerは、旅行プランをchatGPTで作成・編集し、他のユーザーのプランを検索・閲覧することができるWebアプリケーションです。

## URL※


## テスト用アカウント
- ユーザー名: xxxx
- パスワード: xxxx
- (Basic認証がある場合) ID/Pass: /

## 利用方法


## アプリケーションを作成した背景


## 洗い出した要件
https://docs.google.com/spreadsheets/d/14BRQmvPvs6sjqfATUuG_9KmYX6T1PGkz4g8qRgkKmcY/edit#gid=982722306

## 実装した機能についての画像やGIFおよびその説明※
(実装した機能の画像やGIF、説明を記載)

## 実装予定の機能


## データベース設計
ER図はer.dioに記載

## usersテーブル
| Column                | Type    | Options                   |
| --------------------- | ------  | ------------------------- |
| nickname              | string  | null: false               |
| email                 | string  | null: false, unique: true |
| encrypted_password    | string  | null: false               | 
| birth_date            | date    | null: false               |
| sex_id                | integer | null: false               |

 ## plansテーブル
| Column                | Type    | Options                   |
| --------------------- | ------  | ------------------------- |
| destination           | string  | null: false               |
| duration              | integer | null: false               | 
| budget                | integer | null: false               |
| activity_id           | integer | null: false               | 
| transportation_id     | integer | null: false               | 
| food_id               | integer | null: false               | 
| place_to_visit        | string  | null: false               | 
| content               | text    | null: false               | 

<!-- ## favoritesテーブル
| Column   | Type       | Options                        |
| -------- | ---------- | ------------------------------ |
| user     | references | null: false, foreign_key: true |
| plan     | references | null: false, foreign_key: true | -->

 ## typesテーブル
| Column                | Type    | Options                   |
| --------------------- | ------  | ------------------------- |
| destination           | string  | null: false               |
| duration              | integer | null: false               |
| budget                | integer | null: false               |
| accommodation_id      | integer | null: false               | 
| activity_id           | integer | null: false               | 
| transportation_id     | integer | null: false               | 
| meal_id               | integer | null: false               | 


## Association

## usersテーブル
has_many :plans
has_many :favorites

## plansテーブル
belongs_to :user
has_many :favorites

## favoritesテーブル
has_many :users
has_many :plans



## 各テーブルの説明

## usersテーブル
・ニックネーム
・メールアドレス
・暗号化パスワード
・誕生年月日

## plansテーブル
・タイトル
・目的地
・期間
・予算
・出力結果

## favoritesテーブル
・ユーザーID (ユーザーの外部キーカラム)
・プランID (プランの外部キーカラム)




## 画面遷移図
(画面遷移図を添付)

## 開発環境
- 言語: Ruby
- フレームワーク: Ruby on Rails
- データベース: PostgreSQL
- バージョン管理: Git

## ローカルでの動作方法※
 以下のコマンドを順に実行。
 % git clone https://github.com/xxxxxx
 % cd xxxxxx
 % bundle install
 % yarn install


