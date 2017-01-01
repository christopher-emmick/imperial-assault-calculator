import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {PossibleRolls} from "../util/PossibleRolls";
import {SurgeAttackProperty, FixedAttackProperty} from "../util/AttackProperty";
import {DefenseProperty} from "../util/DefenseProperty";
import {Dice} from "../util/Dice";
import 'jquery';

export class AttackRangeCalc {
    diceCount: Dice<number>;

    surgeAbilities: SurgeAttackProperty[];
    fixedAttackAbility: FixedAttackProperty;
    fixedDefenseAbility: DefenseProperty;
    rangeStart: number;
    rangeEnd: number;



    constructor() {
        this.diceCount = new Dice<number>();
        this.resetAttackDice();
        this.resetDefenseDice();

        this.surgeAbilities = [];
        this.rangeStart = 0;
        this.rangeEnd = 4;
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip({container: "body", delay: { show: 500 } });
    }

    checkRange(rangeType: string) {
        if (this.rangeStart < 0 || this.rangeEnd > 12 || this.rangeStart > this.rangeEnd) {
            if (rangeType == 'start') {
                this.rangeStart = 0;
            }
            else if (rangeType == 'end') {
                this.rangeEnd = 4;
            }
        }
    }

    addAttackProperty(surge: FixedAttackProperty, type: string) {
        surge[type]++;
    }

    addDie(type: string) {
        this.diceCount[type]++;
    }

    addDefenseProperty(type: string) {
        this.fixedDefenseAbility[type]++;
    }

    addNewSurge(surgeCost: number) {
        this.surgeAbilities.push(new SurgeAttackProperty(surgeCost));
    }

    removeSurge(surge: SurgeAttackProperty) {
        this.surgeAbilities = this.surgeAbilities.filter(p => p != surge);
    }

    resetAttackDice() {
        this.diceCount.red = 0;
        this.diceCount.blue = 0;
        this.diceCount.green = 0;
        this.diceCount.yellow = 0;
        this.fixedAttackAbility = {
            damage: 0,
            pierce: 0,
            accuracy: 0,
            surge: 0
        }
    }

    resetDefenseDice() {
        this.diceCount.black = 0;
        this.diceCount.white = 0;
        this.fixedDefenseAbility = {
            block: 0,
            evade: 0
        };
    }

    calculateResult() {
        let possibleRolls = new PossibleRolls();
        possibleRolls.applyAllRolls(this.diceCount);

        //possibleRolls.showProb();

        let damageResults = possibleRolls.getEffectiveDamage(this.surgeAbilities, this.fixedAttackAbility, this.fixedDefenseAbility, 0);
        console.log(damageResults);
        //this.probabilityChart.addChartData(damageResults);
    }
}



