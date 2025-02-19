<script>
  import { createTableOfContents } from "@melt-ui/svelte";
  import { onMount, tick } from "svelte";
  import {
    pushState,
    replaceState,
    goto,
  } from "$app/navigation";
  import { page } from "$app/state";

  import { createSelfDestructingStore } from "$lib/stores/self_destructing_store";

  import Tree from "$lib/components/toc.svelte";
  import Jumper from "$lib/entries/sk/components/scroll_to_active.svelte";

  import RebisTheory from "$lib/entries/sk/mdx/rebis_theory.mdx";
  import { writable } from "svelte/store";

  let data = RebisTheory;

  document.title = "Spiral Knights: Rebis Theory";

  const tocActiveSelector =
    ".toc-content a[data-active] li";
  const documentStart = "h1";
  /**
   * crete table of content by scanning a component
   */
  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree },
  } = createTableOfContents({
    selector: "#toc-builder-preview",
    exclude: [],
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
    scrollFn: (id) => {
      const container = document.getElementById(
        "toc-builder-preview",
      );
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
  <div class="toc-content">
    <div class="jumper-container">
      <Jumper
        selector={tocActiveSelector}
        buttonClass="button-jumper"
      >
        <!-- https://icons.getbootstrap.com/icons/arrows-collapse/ -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-arrows-collapse"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"
          />
        </svg>
      </Jumper>
    </div>
    <Tree
      tree={$headingsTree}
      activeHeadingIdxs={$activeHeadingIdxs}
      {item}
    >
      abc
    </Tree>
  </div>
</div>

<div class="container">
  <div id="toc-builder-preview">
    <svelte:component this={data}></svelte:component>
  </div>
  <div class="scroll-to-top-container">
    <Jumper
      selector={documentStart}
      buttonClass="button-scroll-to-top"
    >
      <!--
      https://icons.getbootstrap.com/icons/arrow-bar-up/
      -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-bar-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </Jumper>
  </div>
</div>
