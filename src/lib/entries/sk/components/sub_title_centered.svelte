<div class="centered">
  <slot></slot>
</div>

<style>
  @font-face {
    font-family: "Open Sans Bold", sans-serif;
    src: url("/static/fonts/Open_Sans/static/OpenSans-Bold.ttf");
  }

  :global(.centered) {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 3mm hsla(39, 100%, 66%, 0.7));

    & code {
      background-color: hsla(39, 100%, 66%, 1);
      color: hsl(343, 10%, 10%);
      padding: 4px 26px;
      font-style: italic;
      font-family: "Open Sans Bold", sans-serif;
    }

    & h4 {
      margin-bottom: 2rem;
    }
  }
</style>
