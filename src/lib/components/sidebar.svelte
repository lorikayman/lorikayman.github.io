<script>
  import { createCollapsible, melt } from "@melt-ui/svelte";

  import { List, ArrowUpSquare } from "svelte-bootstrap-icons";
  import { nextPageName, doesPageDiffer } from "$lib/stores/mawanet.loader";

  const {
    elements: { root, content, trigger },
    states: { open },
  } = createCollapsible({
    forceVisible: true,
  });
</script>

<div class="sidebar" use:melt={$root}>

  <div class="header">
    <div class="header-item header-start" use:melt={$trigger}>
      <List width={34} height={34} />
    </div>
    <a class="header-item" href="/mawanet/index">
      <span class="sidebar-span">CENTRAL</span>
    </a>
    <span class="header-item sidebar-span">//</span>
    <span class="header-item sidebar-span" class:nextpagetext={$doesPageDiffer}>
      {$nextPageName}
    </span>
    <div class="header-item">
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

  background-color: rgb(45, 45, 48);
  width: 3.2rem;

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
  padding: 0.3em;
  margin-bottom: 0.2em;

  &:hover {
    background-color: rgba(30, 30, 33, 0.5);
    color: rgb(245, 181, 5);
  }
}

.sidebar-header-hide {
  visibility: hidden;
}

.sidebar-open {
  width: 30rem;
}

.sidebar-content {
  width: 15rem;
  padding: 16px;
  writing-mode: horizontal-tb;
  text-orientation: upright;
}

/* .sidebar.nextpage {
      width: 3em !important;
      border-style: solid;
      border-image-source: linear-gradient(
          -40deg,
          hsl(357, 90%, 60%),
          hsl(16, 90%, 60%),
          hsl(25, 90%, 60%)
      );
      border-image-slice: 12;
      filter: drop-shadow(0 0 2mm hsla(48, 91%, 60%, 0.2));

      animation-name: floating;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-duration: 800ms;
  } */

.nextpagetext {
  color: hsl(16, 90%, 60%);
  /* filter: drop-shadow(0 2mm 3mm hsla(16, 90%, 60%, 0.7)); */
}

/* @keyframes floating {
      0% { transform: translate(0px, 0px); }
      25%  { transform: translate(1px, 0px); }
      50%  { transform: translate(1px, 1px); }
      100%   { transform: translate(0px, 0px); }
  } */
</style>
