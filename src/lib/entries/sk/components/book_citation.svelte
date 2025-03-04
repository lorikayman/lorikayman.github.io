<script>
  let { source, markup } = $props();
</script>

<center>
  <div class="book-citation">
    <div class="citation-bg">
      {@render markup?.()}
    </div>
  </div>
</center>

<style>
  .citation-bg {
    position: relative;
    width: 80%;
    height: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .citation-bg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: hsl(240, 10%, 72%);
    border-width: 4px;
    border-style: solid;
    border-color: hsl(197, 67%, 20%);
    box-shadow: 0 1mm 4mm hsla(197, 67%, 41%, 0.26);
    z-index: -1;
  }

  :global(.book-citation) {
    /* background-position: -30%; */
    /* background-color: hsl(0 0% 52%); */

    & p > code,
    & p {
      color: hsl(0deg, 0%, 12%);
      padding: 1px 0px;
      font-weight: bold;
      background-color: transparent;
      text-align: justify;
    }
  }
</style>
