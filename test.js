import url from 'node:url'
import path from 'node:path'
import process from 'node:process'
import test from 'ava'
import {toUrl, toURL, toPath, toDirectory} from './index.js'

const fileUrl = new URL(import.meta.url)
const fileUrlString = import.meta.url
const filePath = url.fileURLToPath(fileUrl)

const inputs = [fileUrl, fileUrlString, filePath]

test('Should accept both URL, url and path string', (t) => {
  for (const urlOrPath of inputs) {
    t.is(toPath(urlOrPath), filePath)
    t.deepEqual(toUrl(urlOrPath), fileUrl)
  }

  t.is(toUrl(fileUrl), fileUrl)
})

test('Should reject invalid input', (t) => {
  t.throws(() => toPath(new URL('https://example.com')))

  for (const url of [
    100,
    new URLSearchParams(),
    'https://example.com/',
    'https://example.com',
  ]) {
    t.is(toPath(url), url)
  }

  t.throws(() => toUrl(100))
  t.throws(() => toUrl(new URLSearchParams()))

  for (const url of [
    new URL('https://example.com'),
    'https://example.com/',
    'https://example.com',
  ]) {
    t.true(toUrl(url) instanceof URL)
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
      toDirectory(directory).href.slice(cwdLength),
      '/foo/',
      `Unexpected URL for '${directory}'`,
    )
  }
})

test('exports', (t) => {
  t.is(toURL, toUrl)
})
