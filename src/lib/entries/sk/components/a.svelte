<script>
  // implicity here as
  // when no href given in md syntax for [abc]()
  // lack of link is perceived as a
  // boolean value of href, as it simply is as an
  // attribute with no value - boolean
  let { href, children, ...params } = $props();

  let isFirstPartyUrl;
  if (href !== true) {
    if (href.startsWith("#")) {
      href =
        window.location.origin +
        window.location.pathname +
        href;
    }
    // in case of plaintext
    // un-url-able string being passed
    try {
      const hrefObj = new URL(href);

      isFirstPartyUrl =
        window.location.hostname == hrefObj.hostname;
    } catch (err) {
      console.error("[a component]", import.meta.url, err);
    }
  } else {
    href = undefined;
  }
</script>

{#snippet errorNoChildrenElements(href)}
  <span class="no-children-elements">
    No visible text provided for link:
    <code>
      {href}
    </code>
  </span>
{/snippet}

{#if !isFirstPartyUrl}
  <a
    href={href ?? window.location}
    target="_blank"
    rel="noopener noreferrer"
  >
    {#if children}
      {@render children()}
    {:else}
      {@render errorNoChildrenElements(href)}
    {/if}
  </a>
{:else}
  <a {href}>
    {#if children}
      {@render children()}
    {:else}
      {@render errorNoChildrenElements(href)}
    {/if}
  </a>
{/if}

<style>
  /* error template in case of component failure */
  .no-children-elements {
    color: black;
    background-color: crimson;

    & > code {
      background-color: crimson;
      color: black;
    }
  }
</style>
