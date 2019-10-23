const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, kye) {
  return hasOwnProperty.call(obj, key)
}
