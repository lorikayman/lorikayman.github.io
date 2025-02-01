<script context="module">
  import "@fontsource/open-sans";
  import "./layout.css";

  import Webgl from "$lib/components/canvas/webgl.svelte";
</script>

<Webgl controlClasses="background" />
<div>
  <slot />
</div>
