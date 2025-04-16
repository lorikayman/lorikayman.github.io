/***
 * @module self_destructing_store
 *
 *
 */

import { writable } from 'svelte/store'

/**
 * @param {any} initialValue
 * @param {Function} destroyCondition
 *
 * @returns {typeof writable}
 */
export function createSelfDestructingStore (
  initialValue,
  destroyCondition
) {
  let active = true
  const {
    subscribe,
    set: writableSet,
    update: writableUpdate
  } = writable(initialValue)

  /**
   * @see {writable.set}
   * @param {any} value
   */
  function set (value) {
    if (!active) return
    writableSet(value)
    if (destroyCondition(value)) {
      active = false
      writableSet(undefined)
    }
  }

  /**
   * @see {writable.update}
   * @param {Function} updater
   */
  function update (updater) {
    if (!active) return
    writableUpdate((currentValue) => {
      const updatedValue = updater(currentValue)
      if (destroyCondition(updatedValue)) {
        active = false
        writableSet(undefined)
      }
      return updatedValue
    })
  }

  /**
   * @see {createSelfDestructingStore}
   * @param {any} stateSetFunction
   * @param {Function} conditionStop
   *
   * @returns {Function}
   */
  function customSubscribe (
    stateSetFunction,
    conditionStop
  ) {
    return subscribe((value) => {
      if (active) stateSetFunction(value)
    }, conditionStop)
  }

  return { set, update, subscribe: customSubscribe }
}
