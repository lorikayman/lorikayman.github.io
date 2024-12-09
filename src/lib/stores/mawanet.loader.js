
import Error404 from "$lib/components/error.404.svelte"
import Error403 from "$lib/components/error.403.svelte"

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
        // case 'index':
        //   EntryComponent = (await import('$lib/mawanet/readme.mdx')).default;
        //   break;

        default:
          EntryComponent = Error403;
          break;
      }
    } catch (e) {
      console.error(e);
      EntryComponent = Error404;
      error = e;
    }
    return {
        componentName,
        entryComponent: EntryComponent,
        error,
    }
}
