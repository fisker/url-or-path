export type UrlStringPrefix = typeof URL_STRING_PREFIX
export type UrlString = `${UrlStringPrefix}${string}`
export type UrlOrUrlString = URL | UrlString
export type UrlOrPath = URL | string
/** @type {(urlOrPath: unknown) => urlOrPath is UrlOrUrlString} */
export const isUrl: (urlOrPath: unknown) => urlOrPath is UrlOrUrlString
/**
@typedef {typeof URL_STRING_PREFIX} UrlStringPrefix
@typedef {`${UrlStringPrefix}${string}`} UrlString
@typedef {URL | UrlString} UrlOrUrlString
@typedef {URL | string} UrlOrPath
*/
/** @type {(value: unknown) => value is URL} */
export const isUrlInstance: (value: unknown) => value is URL
/** @type {(value: unknown) => value is UrlString} */
export const isUrlString: (value: unknown) => value is `file:${string}`
/** @type {(urlOrPath: UrlOrPath) => URL} */
export const toUrl: (urlOrPath: UrlOrPath) => URL
/** @type {(urlOrPath: UrlOrPath) => string} */
export const toPath: (urlOrPath: UrlOrPath) => string
/** @type {(urlOrPath: UrlOrPath) => string} */
export const toAbsolutePath: (urlOrPath: UrlOrPath) => string
/** @type {(urlOrPath: UrlOrPath) => URL} */
export const toDirectory: (urlOrPath: UrlOrPath) => URL
declare const URL_STRING_PREFIX: 'file:'
export {
  isUrl as isURL,
  isUrlInstance as isURLInstance,
  isUrlString as isURLString,
  toUrl as toURL,
}
