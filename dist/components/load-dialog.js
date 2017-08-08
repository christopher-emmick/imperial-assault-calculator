"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_dialog_1 = require("aurelia-dialog");
var ConfigStorage_1 = require("../util/ConfigStorage");
var delete_dialog_1 = require("./delete-dialog");
var LoadDialog = (function () {
    function LoadDialog(controller, dialogService) {
        this._dialogService = dialogService;
        this.controller = controller;
        this.deleteMode = false;
    }
    LoadDialog.prototype.loadConfigs = function () {
        var _this = this;
        this.configurations = [];
        for (var _i = 0, _a = ConfigStorage_1.ConfigStorage.getConfigs(); _i < _a.length; _i++) {
            var config = _a[_i];
            this.configurations.push(config);
        }
        this.configurations = this.configurations.sort(function (a, b) { return _this.compareInsensitive(a.name, b.name); });
    };
    LoadDialog.prototype.compareInsensitive = function (a, b) {
        var al = a.toLocaleLowerCase();
        var bl = b.toLocaleLowerCase();
        if (al < bl) {
            return -1;
        }
        if (al > bl) {
            return 1;
        }
        return 0;
    };
    LoadDialog.prototype.activate = function () {
        this.loadConfigs();
    };
    LoadDialog.prototype.toggleDelete = function () {
        this.deleteMode = !this.deleteMode;
    };
    LoadDialog.prototype.deleteConfig = function (config) {
        var _this = this;
        this._dialogService
            .open({ viewModel: delete_dialog_1.DeleteDialog, model: config, lock: true })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
                ConfigStorage_1.ConfigStorage.deleteConfig(config.name);
                _this.loadConfigs();
            }
        });
    };
    return LoadDialog;
}());
LoadDialog = __decorate([
    __param(0, aurelia_dependency_injection_1.inject), __param(1, aurelia_dependency_injection_1.inject),
    __metadata("design:paramtypes", [aurelia_dialog_1.DialogController, aurelia_dialog_1.DialogService])
], LoadDialog);
exports.LoadDialog = LoadDialog;
