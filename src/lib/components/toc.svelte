<script>
  import { melt } from '@melt-ui/svelte'
  import { onMount, tick } from 'svelte'

  import Toc from './toc.svelte'

  /**
   * @description
   * --toc-active-item-color: any color for selected a[data-active] element
   * --toc-hover-item-background: any color for a > li:hover
   */
  const { tree = [], activeHeadingIdxs, item, level = 1 } = $props()
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
        use:melt={$item(heading.id)}
        onm-click={(event) => {
          event.preventDefault()
        }}
      >
        <li>
          {@html heading.node.innerHTML}
        </li>
        {#if heading.children && heading.children.length}
          <Toc
            tree={heading.children}
            {activeHeadingIdxs}
            level={level + 1}
            {item}
          />
        {/if}
      </a>
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

  a > li {
    line-height: 1.66;
    opacity: 0.5;
  }

  li:hover {
    opacity: 0.8;
    transition: 40ms;
    background-color: var(--toc-hover-item-background);
  }

  a[data-active] > li {
    opacity: 1;
    color: var(--toc-active-item-color, hsl(25, 73%, 78%));
  }
</style>
