<script>
  import { createTableOfContents } from '@melt-ui/svelte'
  import { page } from '$app/state'

  import { createSelfDestructingStore } from '$lib/stores/self_destructing_store'

  import Tree from '$lib/components/toc.svelte'
  import Jumper from '$lib/entries/sk/components/scroll_to_active.svelte'

  import IconComm from '$lib/entries/sk/rebis-theory/assets/next_up.png'
  import IconHaven from '$lib/entries/sk/rebis-theory/assets/over.png'

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

  const activeElementDestroyCondition = (value) =>
    value instanceof HTMLElement
  const activeElement = createSelfDestructingStore(
    null,
    activeElementDestroyCondition
  )

  /**
   * @param {Number[]} idxs
   *    array of active melt ui link ids
   */
  activeHeadingIdxs.subscribe(async (idxs) => {
    // unreliable, as it still contains older data
    // let item = document.querySelector(tocActiveSelector);
    // better move to a $derived once melt supports it
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
      {item}
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
