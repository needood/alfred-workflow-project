"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonGenerateBuilder = void 0;

var _GenerateBuilder = require("./GenerateBuilder");

class JsonGenerateBuilder extends _GenerateBuilder.GenerateBuilder {
  build() {
    var results = [];

    for (var i = 0; i < this.bodyString.length; i++) {
      var currentBodyString = this.bodyString[i];

      if (currentBodyString) {
        results.push(currentBodyString);
      }
    }

    return results;
  }

}

exports.JsonGenerateBuilder = JsonGenerateBuilder;
//# sourceMappingURL=JsonGenerateBuilder.js.map