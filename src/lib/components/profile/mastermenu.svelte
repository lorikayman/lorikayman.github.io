<script>
  import { createTabs, melt } from "@melt-ui/svelte";

  import { onMount } from "svelte";

  import {
    goto,
    afterNavigate,
    disableScrollHandling,
  } from "$app/navigation";

  import { cubicInOut } from "svelte/easing";
  import { crossfade, blur } from "svelte/transition";

  import Links from "$lib/components/profile/links.svelte";
  import About from "$lib/components/profile/about.mdx";
  import Projects from "$lib/components/profile/projects.mdx";
  import Passcode from "$lib/components/profile/passcode.svelte";

  export let tab;

  const tabName = tab;

  const {
    elements: { root, list, content, trigger },
    states: { value },
  } = createTabs({
    defaultValue: tab,
  });

  var triggers = [
    // { id: "links", title: ":LINKS:" },
    { id: "about", title: ":ABOUT:" },
    { id: "projects", title: ":HHGC:" },
  ];
  if (document.documentElement.clientWidth > 824) {
    triggers = [
      // { id: "links", title: "∷ LINKS ∷" },
      { id: "about", title: "∷ ABOUT ∷" },
      { id: "projects", title: "∷ HHGC ∷" },
    ];
  }

  if (tabName == "gateway") {
    triggers = [];
  }

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });

  let userHasScrolled = false;

  afterNavigate(() => {
    // let tabElement = document.querySelector('.scroll-anchor');
    // console.log('tabElement after nav:', tabElement)
    let y = window.visualViewport.height * 0.7;
    // let y = tabElement.getBoundingClientRect().bottom;
    // if (userHasScrolled == true) {
    if (tabName != "gateway") {
      window.scrollTo(0, y);
    }
    // }
    // disableScrollHandling();
  });

  onMount(() => {
    let tabElement = document.getElementById(tabName);
    window.onscroll = function () {
      if (!userHasScrolled && tabName != "gateway") {
        window.scrollTo(
          0,
          tabElement.getBoundingClientRect().top - 80,
        );
      }
      userHasScrolled = true;
    };
  });
</script>

<div id="menu-wrapper">
  <div
    use:melt={$root}
    class="menu-container"
    data-current-active-tab={$value}
  >
    <div
      use:melt={$list}
      aria-label="The Spaces"
      class="menu-space"
    >
      {#each triggers as triggerItem}
        <button
          id={triggerItem.id}
          class="trigger-button"
          use:melt={$trigger(triggerItem.id)}
          on:click={() =>
            goto("/" + triggerItem.id, { noScroll: true })}
        >
          {triggerItem.title}
          {#if $value === triggerItem.id}
            <div
              class="trigger-indicator-container"
              in:send={{ key: "trigger" }}
              out:receive={{ key: "trigger" }}
            >
              <div class="trigger-indicator-core"></div>
              <div class="dot dot1"></div>
              <div class="dot dot2"></div>
            </div>
          {/if}
        </button>
      {/each}
    </div>
    <div
      use:melt={$content("links")}
      class="tabbed-content scroll-anchor"
    >
      <Links />
    </div>
    <div
      use:melt={$content("about")}
      class="tabbed-content scroll-anchor"
    >
      <About />
    </div>
    <div
      use:melt={$content("projects")}
      class="tabbed-content scroll-anchor"
    >
      <Projects />
    </div>
    <div
      use:melt={$content("gateway")}
      class="tabbed-content scroll-anchor"
    >
      <Passcode />
    </div>
  </div>
</div>

<style>
  .menu-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    width: 70%;
    /* background-color: #353136; */
    border-radius: 8px;
    filter: drop-shadow(0 0 3em rgb(0, 0, 0, 0.6));

    &[data-current-active-tab="gateway"] {
      filter: drop-shadow(0 0 3em #fe5f0024);
    }
  }

  @media (max-width: 540px) {
    .menu-container {
      width: 100%;
    }
  }

  #menu-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 60vi;
  }

  .menu-space {
    z-index: 3;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .trigger-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: "familiar-pro", sans-serif;
    font-weight: 230;
    letter-spacing: 0.1rem;

    cursor: pointer;
    user-select: none;
    font-size: 1.4rem;
    padding: 0.9em;

    font-weight: 500;
    line-height: 1;

    flex: 1;
    border-color: transparent;

    border-width: 2px;
    border-style: solid;
    color: hsl(45, 50%, 70%);

    transition: 20ms;
    background-color: rgb(45, 45, 48);
    box-shadow: 0px 11px rgb(36, 36, 38);
    margin-bottom: 11px;

    &:hover {
      background-color: hsl(288, 5%, 15%);
      box-shadow: 0px 8px hsl(288, 5%, 10%);
      margin-bottom: 8px;
      padding-bottom: calc(0.9em + 3px);
    }

    &[data-state="active"] {
      border-color: transparent;
      background-color: hsl(288, 5%, 12%);
      box-shadow: 0px 6px hsl(288, 4%, 8%);
      margin-bottom: 6px;
    }

    &[data-state="active"]:hover {
      padding-bottom: calc(0.9em);
      background-color: hsl(288, 3%, 11%);
      box-shadow: 0px 6px hsl(288, 4%, 6%);
      margin-bottom: 6px;

      & .dot {
        filter: drop-shadow(0 0 1mm hsl(355, 100%, 62%));
      }
    }
  }

  .trigger-indicator-container {
    margin-top: 2.16em;
    position: absolute;
  }

  .trigger-indicator-core {
    position: relative;
    background-color: hsl(355, 100%, 62%);

    width: 0.5em;
    height: 0.5em;
    border-radius: 100%;
    animation: pulse 5600ms infinite;
  }

  .dot {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: hsl(355, 100%, 62%);
    border-radius: 100%;
    top: 4px;
  }

  .dot1 {
    left: -0.55em;
  }

  .dot2 {
    right: -0.55em;
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

  .tabbed-content {
    /* padding: 0em 1.6em; */

    /* https://stackoverflow.com/questions/28652571/dotted-background-overlay-effect-in-css */
    &:not([aria-labelledby="projects"]) {
      background: transparent;
      background-position-x: 0%;
      background-position-y: 0%;
      background-image: none;
      background-size: auto;
      background-image: radial-gradient(
        hsl(0, 0%, 9%) 1px,
        transparent 0
      );
      background-size: 50px 50px;
      background-position: -25px -25px;
    }

    &[aria-labelledby="gateway"] {
      /* background-image: url('/img/bc.jpg');
    background-position: 40% 80%;
    background-size: 160%; */
      background-image: url("/img/mp.jpg");
      background-position: 31% 36%;
      background-size: 130%;
      /* filter: saturate(97%) blur(0.1em); */
    }
  }
</style>
