"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

(0, _ava.default)('ADR: init in chinese', t => {
  var cwdSpy = sinon.stub(process, 'cwd').returns('/test');
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');

  _adr.default.init('chinese');

  t.deepEqual(fsWriteSpy.calledOnce, true);
  t.deepEqual(fsWriteSpy.calledWith('/test/.adr.json', '{"language":"zh-cn","path":"docs/adr/","prefix":"","digits":4}'), true);
  cwdSpy.restore();
  fsWriteSpy.restore();
});
(0, _ava.default)('ADR: init en', t => {
  var cwdSpy = sinon.stub(process, 'cwd').returns('/test');
  var fsWriteSpy = sinon.stub(fs, 'writeFileSync');

  _adr.default.init('en');

  t.deepEqual(fsWriteSpy.calledOnce, true);
  t.deepEqual(fsWriteSpy.calledWith('/test/.adr.json', '{"language":"en","path":"docs/adr/","prefix":"","digits":4}'), true);
  cwdSpy.restore();
  fsWriteSpy.restore();
});
//# sourceMappingURL=init.spec.js.map