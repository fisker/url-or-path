import url from 'node:url'
import path from 'node:path'
import test from 'ava'
import {toUrl, toPath} from './index.js'

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
  t.throws(() => toPath(100), {
    instanceOf: TypeError,
    message: 'File path should be a string or URL.',
  })
  t.throws(() => toPath(new URLSearchParams()), {
    instanceOf: TypeError,
    message: 'File path should be a string or URL.',
  })
  t.throws(() => toPath(new URL('https://example.com')), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })

  for (const url of ['https://example.com/', 'https://example.com']) {
    t.is(toPath(url), url)
  }

  t.throws(() => toUrl(100), {
    instanceOf: TypeError,
    message: 'File path should be a string or URL.',
  })
  t.throws(() => toUrl(new URLSearchParams()), {
    instanceOf: TypeError,
    message: 'File path should be a string or URL.',
  })
  t.throws(() => toUrl(new URL('https://example.com')), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })

  for (const url of ['https://example.com/', 'https://example.com']) {
    t.true(toUrl(url) instanceof URL)
  }
})
