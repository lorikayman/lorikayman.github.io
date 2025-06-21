<script>
  import { delay } from '$lib/helpers/delay.js'
  import { isChrome } from '$lib/helpers/useragent.js'

  /**
   * @param {String} selector
   *    may contain comas `,` and if so,
   *    those separate selectors are evaluated
   *    sequentially in order they were given
   * @param {String} buttonClass
   * @param {String<left, right>} alignDirection - makes corners rounded to align with a surface
   * @param {String} imagePath - path to an image to paste within the button
   * @param {HTMLElement} children passed markup
   */
  const {
    selector = '',
    buttonClass = '',
    alignDirection = '',
    imagePath = '',
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
  data-align-direction={alignDirection}
>
  {@render children?.()}
</button>

<style>
  button {
    z-index: 10;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border: solid;
    border-color: transparent;
    border-width: 2px;
    background-color: hsla(225deg, 30%, 24%, 1);

    &[data-align-direction="left"] {
      border-radius: 0px 5px 5px 0px;
    }

    &[data-align-direction="right"] {
      border-radius: 5px 0px 0px 5px;
    }

    &:hover {
      background-color: hsla(225deg, 30%, 18%, 1);

      & img {
        filter: drop-shadow(
          0px 0px 4px hsla(0deg, 0%, 40%, 0.4)
        );
      }
    }
  }
</style>
