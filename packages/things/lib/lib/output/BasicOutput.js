"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class BasicOutput {
  constructor(path, workDir) {
    (0, _defineProperty2.default)(this, "result", void 0);
    (0, _defineProperty2.default)(this, "path", void 0);
    (0, _defineProperty2.default)(this, "workDir", void 0);
    this.workDir = workDir;
    this.path = path;
  }

  buildContent() {
    return this.result;
  }

  output() {
    return;
  }

}

var _default = BasicOutput;
exports.default = _default;
//# sourceMappingURL=BasicOutput.js.map