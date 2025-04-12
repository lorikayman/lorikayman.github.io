<script>
  // implicity here as
  // when no href given in md syntax for [abc]()
  // lack of link is perceived as a
  // boolean value of href, as it simply is as an
  // attribute with no value - boolean
  let { href, children, ...params } = $props();

  /**
   * Check FQDN of a link weather it is same as current site's
   *
   * @param {String} href
   * @returns {Boolean}
   */
  function isFirstPartyUrl(href) {
    if (href !== true) {
      // check string as hash
      if (href.startsWith("#")) {
        return true;
      }
      // in case of plaintext
      // un-url-able string being passed
      try {
        const hrefObj = new URL(href);
        return window.location.hostname == hrefObj.hostname;
      } catch (err) {
        console.error(
          "[a component]",
          import.meta.url,
          err,
        );
      }
    }
    return false
  }

  // reiterate on href checks,
  // now correcting href itself
  if (!!href) {
    if (
      isFirstPartyUrl(href) && href.startsWith("#")
    ) {
      href =
        window.location.origin +
        window.location.pathname +
        href;
    }
  } else {
    href = false;
  }
</script>

{#snippet errorNoChildrenElements(href)}
  <span class="no-children-elements">
    No visible text provided for link:
    <code>
      {#if href !== true}
        {href}
      {:else}
        [blank]
      {/if}
    </code>
  </span>
{/snippet}

{#if !isFirstPartyUrl(href)}
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
      background-color: ghostwhite;
      color: black;
      font-style: normal;
    }
  }
</style>
