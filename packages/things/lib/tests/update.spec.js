"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var walkSync = require("walk-sync");

var Config = _adr.default.Config;
var mdTemplate = `# 1. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议
`;
(0, _ava.default)('ADR: init in chinese', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');
  var consoleSpy = sinon.stub(console, 'log');
  var renameSpy = sinon.stub(fs, 'renameSync');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-DAF编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: '0000-tests.md',
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);
  var fsReadSpy = sinon.stub(fs, 'readFileSync');
  fsReadSpy.onCall(0).returns(mdTemplate).onCall(2).returns(mdTemplate).onCall(3).returns('{}').onCall(1).returns(JSON.stringify({
    path: 'some'
  }));

  _adr.default.update();

  t.deepEqual(fsWriteSpy.callCount, 2);
  t.deepEqual(fsReadSpy.callCount, 2);
  t.deepEqual(renameSpy.callCount, 1);
  t.deepEqual(consoleSpy.calledWith('001-DAF编写完整的单元测试.md -> 0001-更友好的-cli.md'), true);
  fsWriteSpy.restore();
  fsReadSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
  renameSpy.restore();
  ADRGetSavePathSpy.restore();
});
//# sourceMappingURL=update.spec.js.map