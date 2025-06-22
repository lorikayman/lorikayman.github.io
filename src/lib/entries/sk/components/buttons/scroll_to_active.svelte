<script>
  import { delay } from '$lib/helpers/delay.js'
  import { isChrome } from '$lib/helpers/useragent.js'
  import { detectOutOfBounds } from '$lib/helpers/window.js'
  
  import Button from './button.svelte'

  /**
   * @param {String} selector
   *    may contain comas `,` and if so,
   *    those separate selectors are evaluated
   *    sequentially in order they were given
   * @param {String} buttonClass
   * @param {String<left, right>} alignDirection - makes corners rounded to align with a surface
   * @param {String} inlineImageSourcePath - path to an image to paste within the button
   */
  const {
    selector,
    buttonClass,
    alignDirection,
    disabled,
    inlineImageSourcePath
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
        
        const outsideVeiwport = detectOutOfBounds(activeElement)
        if (outsideVeiwport) {
          console.log(`Detected element at index '${i}' outside of viewport, using instant scrolling`)
        }

        activeElement.scrollIntoView({
          behavior: outsideVeiwport ? 'instant' : 'smooth',
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

<Button
  buttonClass={buttonClass}
  onclick={scrollToActive}
  alignDirection={alignDirection}
  disabled={disabled}
  inlineImageSourcePath={inlineImageSourcePath}
></Button>
