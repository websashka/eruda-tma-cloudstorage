# eruda-tma-cloudstorage

[![NPM version][npm-image]][npm-url]
[![License][license-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/eruda-tma-cloudstorage.svg
[npm-url]: https://npmjs.org/package/eruda-tma-cloudstorage
[license-image]: https://img.shields.io/npm/l/eruda-tma-cloudstorage.svg

[Eruda](https://eruda.liriliri.io/) plugin for debug  [Cloud Storage](https://core.telegram.org/bots/webapps#cloudstorage) in Telegram Mini apps.

## Install

```bash
npm install eruda eruda-tma-cloudstorage
```

## Usege
```js
import { CloudStorageDebugger } from 'eruda-tma-cloudstorage';
import eruda from 'eruda';

eruda.init();
eruda.add(CloudStorageDebugger);
```
