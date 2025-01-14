from pathlib import Path

from .common import FilePattern

_PATH = Path("src/routes/(mawanet)/mawanet/[[entry]]/+page.js")

_LAYOUT_START = """
    import { fetchComponent } from "$lib/stores/mawanet.loader.js"

    export async function load({ params }) {
    let entryProperties = await fetchComponent(params.entry ?? 'index')
        return {
        pageName: entryProperties.componentName,
        pageComponent: entryProperties.entryComponent,
        error: entryProperties.error,
    };
    }


    /** @type {import('./$types').EntryGenerator} */
    export function entries() {
        return [
"""

_SLOT_PATTERN = """
    { entry: '%s' },"""

_LAYOUT_END = """
        ];
    }

    export const prerender = true;
"""


ENTRY_PAGEJS = FilePattern(
    path=_PATH,
    layout_start=_LAYOUT_START,
    layout_end=_LAYOUT_END,
    slot_pattern=_SLOT_PATTERN,
)
