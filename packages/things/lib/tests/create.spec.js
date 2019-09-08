"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var mkdirp = require("mkdirp");

var walkSync = require("walk-sync");

var Config = _adr.default.Config;
var adrTemplate = `# {NUMBER}. {TITLE}

日期: {DATE}

## 状态

列表：提议/通过/完成/已弃用/已取代

{DATE} 提议`;
var adrOptions = JSON.stringify({
  path: './',
  language: 'en'
});
(0, _ava.default)('ADR: create', t => {
  var consoleSpy = sinon.stub(console, 'log');
  var mkdirpSync = sinon.stub(mkdirp, 'sync');
  var generateSpy = sinon.stub(_adr.default, 'generate');
  var fsWriteSyncSpy = sinon.stub(fs, 'writeFileSync');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: './',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);
  var fsExistSpy = sinon.stub(fs, 'existsSync').returns(true);
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(JSON.stringify(adrOptions)).onCall(1).returns(JSON.stringify(adrOptions)).onCall(2).returns(JSON.stringify(adrOptions)).onCall(3).returns(JSON.stringify(adrOptions)).onCall(4).returns(JSON.stringify(adrOptions)).onCall(5).returns(adrTemplate);
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');

  _adr.default.create('create'); // create


  t.deepEqual(fsWriteSyncSpy.calledWith('./0002-create.md'), true); // TOC

  t.deepEqual(fsWriteSyncSpy.calledWith('./README.md'), true);
  t.deepEqual(mkdirpSync.callCount, 1);
  fsWriteSyncSpy.restore();
  ADRGetSavePathSpy.restore();
  fsExistSpy.restore();
  fsReadSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
  generateSpy.restore();
  mkdirpSync.restore();
});
//# sourceMappingURL=create.spec.js.map