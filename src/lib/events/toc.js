/**
 * @module toc
 *
 * Table of contents lifecycle events
 * @see src/lib/components/toc.svelte
 */

/**
 *
 *
 * It should be fired once per build completion of a toc component
 * @see
 */
export const EVENT_TOC_BUILD_COMPLETE = new CustomEvent(
  'toc:build:complete',
  {
    bubbles: true,
    cancelable: false
  }
)
