"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alfred = alfred;

var _print = require("./print");

var _list = require("./list");

var _utils = _interopRequireDefault(require("./utils"));

function alfred({
  output,
  setVariable,
  hasCommand,
  hasOption
}) {
  (0, _print.setPrintFormat)('alfred');
  var arg = process.env.query;
  var argOption = (arg || '').replace(/(^| )+([^- ][^ ]+)/g, '');

  if (!hasOption('index')) {
    var isNew = hasCommand("new [name]") === 1;
    var newItem = {
      title: `新建`,
      subtitle: isNew ? `${arg}` : `new`,
      autocomplete: isNew ? undefined : `new `,
      valid: isNew ? true : false,
      arg: `${arg}`,
      icon: {
        path: './icon/new.png'
      }
    };
    output(newItem);
    output((0, _print.format)((0, _list.list)()));
  } else if (hasOption('index') === 2) {
    output((0, _print.format)((0, _list.list)()));
  } else {
    if (hasCommand('status [status]')) {
      var i18n = _utils.default.getI18n();

      var statusEntries = Object.entries(i18n.status);
      output(Array.from(statusEntries).map(([key, value]) => {
        return {
          title: `更新为 ${value}`,
          subtitle: `${arg} ${value}`,
          arg: `${arg} ${value}`,
          icon: {
            path: `./icon/file_${key}.png`
          }
        };
      }));
    } else {
      var doItem = [{
        title: `打开`,
        subtitle: `${argOption} file`,
        arg: `${argOption} file`,
        icon: {
          path: `./icon/open.png`
        }
      }, {
        title: `状态更新`,
        subtitle: `${argOption} status`,
        autocomplete: `${argOption} status `,
        valid: false,
        icon: {
          path: `./icon/update.png`
        }
      }, {
        title: `归档`,
        subtitle: `${argOption} arrival`,
        arg: `${argOption} arrival `,
        icon: {
          path: `./icon/arrival.png`
        }
      }];
      output(doItem);
    }
  }

  if (process.env.file_result) {
    setVariable('file_result', process.env.file_result);
  }
}
//# sourceMappingURL=alfred.js.map