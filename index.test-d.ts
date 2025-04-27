import * as url from 'node:url'
import {expectType} from 'tsd'
import {
  isUrl,
  isUrlInstance,
  isUrlString,
  toUrl,
  toAbsolutePath,
  toPath,
  toDirectory,
} from './index.js'

expectType<boolean>(isUrl(undefined))
expectType<boolean>(isUrl('/path/to/file'))
expectType<boolean>(isUrl(url.pathToFileURL('/path/to/file')))
expectType<boolean>(isUrl(url.pathToFileURL('/path/to/file').href))

expectType<boolean>(isUrlInstance(undefined))
expectType<boolean>(isUrlInstance('/path/to/file'))
expectType<boolean>(isUrlInstance(url.pathToFileURL('/path/to/file')))
expectType<boolean>(isUrlInstance(url.pathToFileURL('/path/to/file').href))

expectType<boolean>(isUrlString(undefined))
expectType<boolean>(isUrlString('/path/to/file'))
expectType<boolean>(isUrlString(url.pathToFileURL('/path/to/file')))
expectType<boolean>(isUrlString(url.pathToFileURL('/path/to/file').href))

expectType<URL>(toUrl('/path/to/file'))
expectType<URL>(toUrl(url.pathToFileURL('/path/to/file')))
expectType<URL>(toUrl(url.pathToFileURL('/path/to/file').href))

expectType<string>(toPath('/path/to/file'))
expectType<string>(toPath(url.pathToFileURL('/path/to/file')))
expectType<string>(toPath(url.pathToFileURL('/path/to/file').href))

expectType<string>(toAbsolutePath('/path/to/file'))
expectType<string>(toAbsolutePath(url.pathToFileURL('/path/to/file')))
expectType<string>(toAbsolutePath(url.pathToFileURL('/path/to/file').href))

expectType<URL>(toDirectory('/path/to/file'))
expectType<URL>(toDirectory(url.pathToFileURL('/path/to/file')))
expectType<URL>(toDirectory(url.pathToFileURL('/path/to/file').href))
