<script>
  import "./styles.css";

  import MasterMenu from "$lib/components/profile/mastermenu.svelte";
  import { page } from "$app/state";

  document.title = "RKHL57 : IRKM : " + page.data.tab;
</script>

<div id="bg-handler">_57: Requesting personnel file...</div>

<div id="header-spacer">
  <div class="floating">
    <div id="master-header">
      <h1>RKHL-57 South-West Communications Array</h1>
      <br />
      <div class="align">
        <h2>
          Viewing: <span>{page.url.host}</span>
        </h2>
      </div>
    </div>
    <div id="connectivity">
      <h3>
        Connectivity [ <code class="online">ONLINE</code> ]:
        <code class="check">98.2%</code>
      </h3>
    </div>
  </div>
</div>

<MasterMenu tab={page.data.tab} />

<div class="footer"></div>
