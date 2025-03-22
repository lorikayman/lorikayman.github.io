<script>
  import { page } from "$app/state";

  let { host } = $props();
</script>

<div id="header-container">
  <div class="floating array-container">
    <div id="array">
      <h1>RKHL-57 South-West Communications Array</h1>
    </div>
    <div id="connectivity">
      <h3>
        Connectivity [
        <code class="online">ONLINE</code>
        ]:
        <code class="check">98.2%</code> - <em>{host}</em>
      </h3>
    </div>
  </div>
</div>

<style>
  .array-container {
    display: flex;
    overflow: hidden;
    width: 80%;
    flex-direction: column;
  }

  #array {
    text-align: center;
    color: #ea9b2c;
    letter-spacing: 0.15em;
    border-left: 1.2rem solid #de9835;
    border-right: 1.2rem solid #de9835;
    padding: 0.4rem 0.3rem;
    padding-top: 0.8rem;
    margin-bottom: 2.15rem;
    border-radius: 8px;
    filter: drop-shadow(0 -2mm 4mm rgba(183, 112, 11, 0.844));
  }

  h3 {
    color: #de9835;
  }

  h1 {
    margin: 0.15em 0;
    padding: 0.1rem 1.2rem;
    border-top: 0.3rem solid transparent;
    border-bottom: 0.3rem solid transparent;
    margin: 0rem 1rem;
    transition: color 1s;
    color: rgb(255, 233, 159);
    text-transform: uppercase;

    border-top: 0.3rem solid transparent;
    border-bottom: 0.3rem solid transparent;
    color: rgb(255, 251, 147);

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Author: Stefan Judis (stefanjudis)
    https://codepen.io/alphardex/pen/vYEYGzp */
    &::after {
      position: absolute;
      content: "";
      top: calc(-1 * var(--border-width));
      left: calc(-1 * var(--border-width));
      z-index: -1;
      width: 100%;
      height: 40%;
      background: linear-gradient(
        60deg,
        hsl(224, 85%, 66%),
        hsl(269, 85%, 66%),
        hsl(314, 85%, 66%),
        hsl(359, 85%, 66%),
        hsl(34, 85%, 66%),
        hsl(89, 85%, 66%),
        hsl(134, 85%, 66%),
        hsl(179, 85%, 66%)
      );
      background-size: 300% 300%;
      background-position: 0 50%;
      border-radius: calc(2 * var(--border-width));
      animation: moveGradient 3s alternate infinite;
    }
  }

  @media (max-width: 540px) {
    #array h1::after {
      width: 80%;
      height: 70%;
    }
  }

  @media (min-width: 980px) {
    #array h1::after {
      height: 30%;
      margin-top: 1.8em;
    }
  }

  @keyframes moveGradient {
    30% {
      background-position: 59% 100%;
    }
    60% {
      background-position: 40% 100%;
    }
  }

  .floating {
    animation-name: floating;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 8s;
  }

  @keyframes floating {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, 10px);
    }
    100% {
      transform: translate(0px, -0px);
    }
  }

  #connectivity {
    margin-top: -2rem;
    min-width: fit-content;
    display: flex;
    justify-content: center;
    color: #de9835;
    letter-spacing: 0.1em;

    animation-name: floating-menu;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 5s;
    filter: drop-shadow(0 -2mm 4mm rgba(183, 112, 11, 0.15));

    & .online {
      font-size: 1.1em;
      color: rgb(82, 215, 122);
      filter: drop-shadow(0 0 1mm rgb(82, 215, 122));
    }

    & .check {
      font-size: 1.1em;
      padding: 3px;
      color: aqua;
      filter: drop-shadow(0 0 1mm aqua);
    }
  }

  @keyframes floating-menu {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -6px);
    }
    100% {
      transform: translate(0px, -0px);
    }
  }

  /* .cosmic-malevolence {
    color: #fe0054;
    font-weight: bolder;
    filter: drop-shadow(0 0 0.7rem);
  } */

  @media (max-width: 540px) {
    #array {
      border: unset;
      padding-top: 0px;
    }

    #header-container {
      padding-bottom: 50%;
    }
  }

  #header-container {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 14rem;
    max-height: 15rem;
    padding-top: 7rem;
    margin-bottom: 5em;
    font-family: "fira-sans-semi-bold";
  }
</style>
