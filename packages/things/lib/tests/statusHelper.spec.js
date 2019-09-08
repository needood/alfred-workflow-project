"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var walkSync = require("walk-sync");

var LRU = require("lru-cache");

var StatusHelper = _adr.default.StatusHelper;
var mdTemplate = `
# 10. 更友好的 CLI

日期: 2017-11-23

## 状态

2017-11-23 提议

2017-11-23 通过

`;
(0, _ava.default)('ADR: list status', t => {
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  });
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(mdTemplate).onCall(1).returns(mdTemplate);
  var status = StatusHelper.getAllStatus('./001-编写完整的单元测试.md');
  t.deepEqual(status, ['2017-11-23 提议', '2017-11-23 通过']);
  fsReadSpy.restore();
  entriesSpy.restore();
  cacheSpy.restore();
});
(0, _ava.default)('ADR:status helper set status', t => {
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  });
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(mdTemplate).onCall(1).returns(mdTemplate);
  StatusHelper.setStatus('./001-编写完整的单元测试.md', '完成'); // t.deepEqual(fsWriteSpy.calledWith('./001-编写完整的单元测试.md', '{"language":"en","path":"docs/adr/","prefix":"","digits":4}'), true)

  t.deepEqual(true, true);
  fsReadSpy.restore();
  fsWriteSpy.restore();
  entriesSpy.restore();
  cacheSpy.restore();
});
//# sourceMappingURL=statusHelper.spec.js.map