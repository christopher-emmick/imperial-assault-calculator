"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigStorage = (function () {
    function ConfigStorage() {
    }
    ConfigStorage.isSupported = function () {
        try {
            var itemBackup = localStorage.getItem("");
            localStorage.removeItem("");
            localStorage.setItem("", itemBackup);
            if (itemBackup === null)
                localStorage.removeItem("");
            else
                localStorage.setItem("", itemBackup);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ConfigStorage.getConfigs = function () {
        var items = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith(this.configStoragePrefix)) {
                var data = localStorage.getItem(key);
                var item = JSON.parse(data);
                if (item != null) {
                    items.push(item);
                }
            }
        }
        return items;
    };
    ConfigStorage.saveConfig = function (name, item) {
        localStorage.setItem(this.configStoragePrefix + name, JSON.stringify(item));
    };
    ConfigStorage.deleteConfig = function (name) {
        localStorage.removeItem(this.configStoragePrefix + name);
    };
    return ConfigStorage;
}());
ConfigStorage.configStoragePrefix = "ConfigStorageItem: ";
exports.ConfigStorage = ConfigStorage;
