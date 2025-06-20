<script>

  const { children } = $$props()

</script>

<p>
  {@render children?.()}
  <div class="anchor">---</div>
</p>

<style>
  .anchor {
    position: absolute;
    float: right;
  }
</style>
