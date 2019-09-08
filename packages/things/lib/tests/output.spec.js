"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var walkSync = require("walk-sync");

var fs = require("fs");

var LRU = require("lru-cache");

var Config = _adr.default.Config;
var adrTemplate = `# 1. 编写完整的单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议
2017-11-26 已完成
`;
var adrOptions = JSON.stringify({
  path: './',
  language: 'en'
});
(0, _ava.default)('ADR: export csv', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var consoleSpy = sinon.stub(console, 'log');
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  });
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(JSON.stringify(adrOptions)).onCall(1).returns(JSON.stringify(adrOptions)).onCall(2).returns(JSON.stringify(adrOptions)).onCall(3).returns(adrTemplate);
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);

  var results = _adr.default.output('csv');

  t.deepEqual(results, `Index, 决策, 上次修改时间, 最后状态
1, 编写完整的单元测试, 2017-11-23, undefined
`); // t.deepEqual(fsWriteSpy.calledWith('./export.csv'), true)

  ADRGetSavePathSpy.restore();
  fsReadSpy.restore();
  fsWriteSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
  cacheSpy.restore();
});
(0, _ava.default)('ADR: export json', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var consoleSpy = sinon.stub(console, 'log');
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(JSON.stringify(adrOptions)).onCall(1).returns(JSON.stringify(adrOptions)).onCall(2).returns(JSON.stringify(adrOptions)).onCall(3).returns(adrTemplate);
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);

  var results = _adr.default.output('json');

  t.deepEqual(results, `[{"index":1,"decision":"编写完整的单元测试","modifiedDate":"2017-11-23"}]`); // t.deepEqual(fsWriteSpy.calledWith('./export.csv'), true)

  ADRGetSavePathSpy.restore();
  fsReadSpy.restore();
  fsWriteSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
});
(0, _ava.default)('ADR: when export error', t => {
  var consoleSpy = sinon.stub(console, 'log');

  _adr.default.output('excel');

  t.deepEqual(consoleSpy.calledWith('\n error: type excel current not supported'), true);
  consoleSpy.restore();
});
//# sourceMappingURL=output.spec.js.map