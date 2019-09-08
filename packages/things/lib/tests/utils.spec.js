"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.includes");

var _ava = _interopRequireDefault(require("ava"));

var _adr = _interopRequireDefault(require("adr"));

var sinon = require("sinon");

var fs = require("fs");

var walkSync = require("walk-sync");

var LRU = require("lru-cache");

var Utils = _adr.default.Utils;
var Config = _adr.default.Config;
(0, _ava.default)('generateFileName: test for Chinese utf-8', t => {
  var str = Utils.generateFileName('你無可奈何asd fsadf');
  t.deepEqual(str, '你無可奈何asd-fsadf');
});
(0, _ava.default)('generateFileName: test for newline', t => {
  var str = Utils.generateFileName('adr new fdsa \n ADR');
  t.deepEqual(str, 'adr-new-fdsa-adr');
});
(0, _ava.default)('getSavePath: when no exist config file', t => {
  var fsExistSpy = sinon.stub(fs, 'existsSync').returns(false);
  var fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some'
  }));
  var dir = Config.getSavePath();
  t.deepEqual(dir.includes('docs/adr/'), true);
  fsExistSpy.restore();
  fsReadSpy.restore();
});
(0, _ava.default)('getSavePath: when exist config file', t => {
  var fsExistSpy = sinon.stub(fs, 'existsSync').returns(true);
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some-path'
  });
  var fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some-path'
  }));
  var dir = Config.getSavePath();
  t.deepEqual(dir.indexOf('some-path') !== -1, true);
  fsExistSpy.restore();
  fsReadSpy.restore();
  cacheSpy.restore();
});
(0, _ava.default)('createIndexByNumber: should return correct pad', t => {
  var str = Utils.createIndexByNumber(1);
  t.deepEqual(str, '0001');
});
(0, _ava.default)('createIndexByNumber: should return correct pad', t => {
  var str = Utils.createIndexByNumber(11);
  t.deepEqual(str, '0011');
});
(0, _ava.default)('createIndexByNumber: should return correct pad', t => {
  var str = Utils.createIndexByNumber(999);
  t.deepEqual(str, '0999');
});
(0, _ava.default)('getLatestIndex: when exist config file', t => {
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
  var lastNumber = Utils.getLatestIndex();
  t.deepEqual(1, lastNumber);
  entriesSpy.restore();
});
(0, _ava.default)('getNewNumber: when exist last number', t => {
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
  var newIndexString = Utils.getNewIndexString();
  t.deepEqual('0002', newIndexString);
  entriesSpy.restore();
});
(0, _ava.default)('getNewNumber: when exist last number', t => {
  var entriesSpy = sinon.stub(walkSync, 'entries').returns([]);
  var newIndexString = Utils.getNewIndexString();
  t.deepEqual('0001', newIndexString);
  entriesSpy.restore();
});
(0, _ava.default)('getLanguage: should enable get language', t => {
  var fsExistSpy = sinon.stub(fs, 'existsSync').returns(true);
  var cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'test'
  });
  var fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some',
    language: 'test'
  }));
  var language = Config.getLanguage() ? Config.getLanguage() : '';
  if (!language) language = '';
  t.deepEqual(language, 'test');
  fsExistSpy.restore();
  fsReadSpy.restore();
  cacheSpy.restore();
});
(0, _ava.default)('createDateString: should return correct date string', t => {
  var clock = sinon.useFakeTimers(new Date(2099, 0, 1));
  var language = Utils.createDateString();
  t.deepEqual(language, '2099-01-01');
  clock.restore();
});
//# sourceMappingURL=utils.spec.js.map