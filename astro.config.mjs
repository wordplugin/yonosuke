import { defineConfig } from 'astro/config';

/**
 * 公開先の URL は、ビルド時に --site と --base で渡す(GitHub Actions が自動で渡す)。
 *   例: astro build --site https://example.github.io --base /yonosuke
 * 独自ドメインを設定した場合も、GitHub 側の設定に合わせて自動で切り替わる。
 */

// Markdown 本文中の「/contact/」のようなサイト内リンクにも、公開先のサブフォルダを付ける
function prefixInternalLinks() {
  return (tree) => {
    const base = (process.env.ASTRO_BASE_PATH || '').replace(/\/$/, '');
    if (!base) return;
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) node.properties.href = base + href;
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}

// --base の値を Markdown の処理にも伝える
const baseArg = process.argv.indexOf('--base');
if (baseArg !== -1 && process.argv[baseArg + 1]) process.env.ASTRO_BASE_PATH = process.argv[baseArg + 1];

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  markdown: { rehypePlugins: [prefixInternalLinks] },
});
