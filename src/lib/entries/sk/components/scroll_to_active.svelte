<script>
  import { onMount } from "svelte";

  /** peak moronic design here with slots
  https://svelte.dev/docs/svelte/@render
  knockout solved it fucking 15 years ago
  why this has to be here so complex??
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
