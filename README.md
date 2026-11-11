# 十河 陽之助 公式サイト

Astro で作った静的サイト。

## 動かし方

```bash
npm install
npm run dev      # 開発用サーバー
npm run build    # dist/ に書き出し
```

## 更新のしかた

| やりたいこと | 編集する場所 |
|---|---|
| 活動報告を追加する | `src/content/activity/` に Markdown を 1 つ追加(既存の記事が見本) |
| 日程を追加する | `src/data/schedule.ts`(過ぎた予定は自動で消える) |
| 政策の文章を直す | `src/content/policies/` |
| 連絡先・SNS・選挙の日付 | `src/config.ts` |
| 決意文・プロフィール | `src/pages/message.astro`、`src/pages/profile.astro` |

活動報告の `tags` に政策の柱(`care` `children` `tourism` `prices` `disaster`)を書くと、その柱のページに関連記事として出る。

## 時期の切り替え

`src/config.ts` の `mode` を変える。

| mode | 時期 | 変わること |
|---|---|---|
| `pre` | 告示前 | 投票依頼の文言なし。`/election/` は存在しない |
| `campaign` | 告示日〜投票日前日 | 上部に選挙の帯、トップに投票のお願い、`/election/` を公開。連絡先メールが未設定だとビルドが失敗する |
| `post` | 選挙後 | `postMessage` を上部に表示 |

投票日当日は更新(デプロイ)しない。

## 公開のしくみ(GitHub Pages)

既定のブランチに push すると、`.github/workflows/deploy.yml` が自動でビルドして公開する。

初回だけ、GitHub のリポジトリ画面で Settings → Pages → Build and deployment の Source を「GitHub Actions」にする。

公開先の URL は GitHub の設定から自動で受け取るので、独自ドメインを設定しても、サイト側の変更は要らない。

手元でサブフォルダつきの表示を確かめるとき:

```bash
npx astro build --site https://wordplugin.github.io --base /yonosuke
npx astro preview --base /yonosuke
```

サイト内リンクは必ず `link('/policy/')` のように `src/config.ts` の `link()` を通す(サブフォルダで公開されても切れないようにするため)。

## 本公開の前にやること

- `src/config.ts` の `draft` を `false` にする(`true` の間は「制作中」の帯が出て、検索エンジンに登録されない)
- 連絡先、公式SNS、選挙の日付を `src/config.ts` に入れる
- プロフィールなどの内容を本人が確認する
