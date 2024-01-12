<script>
import { createTabs, melt } from '@melt-ui/svelte';

import { onMount } from 'svelte';

import { cubicInOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

import { FileLock2Fill } from "svelte-bootstrap-icons"

import About from '$lib/components/profile/about.mdx'
import Projects from '$lib/components/profile/projects.mdx'
import Passcode from "$lib/components/profile/passcode.svelte"

const {
  elements: { root, list, content, trigger },
  states: { value },
} = createTabs({
  defaultValue: 'about',
});

const triggers = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'gateway', title: '-' },
];

const [send, receive] = crossfade({
  duration: 250,
  easing: cubicInOut,
});


/**
 * Scrolls do a designated div end
 * 
 * @param {Event} e
 */
function clickHandler(e) {
  e.preventDefault();
  let id = this.dataset.value;
  let content = document.querySelector(
    `.tabbed-content[aria-labelledby=${id}]`
  );

  window.scrollTo({
    behavior: "smooth",
    top: window.visualViewport.height * 0.6,
  })
}

onMount(() => {
  const buttons = document.querySelectorAll(".trigger-button");

  for (let link of buttons) {
    link.addEventListener("click", clickHandler);
  }
})
</script>

<div id="center">
  <div
    use:melt={$root}
    class="menu-container"
    data-current-active-tab="{$value}"
  >
    <div
      use:melt={$list}
      aria-label="The Spaces"
      class="menu-space"
    >
      {#each triggers as triggerItem}
        <button id={triggerItem.id}
          class="trigger-button"
          use:melt={$trigger(triggerItem.id)}
        >
          {#if triggerItem.id != 'gateway'}
            {triggerItem.title}
          {:else}
            <FileLock2Fill height={22} width={22}/>
          {/if}
          {#if $value === triggerItem.id}
            <div class="trigger-indicator"
              in:send={{ key: 'trigger' }}
              out:receive={{ key: 'trigger' }}
            />
          {/if}
        </button>
      {/each}
    </div>
    <div use:melt={$content('about')} class="tabbed-content">
      <About/>
    </div>
    <div use:melt={$content('projects')} class="tabbed-content">
      <Projects/>
    </div>
    <div use:melt={$content('gateway')} class="tabbed-content">
      <Passcode/>
    </div>
  </div>
</div>
 
<style>
.menu-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  min-height: 8.2rem;
  width: 70%;
  background-color: #353136;
  border-radius: 8px;
  filter: drop-shadow(0 0 3em rgb(45, 45, 45, 0.6));

  &[data-current-active-tab="gateway"] {
    filter: drop-shadow(0 0 3em #fe5f0024);
  }
}

@media (max-width: 540px) {
  .menu-container {
    width: 100%;
  }
}

#center {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.menu-space {
  display: flex;
  overflow-x: auto;
}

.trigger-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: sans-serif;
  font-weight: 230;

  cursor: pointer;
  user-select: none;
  font-size: 1.4rem;
  padding: 0.9em;

  font-weight: 500;
  line-height: 1;

  flex: 1;
  border-color: transparent;
  background-color: rgb(45, 45, 48);

  border-width: 2px;
  border-style: solid;
  color: hsl(45, 50%, 70%);

  &[data-state="active"] {
    background-color: #353136;
  }
}

.trigger-indicator {
  position: absolute;
  width: 1.38em;
  height: 0.18em;
  margin-top: 2.38em;
  border-radius: 8px;
  background-color: hsl(355, 100%, 62%);
}

.tabbed-content {
  padding: 0em 1.6em;

  &[aria-labelledby="gateway"] {
    /* background-image: url('/img/bc.jpg');
    background-position: 40% 80%;
    background-size: 160%; */
    background-image: url('/img/mp.jpg');
    background-position: 31% 36%;
    background-size: 130%;
    /* filter: saturate(97%) blur(0.1em); */
  }
}

</style>