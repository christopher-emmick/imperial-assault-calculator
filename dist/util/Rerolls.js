"use strict";
var RerollOption = (function () {
    function RerollOption(type, label, die, replace) {
        if (type === void 0) { type = 'attack'; }
        if (label === void 0) { label = "Select Die"; }
        if (die === void 0) { die = null; }
        if (replace === void 0) { replace = null; }
        this.type = type;
        this.label = label;
        this.die = die;
        this.replace = replace;
    }
    return RerollOption;
}());
exports.RerollOption = RerollOption;
;
var AllRerollOptions = (function () {
    function AllRerollOptions() {
        this.options = {
            red: [
                new RerollOption('attack', 'on 1 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D', 'red'),
                new RerollOption('attack', 'on 1 or 2 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D_2D', 'red')
            ]
        };
    }
    return AllRerollOptions;
}());
exports.AllRerollOptions = AllRerollOptions;
var Rerolls = (function () {
    function Rerolls() {
        this.resetRerolls();
    }
    Rerolls.prototype.resetRerolls = function () {
        for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
            var option = _a[_i];
            this.removeOption(option);
        }
    };
    Rerolls.prototype.removeOption = function (option) {
        this.selected = this.selected.filter(function (p) { return p != option; });
    };
    Rerolls.prototype.addOption = function (type) {
        var option = new RerollOption();
        if (option.die_types.some(function (x) { return x == type; })) {
            option.type = type;
            this.selected.push(option);
        }
    };
    return Rerolls;
}());
exports.Rerolls = Rerolls;
//# sourceMappingURL=Rerolls.js.map