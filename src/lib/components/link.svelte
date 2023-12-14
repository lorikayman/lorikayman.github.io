<script>
  import { createLinkPreview, melt } from '@melt-ui/svelte';

  import { FileTextFill, FileLock2Fill } from "svelte-bootstrap-icons"

  import { fetchComponent } from "$lib/stores/mawanet.loader.js"

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
  }

</script>

<a class="mtt-link"
  href="{error || path}"
  on:mouseenter={() => {loadEntry()}}
  on:m-hover={(e) => {e.preventDefault()}}
  on:m-blur={(e) => {e.preventDefault()}}
  use:melt={$trigger}
  class:error403={error === 403}
>
  {#if false}
    {#if error !== 403}
    <FileTextFill width={16} height={16}/><slot/>
    {:else}
    <FileLock2Fill width={16} height={16}/>Access Denied
    {/if}
  {:else}
  <slot/>
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
    /* width: 30em;
    height: 20em; */
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

    & h1,h2,h3,h4,h5,h6,p {
      font-size: 1.2rem;
      font-family: 'open sans';
    }
  }
</style>