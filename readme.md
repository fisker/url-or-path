# url-or-path

> Convert between file URL and path.

## Install

```bash
yarn add url-or-path
```

## Usage

```js
import {toUrl, toPath} from 'url-or-path'

console.log(toUrl(urlOrPath))
//=> URL {/* ... */}

console.log(toPath(urlOrPath))
//=> 'path/to/file'
```

## API

### `toUrl(urlOrPath)`(alias `toURL`)

Type: `string | URL`

Returns a [`URL`](https://nodejs.org/dist/latest-v16.x/docs/api/url.html#url_class_url) object of given URL or path string.

### `toPath(urlOrPath)`

Type: `string | URL`

Returns path string of given URL or path string.
