"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var walkSync = require("walk-sync");

var fs = require("fs");

var MdHelper = _adr.default.MdHelper;
var Utils = _adr.default.Utils;
var Config = _adr.default.Config;
var adrTemplate = `# 1. 编写完整的单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议
2017-11-26 已完成
`;
(0, _ava.default)('ADR: export html', t => {
  var renderHtml = `<html>`;
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var dirSpy = sinon.stub(Utils, 'getWorkDir').returns('.');
  var mdHelperSpy = sinon.stub(MdHelper, 'mdRender').returns(renderHtml); // let consoleSpy = sinon.stub(console, 'log')

  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(adrTemplate).onCall(1).returns(adrTemplate).onCall(2).returns('');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: 'README.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);
  var htmlBuilder = new _adr.default.HtmlBuilder('', '');
  var output = htmlBuilder.buildContent();
  t.deepEqual(renderHtml, output);
  ADRGetSavePathSpy.restore();
  fsReadSpy.restore();
  entriesSpy.restore();
  mdHelperSpy.restore();
  dirSpy.restore(); // consoleSpy.restore()
});
//# sourceMappingURL=HtmlBuilder.spec.js.map