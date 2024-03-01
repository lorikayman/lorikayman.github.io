import { defineMDSveXConfig as defineConfig } from "mdsvex";
import { wikilink as wikiLinkPlugin } from "./src/lib/wikilink-transformer/src/index.js";

const config = defineConfig({
  extensions: [".mdx", ".md",],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [
    [wikiLinkPlugin, {test: true}],
    // remark-less interface
    // [
    //   (a, p)=>{
    //     return (e,r) => {
    //       console.log(e,r);
    //       e,r;
    //     }
    //   }, {}
    // ]
  ],
  rehypePlugins: [],
});

export default config;
