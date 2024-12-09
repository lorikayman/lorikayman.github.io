<script>
  export let data;
  import { currentPageName } from "$lib/stores/mawanet.loader";

  if (data.error) console.error(data.error);

  $: updateTitle(data.pageName);

  /**
   * Updates documents title reactively
   * 
   * @param {String} pageName Page/entry's file name
   */
  function updateTitle(pageName) {
    let titleStructured = pageName.replace(/\_/g," ");
    let title = titleStructured.charAt(0).toUpperCase() + titleStructured.substr(1).toLowerCase();
    document.title = `${title} // MAWANET`;
  }
  $: currentPageName.set(data.pageName.replace(/\_/g," ").split(' ')[0].toUpperCase());
</script>

<svelte:component this={data.pageComponent}></svelte:component>
