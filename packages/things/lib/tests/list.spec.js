"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var walkSync = require("walk-sync");

var colors = require("colors/safe");

var Utils = _adr.default.Utils;
var Config = _adr.default.Config;
var adrTemplate = `# 1. 编写单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议

2017-11-26 已完成
`;
var adrOptions = JSON.stringify({
  path: './',
  language: 'zh-cn'
});
(0, _ava.default)('ADR: list', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var i18nSpy = sinon.stub(Utils, 'getI18n').returns({
    decision: '决策',
    modifiedDate: '上次修改时间',
    lastStatus: '最后状态',
    logSavePath: '保存路径：'
  });
  var consoleSpy = sinon.stub(console, 'log');
  var fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(adrTemplate).onCall(1).returns(adrTemplate).onCall(2).returns(JSON.stringify(adrOptions)).onCall(3).returns(JSON.stringify(adrOptions));
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '0001-filename.md',
    basePath: '/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);

  var results = _adr.default.list();

  t.deepEqual(results, `╔════════════════╤══════════════╤═══════════════════╗
║ 决策           │ 上次修改时间 │ 最后状态          ║
╟────────────────┼──────────────┼───────────────────╢
║ 1.编写单元测试 │ 2017-11-23   │ ${colors['green']('2017-11-26 已完成')} ║
╚════════════════╧══════════════╧═══════════════════╝
`);
  ADRGetSavePathSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
  fsReadSpy.restore();
  i18nSpy.restore();
});
//# sourceMappingURL=list.spec.js.map