import url from 'node:url'

const isUrl = (url) => url instanceof URL
const isFileUrl = (url) => isUrl(url) && url.protocol === 'file:'

const NONE_FILE_URL_ERROR_MESSAGE = 'Only `file:` URLs are supported.'
const FILE_PATH_INVALID_ERROR_MESSAGE = 'File path should be a string or URL.'

function verify(urlOrPath) {
  if (isUrl(urlOrPath)) {
    if (!isFileUrl(urlOrPath)) {
      throw new TypeError(NONE_FILE_URL_ERROR_MESSAGE)
    }

    return true
  }

  if (typeof urlOrPath !== 'string') {
    throw new TypeError(FILE_PATH_INVALID_ERROR_MESSAGE)
  }

  return true
}

function toPath(urlOrPath) {
  verify(urlOrPath)

  return isFileUrl(urlOrPath) ? url.fileURLToPath(urlOrPath) : urlOrPath
}

function toUrl(urlOrPath) {
  verify(urlOrPath)

  return isFileUrl(urlOrPath) ? urlOrPath : url.pathToFileURL(urlOrPath)
}

export {toUrl, toUrl as toURL, toPath}
