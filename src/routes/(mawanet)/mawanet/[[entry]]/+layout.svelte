<script>
  import "@fontsource/open-sans"
  import "./layout.css"
  import { List } from "svelte-bootstrap-icons"
</script>

<script context="module">
  // custom components in place of regular html tags withon the MDX component
</script>

<div class="sidebar carbon">
  <div class="main">
    <a class='index' href="/mawanet/index">
      <List width={34} height={34}/>
    </a>
  </div>
  <a class='index' href="/mawanet/index"><span class="sidebar-span">CENTRAL</span></a>
  <span class="sidebar-span">//</span>
</div>


<div class="container">
  <slot/>
</div>
