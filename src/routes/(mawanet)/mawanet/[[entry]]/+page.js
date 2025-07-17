
import { fetchComponent } from "$lib/stores/mawanet.loader.js"

export async function load ({ params }) {
  const entryProperties = await fetchComponent(params.entry ?? 'index')
  return {
    pageName: entryProperties.componentName,
    pageComponent: entryProperties.entryComponent,
    error: entryProperties.error
  }
}


/** @type {import('./$types').EntryGenerator} */
export function entries () {
  return [
    { entry: 'index'}
  ]
}

export const prerender = true
