/**
* 
* @param {HTMLElement} element - DOM element to be tested 
*/
export function detectOutOfBounds(element) {
  const elementBoundingBox = element.getBoundingClientRect()
  const outsideHorizontal = elementBoundingBox.left < 0 && elementBoundingBox.right < 0
  return outsideHorizontal
}
