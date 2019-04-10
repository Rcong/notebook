'use strict';

import(
/* webpackChunkName: "demo" */
'demo.js').then(function (chunkJs) {
  console.info(chunkJs);
});