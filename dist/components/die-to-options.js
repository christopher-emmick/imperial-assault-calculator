"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rerolls_1 = require("../util/Rerolls");
var dieToOptionsValueConverter = (function () {
    function dieToOptionsValueConverter() {
    }
    dieToOptionsValueConverter.prototype.toView = function (die) {
        this.allRerollOptions = new Rerolls_1.AllRerollOptions();
        return this.allRerollOptions.options[die];
    };
    return dieToOptionsValueConverter;
}());
exports.dieToOptionsValueConverter = dieToOptionsValueConverter;
