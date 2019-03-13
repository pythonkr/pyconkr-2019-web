export function isEmpty(a: Object | any[]) {
  if (Array.isArray(a)) return !a.length

  return !Object.keys(a).length
}
