"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var walkSync = require("walk-sync");

var Config = _adr.default.Config;
(0, _ava.default)('ADR: generate graph', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var consoleSpy = sinon.stub(console, 'log');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: '002-编写完整的单元测试.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: 'README.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);

  var results = _adr.default.generate('graph');

  console.log(results);
  t.deepEqual(results, `digraph {
  node [shape=plaintext];
  _1 [label="1.编写完整的单元测试"; URL="001-编写完整的单元测试.md"]
  _2 [label="2.编写完整的单元测试"; URL="002-编写完整的单元测试.md"]
  _1 -> _2 [style="dotted"];
}
`);
  consoleSpy.restore();
  ADRGetSavePathSpy.restore();
  entriesSpy.restore();
});
(0, _ava.default)('ADR: generate toc', t => {
  var ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./');
  var consoleSpy = sinon.stub(console, 'log');
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: '002-编写完整的单元测试.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }, {
    relativePath: 'README.md',
    basePath: '/test',
    mode: 33188,
    size: 246,
    mtime: 1511435254653
  }]);

  var results = _adr.default.generate('toc');

  console.log(results);
  t.deepEqual(results, `# 架构决策记录

* [1. 编写完整的单元测试](001-编写完整的单元测试.md)
* [2. 编写完整的单元测试](002-编写完整的单元测试.md)`);
  consoleSpy.restore();
  ADRGetSavePathSpy.restore();
  entriesSpy.restore();
});
(0, _ava.default)('ADR: generate error', t => {
  var consoleSpy = sinon.stub(console, 'log');

  _adr.default.generate('others');

  t.deepEqual(consoleSpy.called, true);
  consoleSpy.restore();
});
//# sourceMappingURL=generate.spec.js.map