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
   * Js developers reinventing and renaming 20+ year-old concepts at its fucking best
   *
   * This is one of more obscure but only approaches
   * of replacing html tags with custom svelte components
   * for MDX documents.
   *
   * We register here a mapping of layout names to their paths
   * `_` name is the default layout.
   * Those layouts are not the same as svelte layouts,
   * as the prior is a concept restricted to specifically mdsvex
   * and is the only feasible/programmable way
   * to pacakge component subtitution through 2-step process:
   *
   * 1. We register an aforementioned mapping of layout name to its path
   * 2. When we import an `.mdx` document, at its header we can specify
   *    a layout by its name.
   *    The specified layout can contain components,
   *    exported by desired HTML tag names.
   *
   * @see {@link https://www.youtube.com/watch?v=VJFkyGd0FEA}
   * this video is a good enough demo of entire system
   * of mdsvex layouts working as intended in a proper context.
   *
   * @see {@link https://github.com/lorikayman/lorikayman.github.io/issues/8}
   * for complete exploration of this feature
   */
  layout: {
    entries_sk: layout_entries_sk_path,
  },
});

export default config;
