<script context="module">
  import './fonts.css'
  import './layout.css'
  import './mobile.css'

  import favicon from '$lib/entries/sk/rebis-theory/assets/img/spiral_knights/icon_goldlock.png'

  // import Webgl from "$lib/components/canvas/webgl.svelte";
</script>

<link
  rel="icon"
  href={favicon}
/>

<div class="background-base"></div>
<div class="background"></div>
<!-- <Webgl controlClasses="background-special" /> -->
<slot />
