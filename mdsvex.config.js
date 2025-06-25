import path from 'path'
import { fileURLToPath } from 'node:url'

import { defineMDSveXConfig as defineConfig } from 'mdsvex'
// import { wikiLinkPlugin } from "remark-wiki-link";

const rootDir = path.resolve(
  fileURLToPath(import.meta.url),
  '..'
)

// mdsvex layouts' paths
const layoutPathEntriesRebis = path.join(
  rootDir,
  './src/lib/entries/sk/mdsvex.layout.svelte'
)

const layoutPathMawanet = path.join(
  rootDir,
  './src/routes/(mawanet)/mdsvex.layout.svelte'
)

const config = defineConfig({
  extensions: ['.mdx', '.md'],

  smartypants: {
    dashes: true,
    backticks: false
  },
  /**
   * Js developers reinventing wheels and failing at 20+ year-old concepts at its best
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
   * @see {@link https://github.com/lorikayman/lorikayman.github.io/issues/8}
   * for complete exploration of this feature
   *
   * If a library or a tool is designed only for a specific framework,
   * - in this case being mdsvex, - making a shift from an established
   * by parent framework paradigm is particularly bad,
   * as it breaks internal consistency of the ecosystem,
   * which is paramount to most of other stuff,
   * if we ever cant to achieve smooth DX.
   * Especially, in cases such as MDX implementation,
   * which itself can be considered overengineered or bloat.
   *
   * Even when the latter's logic is flawed on its own,
   * do not introduce even more entropy/complexity to an already
   * far from perfect, but an established and working system.
   */
  layout: {
    // rebis theory
    // internal layout name here for context of repository, mdsvex.config.js
    spiral_study: layoutPathEntriesRebis,
    mawanet: layoutPathMawanet
  }
})

export default config
