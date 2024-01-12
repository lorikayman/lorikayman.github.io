<script>
  export let name, description, link, date;
  export let type;

  import { BoxArrowUpRight } from "svelte-bootstrap-icons"

  import { slide } from 'svelte/transition'
  import { createCollapsible, melt } from '@melt-ui/svelte'
  const {
    elements: { root, content, trigger },
    states: { open }
  } = createCollapsible({
    forceVisible: false,
  })
</script>

<div>
  <div class="project-summary" data-type={type ?? ''} use:melt={$root}>
    <h3 class="project-name">
      {name}
      {#if link}
        <a target="_blank" rel="noopener noreferrer" class="link-out" href="{link}"><BoxArrowUpRight/></a>
      {/if}
    </h3>
    <div class="project-description">
      {description}
    </div>
    <div class="details-trigger">
      <b use:melt={$trigger}>Show details</b>
    </div>
    {#if $open}
    <div class="project-details" transition:slide>
      {#if $$slots.participation}
        <p>
          <b>What I did:</b>
          <slot name="participation"/>
        </p>
      {/if}
      {#if $$slots.technologies}
        <p>
          <b>Technologies used:</b>
          <slot name="technologies"/>
        </p>
      {/if}
      {#if $$slots.message}
        <p>
          <b>Vendor message:</b>
        </p>
        <slot name="message"/>
      {/if}
    </div>
    {/if}
  </div>
</div>

<style>

.project-summary[data-type='mysterious-vendor-message'] {
  color: black;
  background-color: hsla(66, 80%, 60%, 4%);
  border-color: hsl(66, 80%, 60%);

  & .project-name,
  .project-description,
  .project-used-tech {
    color: inherit;
  }
}
.project-summary {
  font-family: sans-serif;
  margin: 1.2rem;
  padding: 0.6rem;
  border-width: 1px;
  border-radius: 4px;
  border-color: hsl(13, 7%, 60%);
  border-style: solid;
  background-color: hsla(13, 80%, 60%, 4%);
}

.project-name {
  margin-top: 0.1em;
  color: hsl(40, 50%, 80%);
  margin-bottom: 0.6em;
}

.project-description {
  color: hsl(13, 10%, 66%);
  margin-top: 0.8em;
}

ul {
  margin-bottom: 2.3rem;
  margin-top: -1rem;

  & li {
    list-style-type: square;
    padding-top: 12px;
    color: hsl(13, 10%, 66%);
  }
}

.details-trigger {
  margin-top: 1rem;
}
.project-details {
  font-family: 'fira-sans-ultralight';
}

.link-out {
  color: inherit;
}

</style>