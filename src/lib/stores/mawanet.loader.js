
import { derived, writable } from "svelte/store";

import Error404 from "$lib/components/error.404.svelte"
import Error403 from "$lib/components/error.403.svelte"

export const nextPageName = writable();
export const currentPageName = writable();
export const doesPageDiffer = derived(
  [currentPageName, nextPageName],
  ($values, set) => {
    set($values[0] !== $values[1])
  }
)

/**
 * Dynamically import an existing mdx componet (bundled)
 * 
 * @param {String} componentName 
 */
export async function fetchComponent (componentName) {
    let EntryComponent = null;
    let error = undefined;
    try {
      switch (componentName) {
        case 'index':
          EntryComponent = (await import('$lib/mawanet/maelstrom_encyclopedia.mdx')).default;
          break;

        case 'maelstrom_encyclopedia':
          EntryComponent = (await import('$lib/mawanet/maelstrom_encyclopedia.mdx')).default;
          break;

        default:
          EntryComponent = Error403;
          break;
      }
    } catch (e) {
      console.error(e);
      EntryComponent = Error404;
      error = e;
    }
    nextPageName.set(componentName.replace(/\_/g," ").split(' ')[0].toUpperCase());
    return {
        componentName,
        entryComponent: EntryComponent,
        error,
    }
}
