import {fileURLToPath, pathToFileURL} from 'node:url'

const NONE_FILE_URL_ERROR_MESSAGE = 'Only `file:` URLs are supported.'
const FILE_PATH_INVALID_ERROR_MESSAGE = 'File path should be a string or URL.'

function verify(url) {
  if (!(url instanceof URL)) {
    throw new TypeError(FILE_PATH_INVALID_ERROR_MESSAGE)
  }

  if (url.protocol !== 'file:') {
    throw new TypeError(NONE_FILE_URL_ERROR_MESSAGE)
  }

  return true
}

function toUrlObject(urlOrPath) {
  if (typeof urlOrPath === 'string') {
    if (urlOrPath.startsWith('file:')) {
      try {
        return new URL(urlOrPath)
      } catch {}
    }

    return pathToFileURL(urlOrPath)
  }

  return urlOrPath
}

function toPath(urlOrPath) {
  const url = toUrlObject(urlOrPath)
  verify(url)

  return fileURLToPath(url)
}

function toUrl(urlOrPath) {
  const url = toUrlObject(urlOrPath)
  verify(url)
  return url
}

export {toUrl, toUrl as toURL, toPath}
