'use strict';

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}