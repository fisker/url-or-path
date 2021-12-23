import {fileURLToPath, pathToFileURL} from 'node:url'

const NONE_FILE_URL_ERROR_MESSAGE = 'Only `file:` URLs are supported.'
const FILE_PATH_INVALID_ERROR_MESSAGE = 'File path should be a string or URL.'

const isUrl = (value) => {
  try {
    const {protocol} = new URL(value)
    return !/^[a-z]:$/.test(protocol)
  } catch {}

  return false
}

function toUrl(urlOrPath) {
  let url

  if (isUrl(urlOrPath)) {
    url = urlOrPath instanceof URL ? urlOrPath : new URL(urlOrPath)
  } else if (typeof urlOrPath === 'string') {
    url = pathToFileURL(urlOrPath)
  }

  if (!(url instanceof URL)) {
    throw new TypeError(FILE_PATH_INVALID_ERROR_MESSAGE)
  }

  if (url.protocol !== 'file:') {
    throw new TypeError(NONE_FILE_URL_ERROR_MESSAGE)
  }

  return url
}

function toPath(urlOrPath) {
  return fileURLToPath(toUrl(urlOrPath))
}

export {toUrl, toUrl as toURL, toPath}
