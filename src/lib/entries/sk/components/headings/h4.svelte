<script>
  // todo: on mobile make entire heading clickable with underscore

  import { replaceState, pushState } from '$app/navigation'
  import { page } from '$app/state'

  const { children } = $props()

  /**
   *
   * @param {Event} e event with
   *   target element
   */
  function gotoAnchorHeading (e) {
    if (!e) {
      console.error('No target provided')
      return
    }
    const targetHash = `#${e.target.parentNode.previousElementSibling.id}`

    // dont use goto as it breaks scrolling even with noScroll = true
    // fkn cancer framework
    const doReplaceState = page.url.hash === targetHash
    if (doReplaceState) {
      replaceState(page.url.pathname + targetHash)
      return
    }
    pushState(page.url.pathname + targetHash)
  }
</script>

<div class="container-align-anchor">
  <h4>
    {@render children()}
  </h4>
  <!-- workaround for melt-ui 1 toc scrapper -->
  <h4 data-toc-ignore>
    <button
      class="anchor"
      onclick={(e) => gotoAnchorHeading(e)}
    >
      i
    </button>
  </h4>
</div>

<style>
  :global {
    .container-align-anchor {
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover .anchor {
        display: inline-block;
      }
    }

    .anchor {
      display: none;
      cursor: pointer;
      border-color: transparent;
      border-radius: 5px;
      border-width: 0px;

      line-height: 0.6;
      width: 1.3rem;
      height: 1.3rem;

      background-size: cover;
      background-repeat: no-repeat;
      align-items: center;

      /* background-color: hsl(0deg, 0%, 16%); */
      background-color: hsla(225deg, 30%, 24%, 1);

      &:hover {
        /* background-color: hsl(0deg, 0%, 24%); */
        background-color: hsla(225deg, 30%, 20%, 1);
      }
    }
  }
</style>
