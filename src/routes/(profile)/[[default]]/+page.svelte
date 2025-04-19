<script>
  import { page } from '$app/state'
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  // import { cubicInOut } from "svelte/easing";
  // import { crossfade, blur } from "svelte/transition";

  export let data

  import MawanetHeader from '$lib/components/profile/mawanet_header.svelte'
  import TripleSymbol from '$lib/components/profile/triple_symbol.svelte'

  document.title = 'RKHL57 : IRKM'

  let host
  if (data.tab == 'company') {
    host = '57sw.erkh.maw'
  } else {
    host = page.url.host
  }

  const userHasScrolled = false

  afterNavigate(() => {
    const tabElement = document.querySelector('.tabbed-content')
    window.scrollTo(0, tabElement.getBoundingClientRect().top - 180)
  })

  // onMount(() => {
  //   let tabElement = document.querySelector(".tabbed-content");
  //   window.onscroll = function () {
  //     if (!userHasScrolled) {
  //       window.scrollTo(0, tabElement.getBoundingClientRect().top - 80);
  //     }
  //     userHasScrolled = true;
  //   };
  // });
</script>

<MawanetHeader {host} />

<div id="menu-wrapper">
  <div class="menu-container">
    <div class="trigger">
      <TripleSymbol />
    </div>

    <div class="tabbed-content scroll-anchor">
      <svelte:component this={data.component}></svelte:component>
    </div>
  </div>
</div>

<style>
  #menu-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 60vi;
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    width: 70%;
    border-radius: 8px;
    filter: drop-shadow(0 0 3em rgb(0, 0, 0, 0.6));
  }

  /* FIXME: mobile-first */
  @media (max-width: 540px) {
    .menu-container {
      width: 100%;
    }
  }

  /* .tabbed-content { */
  /* padding: 0em 1.6em; */

  /* https://stackoverflow.com/questions/28652571/dotted-background-overlay-effect-in-css */
  /* &:not([aria-labelledby="projects"]) {
      background: transparent;
      background-position-x: 0%;
      background-position-y: 0%;
      background-image: none;
      background-size: auto;
      background-image: radial-gradient(hsl(0, 0%, 9%) 1px, transparent 0);
      background-size: 50px 50px;
      background-position: -25px -25px;
    } */

  /* &[aria-labelledby="gateway"] {
      background-image: url("/img/mp.jpg");
      background-position: 31% 36%;
      background-size: 130%;
    } */
  /* } */

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    letter-spacing: 0.1rem;

    cursor: pointer;
    padding: 0.9em;

    border-color: transparent;

    margin-bottom: 11px;
  }
</style>
