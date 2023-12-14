import { defineMDSveXConfig as defineConfig } from "mdsvex";
import { wikiLinkPlugin } from "remark-wiki-link";

const config = defineConfig({
  extensions: [".mdx", ".md",],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [wikiLinkPlugin],
  rehypePlugins: [],
});

export default config;
