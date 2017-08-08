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
require("bootstrap");
require("bootstrap/css/bootstrap.css!");
require("jquery");
var aurelia_dialog_1 = require("aurelia-dialog");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var PossibleRolls_1 = require("../util/PossibleRolls");
var AttackProperty_1 = require("../util/AttackProperty");
var Dice_1 = require("../util/Dice");
var load_dialog_1 = require("../components/load-dialog");
var Config_1 = require("../util/Config");
var save_dialog_1 = require("../components/save-dialog");
var ConfigStorage_1 = require("../util/ConfigStorage");
var AttackType_1 = require("../util/AttackType");
var Rerolls_1 = require("../util/Rerolls");
var AttackCalc = (function () {
    function AttackCalc(dialogService) {
        this.diceCount = new Dice_1.Dice();
        this.rerollOptions = new Rerolls_1.Rerolls();
        this.resetAttackDice();
        this.resetDefenseDice();
        this.surgeAbilities = [];
        this.selectAttackType('melee');
        this._dialogService = dialogService;
        this.showRerolls = false;
    }
    AttackCalc.prototype.attached = function () {
        $('[data-toggle="tooltip"]').tooltip({ container: "body", delay: { show: 500 } });
    };
    AttackCalc.prototype.selectAttackType = function (type) {
        this.attackTypeString = type;
        this.attackType = AttackType_1.AttackType[type];
        if (this.attackType == AttackType_1.AttackType.melee) {
            this.range = 0;
        }
        else if (this.attackType == AttackType_1.AttackType.range) {
            this.range++;
        }
    };
    AttackCalc.prototype.addAttackProperty = function (surge, type) {
        surge[type]++;
    };
    AttackCalc.prototype.addDie = function (type) {
        this.diceCount[type]++;
        this.showRerolls = true;
    };
    AttackCalc.prototype.addNewRerollOption = function () {
        this.rerollOptions.addNewOption();
    };
    AttackCalc.prototype.hasDie = function (type) {
        if (typeof this.diceCount[type] != "undefined" && this.diceCount[type] > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AttackCalc.prototype.hasAnyDie = function () {
        return this.hasDie('red') || this.hasDie('green') || this.hasDie('blue') || this.hasDie('yellow')
            || this.hasDie('black') || this.hasDie('white');
    };
    AttackCalc.prototype.removeRerollOption = function (option) {
        this.rerollOptions.removeOption(option);
    };
    AttackCalc.prototype.addDefenseProperty = function (type) {
        this.fixedDefenseAbility[type]++;
    };
    AttackCalc.prototype.addNewSurge = function (surgeCost) {
        this.surgeAbilities.push(new AttackProperty_1.SurgeAttackProperty(surgeCost));
    };
    AttackCalc.prototype.removeSurge = function (surge) {
        this.surgeAbilities = this.surgeAbilities.filter(function (p) { return p != surge; });
    };
    AttackCalc.prototype.resetAttackDice = function () {
        this.loadAttackDice(new Config_1.Config());
        this.showRerolls = this.hasAnyDie();
        if (!this.showRerolls) {
            this.rerollOptions.resetRerolls();
        }
    };
    AttackCalc.prototype.resetDefenseDice = function () {
        this.loadDefenseDice(new Config_1.Config());
        this.showRerolls = this.hasAnyDie();
        if (!this.showRerolls) {
            this.rerollOptions.resetRerolls();
        }
    };
    AttackCalc.prototype.loadAttackDice = function (config) {
        this.diceCount.red = config.diceCount.red;
        this.diceCount.blue = config.diceCount.blue;
        this.diceCount.green = config.diceCount.green;
        this.diceCount.yellow = config.diceCount.yellow;
        this.fixedAttackAbility = config.fixedAttackAbility;
        this.diceCount.red_reroll_1D = config.diceCount.red_reroll_1D;
        this.diceCount.red_reroll_1D_2D = config.diceCount.red_reroll_1D_2D;
        this.diceCount.blue_reroll_2A = config.diceCount.blue_reroll_2A;
        this.diceCount.blue_reroll_0D = config.diceCount.blue_reroll_0D;
        this.diceCount.blue_reroll_0S = config.diceCount.blue_reroll_0S;
        this.diceCount.green_reroll_0D_1D = config.diceCount.green_reroll_0D_1D;
        this.diceCount.green_reroll_0S = config.diceCount.green_reroll_0S;
        this.diceCount.green_reroll_1A = config.diceCount.green_reroll_1A;
        this.diceCount.yellow_reroll_0A = config.diceCount.yellow_reroll_0A;
        this.diceCount.yellow_reroll_0D = config.diceCount.yellow_reroll_0D;
        this.diceCount.yellow_reroll_0S = config.diceCount.yellow_reroll_0S;
    };
    AttackCalc.prototype.loadDefenseDice = function (config) {
        this.diceCount.black = config.diceCount.black;
        this.diceCount.white = config.diceCount.white;
        this.fixedDefenseAbility = config.fixedDefenseAbility;
        this.diceCount.black_reroll_3B = config.diceCount.black_reroll_3B;
        this.diceCount.black_reroll_3B_2B = config.diceCount.black_reroll_3B_2B;
        this.diceCount.white_reroll_D = config.diceCount.white_reroll_D;
        this.diceCount.white_reroll_D_1B1E = config.diceCount.white_reroll_D_1B1E;
    };
    AttackCalc.prototype.loadConfig = function (config) {
        if (config.hasAttackConfig) {
            this.loadAttackDice(config);
            this.surgeAbilities = config.surgeAbilities;
            this.attackTypeString = AttackType_1.AttackType[config.attackType];
            this.attackType = config.attackType;
            this.range = config.range;
        }
        if (config.hasDefenseConfig) {
            this.loadDefenseDice(config);
        }
    };
    AttackCalc.prototype.saveConfig = function (saveOptions) {
        var config = new Config_1.Config();
        config.attackType = this.attackType;
        config.range = this.range;
        config.diceCount = this.diceCount;
        config.fixedAttackAbility = this.fixedAttackAbility;
        config.surgeAbilities = this.surgeAbilities;
        config.fixedDefenseAbility = this.fixedDefenseAbility;
        config.name = saveOptions.name;
        config.hasAttackConfig = saveOptions.includeAttack;
        config.hasDefenseConfig = saveOptions.includeDefense;
        ConfigStorage_1.ConfigStorage.saveConfig(config.name, config);
    };
    AttackCalc.prototype.calculateResult = function () {
        var selectedDice = $.extend(true, {}, this.diceCount);
        if (this.rerollOptions.selected.length > 0) {
            this.applyRerolls(selectedDice);
        }
        var possibleRolls = new PossibleRolls_1.PossibleRolls();
        possibleRolls.applyAllRolls(selectedDice);
        possibleRolls.showProb();
        var damageResults = possibleRolls.getEffectiveDamage(this.surgeAbilities, this.fixedAttackAbility, this.fixedDefenseAbility, this.range);
        this.probabilityChart.addChartData(damageResults);
    };
    AttackCalc.prototype.load = function () {
        var _this = this;
        this._dialogService
            .open({ viewModel: load_dialog_1.LoadDialog, model: {}, lock: true })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.loadConfig(response.output);
            }
        });
    };
    AttackCalc.prototype.save = function () {
        var _this = this;
        this._dialogService
            .open({ viewModel: save_dialog_1.SaveDialog, model: {}, lock: true })
            .whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.saveConfig(response.output);
            }
        });
    };
    AttackCalc.prototype.applyRerolls = function (dice) {
        for (var _i = 0, _a = this.rerollOptions.selected; _i < _a.length; _i++) {
            var option = _a[_i];
            if (dice[option.replace] > 0 && option.die !== null) {
                dice[option.replace]--;
                dice[option.die]++;
            }
        }
    };
    AttackCalc.prototype.rerollChoice = function (option, die) {
        option.die = die;
        return true;
    };
    return AttackCalc;
}());
AttackCalc = __decorate([
    __param(0, aurelia_dependency_injection_1.inject),
    __metadata("design:paramtypes", [aurelia_dialog_1.DialogService])
], AttackCalc);
exports.AttackCalc = AttackCalc;
