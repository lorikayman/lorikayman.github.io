<script>
  export let type

  import {
    BoxArrowUpRight,
    ChevronExpand,
    ChevronBarContract
  } from 'svelte-bootstrap-icons'

  import { slide } from 'svelte/transition'
  import { createCollapsible, melt } from '@melt-ui/svelte'
  const {
    elements: { root, content, trigger },
    states: { open }
  } = createCollapsible({
    forceVisible: false
  })
</script>

<div>
  <div
    class="project-summary"
    data-type={type ?? ''}
    use:melt={$root}
  >
    <h3 class="project-name">
      <slot name="name" />
    </h3>
    <div class="project-description">
      <slot name="desc" />
    </div>
    <div use:melt={$trigger} class="details-trigger">
      <b>
        {#if $open}
          <ChevronBarContract width={20} height={20} />
          <span>Hide details</span>
        {:else}
          <ChevronExpand width={20} height={20} />
          <span>Show details</span>
        {/if}
      </b>
    </div>
    {#if $open}
      <div class="project-details" transition:slide>
        {#if $$slots.did}
          <p>
            <b>What I did:</b>
            <slot name="did" />
          </p>
        {/if}
        {#if $$slots.tech}
          <p>
            <b>Technologies and/or products used:</b>
            <slot name="tech" />
          </p>
        {/if}
        {#if $$slots.message}
          <p>
            <b>Vendor message:</b>
          </p>
          <slot name="message" />
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .project-summary {
    /* font-family: sans-serif; */
    margin: 1.8rem 0.2rem;
    padding: 0.6rem;
    border-width: 1px;
    border-radius: 4px;
    border-color: hsl(13, 7%, 60%);
    border-style: solid;
    background-color: hsla(13, 80%, 60%, 4%);
  }

  @media only screen and (min-width: 1024px) {
    .project-summary {
      margin: 1.8rem 8rem;
    }
  }

  .project-name {
    margin-top: 0.1em;
    color: hsl(40, 50%, 80%);
    margin-bottom: 0.6em;
  }

  .project-description,
  .details-trigger {
    color: hsl(13, 10%, 66%);
    margin-top: 0.8em;
    text-align: justify;
  }

  .details-trigger {
    cursor: pointer;
    font-size: 0.9rem;

    & svg {
      margin-bottom: -5px;
    }
  }

  .project-details {
    color: hsl(13, 10%, 66%);

    padding-right: 2rem;
    text-align: justify;

    & b {
      /* font-family: sans-serif !important; */
      font-size: 0.9rem;
    }
    & ul {
      list-style-type: "› ";
    }
  }

  .link-out {
    color: inherit;
  }
</style>
