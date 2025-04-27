import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import test from 'ava'
import * as urlOrPath from './index.js'

const fileUrl = new URL(import.meta.url)
const fileUrlString = import.meta.url
const filePath = url.fileURLToPath(fileUrl)

const inputs = [fileUrl, fileUrlString, filePath]

test('Should accept both URL, url and path string', (t) => {
  for (const value of inputs) {
    t.is(urlOrPath.toPath(value), filePath)
    t.is(urlOrPath.toAbsolutePath(value), filePath)
    t.deepEqual(urlOrPath.toUrl(value), fileUrl)
  }

  t.is(urlOrPath.toUrl(fileUrl), fileUrl)
})

test('Should reject invalid input', (t) => {
  t.throws(() => urlOrPath.toPath(new URL('https://example.com')))

  for (const url of [
    100,
    new URLSearchParams(),
    'https://example.com/',
    'https://example.com',
  ]) {
    t.is(urlOrPath.toPath(url), url)
  }

  t.throws(() => urlOrPath.toUrl(100))
  t.throws(() => urlOrPath.toUrl(new URLSearchParams()))

  for (const url of [
    new URL('https://example.com'),
    'https://example.com/',
    'https://example.com',
  ]) {
    t.true(urlOrPath.toUrl(url) instanceof URL)
  }
})

test('toDirectory()', (t) => {
  const cwdLength = url.pathToFileURL(process.cwd()).href.length

  const directories = [
    'foo',
    'foo/',
    'foo///',
    path.resolve('foo'),
    ...[
      new URL('./foo', import.meta.url),
      new URL('./foo/', import.meta.url),
      new URL('./foo\\', import.meta.url),
      url.pathToFileURL(path.resolve('foo')),
    ].flatMap((url) => [url, url.href]),
  ]

  if (path.sep === '\\') {
    directories.push('foo\\')
  }

  for (const directory of directories) {
    t.is(
      urlOrPath.toDirectory(directory).href.slice(cwdLength),
      '/foo/',
      `Unexpected URL for '${directory}'`,
    )
  }
})

test('utils', (t) => {
  t.is(urlOrPath.isUrl(new URL('file:///path/to/url')), true)
  t.is(urlOrPath.isUrl('file:///path/to/url'), true)
  t.is(urlOrPath.isUrl('file:/path/to/url'), true)
  t.is(urlOrPath.isUrl(''), false)
  t.is(urlOrPath.isUrl(0), false)

  t.is(urlOrPath.isUrlInstance(new URL('file:///path/to/url')), true)
  t.is(urlOrPath.isUrlInstance('file:///path/to/url'), false)
  t.is(urlOrPath.isUrlInstance('file:/path/to/url'), false)
  t.is(urlOrPath.isUrlInstance(''), false)
  t.is(urlOrPath.isUrlInstance(0), false)

  t.is(urlOrPath.isUrlString(new URL('file:///path/to/url')), false)
  t.is(urlOrPath.isUrlString('file:///path/to/url'), true)
  t.is(urlOrPath.isUrlString('file:/path/to/url'), true)
  t.is(urlOrPath.isUrlString(''), false)
  t.is(urlOrPath.isUrlString(0), false)
})

test('exports', (t) => {
  t.is(urlOrPath.isURL, urlOrPath.isUrl)
  t.is(urlOrPath.isURLInstance, urlOrPath.isUrlInstance)
  t.is(urlOrPath.isURLString, urlOrPath.isUrlString)
  t.is(urlOrPath.toURL, urlOrPath.toUrl)
})
