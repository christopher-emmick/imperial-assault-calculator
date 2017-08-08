"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-dialog');
    aurelia.start().then(function (a) { return a.setRoot(); });
}
exports.configure = configure;
