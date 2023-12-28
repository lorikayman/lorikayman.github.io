<script>
  import "@fontsource/open-sans"
  import "./layout.css"
  import Sidebar from "$lib/components/sidebar.svelte"
</script>

<Sidebar/>
<div class="container">
  <slot/>
</div>
