/**
 * @module toc
 *
 * Table of contents lifecycle events
 * @see src/lib/components/toc.svelte
 *
 * TODO: migrate to factory functions with unique
 * identifiers of events per component instances,
 * tho ToC won't be as such
 */

/**
 * ToC component DOM structure completion
 *
 * It should be fired once per build completion of a toc component
 */
export const EVENT_TOC_BUILD_COMPLETE = new CustomEvent(
  'toc:build:complete',
  {
    bubbles: true,
    cancelable: false
  }
)
