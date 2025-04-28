import * as path from 'node:path'
import * as url from 'node:url'

const URL_STRING_PREFIX = 'file:'

/**
@typedef {typeof URL_STRING_PREFIX} UrlStringPrefix
@typedef {`${UrlStringPrefix}${string}`} UrlString
@typedef {URL | UrlString} UrlOrUrlString
@typedef {URL | string} UrlOrPath
@typedef {UrlOrPath | undefined} OptionalUrlOrPath
*/

/** @type {(value: unknown) => value is URL} */
const isUrlInstance = (value) => value instanceof URL
/** @type {(value: unknown) => value is UrlString} */
const isUrlString = (value) =>
  typeof value === 'string' && value.startsWith(URL_STRING_PREFIX)
/** @type {(urlOrPath: unknown) => urlOrPath is UrlOrUrlString} */
const isUrl = (urlOrPath) => isUrlInstance(urlOrPath) || isUrlString(urlOrPath)

/**
@template {OptionalUrlOrPath} [Input = UrlOrPath]
@param {Input} urlOrPath
@returns {(Input extends UrlOrPath ? URL : Input)}
*/
const toUrl = (urlOrPath) =>
  isUrlInstance(urlOrPath)
    ? urlOrPath
    : isUrlString(urlOrPath)
      ? new URL(urlOrPath)
      : urlOrPath
        ? url.pathToFileURL(urlOrPath)
        : urlOrPath

/**
@template {OptionalUrlOrPath} [Input = UrlOrPath]
@param {Input} urlOrPath
@returns {(Input extends UrlOrPath ? string : Input)}
*/
const toPath = (urlOrPath) =>
  isUrl(urlOrPath) ? url.fileURLToPath(urlOrPath) : urlOrPath

/**
@template {OptionalUrlOrPath} [Input = UrlOrPath]
@param {Input} urlOrPath
@returns {(Input extends UrlOrPath ? string : Input)}
*/
const toAbsolutePath = (urlOrPath) =>
  isUrl(urlOrPath)
    ? url.fileURLToPath(urlOrPath)
    : urlOrPath
      ? path.resolve(urlOrPath)
      : urlOrPath

const addSlash = (url) =>
  url && !url.href.endsWith('/') ? new URL(`${url.href}/`) : url

/**
@template {OptionalUrlOrPath} [Input = UrlOrPath]
@param {Input} urlOrPath
@returns {(Input extends UrlOrPath ? URL : Input)}
*/
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
