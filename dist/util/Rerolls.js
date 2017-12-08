"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.id = Math.floor(Math.random() * 100000);
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
            ],
            yellow: [
                new RerollOption('attack', 'on 0 A', 'yellow_reroll_0A', 'yellow'),
                new RerollOption('attack', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'yellow_reroll_0S', 'yellow'),
                new RerollOption('attack', 'on 0 <img class="img-icon-damage" src="images/damage.png" />', 'yellow_reroll_0D', 'yellow')
            ],
            green: [
                new RerollOption('attack', 'on 1 A', 'green_reroll_1A', 'green'),
                new RerollOption('attack', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'green_reroll_0S', 'green'),
                new RerollOption('attack', 'on 0 <img class="img-icon-damage" src="images/damage.png" />', 'green_reroll_0D', 'green'),
                new RerollOption('attack', 'on 0 or 1 <img class="img-icon-damage" src="images/damage.png" />', 'green_reroll_0D_1D', 'green')
            ],
            blue: [
                new RerollOption('attack', 'on 2 A', 'blue_reroll_2A', 'blue'),
                new RerollOption('attack', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'blue_reroll_0S', 'blue'),
                new RerollOption('attack', 'on 0 <img class="img-icon-damage" src="images/damage.png" />', 'blue_reroll_0D', 'blue')
            ],
            black: [
                new RerollOption('attack', 'on 3 <img class="img-icon-defense" src="images/block.png" />', 'black_reroll_3B', 'black'),
                new RerollOption('attack', 'on 3 or 2 <img class="img-icon-defense" src="images/block.png" />', 'black_reroll_3B_2B', 'black')
            ],
            white: [
                new RerollOption('attack', 'on <img class="img-icon-dodge" src="images/dodge.png" />', 'white_reroll_D', 'white'),
                new RerollOption('attack', 'on <img class="img-icon-dodge" src="images/dodge.png" /> or 1 <img class="img-icon-damage" src="images/damage.png" />/<img class="img-icon-evade" src="images/evade.png" />', 'white_reroll_D_1B1E', 'white')
            ]
        };
    }
    return AllRerollOptions;
}());
exports.AllRerollOptions = AllRerollOptions;
var Rerolls = (function () {
    function Rerolls(previous) {
        if (previous === void 0) { previous = []; }
        this.previous = previous;
        this.rerollable_dice = [
            {
                value: 'black',
                name: 'Black'
            },
            {
                value: 'white',
                name: 'White'
            },
            {
                value: 'red',
                name: 'Red'
            },
            {
                value: 'blue',
                name: 'Blue'
            },
            {
                value: 'green',
                name: 'Green'
            },
            {
                value: 'yellow',
                name: "Yellow"
            }
        ];
        this.selected = previous;
        this.allRerollOptions = new AllRerollOptions();
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
    Rerolls.prototype.addNewOption = function () {
        var option = new RerollOption();
        this.selected.push(option);
    };
    return Rerolls;
}());
exports.Rerolls = Rerolls;
