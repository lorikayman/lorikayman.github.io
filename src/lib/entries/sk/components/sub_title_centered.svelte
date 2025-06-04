<script>
  const { backgroundImage, children } = $props()
</script>

<div class="centered">
  {@render children?.()}

  {#if backgroundImage}
    <img alt="" src={backgroundImage} class="bg" />
  {/if}
</div>

<style>
  :global {
    .bg {
      z-index: -2;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding-bottom: 1.5rem;

      width: 3.2rem;
      height: 3.2rem;
      filter: opacity(0.06);
    }

    .centered {
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 3mm hsla(39, 100%, 66%, 0.7));

      margin-bottom: 0.4rem;

      & code {
        background-color: hsla(39, 100%, 66%, 1);
        color: hsl(343, 10%, 10%);
        padding: 4px 26px;
        font-style: italic;
      }

      & h4 {
        margin-bottom: 2rem;
      }
    }
  }
</style>
