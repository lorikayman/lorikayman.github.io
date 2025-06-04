<script>
  const { children } = $props()
</script>

{@render children?.()}

<style>
  :global {
    li {
      list-style-type: none;
    }
  }
</style>
