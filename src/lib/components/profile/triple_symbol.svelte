<div class="indicator-container">
  <div class="trigger-indicator-core"></div>
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
</div>

<style>
  .dot {
    filter: drop-shadow(0 0 1mm hsl(355, 100%, 62%));
  }

  .indicator-container {
    margin-top: 2.16em;
    position: absolute;
  }

  .trigger-indicator-core {
    position: relative;
    background-color: hsl(355, 100%, 62%);

    width: 0.5em;
    height: 0.5em;
    border-radius: 100%;
    animation: pulse 5600ms infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.32);
    }
    100% {
      transform: scale(1);
    }
  }

  .dot {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: hsl(355, 100%, 62%);
    border-radius: 100%;
    top: 4px;
  }

  .dot1 {
    left: -0.55em;
  }

  .dot2 {
    right: -0.55em;
  }
</style>
