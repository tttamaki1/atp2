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
    流行りのAI技術を活用して、旅行プランを簡単に迅速に作成できることを目的としています。
    旅行のプランを立てるのに時間と労力をかけたくない。
    旅行先に着いてから、どこへ行こうか決めたい。
    計画を立てずに旅行に出かけてしまう。
    といった方向けのサービスです。
    chatGPTに入力しても、プロンプトを考えて入力しないと、自分が望んでいるプランを引き出すことは大変です。
    簡単にカテゴリー分けして選択するだけで、ユーザーがプロンプトを考える手間を省くことができるのがこのアプリの利点でもあります。


## 洗い出した要件
    https://docs.google.com/spreadsheets/d/1uBQ9XevW9cdWEY5zI8RuL_lRH0Y_DjKLr-4miGxbIP8/edit#gid=982722306

## 実装した機能についての画像やGIFおよびその説明※
    (実装した機能の画像やGIF、説明を記載)

## 実装予定の機能
    ()

## データベース設計
    ER図はer.dioに記載
    https://gyazo.com/3f0c2928f260c7c59312dc6ca6eb4d23

## usersテーブル
    | Column                | Type    | Options                   |
    | --------------------- | ------  | ------------------------- |
    | nickname              | string  | null: false               |
    | email                 | string  | null: false, unique: true |
    | encrypted_password    | string  | null: false               | 
    | birth_date            | date    |                           |
    | sex_id                | integer |                           |

    ## plansテーブル
    | Column                | Type    | Options                   |
    | --------------------- | ------  | ------------------------- |
    | user                  | references | null: false, foreign_key: true |
    | destination           | string  | null: false               |
    | duration              | integer | null: false               | 
    | budget                | integer | null: false               |
    | activity_id           | integer | null: false               | 
    | transportation_id     | integer | null: false               | 
    | food_id               | integer | null: false               | 
    | place_to_visit        | string  | null: false               | 
    | content               | text    | null: false               | 

## favoritesテーブル（未実装）
    | Column   | Type       | Options                        |
    | -------- | ---------- | ------------------------------ |
    | user     | references | null: false, foreign_key: true |
    | plan     | references | null: false, foreign_key: true | 

## Association

    ## usersテーブル
    has_many :plans
    has_many :favorites

    ## plansテーブル
    belongs_to :user
    has_many :likes

    ## favoritesテーブル（未実装）
    belongs_to :user
    belongs_to :plan


## 各テーブルの説明

## usersテーブル
・ニックネーム
・メールアドレス
・暗号化パスワード
・誕生年月日
・性別(Activehash)

## plansテーブル
・目的地
・期間
・予算
・アクティビティ(Activehash)
・交通手段(Activehash)
・食事(Activehash)
・訪問地
・出力結果

## favoritesテーブル （未実装）
・ユーザーID (ユーザーの外部キーカラム)
・プランID (プランの外部キーカラム)


## 画面遷移図
(画面遷移図を添付)

## 開発環境
- 言語: Ruby
- フレームワーク: Ruby on Rails
- データベース: MySQL
- バージョン管理: Git

## 本番環境
- デプロイ: AWS
- サーバー: Unicorn



