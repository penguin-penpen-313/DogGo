# 🎨 お絵描き対決ゲーム

参加者全員が同じお題の絵を描き、合成されたイラストから対決者2名がお題を当てるリアルタイム対戦ゲームです。

---

## ファイル構成

| ファイル | 説明 |
|---|---|
| `player-a.html` | ① 対決者A（ゲーム進行役） |
| `player-b.html` | ① 対決者B |
| `display.html` | ② 対戦表示画面（プロジェクター等） |
| `participant.html` | ③ 参加者入力画面（スマホ） |
| `config.js` | ゲーム設定パラメータ |
| `firebase-config.js` | Firebase接続設定（要記入） |
| `topics-main.txt` | 本番用お題（100語） |
| `topics-test.txt` | テスト用お題（50語） |
| `firestore.rules` | Firestoreセキュリティルール |

---

## セットアップ手順

### 1. Firebase プロジェクトの作成

1. [Firebase コンソール](https://console.firebase.google.com/) を開く
2. 「プロジェクトを追加」→ プロジェクト名を入力（例: `oekaki-game`）
3. Google アナリティクスは任意でON/OFF → 「プロジェクトを作成」

### 2. Firestore データベースの作成

1. 左メニューから「Firestore Database」→「データベースを作成」
2. 本番環境モードまたはテストモードを選択（テストモード推奨）
3. ロケーションを選択（例: `asia-northeast1`）→「有効にする」

### 3. Firestore セキュリティルールの設定

1. Firestore の「ルール」タブを開く
2. `firestore.rules` の内容をコピーして貼り付け → 「公開」

### 4. Firebase SDK設定の取得

1. プロジェクトの「設定（⚙）」→「プロジェクトの設定」
2. 「マイアプリ」セクションで `</>` (Web) アイコンをクリック
3. アプリ名を入力して「アプリを登録」
4. 表示される `firebaseConfig` の内容をコピー

### 5. firebase-config.js の編集

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",          // コピーした値に置き換え
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-12345",
  storageBucket: "your-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 6. GitHub Pages へのデプロイ

1. GitHub で新しいリポジトリを作成
2. 全ファイルをプッシュ
3. Settings → Pages → Source を `main` ブランチに設定
4. 公開URLが `https://[ユーザー名].github.io/[リポジトリ名]/` になる

---

## ゲームの進め方

### 各画面のURL

| 画面 | URL |
|---|---|
| 対決者A | `.../player-a.html` |
| 対決者B | `.../player-b.html` |
| 表示画面② | `.../display.html` |
| 参加者③ | `.../participant.html` |

### ゲームの流れ

1. **②（display.html）** をプロジェクターや大画面に表示
2. **QRコード** から参加者が各自のスマホで **③（participant.html）** にアクセス
3. **対決者A** が「ゲーム開始」→「次のお題」を押す
4. 参加者③にお題が表示され、60秒で絵を描く
5. 時間切れ → 対決者Aが「回答開始」を押す
6. 3-2-1カウントダウン → 全参加者のAND合成イラストが表示
7. 対決者A・Bが30秒でひらがなで回答
8. 答え合わせ → 正解者に得点付与
9. 不正解なら前回の合成をグレーで表示して再挑戦
10. 5題終了 → 合計得点で勝者発表

### 得点表

| ラウンド | 得点 |
|---|---|
| 1周目（初回） | 3点 |
| 2周目 | 2点 |
| 3周目以降 | 1点 |

---

## 設定の変更（config.js）

```js
const CONFIG = {
  canvasSize: 32,           // グリッドサイズ（大きくすると詳細に描けるが重くなる）
  maxPixels: 200,           // 塗れる最大ピクセル数
  drawingTime: 60,          // お絵描き制限時間（秒）
  answerTime: 30,           // 回答制限時間（秒）
  totalTopics: 5,           // 1ゲームのお題数
  topicsFile: 'topics-main.txt',  // テスト時は 'topics-test.txt'
  pointsSchedule: [3, 2, 1],     // 各周の得点
};
```

---

## トラブルシューティング

**Q: Firestoreに接続できない**
→ `firebase-config.js` の設定値が正しいか確認してください。

**Q: QRコードが表示されない**
→ `display.html` をHTTPSのURLで開いてください（GitHub Pagesは自動でHTTPS）。

**Q: 参加者の絵が合成されない**
→ 参加者が絵を描いてから1秒後に自動保存されます。時間切れ時にも強制保存されます。

**Q: テストしたい**
→ `config.js` の `topicsFile` を `'topics-test.txt'` に変更してください。

---

## 注意事項

- Firestoreのセキュリティルールはオープン設定です。公開イベント等での使用時はルールを適切に制限してください。
- 参加者の絵はブラウザのLocalStorageにIDが保存されます（同じデバイスからは同じ参加者として認識）。
