import { fetchComponent } from "$lib/stores/mawanet.loader.js"

export async function load({ params }) {
  let entryProperties = await fetchComponent(params.entry ?? 'index')
	return {
    pageName: entryProperties.componentName,
    pageComponent: entryProperties.entryComponent,
    error: entryProperties.error,
  };
}
