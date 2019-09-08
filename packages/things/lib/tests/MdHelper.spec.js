"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon"); // let fs = require('fs')


var MdHelper = _adr.default.MdHelper;
(0, _ava.default)('ADR: MdHelper', t => {
  var htmlRenderSpy = sinon.stub(_adr.default, 'htmlRender').returns('');
  var results = MdHelper.mdRender(`
# 10. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议

## 背景

当前的 CLI，不支持默认参数，在显示上不友好

## 决策

添加额外的输入手段

## 后果

在这里记录结果...
`); // let output = fs.readFileSync(__dirname + '/md-helper-test.html', 'utf-8')
  // t.deepEqual(results, output)

  t.deepEqual(true, true);
  t.deepEqual(results.indexOf('在这里记录结果') !== -1, true);
  htmlRenderSpy.restore();
});
//# sourceMappingURL=MdHelper.spec.js.map