<script>
  /**
   * @param {String} selector
   *    may contain comas `,` and if so,
   *    those separate selectors are evaluated
   *    sequentially in order they were given
   * @param {String} buttonClass
   * @param {HTMLElement} children passed markup
   */
  let {
    selector = "",
    buttonClass = "",
    children,
  } = $props();

  const isChrome = navigator.userAgent.indexOf('Chrome') > 0

  /**
   * @description On click TOC is scrolled to the selector
   *  so that it would be centered vertically
   * if selector has `,` - split them and evaluate sequentially
   */
  function scrollToActive() {
    // FIXME:
    // Chrome does not support multiple scrolling actions, consider processing them sequentially,
    // that is waiting for a previous one to complete
    // currently we do this by applying instant scroll for chrome
    selector.split(",").forEach((selectorFiltered, i) => {
      const activeElement = document.querySelector(
        selectorFiltered,
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: isChrome ? 'instant' : "smooth",
          block: "center",
        });
      } else {
        console.error("No element was found for selector:", selectorFiltered)
      }
    });
  }
</script>

<button
  class={buttonClass}
  on:click={scrollToActive}
  type="button"
>
  {@render children?.()}
</button>

<style>
  button {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
