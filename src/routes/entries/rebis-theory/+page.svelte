<script>
  import { createTableOfContents } from "@melt-ui/svelte";
  import { onMount, tick } from "svelte";
  import { page } from "$app/state";
  import { replaceState } from "$app/navigation";

  import { createSelfDestructingStore } from "$lib/stores/self_destructing_store";

  import Tree from "$lib/components/toc.svelte";
  import Jumper from "$lib/entries/sk/components/scroll_to_active.svelte";

  // import IconComm from "$lib/entries/sk/rebis-theory/assets/icon_story.png";
  import IconComm from "$lib/entries/sk/rebis-theory/assets/next_up.png";

  // import IconHaven from "$lib/entries/sk/rebis-theory/assets/icon_up.png";
  import IconHaven from "$lib/entries/sk/rebis-theory/assets/over.png";

  import RebisTheory from "$lib/entries/sk/mdx/rebis_theory.mdx";
  import { writable } from "svelte/store";

  // MDX module
  let data = RebisTheory;

  document.title = "Spiral Knights: Rebis Theory";

  // selector for highlighting currently selected item
  const tocActiveSelector =
    ".toc-content a[data-active] li";
  /** selector for defining the start for @see Jumper */
  const documentStart = "h1";
  /**
   * create table of content by scanning a component
   */
  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree },
  } = createTableOfContents({
    selector: "#document-body",
    exclude: [],
    // this is not UX-friendly as we are
    // targeting the selection of a heading,
    // whose body takes up most of space
    // in the viewport
    activeType: "highest",
    /**
     * Filters all heading belonging to the current mdx entry
     *
     * @param {HTMLElement} heading Heading element
     * @returns {Boolean} Can an element be passed into final table of contents
     */
    headingFilterFn: (heading) => {
      const validity = !heading.hasAttribute(
        "data-toc-ignore",
      );
      return validity;
    },
    /**
     * What happens whn pressing on a link in TOC
     *
     * @param {String} id of a heading scroll to
     */
    scrollFn: (id) => {
      const container =
        document.getElementById("document-body");
      const element = document.getElementById(id);

      if (container && element) {
        container.scrollTo({
          top: element.offsetTop - container.offsetTop - 24,
          behavior: "smooth",
        });
      }
    },
  });

  /**
   * Sets URL's hash without redirect/scrolling
   *
   * @param {string} hash URL's hash string
   */
  async function updateHash(hash) {
    let url = page.url.pathname;
    let oldUrl = `${url}${page.url.hash}`;
    let newUrl = `${url}#${hash}`;
    if (url === newUrl) return;
    // replaceState(newUrl);
  }

  const activeElementdestroyCondition = (value) =>
    value instanceof HTMLElement;
  const activeElement = createSelfDestructingStore(
    null,
    activeElementdestroyCondition,
  );

  /**
   * @param {Number[]} idxc
   *    array of active melt ui link ids
   */
  activeHeadingIdxs.subscribe(async (idxs) => {
    // unreliable, as it still contains older data
    // let item = document.querySelector(tocActiveSelector);
    // better move to a $derived once melt supports it
    await tick();
    let tocItems = document.querySelectorAll(
      ".toc a[data-melt-table-of-contents-item]",
    );
    let item = tocItems.item(idxs.at(0));
    if (!item) return;
    // FIXME: create workaround for not writing to history on hash change
    // updateHash(item.dataset.id);

    activeElement.set(
      document.querySelector(tocActiveSelector),
    );
  });

  activeElement.subscribe((e) => {
    if (!(e instanceof HTMLElement)) return;
    e.scrollIntoView({
      behavior: "instant",
      block: "center",
    });
  });
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
