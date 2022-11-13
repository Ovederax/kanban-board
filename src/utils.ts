export const noop = () => {}

export function getLast<T>(array: T[]) {
  if (array.length === 0) {
    return undefined
  }
  return array[array.length - 1]
}
