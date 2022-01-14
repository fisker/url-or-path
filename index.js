import {fileURLToPath, pathToFileURL} from 'node:url'

const FILE_PATH_INVALID_ERROR_MESSAGE = 'File path should be a string or URL.'
const NONE_FILE_URL_ERROR_MESSAGE = "Only 'file:' URLs are supported."
const FILE_PROTOCOL = 'file:'
const isString = (value) => typeof value === 'string'
const isStringStartsWithFileProtocol = (string) =>
  string.startsWith(FILE_PROTOCOL)

function assertFileUrl(url) {
  if (!(url instanceof URL)) {
    throw new TypeError(FILE_PATH_INVALID_ERROR_MESSAGE)
  }

  if (url.protocol !== FILE_PROTOCOL) {
    throw new TypeError(NONE_FILE_URL_ERROR_MESSAGE)
  }
}

function toUrl(urlOrPath) {
  if (isString(urlOrPath)) {
    return isStringStartsWithFileProtocol(urlOrPath)
      ? new URL(urlOrPath)
      : pathToFileURL(urlOrPath)
  }

  assertFileUrl(urlOrPath)

  return urlOrPath
}

function toPath(urlOrPath) {
  if (isString(urlOrPath)) {
    return isStringStartsWithFileProtocol(urlOrPath)
      ? fileURLToPath(urlOrPath)
      : urlOrPath
  }

  assertFileUrl(urlOrPath)

  return fileURLToPath(urlOrPath)
}

export {toUrl, toUrl as toURL, toPath}
