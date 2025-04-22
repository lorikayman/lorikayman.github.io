/**
 * @module delay
 * helper async functions
 */

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

export {
  delay
}
