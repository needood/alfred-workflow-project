"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var walkSync = require("walk-sync");

var LRU = require("lru-cache");

var mdTemplate = `# 1. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议

2017-11-24 讨论

2017-11-25 通过
`;
(0, _ava.default)('ADR: logs', t => {
  var consoleSpy = sinon.stub(console, 'log');
  var renameSpy = sinon.stub(fs, 'renameSync');
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  });
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-DAF编写完整的单元测试.md',
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
  var fsReadSpy = sinon.stub(fs, 'readFileSync');
  fsReadSpy.onCall(0).returns(mdTemplate).onCall(1).returns(mdTemplate);

  var logs = _adr.default.logs('1');

  t.deepEqual(logs, `╔════════════╤══════╗
║  -         │  -   ║
╟────────────┼──────╢
║ 2017-11-23 │ 提议 ║
╟────────────┼──────╢
║ 2017-11-24 │ 讨论 ║
╟────────────┼──────╢
║ 2017-11-25 │ 通过 ║
╚════════════╧══════╝
`);
  fsReadSpy.restore();
  entriesSpy.restore();
  consoleSpy.restore();
  renameSpy.restore();
  cacheSpy.restore();
});
//# sourceMappingURL=logs.spec.js.map