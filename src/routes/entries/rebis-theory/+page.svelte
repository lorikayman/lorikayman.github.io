<script>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  import { createTableOfContents } from '@melt-ui/svelte'

  import * as evToc from '$lib/events/toc.js'

  import Tree from '$lib/entries/sk/components/toc.svelte'
  import Button from '$lib/entries/sk/components/buttons/button.svelte'
  import ButtonJumper from '$lib/entries/sk/components/buttons/scroll_to_active.svelte'
  
  import IconComm from '$lib/entries/sk/rebis-theory/assets/img/spiral_knights/next_up.png'
  import IconHaven from '$lib/entries/sk/rebis-theory/assets/img/spiral_knights/over.png'

  import RebisTheory from '$lib/entries/sk/rebis-theory/rebis_theory.mdx'

  const data = RebisTheory

  document.title = 'Rebis Theory ::'

  // selector for highlighting currently selected item
  const tocActiveSelector =
    '.toc a[data-active] li'
  /** selector for defining the start for @see Jumper */
  const documentStart =
    "#document-body h1, .toc a[data-id='rebis-theory-'] li"
  /**
   * create table of content by scanning a component
   */
  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    selector: '#document-body',
    exclude: [],
    // this is not UX-friendly as we are
    // targeting the selection of a heading,
    // whose body takes up most of space
    // in the viewport
    activeType: 'highest',
    /**
     * Filters all heading belonging to the current mdx entry
     *
     * @param {HTMLElement} heading Heading element
     * @returns {Boolean} Can an element be passed into final table of contents
     */
    headingFilterFn: (heading) => {
      const validity = !heading.hasAttribute(
        'data-toc-ignore'
      )
      return validity
    },
    /**
     * What happens whn pressing on a link in TOC
     *
     * @param {String} id of a heading scroll to
     */
    scrollFn: (id) => {
      const container =
        document.getElementById('document-body')
      const element = document.getElementById(id)

      if (container && element) {
        container.scrollTo({
          top: element.offsetTop - container.offsetTop - 24,
          behavior: 'smooth'
        })
      }
    }
  })

  /**
   * Logic for full-reload ToC active entry location: one-off listener
   * On page full re/load locate Toc active element
   *
   * @param {string} scrollBehavior
   *   @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#behavior}
   * @param {string} errorMsg Error message in case of failure to scroll
   */
  function locateActiveTocItem ({
    scrollBehavior,
    errorMsg
  }) {
    console.log('Calling locateActiveTocItem with:', ...arguments)

    const activeElement = document.querySelector(
      `.toc a[data-melt-table-of-contents-item][data-id="${window.location.hash.slice(1)}"]`)
    if (activeElement) {
      console.log('attempting to scroll ToC')

      const aOffsetTop = activeElement.offsetTop
      // Relative to Viewport y position
      const viewportOffset = window.innerHeight / 2
      const finalPosition = aOffsetTop - viewportOffset

      document.querySelector('.toc').scrollTo({
        behavior: scrollBehavior,
        top: finalPosition
      })
    } else {
      console.error(
        errorMsg
      )
    }
  };

  /**
   * highly abstract list of identifiers
   * for labeling the source/part of an app,
   * responsible for hash change
   */
  const HASH_CHANGE_SOURCE = {
    MDX: 4000,
    TOC: 3000,
    DOM: 2000,
    BROWSER: 1000
  }
  /**
   * Initial state of @see HASH_CHANGE_SOURCE on full page's load
   */
  const hashChangeSource = $state({
    source: HASH_CHANGE_SOURCE.BROWSER,
    started: false,
    processing: false
  })
  /**
   * Hash change logic, responsible for edge cases
   * of page traversal and history traversal by the user
   */
  window.addEventListener('hashchange', async e => {
    const hOld = new URL(e.oldURL).hash
    const hNew = new URL(e.newURL).hash
    console.log(`Received 'hashchange' event from '${hOld}' to '${hNew}'`)

    // this check allows for identification of the source of hash change
    // if its from url traversal within DOM,
    // such as href links, - scroll Toc smoothly
    //
    // Otherwise, jump  in instant scroll to an active an aligned toc element
    // as this is likely a history traversal backwards/forwards
    if (hashChangeSource.started) {
      hashChangeSource.started = false
      hashChangeSource.processing = true

      console.log('Found href processing before hashchange event as:', $state.snapshot(hashChangeSource))

      switch (hashChangeSource.source) {
        // when hash change comes from mdx itself - it was caused by `a` tag click
        case HASH_CHANGE_SOURCE.MDX:
          console.log("Found 'hrefchange' source as HASH_CHANGE_SOURCE.MDX")
          break
        // this is sourced from Toc component - those are `a` tas,
        // but this logic is delegated to MeltUI through component builder itself
        // so we stop here
        case HASH_CHANGE_SOURCE.TOC:
          console.log("Found 'hrefchange' source as HASH_CHANGE_SOURCE.TOC")
          hashChangeSource.processing = false
          return
      }
    }

    // process toc scrolling
    // we don't expect response
    // for ToC melt ui component to update
    // so we preemptively identify target active element
    // and move scroll into its view and of viewport
    locateActiveTocItem({
      scrollBehavior: hashChangeSource.processing ? 'smooth' : 'instant',
      errorMsg: `No active element was found when backing
        history from '${hOld}' to '${hNew}'`
    })
    hashChangeSource.processing = false
  })

  let sidebarHidden = $state(false)
  // Toggle Sidebar visibility
  function toggleToc() {
    sidebarHidden = !sidebarHidden
  }

  /**
   * Prepare a chain of listeners, as `click` event will always precede `hashchange`
   * Here, we identify through bubbling a general area of the page,
   * from which an event has emerged, and act accordingly through
   * working with @see hashChangeSource
   */
  onMount(() => {
    // logic to locate toc active entry on history traversion
    // from markdown document link clicks
    //
    // source is a rendered mdx document
    document.querySelector('#document-body').addEventListener('click', _ => {
      hashChangeSource.source = HASH_CHANGE_SOURCE.MDX
      hashChangeSource.started = true
      console.log('Received event from #document-body')
    })

    // logic to locate toc active entry on history traversion
    // from toc links' clicks
    //
    // source is mdx-derived ToC component wrapper
    document.querySelector('.toc').addEventListener('click', _ => {
      hashChangeSource.source = HASH_CHANGE_SOURCE.TOC
      hashChangeSource.started = true
      console.log('Received event from .toc')
    })

    // change bg based on chapter's scope
    // document.querySelector('#document-body').addEventListener('scroll', e => {
    //   // const chapterSpan = window.
    // })

    // logic to handle ToC render completion on full-reload
    // and locate active entry by page's hash
    // We do this once specifcally for full-page reload,
    // while other instances of this event being triggeres
    // are the result of user's interaction w/ the page
    window.addEventListener(
      evToc.EVENT_TOC_BUILD_COMPLETE.type,
      () => {
        console.log('Received', evToc.EVENT_TOC_BUILD_COMPLETE.type)
        locateActiveTocItem({
          scrollBehavior: 'instant',
          errorMsg: 'Failed to initialize full-reload ToC scroll'
        })
      }, {
        once: true
      }
    )

    if (window.innerWidth > window.innerHeight) {
      sidebarHidden = false
    }
  })

</script>

<Button
  buttonClass="ui-button-toc-toggler"
  onclick={toggleToc}
  alignDirection="left"
  inlineImageSourcePath={IconComm}
/>


<div class={{
  sidebar: true,
  'sidebar-toggle-visible': !sidebarHidden,
  'sidebar-toggle-hidden': sidebarHidden,
}}>

  <ButtonJumper
    buttonClass="ui-button-toc-scroller"
    selector={tocActiveSelector}
    alignDirection="left"
    inlineImageSourcePath={IconComm}
  />

  <div class="toc">
    <Tree
      tree={$headingsTree}
      activeHeadingIdxs={$activeHeadingIdxs}
      item={item}
    ></Tree>
  </div>
</div>

<div class="container">
  <div id="document-body">
    <svelte:component this={data}></svelte:component>
  </div>
  <ButtonJumper
    selector={documentStart}
    buttonClass="ui-button-dom-scroller"
    alignDirection="right"
    inlineImageSourcePath={IconHaven}
  />
</div>
