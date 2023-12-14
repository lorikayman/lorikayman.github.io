<script>
  import "@fontsource/open-sans"
  import "./layout.css"
  import { List } from "svelte-bootstrap-icons"
</script>

<div class="sidebar carbon">
  <div class="main">
    <a class='index' href="">
      <List width={34} height={34}/>
    </a>
  </div>
  <a class='index' href="/mawanet/index"><span class="sidebar-span">CENTRAL</span></a>
  <span class="sidebar-span">//</span>
</div>


<div class="container">
  <slot/>
</div>
