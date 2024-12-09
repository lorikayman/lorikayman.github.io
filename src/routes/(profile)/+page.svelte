<script>

import "./styles.css"

import { writable } from "svelte/store";
import { onMount } from "svelte";

import MasterMenu from "$lib/components/profile/mastermenu.svelte";

document.title = "ironkayman"

let userHasScrolled;
window.onscroll = function() {
  if (!userHasScrolled) window.scrollTo(0, window.visualViewport.height * 0.8);
  userHasScrolled = true;
}

</script>

<div>_57</div>

<div id="header-spacer">
  <div class="floating">
    <div id="master-header">
      <h1>RKHL-57 South-West Communications Array</h1>
      <br/>
      <div class="align">
        <h2>
          Viewing profile: <span>ironkayman</span>
        </h2>
      </div>
    </div>
    <div id="connectivity">
      <h3>
        Connectivity [ <code class="online">ONLINE</code> ]: <code class="check">98.2%</code>
      </h3>
    </div>
  </div>
</div>

<MasterMenu/>

<div class="footer"></div>
