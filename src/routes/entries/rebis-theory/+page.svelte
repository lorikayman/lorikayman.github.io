<script>
  import { page } from "$app/state";

  // table of contents
  import { createTableOfContents } from "@melt-ui/svelte";
  import Tree from "$lib/components/toc.svelte";
  import { createSelfDestructingStore } from "$lib/stores/self_destructing_store";

  // ui
  import Jumper from "$lib/entries/sk/components/scroll_to_active.svelte";
  import IconComm from "$lib/entries/sk/rebis-theory/assets/next_up.png";
  import IconHaven from "$lib/entries/sk/rebis-theory/assets/over.png";

  // mdx
  import RebisTheory from "$lib/entries/sk/mdx/rebis_theory.mdx";
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

  /**
   * Recursively ascent Toc hierarchy
   *
   * @param stopClass
   * @returns {Element[]}
   */
  function findCurrentHeadings(
    element,
    stopClass = "heading-level-1",
  ) {
    var list = [];

    const ascentTableOfContents = (e, s) => {
      const ul = e.closest("ul");
      if (ul.classList.contains(stopClass)) {
        return;
      }
      const p = ul.previousElementSibling;
      list.push(p);
      ascentTableOfContents(p, s);
    };
    ascentTableOfContents(element, stopClass);
    return list;
  }

  activeElement.subscribe((e) => {
    if (!(e instanceof HTMLElement)) return;
    e.scrollIntoView({
      behavior: "instant",
      block: "center",
    });
  });

  activeHeadingIdxs.subscribe(async (idxs) => {
    console.log("idxs", idxs);
    // scrap old
    const actives = document
      .querySelector(".toc")
      .querySelectorAll(".active-parent");
    actives.forEach((e) =>
      e.classList.remove("active-parent"),
    );

    // reassign
    const activeElementData = document.querySelector(
      tocActiveSelector,
    );
    if (activeElementData) {
      const parentHeadings = findCurrentHeadings(
        activeElementData,
      );

      parentHeadings.forEach((h) =>
        h.classList.add("active-parent"),
      );
    }
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
