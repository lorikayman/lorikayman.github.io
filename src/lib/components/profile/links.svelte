<script>
  import MediaLink from './media_link.svelte'
</script>

<div class="link-array-wrapper">
  <div class="link-array">
    <MediaLink
      type="twitter"
      url="https://twitter.com/lorikayman"
      label="Twitter">WIPs / sketches</MediaLink
    >
    <MediaLink
      type="furaffinity"
      url="https://www.furaffinity.net/user/ironkayman"
      label="FurAffinity">Finished artwork</MediaLink
    >
    <MediaLink
      type="github"
      url="https://github.com/lorikayman"
      label="Github">Other projects</MediaLink
    >
  </div>
  <div class="wrapper-blur"></div>
</div>

<style>
  .link-array {
    padding: 2rem 0rem;
    height: fit-content;
    gap: 1.05rem;
    display: flex;
    vertical-align: middle;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  .wrapper-blur {
    position: absolute;
    z-index: -1;
    opacity: 0.98;
    top: -20px;
    margin-left: -10px;
    height: 100vi;
  }
</style>
