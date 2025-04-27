import * as path from 'node:path'
import * as url from 'node:url'

const URL_STRING_PREFIX = 'file:'

/**
@typedef {typeof URL_STRING_PREFIX} UrlStringPrefix
@typedef {`${UrlStringPrefix}${string}`} UrlString
@typedef {URL | UrlString} UrlOrUrlString
@typedef {URL | string} UrlOrPath
*/

/** @type {(value: unknown) => value is URL} */
const isUrlInstance = (value) => value instanceof URL
/** @type {(value: unknown) => value is UrlString} */
const isUrlString = (value) =>
  typeof value === 'string' && value.startsWith(URL_STRING_PREFIX)
/** @type {(urlOrPath: unknown) => urlOrPath is UrlOrUrlString} */
const isUrl = (urlOrPath) => isUrlInstance(urlOrPath) || isUrlString(urlOrPath)

/** @type {(urlOrPath: UrlOrPath) => URL} */
const toUrl = (urlOrPath) => {
  if (isUrlInstance(urlOrPath)) {
    return urlOrPath
  }

  if (isUrlString(urlOrPath)) {
    return new URL(urlOrPath)
  }

  return url.pathToFileURL(urlOrPath)
}

/** @type {(urlOrPath: UrlOrPath) => string} */
const toPath = (urlOrPath) =>
  isUrl(urlOrPath) ? url.fileURLToPath(urlOrPath) : urlOrPath

/** @type {(urlOrPath: UrlOrPath) => string} */
const toAbsolutePath = (urlOrPath) =>
  path.resolve(isUrl(urlOrPath) ? url.fileURLToPath(urlOrPath) : urlOrPath)

/** @type {(url: URL) => URL} */
const addSlash = (url) =>
  url.href.endsWith('/') ? url : new URL(`${url.href}/`)

/** @type {(urlOrPath: UrlOrPath) => URL} */
const toDirectory = (urlOrPath) => addSlash(toUrl(urlOrPath))

export {
  isUrl as isURL,
  isUrl,
  isUrlInstance as isURLInstance,
  isUrlInstance,
  isUrlString as isURLString,
  isUrlString,
  toAbsolutePath,
  toDirectory,
  toPath,
  toUrl as toURL,
  toUrl,
}
