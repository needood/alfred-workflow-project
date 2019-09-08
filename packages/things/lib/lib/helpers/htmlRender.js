"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlRender = htmlRender;

var fs = require("fs");

var path = require("path");

function htmlRender(tocHtml, contentHtml) {
  var template = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'templates', '/export_template.html'), 'utf-8');
  return template.replace('${tocHtml}', tocHtml).replace('${contentHtml}', contentHtml);
}
//# sourceMappingURL=htmlRender.js.map