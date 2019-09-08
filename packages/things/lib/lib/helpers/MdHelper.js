"use strict";

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdRender = mdRender;
exports.default = void 0;

var _htmlRender = require("./htmlRender");

var toc = require("markdown-toc");

var Remarkable = require("remarkable");

function mdRender(fileData) {
  var lastH1Index = 0;
  var md = new Remarkable().use(remarkable => {
    remarkable.renderer.rules.heading_open = function (tokens, idx) {
      var content = tokens[idx + 1].content;

      if (tokens[idx].hLevel === 1) {
        lastH1Index = content.split('. ')[0] - 1;
        return '<h' + tokens[idx].hLevel + ' id=' + toc.slugify(content) + '>';
      } else {
        return '<h' + tokens[idx].hLevel + ' id=' + toc.slugify(content + ' ' + lastH1Index) + '>';
      }
    };
  });
  var mdToc = toc(fileData).content;
  var tocHtml = md.render(mdToc);
  var contentHtml = md.render(fileData);
  return (0, _htmlRender.htmlRender)(tocHtml, contentHtml);
}

var MdHelper = {
  mdRender: mdRender
};
var _default = MdHelper;
exports.default = _default;
//# sourceMappingURL=MdHelper.js.map