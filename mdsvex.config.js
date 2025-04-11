import path from "path"
import { fileURLToPath } from "node:url";

import { defineMDSveXConfig as defineConfig } from "mdsvex"
// import { wikiLinkPlugin } from "remark-wiki-link";

const dirname = path.resolve(fileURLToPath(import.meta.url), '..');
const layoutPath = path.join(dirname, "./src/lib/entries/sk/mdsvex.layout.svelte");

const config = defineConfig({
  extensions: [
    '.mdx',
    '.md',
  ],

  smartypants: {
    dashes: true,
    backticks: false,
  },
  layout: {
    entries_sk: layoutPath,
  },
});

export default config;
