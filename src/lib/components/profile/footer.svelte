<script>
  import { base } from "$app/paths";
</script>

<div id="footer">
  <div class="container">
    <p class="first">
      The Array is Managed by HHGC Array Engineering Group, LLC
    </p>
    <p>
      Security, Privacy, Legal |
      <a href="{base}/company">About Us</a>
    </p>
    <p class="last">© Hordholl General Communications</p>
  </div>
</div>

<style>
  #footer {
    background: hsla(0deg, 0%, 0%, 0.8);
    margin-top: 12rem;
  }

  @media (aspect-ratio < 1/1) {
    #footer {
      margin-top: 32rem;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .container > p {
    flex: 1;
    margin: 0.3em;
    text-align: center;
    font-size: 0.7em;

    &.first {
      text-align: left;
    }

    &.last {
      text-align: right;
    }
  }
</style>
