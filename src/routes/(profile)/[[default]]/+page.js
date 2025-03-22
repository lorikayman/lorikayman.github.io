/**
 * @param {{default: String}} params
 *  Parameters of to-be-loaded page
 *    - `default` is derived from route slug
 *      folder name and contains current route
 */
export async function load({ params }) {
  // fallback to about page and latter component
  let tab = params.default ?? "about";
  let component = null;
  switch (tab) {
    case "about":
      component = (await import("$lib/components/profile/about.mdx")).default;
      break;
    case "company":
      component = (await import("$lib/components/profile/company.mdx")).default;
      break;
  }
  return {
    tab: tab,
    component: component,
  };
}

export function entries() {
  return [
    { tab: "about" },
    { tab: "company" },
    // { tab: "projects" },
    // { tab: "gateway" },
  ];
}

export const prerender = true;
export const trailingSlash = "never";
