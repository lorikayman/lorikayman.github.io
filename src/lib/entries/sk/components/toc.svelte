<script>
  import { onMount, tick } from 'svelte'

  import Toc from './toc.svelte'

  import * as evToc from '$lib/events/toc.js'
  import {isChrome} from '$lib/helpers/useragent.js'

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

  const headingsParity = $state([]);
  for (let i = 0; i < tree.length; i++) {
    const h = tree[i]
    if (h.children && h.children.length > 0) {
      headingsParity.push({open: true, allow: true})
      continue
    }
    headingsParity.push({allow: false, open: false})
  }
  
  function toggleCollapse(v) {
    v = !v
    console.log(v)
  }
  
  async function processTocBuildCompletion() {
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
  
  /**
   * Logic to handle ToC render completion for single-h1 documents
   * @see src/lib/events/toc.js
   */
  onMount(async () => {
    if (level === 1) await processTocBuildCompletion()
  })
</script>

<!-- we override on:m-click with {(e)=>{e.preventDefault()}} within an item
because during listening to the mdx object, as it is replaced,
the handler function within the default m-click continues to point onto previous
MDX component table of contents
-->
<ul class="heading-level-{level}" data-client-chrome={isChrome}>
  {#if tree && tree.length}
    {#each tree as heading, i (i)}
      <a
        href="#{heading.id}"
        {...$item(heading.id)} use:item
        onm-click={(event) => {
          event.preventDefault()
        }}
      >
        <div class="context-identification"></div>
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
    list-style: none;

    padding: 4px 0px;
  }
  
  :is(
    .heading-level-1,
    .heading-level-2,
    .heading-level-3
  ) > a > li {
    font-weight: bold;
    text-transform: uppercase;
  }

  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;

    /* gap: 0.6rem; */
    padding-left: 0.6em;
    padding-right: 0.3rem;

    /* clickable area margins */
    border-radius: 0px 5px 5px 0px;

    & > li {
      line-height: 1.66;
      opacity: 0.5;
    }
    
    &[data-active] {
      background-color: hsla(225deg, 30%, 24%, 0.2);

      & > li {
        opacity: 1;
        color: var(--toc-active-item-color, hsl(25, 73%, 78%));
        font-weight: bold;
      }
    }
  }
  /**
   * firefox specific
   *
   * prevent weight increase font-weight: bold; effects on line length
   * except code blocks as those are bold by default
   */
  ul[data-client-chrome='false']:is(
    .heading-level-4,
    .heading-level-5,
    .heading-level-6
  ) a[data-active]
  > li:not(:has(> code)) {
    letter-spacing: -0.33px;
  }

  a:not([data-active]):hover {
    transition: 40ms;
    background-color: var(--toc-hover-item-background);

    & > li {
      opacity: 0.8;
      /* text-shadow: 1px 0 black, -1px 0 black; */
    }

    /* & > .context-identification[data-allow-collapse='true'][data-open='true'] {
      background-image: url('/src/lib/entries/sk/rebis-theory/assets/img/spiral_knights/icon_revisit-arrow.png');
      background-size: 70%;
      background-color: hsla(225deg, 30%, 24%, 1);
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
    }
    & > .context-identification[data-allow-collapse='true'][data-open='false'] {
      background-image: url('/src/lib/entries/sk/rebis-theory/assets/img/spiral_knights/icon_revisit-arrow.png');
      background-size: 70%;
      background-color: hsla(225deg, 30%, 24%, 1);
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
    } */
  }
  
  .context-identification {
    border: solid;
    border-color: transparent;
    border-width: 0px;
    border-radius: 5px;
    display: block;
    min-width: 1.2em;
    height: 1.2em;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;

    margin: 6px;
    margin-left: unset;
    margin-top: 0.5rem;
    background-size: 1.2rem;
  }

  .heading-level-3 > a > .context-identification {
    background-color: hsla(225deg, 30%, 24%, 1);
  }

  a[data-active] > .context-identification {
    background-color: hsla(225deg, 30%, 24%, 1);
    background-image: var(--toc-active-item-icon);
  }

  :global {
    :is(
      .heading-level-2,
      .heading-level-3,
      .heading-level-4,
      .heading-level-5
    ) ul a li {
      padding-left: 0.2em;
    }

    @media (min-width: 890px) {
      /**
      * Define subsections of chapters
      */
      :is(.heading-level-2, .heading-level-3) ul a li {
        padding-left: 0.2em;
      }
      .heading-level-4 ul a li {
        padding-left: 1.8em;
      }
      .heading-level-5 ul a li {
        padding-left: 3.2em;
      }
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

      &[data-active] > .context-identification {
        background-image: var(--toc-active-item-icon-unknown);
      }
    }
  }

</style>
