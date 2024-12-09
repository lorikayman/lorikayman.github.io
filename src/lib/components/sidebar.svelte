<script>
  import { onMount } from "svelte";
  import { createCollapsible, melt } from "@melt-ui/svelte";

  import { List, ArrowUpSquare } from "svelte-bootstrap-icons";
  import { currentPageName } from "$lib/stores/mawanet.loader";

  const {
    elements: { root, content, trigger },
    states: { open },
  } = createCollapsible({
    forceVisible: true,
  });

  /**
   * Scrolls do a designated div end
   * 
   * @param {Event} e
   */
  function clickHandler(e) {
    e.preventDefault();
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    })
  }

  onMount(() => {
    const button = document.querySelector("#scroll-on-top");
    button.addEventListener("click", clickHandler);
  })
</script>

<div class="sidebar" use:melt={$root}>

  <div class="header" class:header-open={$open}>
    <!-- <div class="header-item header-start" use:melt={$trigger}> -->
    <div class="header-item header-start">
      <List width={34} height={34} />
    </div>
    {#if !$open}
      <a class="header-item" data-sveltekit-preload-data="tap" href="/mawanet/index">
        <span class="sidebar-span">CENTRAL</span>
      </a>
      <span class="header-item sidebar-span">//</span>
      <span class="header-item sidebar-span">
        {$currentPageName}
      </span>
    {/if}
    <div class="header-item" id="scroll-on-top">
      <ArrowUpSquare width={24} height={24} />
    </div>
  </div>

  {#if $open}
    <div class="sidebar-content" use:melt={$content}>
      <slot />
    </div>
  {/if}
</div>

<style>

.sidebar {
  position: fixed;
  /* z-index: 3; */

  background-color: rgb(45, 45, 48);
  min-width: 3.2rem;

  height: calc(100% - 1rem);

  border-radius: 4px;
  border-style: hidden;
  border-color: rgb(45, 45, 48);
}

.header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  padding: 3.4rem 0rem;
  max-height: 100vh;
}

.header-item {
  flex: 0 0 0;
  flex-basis: content;

  writing-mode: vertical-rl;
  text-orientation: mixed;

  font-size: 1.4em;
  padding: 0.2em 0em;

  & .sidebar-span:hover {
    transition-duration: 40ms;
    color: rgb(164, 164, 164);
  }

  &:last-child {
    position: absolute;
    bottom: 0.2rem;
    display: block;
    color: rgb(164, 164, 164);

    &:hover {
      transition-duration: 40ms;
      color: unset;
    }
  }
}

.header-start {
  border-radius: 4px;
  padding: 0.3rem;
  margin-bottom: 0.2em;
  /* z-index: 4; */

  &:hover {
    background-color: rgba(30, 30, 33, 0.5);
    color: rgb(245, 181, 5);
  }
}

.header-open {
  flex-direction: row;
  width: 40vh;

  & .header-item {
    margin-left: 0.3rem;
  }
}

.sidebar-content {
  position: fixed;
  padding: 0.3rem;
  top: 7rem;
  text-orientation: upright;
  width: 38vh;
  /* margin: 0px 8px; */

  height: 70vh;

  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgb(36, 36, 36);

  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(184, 184, 184, 0.289);
}

</style>
