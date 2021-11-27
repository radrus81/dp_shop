export default function isObject(o) {
  return o instanceof Object && o.constructor === Object;
}
