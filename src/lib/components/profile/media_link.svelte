<script>
  export let url, label, type;
</script>

<a class="media-link-container" target="_blank" href={url}>
  <div>
    <span data-type={type}>{label}</span>
    <p><slot /></p>
  </div>
</a>

<style>
  .media-link-container {
    border-radius: 2px;
    margin: 0.5rem;
    padding: 4px 0.6rem;
    text-decoration: none;
    background-color: hsl(0, 8%, 31%);
    box-shadow: 0px 8px hsl(0, 8%, 25%);
    letter-spacing: 0.05rem;

    & p {
      margin: 0.1em 0em;
    }

    & div {
      display: table;
      min-width: 9.4rem;

      & span {
        vertical-align: middle;
        font-size: 1.15em;
        /* font-weight: 600; */
        font-family: "fira-sans-bold" !important;
        /* display:table-cell; */
      }
    }

    &:hover {
      background-color: hsl(0, 8%, 27%);
      box-shadow: 0px 6px hsl(0, 8%, 20%);
      transition: 100ms;
      padding-bottom: 2px;
      margin-top: calc(0.5rem + 2px);

      & [data-type] {
        transition: 80ms;
      }

      & [data-type="github"] {
        color: rgb(84, 214, 114);
      }
      & [data-type="twitter"] {
        color: rgb(49, 169, 243);
      }
      & [data-type="furaffinity"] {
        color: goldenrod;
      }

      &:active {
        background-color: hsl(0, 8%, 23%);
        box-shadow: 0px 6px hsl(0, 8%, 16%);
        transition: 100ms;
      }
    }
  }

  a {
    color: beige;
  }
</style>
