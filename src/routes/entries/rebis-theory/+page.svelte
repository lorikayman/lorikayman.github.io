<script>
  import { onMount, tick } from 'svelte'

  import { createTableOfContents } from '@melt-ui/svelte'

  import { delay } from '$lib/helpers/delay.js'
  import { createSelfDestructingStore } from '$lib/stores/self_destructing_store'

  import Tree from '$lib/components/toc.svelte'
  import Jumper from '$lib/entries/sk/components/scroll_to_active.svelte'

  import IconComm from '$lib/entries/sk/rebis-theory/assets/img/spiral_knights/next_up.png'
  import IconHaven from '$lib/entries/sk/rebis-theory/assets/img/spiral_knights/over.png'

  import RebisTheory from '$lib/entries/sk/rebis-theory/rebis_theory.mdx'

  const data = RebisTheory

  document.title = 'Spiral Knights: Rebis Theory'

  // selector for highlighting currently selected item
  const tocActiveSelector =
    '.toc-content a[data-active] li'
  /** selector for defining the start for @see Jumper */
  const documentStart =
    "#document-body h1, .toc-content a[data-id='rebis-theory-'] li"
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
   * Prepare self-destructing/one-time store for page initial full load
   * this logic will allow to locate active toc element in less code,
   * without relying on custom event fired from recursive toc components' full
   * array completion
   */
  const activeElementDestroyCondition = (value) =>
    value instanceof HTMLElement
  const activeElement = createSelfDestructingStore(
    null,
    activeElementDestroyCondition
  )

  /**
   * Logic for full-reload ToC active entry location: effect
   *
   * @param {Number[]} idxs
   *    array of active melt ui link ids
   */
  activeHeadingIdxs.subscribe(async (idxs) => {
    // unreliable, as it still contains older data
    // let item = document.querySelector(tocActiveSelector);
    // better move to a $derived once melt supports it
    //
    // but, so far, usage of `tick` is required,
    // as it allows to scroll Toc on page's initial full load
    await tick()
    const tocItems = document.querySelectorAll(
      '.toc a[data-melt-table-of-contents-item]'
    )
    const item = tocItems.item(idxs.at(0))
    if (!item) return

    activeElement.set(
      document.querySelector(tocActiveSelector)
    )
  })

  /**
   * Logic for full-reload ToC active entry location: one-off listener
   * On page full re/load locate Toc active element
   * and destroy the listener
   *
   * We can't wrap it to onMount here,
   * as we do not receive a completion-signalling
   * custom event from recursive toc construction
   * unless we want to do more custom logic within the recursion tracking
   */
  activeElement.subscribe((e) => {
    if (!(e instanceof HTMLElement)) return
    e.scrollIntoView({
      behavior: 'instant',
      block: 'center'
    })
  })

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

    // otherwise, we process toc scrolling
    // we don't expect response
    // for ToC melt ui component to update
    // so we wait, as it is easier to implement
    await delay(20)
    const activeElement = document.querySelector(tocActiveSelector)
    if (activeElement) {
      activeElement.scrollIntoView({
        // hashChangeSource.processing marks unaborted
        // logic of toc handling from a list of allowed sources in switch/case
        behavior: hashChangeSource.processing ? 'smooth' : 'instant',
        block: 'center'
      })
    } else {
      console.error(
        `No active element was found when backing
        history from '${hOld}' to '${hNew}'`
      )
    }
    hashChangeSource.processing = false
  })

  /**
   * Prepare a chain of listeners, as `click` event will always precede `hashchange`
   * Here, we identify through bubbling a general area of the page,
   * from which an event has emerged, and act accordingly through
   * working with @see hashChangeSource
   */
  onMount(() => {
    // source is a rendered mdx document
    document.querySelector('#document-body').addEventListener('click', e => {
      hashChangeSource.source = HASH_CHANGE_SOURCE.MDX
      hashChangeSource.started = true
      console.log('Received event from #document-body')
    })
    // source is mdx-derived ToC component wrapper
    document.querySelector('.toc-content').addEventListener('click', e => {
      hashChangeSource.source = HASH_CHANGE_SOURCE.TOC
      hashChangeSource.started = true
      console.log('Received event from .toc-content')
    })
  })
</script>

<div class="toc">
  <div class="ui-button-container-jumper">
    <Jumper
      selector={tocActiveSelector}
      buttonClass="button-jumper"
    >
      <img src={IconComm} class="button-icon" alt="" />
    </Jumper>
  </div>
  <div class="toc-content">
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
  <div class="ui-button-container-scroller">
    <Jumper
      selector={documentStart}
      buttonClass="button-scroll-to-top"
    >
      <img src={IconHaven} alt="" class="button-icon" />
    </Jumper>
  </div>
</div>
