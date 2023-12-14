<script>
  export let name, description, link, participation, date;
  export let type;
  import { BoxArrowUpRight } from "svelte-bootstrap-icons"
</script>

<div>
  <code class="project-date">{date} |</code>
  <div class="project-summary" data-type={type ?? ''}>
    <h3 class="project-name">
      {name}
      {#if link}
        <a target="_blank" rel="noopener noreferrer" class="link-out" href="{link}"><BoxArrowUpRight/></a>
      {/if}
    </h3>
    <div class="project-description">
      {description}
      {#if participation}
      <p>
        <b>What I did:</b> {participation}
      </p>
      {/if}
    </div>
    <div class="project-used-tech">
      <b>Technologies:</b> <slot/>
    </div>
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

  .project-date {
    font-size: 0.9em;
    margin-right: -1.7em;
    color: antiquewhite;
    position: absolute;
    margin-top: 0.6em;
    height: fit-content;
    transform: rotate(180deg);
    text-orientation: sideways;
    writing-mode: vertical-rl;
  }

  .project-description,
  .project-used-tech {
    color: hsl(13, 10%, 66%);
  }

  .project-used-tech {
    margin-top: 0.8em;
  }

  .link-out {
    color: inherit;
  }

</style>