<script>
  import { delay } from '$lib/helpers/delay.js'
  import { isChrome } from '$lib/helpers/useragent.js'

  /**
   * @param {String} selector
   *    may contain comas `,` and if so,
   *    those separate selectors are evaluated
   *    sequentially in order they were given
   * @param {String} buttonClass
   * @param {HTMLElement} children passed markup
   */
  const {
    selector = '',
    buttonClass = '',
    children
  } = $props()

  // delay in ms
  const SCROLL_DELAY = 800

  /**
   * @description On click TOC is scrolled to the selector
   *  so that it would be centered vertically
   * if selector has `,` - split them and evaluate sequentially
   *
   * Notably, Chrome does not support multiple
   * on-going scrolls, so we consider processing
   * them sequentially, that is not waiting for
   * a previous one to complete as it would be
   * too complex of logic,
   * but sep approx time window between them
   */
  async function scrollToActive () {
    const selectors = selector.split(',')
    for (let i = 0; i < selectors.length; i++) {
      const selectorFiltered = selectors[i]
      const activeElement = document.querySelector(
        selectorFiltered
      )
      if (activeElement) {
        if (isChrome && i > 0) await delay(SCROLL_DELAY)
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      } else {
        console.error(
          'No element was found for selector:',
          selectorFiltered
        )
      }
    }
  }
</script>

<button
  class={buttonClass}
  onclick={scrollToActive}
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
