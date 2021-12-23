import url from 'node:url'
import path from 'node:path'
import test from 'ava'
import {toUrl, toPath} from './index.js'

const fileUrl = new URL(import.meta.url)
const fileUrlString = import.meta.url
const filePath = url.fileURLToPath(fileUrl)

test('Should accept both URL, url and path string', (t) => {
  t.is(toPath(filePath), filePath)
  t.is(toPath(fileUrl), filePath)
  t.is(toPath(fileUrlString), filePath)

  t.is(toUrl(fileUrl), fileUrl)
  t.deepEqual(toUrl(fileUrlString), fileUrl)
  t.deepEqual(toUrl(filePath), fileUrl)
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
  t.throws(() => toPath('https://example.com/'), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })
  t.throws(() => toPath('https://example.com'), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })

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
  t.throws(() => toUrl('https://example.com/'), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })
  t.throws(() => toUrl('https://example.com'), {
    instanceOf: TypeError,
    message: 'Only `file:` URLs are supported.',
  })
})
