
import { derived, writable } from "svelte/store";

import Error404 from "$lib/components/error.404.svelte"
import Error403 from "$lib/components/error.403.svelte"

export const nextPageName = writable();
export const currentPageName = writable();
export const doesPageDiffer = derived(
  [currentPageName, nextPageName],
  ($values, set) => {
      set($values[0] !== $values[1])
  }
)

/**
 * Dynamically import an existing md componet (bundled)
 * TODO: search file path by file name from given entry locally? 
 * 
 * @param {String} componentName 
 */
export async function fetchComponent (componentName) {
  let EntryComponent = null;
  let error = undefined;
  try {
    switch (componentName) {
      case 'index':
        EntryComponent = (await import('$lib/sixth-chamber/doc/maelstrom_encyclopedia.md')).default;
        break;
      case 'maelstrom_encyclopedia':
        EntryComponent = (await import('$lib/sixth-chamber/doc/maelstrom_encyclopedia.md')).default;
        break;
      case 'gap_ammunition':
        EntryComponent = (await import('$lib/sixth-chamber/doc/7_mcpt/technology/firearms/gap_ammunition.md')).default;
        break;
      case 'superimposition_event':
        EntryComponent = (await import('$lib/sixth-chamber/doc/6_eudas/sciences/narraphysics/superimposition_event.md')).default;
        break;
      case 'paraexhumed':
        EntryComponent = (await import('$lib/sixth-chamber/doc/6_eudas/nature/fauna/paraexhumed.md')).default;
        break;
      case 'revenant':
        EntryComponent = (await import('$lib/sixth-chamber/doc/6_eudas/nature/fauna/revenant.md')).default;
        break;
      case 'unbound':
        EntryComponent = (await import('$lib/sixth-chamber/doc/6_eudas/nature/fauna/unbound.md')).default;
        break;
      case 'altered_field_presence':
        EntryComponent = (await import('$lib/sixth-chamber/doc/5_surf/narraphysics/altered_field_presence.md')).default;
        break;
      case 'narraphysic_isolation_environment':
        EntryComponent = (await import('$lib/sixth-chamber/doc/5_surf/narraphysics/narraphysic_isolation_environment.md')).default;
        break;
      case 'narraphysic_realm':
        EntryComponent = (await import('$lib/sixth-chamber/doc/5_surf/narraphysics/narraphysic_realm.md')).default;
        break;
      case 'narrative':
        EntryComponent = (await import('$lib/sixth-chamber/doc/5_surf/narraphysics/narrative.md')).default;
        break;
      case 'retroactive_refractory_feedback_loop':
        EntryComponent = (await import('$lib/sixth-chamber/doc/5_surf/narraphysics/retroactive_refractory_feedback_loop.md')).default;
        break;
      case 'accursed_framework':
        EntryComponent = (await import('$lib/sixth-chamber/doc/3_sfc/sciences/metaphysics/accursed_framework.md')).default;
        break;
      case 'conceptual_configuration':
        EntryComponent = (await import('$lib/sixth-chamber/doc/3_sfc/sciences/metaphysics/conceptual_configuration.md')).default;
        break;
      case 'death_drive':
        EntryComponent = (await import('$lib/sixth-chamber/doc/3_sfc/sciences/metaphysics/death_drive.md')).default;
        break;
      case 'salt_sarcophaguses':
        EntryComponent = (await import('$lib/sixth-chamber/doc/3_sfc/locations/planets/ekhinill/geographic_objects/salt_sarcophaguses.md')).default;
        break;
      case 'resonance':
        EntryComponent = (await import('$lib/sixth-chamber/doc/2_hfh/sciences/physics/resonance.md')).default;
        break;
      case 'vacuum_ascention':
        EntryComponent = (await import('$lib/sixth-chamber/doc/2_hfh/sciences/physics/vacuum_ascention.md')).default;
        break;
      case 'engine_of_narraphysic_gliding':
        EntryComponent = (await import('$lib/sixth-chamber/doc/1_prdg/technology/engine_of_narraphysic_gliding.md')).default;
        break;
      default:
        EntryComponent = Error403;
        break;
      }
  } catch (e) {
    console.error(e);
    EntryComponent = Error404;
    error = e;
  }

  nextPageName.set(componentName.replace(/\_/g," ").split(' ')[0].toUpperCase());
  return {
    componentName,
    entryComponent: EntryComponent,
    error,
  }
}
