<script>
  // implicitly here as
  // when no href given in md syntax for [abc]()
  // lack of link is perceived as a
  // boolean value of href, as it simply is as an
  // attribute with no value - boolean
  let { href, children, ...params } = $props()

  const isChrome =
    navigator.userAgent.indexOf('Chrome') > 0
  // delay in ms
  // since other concurrent scrolls are instant,
  // due to href/onclick logic, setting delay to 1 still works in chrome
  const SCROLL_DELAY = 0
  /**
   * Helper delay function
   *
   * @param ms delay in ms
   */
  function delay (ms) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    )
  }

  /**
   * Check FQDN of a link weather it is same as current site's
   *
   * @param {String} href
   * @returns {Boolean}
   */
  function isFirstPartyUrl (href) {
    if (href !== true) {
      // check string as hash
      if (href.startsWith('#')) {
        return true
      }
      // in case of plaintext
      // un-url-able string being passed
      try {
        const hrefObj = new URL(href)
        return window.location.hostname == hrefObj.hostname
      } catch (err) {
        console.error(
          '[a component]',
          import.meta.url,
          err
        )
      }
    }
    return false
  }

  /**
   * Scroll to active toc element
   * As it is a link, the click happens
   * before an actual traversal,
   * so need to compute a selected
   * element to scroll to
   *
   * @param {String} hash
   */
  async function scrollTocToActive (hash) {
    console.log(hash)
    if (!hash) {
      console.error('No selectable hash provided')
      return
    }
    const dataId = hash.substring(1)
    const entry = document.querySelector(
      `.toc a[data-id="${dataId}"]`
    )
    if (!entry) {
      console.error(
        'No selected element in DOM was found for hash:',
        hash
      )
      return
    }
    if (isChrome) await delay(SCROLL_DELAY)
    entry.scrollIntoView({
      behavior: 'smooth',
      block: isChrome ? 'start' : 'center'
    })
  }

  let hrefHash

  // reiterate on href checks,
  // now correcting href itself
  if (href) {
    if (isFirstPartyUrl(href) && href.startsWith('#')) {
      hrefHash = href
      href =
        window.location.origin +
        window.location.pathname +
        href
    }
  } else {
    href = false
  }
</script>

{#snippet errorNoChildrenElements()}
  <span class="no-children-elements">
    No text is provided for link:
  </span>
{/snippet}

{#snippet slotChecker(children, href)}
  {#if children && href !== true}
    {@render children()}
  {:else}
    {#if children}
      {@render children()}
    {:else}
      {@render errorNoChildrenElements()}
    {/if}

    <code class="no-children-elements">
      {#if href !== true}
        {href}
      {:else}
        => [blank]
      {/if}
    </code>
  {/if}
{/snippet}

{#if !isFirstPartyUrl(href)}
  <a {href} target="_blank" rel="noopener noreferrer">
    {@render slotChecker(children, href)}
  </a>
{:else}
  <a {href} onclick={scrollTocToActive(hrefHash)}>
    {@render slotChecker(children, href)}
  </a>
{/if}

<style>
  /* error template in case of component failure */
  span.no-children-elements {
    color: black;
    background-color: crimson;
  }

  code.no-children-elements {
    /* background-color: ghostwhite; */
    background-color: crimson;
    color: black;
    font-style: normal;
  }
</style>
