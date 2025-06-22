<script>
  /**
   * @param {String} buttonClass
   * @param {String<left, right>} alignDirection - makes corners rounded to align with a surface
   * @param {object} onclick - function prop for button's onclick method
   * @param {boolean} disabled
   * @param {boolean} active - flag of activity
   * @param {String} inlineImageSourcePath - path to an image to paste within the button
   */
  const {
    buttonClass,
    alignDirection,
    onclick,
    disabled,
    active,
    inlineImageSourcePath
  } = $props()

</script>

<button
  class={buttonClass}
  onclick={onclick}
  disabled={disabled}
  type="button"
  data-active={active}
  data-align-direction={alignDirection}
>
  <img src={inlineImageSourcePath}
    alt="Failed to load button image"
  >
</button>

<style>
  button {
    display: flex;

    align-items: center;
    justify-content: center;

    cursor: pointer;

    border: solid;
    border-color: transparent;
    border-width: 2px;
    background-color: hsla(225deg, 30%, 24%, 1);

    border-radius: 5px;
    &[data-align-direction="left"] {
      border-radius: 0px 5px 5px 0px;
    }
    &[data-align-direction="right"] {
      border-radius: 5px 0px 0px 5px;
    }
    &[data-align-direction="bottom"] {
      border-radius: 5px 5px 0px 0px;
    }
    
    &:disabled {
      transition: linear 20ms;
      opacity: 0.3;
      background-color: hsla(225deg, 30%, 18%, 1)
    }
    
    &[data-active="true"] {
      background-color: hsla(225deg, 30%, 12%, 1)
    }

    & img {
      width: 34px;
      height: 34px;
      scale: 1;
      padding: 2px 0px;
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
