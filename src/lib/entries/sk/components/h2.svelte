<script>
  // This component will receive any attributes passed to the h2 tag
  let { level = 2, id, className, children } = $props();
  console.log("h2 component:", level, id, className, children);
</script>

<h2 class="custom-heading {className}" {id} data-level={level}>
  {@render children()}
</h2>

<style>
  .custom-heading {
    font-size: 5.5rem;
  }
</style>
