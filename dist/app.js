"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jquery");
var fastclick_1 = require("fastclick");
var App = (function () {
    function App() {
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Imperial Assault';
        config.map([
            { route: ['', 'attack-calc'], name: 'attack-calc', moduleId: 'pages/attack-calc', nav: true, title: 'Attack' },
            { route: 'attribute-test', name: 'attribute-test', moduleId: 'pages/attribute-test', nav: true, title: 'Attribute Test' },
            { route: 'attack-range', name: 'attack-range', moduleId: 'pages/attack-range', nav: true, title: 'Attack (Multiple Ranges)' }
        ]);
        this.router = router;
    };
    App.prototype.attached = function () {
        fastclick_1.FastClick.attach(document.body);
    };
    return App;
}());
exports.App = App;
