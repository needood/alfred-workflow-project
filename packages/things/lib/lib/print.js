"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPrintFormat = setPrintFormat;
exports.getPrintFormat = getPrintFormat;
exports.format = format;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = _interopRequireDefault(require("./utils"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Table = require("table");

function setPrintFormat(format) {
  process.env.print_format = format;
}

function getPrintFormat() {
  return process.env.print_format;
}

function format(results) {
  var i18n = _utils.default.getI18n();

  var statusMap = new Map(Array.from(Object.entries(i18n.status)).map(([key, value]) => {
    return [value, key];
  }));
  var type = getPrintFormat();

  if (type === 'alfred') {
    var items = json(results).map(item => {
      var index = _utils.default.getIndexByString(item.title);

      var status = item.subtitle.replace(/^.*? /, '');
      var iconpath;

      if (statusMap.get(status)) {
        iconpath = `icon/file_${statusMap.get(status)}.png`;
      } else {
        iconpath = `icon/file_normal.png`;
      }

      return _objectSpread({
        valid: false,
        autocomplete: `-i=${index}`,
        icon: {
          path: iconpath
        }
      }, item);
    });
    return items;
  } else {
    return Table.table(results);
  }
}

function json(array) {
  if (typeof array === 'string') {
    return [];
  }

  var items = array.slice(1).map(([name, time, status]) => {
    return {
      title: name,
      subtitle: status
    };
  });
  return items;
}
//# sourceMappingURL=print.js.map