<script context="module">
  import "@fontsource/open-sans";
  import "./layout.css";

  import Webgl from "$lib/components/canvas/webgl.svelte";
</script>

<div class="background" />
<Webgl controlClasses="background-special" />
<div>
  <slot />
</div>
