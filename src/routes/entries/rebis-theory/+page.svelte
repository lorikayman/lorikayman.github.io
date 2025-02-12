<script>
  import { createTableOfContents } from "@melt-ui/svelte";
  import { onMount } from "svelte";

  import Tree from "$lib/components/toc.svelte";
  import Jumper from "$lib/components/scroll_to_active.svelte";

  import RebisTheory from "$lib/entries/sk/mdx/rebis_theory.mdx";

  let data = RebisTheory;

  const tocActiveSelector = ".toc a[data-active]";
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

  function scrollToActive() {
    const activeElement = document.querySelector(
      tocActiveSelector,
    );
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  onMount(() => {
    scrollToActive();
  });
</script>

<div class="toc">
  <div class="toc-content">
    <div class="jumper-container">
      <Jumper
        selector={tocActiveSelector}
        buttonClass="button-jumper"
      />
    </div>
    <Tree
      tree={$headingsTree}
      activeHeadingIdxs={$activeHeadingIdxs}
      {item}
    ></Tree>
  </div>
</div>

<div class="container">
  <div id="toc-builder-preview">
    <svelte:component this={data}></svelte:component>
  </div>
</div>
