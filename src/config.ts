/**
 * サイト全体の設定。
 *
 * mode は公職選挙法上の時期に合わせて切り替える。
 *   'pre'      告示前。政治活動のサイト。投票依頼の文言と選挙特設ページは出ない
 *   'campaign' 告示日〜投票日前日。選挙運動のサイト。選挙特設ページと投票の呼びかけが出る
 *   'post'     選挙後。結果報告を出す
 * 投票日当日は更新(デプロイ)しない。前日までの内容をそのまま残す。
 */
export type Mode = 'pre' | 'campaign' | 'post';

export const site = {
  mode: 'pre' as Mode,

  /** true の間は「制作中」の帯を出し、検索エンジンに登録させない */
  draft: false,

  name: '十河 陽之助',
  nameKana: 'そごう ようのすけ',
  /**
   * ふだんの表示に使う名前。ビラやポスターと同じく、姓はひらがな、名は漢字にふりがな。
   * 正式な表記(name)は、プロフィール、署名、法的な記載に使う。
   */
  displayName: 'そごう陽之助',
  displaySei: 'そごう',
  displayMei: '陽之助',
  displayMeiKana: 'ようのすけ',
  title: 'そごう陽之助(十河 陽之助)公式サイト',
  catchphrase: '同行二人',
  subcatch: '皆さまとともに、高松・香川の未来へ',
  description:
    '十河 陽之助(そごう ようのすけ)の公式サイト。医療・介護・福祉、子育て・教育、観光、物価高対策、防災の五つの柱で、人口減少に立ち向かう高松・香川をめざします。',

  /** 選挙の情報。確定したら入れる。空の項目は表示されない */
  election: {
    name: '香川県議会議員選挙',
    district: '', // 例: '高松市選挙区'
    announceDate: '', // 告示日 例: '2027-04-02'
    votingDate: '', // 投票日 例: '2027-04-11'
  },

  /** 選挙後に出すお知らせ(mode: 'post' のときだけ表示) */
  postMessage: '',

  /**
   * 連絡先。選挙運動用サイトには電子メールアドレス等の表示義務があるため、
   * mode: 'campaign' で email が空だとビルドを失敗させる。
   */
  contact: {
    office: '', // 例: '十河 陽之助 事務所'
    address: '',
    tel: '',
    email: '',
  },

  /** 受付フォーム(Google フォーム)。URL は「viewform」で終わる公開用のもの */
  forms: {
    koenkai: 'https://docs.google.com/forms/d/e/1FAIpQLSe6g_Tr0nRXUNLTc-5bO9K_ZEYaDv67KCWBW174Cb0ZrXSNaQ/viewform',
  },

  /**
   * Google アナリティクス(GA4)の測定 ID。「G-」で始まる文字列を入れると計測が始まる。
   * 空のままなら計測しない。制作中(draft)の間も計測しない。
   */
  analyticsId: '',

  /**
   * Google タグの ID(Google アナリティクスの管理画面に表示される「GTM-」で始まる文字列)。
   * 入れると、Google が案内する形のタグを全ページに入れる。計測先は Google 側の設定で決まる。
   * 制作中(draft)の間は読み込まない。
   */
  gtmId: 'GTM-W2FJ9PJ4',

  /** 公式SNS。ここに載せたものだけを公式アカウントとして案内する */
  sns: [] as { label: string; url: string }[],
};

if (site.mode === 'campaign' && !site.contact.email) {
  throw new Error('選挙運動期間のサイトには連絡先メールアドレスの表示が必要です。src/config.ts の contact.email を設定してください。');
}

export const nav = [
  { href: '/message/', label: '県政への決意' },
  { href: '/policy/', label: '政策' },
  { href: '/profile/', label: 'プロフィール' },
  { href: '/activity/', label: '活動報告' },
  { href: '/schedule/', label: '日程' },
  { href: '/support/', label: '応援する' },
];

/**
 * サイト内リンクを作る。GitHub Pages の https://〈ユーザー名〉.github.io/〈リポジトリ名〉/ のように
 * サブフォルダで公開される場合でも正しい URL になるよう、必ずこの関数を通す。
 */
export function link(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}

export function formatDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d + 'T00:00:00+09:00') : d;
  return new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function formatDateWithDay(d: string) {
  const date = new Date(d + 'T00:00:00+09:00');
  return new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', month: 'long', day: 'numeric', weekday: 'short' }).format(date);
}
