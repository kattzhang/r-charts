/* eslint-disable import/prefer-default-export */

const { hasOwnProperty } = Object.prototype;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
