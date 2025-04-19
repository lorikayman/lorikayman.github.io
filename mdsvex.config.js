import path from "path";
import { fileURLToPath } from "node:url";

import { defineMDSveXConfig as defineConfig } from "mdsvex";
// import { wikiLinkPlugin } from "remark-wiki-link";

const rootDir = path.resolve(
  fileURLToPath(import.meta.url),
  "..",
);

// mdsvex layouts' paths
const layoutPathEntriesRebis = path.join(
  rootDir,
  "./src/lib/entries/sk/mdsvex.layout.svelte",
);

const config = defineConfig({
  extensions: [".mdx", ".md"],

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
   * to package component substitution through a 2-step process:
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
   *
   * If a library or a tool is designed for a specific framework only,
   * - in this case being mdsvex, making a shift from an established
   * by parent framework paradigm if stupid,
   * as it breaks internal consistency of the ecosystem,
   * which is paramount to most of other stuff
   *
   * why the fuck should we adapt for a workflow of a specific niche use case tool,
   * countered to a framework, where the tool itself could not exist without the latter?
   * Even when the latter's logic is flawed by itself,
   * do not introduce even more entropy and complexity to an already
   * far from perfect, but an established system.
   * There is nothing good nor beneficial about it
   * apart from a removal of a learning curve for one's own habits, workflows,
   * and a lack of skill as a developer, evident by an inability to account for or timely resolve it
   *
   * If the parent framework's approach does not suffice,
   * - use a different framework, but not this hot mess
   */
  layout: {
    entries_sk: layoutPathEntriesRebis,
  },
});

export default config;
