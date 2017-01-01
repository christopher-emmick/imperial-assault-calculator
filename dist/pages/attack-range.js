"use strict";
require("bootstrap");
require("bootstrap/css/bootstrap.css!");
var PossibleRolls_1 = require("../util/PossibleRolls");
var AttackProperty_1 = require("../util/AttackProperty");
var Dice_1 = require("../util/Dice");
require("jquery");
var AttackRangeCalc = (function () {
    function AttackRangeCalc() {
        this.diceCount = new Dice_1.Dice();
        this.resetAttackDice();
        this.resetDefenseDice();
        this.surgeAbilities = [];
        this.rangeStart = 0;
        this.rangeEnd = 4;
    }
    AttackRangeCalc.prototype.attached = function () {
        $('[data-toggle="tooltip"]').tooltip({ container: "body", delay: { show: 500 } });
    };
    AttackRangeCalc.prototype.checkRange = function (rangeType) {
        if (this.rangeStart < 0 || this.rangeEnd > 12 || this.rangeStart > this.rangeEnd) {
            if (rangeType == 'start') {
                this.rangeStart = 0;
            }
            else if (rangeType == 'end') {
                this.rangeEnd = 4;
            }
        }
    };
    AttackRangeCalc.prototype.addAttackProperty = function (surge, type) {
        surge[type]++;
    };
    AttackRangeCalc.prototype.addDie = function (type) {
        this.diceCount[type]++;
    };
    AttackRangeCalc.prototype.addDefenseProperty = function (type) {
        this.fixedDefenseAbility[type]++;
    };
    AttackRangeCalc.prototype.addNewSurge = function (surgeCost) {
        this.surgeAbilities.push(new AttackProperty_1.SurgeAttackProperty(surgeCost));
    };
    AttackRangeCalc.prototype.removeSurge = function (surge) {
        this.surgeAbilities = this.surgeAbilities.filter(function (p) { return p != surge; });
    };
    AttackRangeCalc.prototype.resetAttackDice = function () {
        this.diceCount.red = 0;
        this.diceCount.blue = 0;
        this.diceCount.green = 0;
        this.diceCount.yellow = 0;
        this.fixedAttackAbility = {
            damage: 0,
            pierce: 0,
            accuracy: 0,
            surge: 0
        };
    };
    AttackRangeCalc.prototype.resetDefenseDice = function () {
        this.diceCount.black = 0;
        this.diceCount.white = 0;
        this.fixedDefenseAbility = {
            block: 0,
            evade: 0
        };
    };
    AttackRangeCalc.prototype.calculateResult = function () {
        var possibleRolls = new PossibleRolls_1.PossibleRolls();
        possibleRolls.applyAllRolls(this.diceCount);
        //possibleRolls.showProb();
        var damageResults = possibleRolls.getEffectiveDamage(this.surgeAbilities, this.fixedAttackAbility, this.fixedDefenseAbility, 0);
        console.log(damageResults);
        //this.probabilityChart.addChartData(damageResults);
    };
    return AttackRangeCalc;
}());
exports.AttackRangeCalc = AttackRangeCalc;
//# sourceMappingURL=attack-range.js.map