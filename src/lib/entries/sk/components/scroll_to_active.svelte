<script>
  import { onMount } from "svelte";

  /**
   * @param {String} selector
   * @param {String} buttonClass
   * @param {HTMLElement} children passed markup
   */
  let {
    selector = "",
    buttonClass = "",
    children,
  } = $props();

  /**
   * @description On click TOC is scrolled to the selector
   *  so that it would be centered vertically
   */
  function scrollToActive() {
    const activeElement = document.querySelector(selector);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
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
