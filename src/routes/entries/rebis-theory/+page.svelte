<script>
  
    import { createTableOfContents } from '@melt-ui/svelte';
  
    import Tree from '$lib/components/toc.svelte';

    import RebisTheory from "$lib/entries/sk-rebis-theory/RebisTheory.md"
 
    let data = RebisTheory;
    // if (data.error) console.error(data.error);
     
    const tocRenderStyleExclusions = [
      'MAELSTROM ENCYCLOPEDIA CENTRAL'.toLowerCase(),
    ]
  
    /**
     * crete table of content by scanning a component
     */
    const {
      elements: { item },
      states: { activeHeadingIdxs, headingsTree },
    } = createTableOfContents({
      selector: '#toc-builder-preview',
      exclude: [],
      activeType: tocRenderStyleExclusions.includes(data.pageName) ? 'highest' : 'all',
      /**
       * Filters all heading belonging to the current mdx entry
       * 
       * @param {HTMLElement} heading Heading element
       * @returns {Boolean} Can an element be passed into final table of contents
       */
      headingFilterFn: (heading) => {
        const validity = !heading.hasAttribute('data-toc-ignore') && !heading.className.includes('error403') && !heading.parentNode.className.includes('peeker');
        return validity;
      },
      scrollFn: (id) => {
        const container = document.getElementById('toc-builder-preview');
        const element = document.getElementById(id);
  
        if (container && element) {
          container.scrollTo({
            top: element.offsetTop - container.offsetTop - 24,
            behavior: 'smooth',
          });
        }
      },
    });
</script>

<div class="toc">
  <Tree
    tree={$headingsTree}
    activeHeadingIdxs={$activeHeadingIdxs}
    {item}
  ></Tree>
</div>

<div class="container">
  <div id="toc-builder-preview">
    <svelte:component this={data}></svelte:component>
  </div>
</div>
