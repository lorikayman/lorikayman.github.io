<script>
  const { source, children } = $props()
</script>

<center>
  <div class="book-citation">
    <div class="citation-bg">
      <div class="citation-source">
        <span>{source}</span>
        <!-- <span class="name">{text}</span>
        <span class="author">{author}</span> -->
      </div>
      <div class="citation-content">
        {@render children?.()}
      </div>
    </div>
  </div>
</center>

<style>

  .citation-bg {
    width: 80%;
    height: 100%;

    border-radius: 10px;
    box-shadow: 0 1mm 4mm hsla(197, 67%, 41%, 0.26);
    margin-bottom: 2rem;
    
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    border-width: 4px;
    border-style: solid;
    border-color: transparent;
    background-color: hsla(225deg, 30%, 24%, 1);
    
    & .citation-source {
      padding: 0.6rem;

      font-weight: bold;
      text-align: left;
      line-height: 1.33;
      text-transform: uppercase;
      font-family: heading;
      font-size: 1.03rem;
      letter-spacing: 0.6px;
    }

    & .citation-content {
      padding: 1rem;
      border-radius: 10px;
      background-color: #b0b0bf;
      border-color: hsla(225deg, 30%, 24%, 1);
      color: #161418;
    }

  }

  :global(.citation-content) {

    & p > code,
    & p {
      padding: 2px 0px;
      /* font-size: 1.05rem; */
      text-align: justify;
      margin-bottom: 2rem;
      font-weight: bold;
    }
  }

</style>
