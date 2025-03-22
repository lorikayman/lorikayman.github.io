<script>
  import MawanetHeader from "$lib/components/profile/mawanet_header.svelte";
  import { page } from "$app/state";

  import { onMount } from "svelte";

  import { goto, afterNavigate } from "$app/navigation";
  import { cubicInOut } from "svelte/easing";
  import { crossfade, blur } from "svelte/transition";

  import About from "$lib/components/profile/about.mdx";

  document.title = "RKHL57 : IRKM";

  let userHasScrolled = false;

  afterNavigate(() => {
    let tabElement = document.querySelector(".tabbed-content");
    window.scrollTo(0, tabElement.getBoundingClientRect().top - 80);
  });

  onMount(() => {
    let tabElement = document.querySelector(".tabbed-content");
    window.onscroll = function () {
      if (!userHasScrolled) {
        window.scrollTo(0, tabElement.getBoundingClientRect().top - 80);
      }
      userHasScrolled = true;
    };
  });
</script>

<MawanetHeader />

<div id="menu-wrapper">
  <div class="menu-container">
    <div class="trigger">
      <div class="indicator-container">
        <div class="trigger-indicator-core"></div>
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
      </div>
    </div>

    <div class="tabbed-content scroll-anchor">
      <About />
    </div>
  </div>
</div>

<div class="footer"></div>

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

    & .dot {
      filter: drop-shadow(0 0 1mm hsl(355, 100%, 62%));
    }
    & .indicator-container {
      margin-top: 2.16em;
      position: absolute;
    }

    & .trigger-indicator-core {
      position: relative;
      background-color: hsl(355, 100%, 62%);

      width: 0.5em;
      height: 0.5em;
      border-radius: 100%;
      animation: pulse 5600ms infinite;
    }

    & .dot {
      position: absolute;
      width: 4px;
      height: 4px;
      background-color: hsl(355, 100%, 62%);
      border-radius: 100%;
      top: 4px;
    }

    & .dot1 {
      left: -0.55em;
    }

    & .dot2 {
      right: -0.55em;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.32);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
