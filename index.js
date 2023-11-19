import {fileURLToPath, pathToFileURL} from 'node:url'

/** @typedef {URL | string} UrlOrPath */

/** @type {(value: unknown) => value is URL} */
const isUrlInstance = (value) => value instanceof URL
/** @type {(value: unknown) => value is string} */
const isUrlString = (value) =>
  typeof value === 'string' && value.startsWith('file://')
/** @type {(urlOrPath: unknown) => urlOrPath is UrlOrPath} */
const isUrl = (urlOrPath) => isUrlInstance(urlOrPath) || isUrlString(urlOrPath)

/** @type {(urlOrPath: UrlOrPath) => URL} */
const toUrl = (urlOrPath) => {
  if (isUrlInstance(urlOrPath)) {
    return urlOrPath
  }

  if (isUrlString(urlOrPath)) {
    return new URL(urlOrPath)
  }

  return pathToFileURL(urlOrPath)
}

/** @type {(urlOrPath: UrlOrPath) => string} */
const toPath = (urlOrPath) =>
  isUrl(urlOrPath) ? fileURLToPath(urlOrPath) : urlOrPath

/** @type {(url: URL) => URL} */
const addSlash = (url) =>
  url.href.endsWith('/') ? url : new URL(`${url.href}/`)

/** @type {(urlOrPath: UrlOrPath) => URL} */
const toDirectory = (urlOrPath) => addSlash(toUrl(urlOrPath))

export {
  isUrl,
  isUrl as isURL,
  isUrlInstance,
  isUrlInstance as isURLInstance,
  isUrlString,
  isUrlString as isURLString,
  toUrl,
  toUrl as toURL,
  toPath,
  toDirectory,
}
