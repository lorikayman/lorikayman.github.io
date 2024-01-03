<script>
  import { createLinkPreview, melt } from '@melt-ui/svelte';

  import { FileLock2Fill } from "svelte-bootstrap-icons"

  import { fetchComponent, nextPageName, currentPageName } from "$lib/stores/mawanet.loader.js"


  const {
    elements: { trigger, content, arrow }
  } = createLinkPreview({
    openDelay: 10,
    closeDelay: 20,
    positioning: {placement: 'top'}
  })

  /**
   * @type {String}
   */
  export let path;
  let EntryComponent = null;
  let error = null;

  function extractName (path) {
    let rx = /\/\w+\/(\w+)\.*/g;
    let arr = rx.exec(path);
    return arr[1];
  }

  async function loadEntry() {
    let page = extractName(path);
    let entryProperties = await fetchComponent(page);

    EntryComponent = entryProperties.entryComponent;
    error = entryProperties.error;
  };
  function mouseLeave() {
    nextPageName.set($currentPageName);
  }

</script>

<a class="mtt-link"
  href="{error || path}"
  on:mouseleave={() => {mouseLeave()}}
  on:mouseenter={() => {loadEntry()}}
  on:m-hover={(e) => {e.preventDefault()}}
  on:m-blur={(e) => {e.preventDefault()}}
  use:melt={$trigger}
  class:error403={error === 403}
>
  {#if !error}
    <slot/>
  {:else}
    <FileLock2Fill width={16} height={16}/>Access Denied
  {/if}
</a>

{#if error !== 403}
<div use:melt={$content}>
  <div class="peeker">
    <svelte:component this={EntryComponent}></svelte:component>
  </div>
  <div use:melt={$arrow} />
</div>
{/if}

<style>
  a.mtt-link {
    color: rgb(128, 135, 145);

    & > svg {
      margin-bottom: -2px;
      margin-right: 3px;
    }

    &:hover {
      color: hsl(36, 100%, 82%);
      transition: all 60ms;
    }
  }

  a.mtt-link.security-lock-level-1 {
    padding: 4px;
    background-color: rgba(39, 113, 193, 0.619);
    border-radius: 5px;
    filter: drop-shadow(0 0.2em 0.16rem rgba(39, 113, 193, 0.9));

    /* adjust svg position */
    & > svg {
      margin-bottom: -2px;
    }

    &::selection {
      background-color: rgba(56, 64, 72, 0.9) !important;
    }
  }

  .error403 {
    background-color: rgba(193, 39, 65, 0.619) !important;
    border-radius: 5px;
    filter: drop-shadow(0 0.2em 0.16rem rgba(193, 39, 65, 0.9)) !important;
  }

  div.peeker {
    text-align: justify;
    overflow-y: scroll;
    max-height: 14em;
    max-width: 20em;
    background-color: rgb(36, 36, 36);
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(184, 184, 184, 0.289);
    padding: 2.2em;
    filter: drop-shadow(0 1em 1.8em black);

    & h2,h3,h4,h5,h6 {
      font-size: 1.2rem;
      letter-spacing: 1px;
      font-family: 'open sans';
    }

    & h1 {
      color: rgba(232, 230, 227, 0.55);
      /* background-color: rgba(255, 200, 34, 0.558); */
      /* color: rgb(36, 36, 36); */
      position: fixed;
      left: 2px;
      top: 24px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: nowrap;
    
      font-size: 0.9rem;
      letter-spacing: 2px;
      font-family: 'open sans';
      font-weight: 100;

      padding: 0px;
      margin: 0px;
      &::before {
        content: '_';
        margin-bottom: 0.67em;
        background-color: hsl(36, 100%, 82%);
        animation: inline-cursor-blink 500ms infinite;
      }
      &::after {
        margin-top: 0.67rem;
        content: '>>';
      }
    }

    & p {
      font-size: 1.1rem;
    }
    & blockquote {
      display: none;
    }
  }

  @keyframes inline-cursor-blink {
    0% { background-color: transparent;}
  }
</style>