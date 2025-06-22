<script>
  import { onMount, tick } from 'svelte'

  import Toc from './toc.svelte'

  import * as evToc from '$lib/events/toc.js'

  /**
   * @description
   * --toc-active-item-color: any color for selected a[data-active] element
   * --toc-hover-item-background: any color for a > li:hover
   */
  const {
    tree = [],
    activeHeadingIdxs,
    item,
    level = 1
  } = $props()

  /**
   * Logic to handle ToC render completion for single-h1 documents
   * @see src/lib/events/toc.js
   */
  onMount(async () => {
    if (level === 1) {
      // wait for component to render
      // since we are in 1st level heading,
      // we encompass all of document headings
      // due to this, as long as there is only one h1
      // heading, we can safely tell that
      // toc has finished rendering
      await tick()

      const tocRoot = document.querySelector(`.heading-level-${level}`)
      if (!tocRoot) {
        console.error(
          'Failed to retrieve ToC root element with class:',
          `.heading-level-${level}`
        )
        return
      }

      const event = evToc.EVENT_TOC_BUILD_COMPLETE
      console.log(
        'Finished recursive ToC render. Firing:',
        event.type
      )
      tocRoot.dispatchEvent(event)
    }
  })
</script>

<!-- we override on:m-click with {(e)=>{e.preventDefault()}} within an item
because during listening to the mdx object, as it is replaced,
the handler function within the default m-click continues to point onto previous
MDX component table of contents
-->
<ul class="heading-level-{level}">
  {#if tree && tree.length}
    {#each tree as heading, i (i)}
      <a
        href="#{heading.id}"
        {...$item(heading.id)} use:item
        onm-click={(event) => {
          event.preventDefault()
        }}
      >
        <li>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html heading.node.innerHTML}
        </li>
      </a>
      <div>
        {#if heading.children && heading.children.length}
          <Toc
            tree={heading.children}
            {activeHeadingIdxs}
            level={level + 1}
            {item}
          />
        {/if}
      </div>
    {/each}
  {/if}
</ul>

<style>
  ul,
  li {
    padding-left: 0em;
    list-style: none;
    padding: 4px 0px;
  }
  
  a[data-active] > li {
    background-color: hsla(225deg, 30%, 24%, 0.2);
  }
  
  :is(
      .heading-level-1,
      .heading-level-2,
      .heading-level-3
    ) > a > li {
    font-weight: bold;
    text-transform: uppercase;
  }

  a > li {
    line-height: 1.66;
    opacity: 0.5;

    /* clickable area margins */
    padding-left: 2.2rem;
    padding-right: 0.2rem;
    border-radius: 0px 5px 5px 0px;
  }

  li:hover {
    opacity: 0.8;
    transition: 40ms;
    background-color: var(--toc-hover-item-background);
  }

  a[data-active] > li {
    opacity: 1;
    color: var(--toc-active-item-color, hsl(25, 73%, 78%));
    /* font-weight: bold; */
  }
  
  :global {
    /**
    * Better define subsections of chapters
    */
    .heading-level-4 ul a li {
      padding-left: 3.6em;
    }

    .heading-level-5 ul a li {
      padding-left: 4.8em;
    }


    /* Prevent custom multiline for chapter headings */
    em {
    font-style: normal;
    color: inherit;
  
      & > code {
        font-style: normal;
      }
    }

    code {
      font-weight: bold;
      font-style: normal;
      border-radius: 2px;
      padding: 0px 4px;
    }

    /* a[data-active] > li::before {
      content: "";
    
      border: solid;
      border-color: transparent;
      border-width: 0px;
      border-radius: 5px;
      background-color: hsla(225deg, 30%, 24%, 1);
    
      background-image: var(--toc-active-item-icon);
      display: block;
      background-size: cover;
      background-repeat: no-repeat;
      width: 1.2em;
      height: 1.2em;
      position: absolute;
      left: 0.6em;
      margin-top: 4px;
    } */
    
    
    /* .heading-level-3 > a > li::before {
      content: "";
    
      border: solid;
      border-color: transparent;
      border-width: 0px;
      border-radius: 5px;
      background-color: hsla(225deg, 30%, 24%, 1);
      display: block;
      width: 1.2em;
      height: 1.2em;
      position: absolute;
      left: 0.6em;
      margin-top: 4px;
    } */
    
    /**
    * See prior instance of this selection through id's string
    */
    a:is(
        [data-id="chapter-ix-part-iiswarm"],
        [data-id="chapter-ix-part-ii-swarm"]
    ) {
      & > li code {
        background-color: var(--color-unknown);
        color: #000;
      }
    
      /**
      * Select only chapter's heading
      */
      &[data-active] > li::before {
        background-image: var(--toc-active-item-icon-unknown);
      }
    }
  }

</style>
