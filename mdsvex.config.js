import path from "path"
import { fileURLToPath } from "node:url";

import { defineMDSveXConfig as defineConfig } from "mdsvex"
// import { wikiLinkPlugin } from "remark-wiki-link";

const root_dir = path.resolve(fileURLToPath(import.meta.url), '..');

// mdsvex layouts' paths
const layout_entries_sk_path = path.join(root_dir, "./src/lib/entries/sk/mdsvex.layout.svelte");

const config = defineConfig({
  extensions: [
    '.mdx',
    '.md',
  ],

  smartypants: {
    dashes: true,
    backticks: false,
  },
  /**
   * This is one of more obscrure approaches
   * of replacing html tags with custom svelte componets
   * declared in a 'layout', -
   * documented extermely poorly in mdsvex docs
   *
   * @see {@link https://www.youtube.com/watch?v=VJFkyGd0FEA}
   * this video is a good enough demo of entire system
   * of mdsvex layouts working as intended in a proper context.
   *
   * this is so bad
   *
   * @see {@link https://github.com/lorikayman/lorikayman.github.io/issues/8}
   * for complete exploration of this feature
   */
  layout: {
    entries_sk: layout_entries_sk_path,
  },
});

export default config;
