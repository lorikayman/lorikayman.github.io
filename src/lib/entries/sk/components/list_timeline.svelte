<script>
  const { children } = $props()
</script>

<div class="timeline">
  {@render children?.()}
</div>

<style>
  :global .timeline {
    li {
      list-style-type: none;
    }
  }
</style>
