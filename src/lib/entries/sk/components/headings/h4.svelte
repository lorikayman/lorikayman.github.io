<script>
  // todo: on mobile make entire heading clickable with underscore

  let {children, ...props} = $props()

  /**
   *
   * @param {Event} e event with
   *   target element
  */
  function gotoAnchorHeading(e) {
    if (!e) {
      console.error("No target provided")
      return
    }
    const targetId = e.target.parentNode.previousElementSibling.id

    // back in history does not scroll to prev element
    window.location.hash = targetId
  }
</script>

<div class="container-align-anchor">
  <h4>
    {@render children()}
  </h4>
  <!-- workaround for melt-ui 1 toc scrapper -->
  <h4 data-toc-ignore>
    <button class="anchor" onclick={e => gotoAnchorHeading(e)}>
      i
    </button>
  </h4>
</div>

<style>
  .container-align-anchor {
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover .anchor {
      display: block;
    }
  }

  .anchor {
    display: none;
    border-color: transparent;
    border-radius: 5px;
    border-width: 0px;

    line-height: 0.6;
    width: 1.3rem;
    height: 1.3rem;

    background-size:cover;
    background-repeat: no-repeat;
    align-items: center;

    /* background-image: url("/src/lib/entries/sk/rebis-theory/assets/icon_revisit-arrow.png"); */
    /* background-color: hsl(0deg, 0%, 16%); */
    background-color: hsla(225deg, 30%, 24%, 1);

    &:hover {
      /* background-color: hsl(0deg, 0%, 24%); */
      background-color: hsla(225deg, 30%, 20%, 1);
    }
  }
</style>
