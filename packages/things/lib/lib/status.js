"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = status;

var _utils = _interopRequireDefault(require("./utils"));

var _StatusHelper = _interopRequireDefault(require("./StatusHelper"));

var _Config = _interopRequireDefault(require("./Config"));

var _file = require("./file");

var _print = require("./print");

var inquirer = require("inquirer");

var path = _Config.default.getSavePath();

var i18n = _utils.default.getI18n();

function status(index, _status) {
  var fileName = (0, _file.getAllFilesName)()[index];

  var status = _StatusHelper.default.getLatestStatus(path + fileName);

  var statusList = i18n.statusStr.split('/');

  if (_status) {
    _StatusHelper.default.setStatus(path + fileName, _status);

    var type = (0, _print.getPrintFormat)();

    if (type === 'alfred') {
      process.stdout.write('ok');
    }

    return;
  }

  inquirer.prompt([{
    type: 'list',
    name: 'status',
    message: `${fileName}(${status}) new status:`,
    choices: statusList
  }]).then(answer => {
    _StatusHelper.default.setStatus(path + fileName, answer.status);
  });
}
//# sourceMappingURL=status.js.map