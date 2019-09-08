"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.from-entries");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autofly = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _yargs = _interopRequireDefault(require("yargs"));

var _options = require("cliver/lib/options");

var _commands = require("cliver/lib/commands");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class BaseAutofly {
  constructor({
    commands,
    options
  }) {
    (0, _defineProperty2.default)(this, "_commands", void 0);
    (0, _defineProperty2.default)(this, "_options", void 0);
    (0, _defineProperty2.default)(this, "_variable", new Map());
    (0, _defineProperty2.default)(this, "handlers", []);
    (0, _defineProperty2.default)(this, "_getVariable", key => {
      return this._variable.get(key);
    });
    (0, _defineProperty2.default)(this, "_output", items => {
      this._results = this._results.concat(items);
    });
    (0, _defineProperty2.default)(this, "_setVariable", (key, value) => {
      this._variable.set(key, value);
    });
    (0, _defineProperty2.default)(this, "_results", []);
    (0, _defineProperty2.default)(this, "_handleParam", new Map());
    this._commands = commands;
    this._options = options;
    var handlers = this.handlers;

    this._handleParam.set('output', this._output);

    this._handleParam.set('setVariable', this._setVariable);

    this._handleParam.set('getVariable', this._getVariable);

    this._commands.push({
      name: "alfred",
      desc: "for alfred",
      handler: _ => {
        var param = Object.fromEntries(this._handleParam);
        handlers.forEach(handler => {
          handler(param);
        });
        console.log(JSON.stringify({
          items: this._results,
          variables: Object.fromEntries(this._variable)
        }));
      }
    });
  }

  addResult(fn) {
    this.handlers.push(fn);
  }

  addHandleParam(key, value) {
    this._handleParam.set(key, value);
  }

  output() {
    return {
      commands: this._commands,
      options: this._options
    };
  }

}

class Autofly extends BaseAutofly {
  constructor({
    commands,
    options
  }) {
    super({
      commands,
      options
    });
    (0, _defineProperty2.default)(this, "_hasCommand", key => {
      return this._command.get(key) || 0;
    });
    (0, _defineProperty2.default)(this, "_setCommand", (key, value) => {
      this._command.set(key, value);
    });
    (0, _defineProperty2.default)(this, "_command", new Map());
    (0, _defineProperty2.default)(this, "_option", new Map());
    (0, _defineProperty2.default)(this, "_setOption", (key, value) => {
      this._option.set(key, value);
    });
    (0, _defineProperty2.default)(this, "_hasOption", key => {
      return this._option.get(key) || 0;
    });
    var cli = (0, _yargs.default)();
    var setCommand = this._setCommand;
    var setOption = this._setOption;
    var arg = (process.env.query || '').trim().split(/ +/);
    (0, _options.bindOptions)(cli, options.map(option => {
      var {
        handler
      } = option,
          other = (0, _objectWithoutProperties2.default)(option, ["handler"]);
      return _objectSpread({
        handler(argv) {
          if (argv[option.name]) {
            if (argv[option.name] === true) {
              setOption(option.name, 2);
            } else {
              setOption(option.name, 1);
            }
          }
        }

      }, other);
    }), arg);
    (0, _commands.bindCommands)(cli, commands.map(command => {
      var {
        handler
      } = command,
          other = (0, _objectWithoutProperties2.default)(command, ["handler"]);
      return _objectSpread({
        handler(argv) {
          var regexpResults = /\[(\w+)\]/.exec(command.name);

          if (regexpResults && regexpResults[1]) {
            if (argv[regexpResults[1]]) {
              setCommand(command.name, 1);
            } else {
              setCommand(command.name, 2);
            }
          } else {
            setCommand(command.name, 1);
          }
        }

      }, other);
    }));
    cli.parse(arg);
    this.addHandleParam('hasCommand', this._hasCommand);
    this.addHandleParam('hasOption', this._hasOption);
  }

}

exports.Autofly = Autofly;
//# sourceMappingURL=index.js.map