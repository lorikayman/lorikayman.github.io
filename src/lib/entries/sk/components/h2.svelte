<script>
    // This component will receive any attributes passed to the h2 tag
    let { level = 2, id, className, children } = $props();
  </script>
  
  <h2
    class="custom-heading {className}"
    {id}
    data-level={level}
  >
    {@render children()}
  </h2>
  
  <style>
    .custom-heading {
      font-size: 6.5rem;
    }
  </style>