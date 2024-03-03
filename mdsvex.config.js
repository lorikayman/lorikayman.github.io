import { defineMDSveXConfig as defineConfig } from "mdsvex";
import { wikilink as wikiLinkPlugin } from "./tools/remark_wikilink_resolver/src/index.js";

const config = defineConfig({
  extensions: [".mdx", ".md",],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [
    [wikiLinkPlugin, {logging: true}],
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
