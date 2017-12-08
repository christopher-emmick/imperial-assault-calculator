import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'jquery';
import { DialogService, DialogCloseResult } from 'aurelia-dialog';
import { inject } from 'aurelia-dependency-injection';
import { PossibleRolls } from "../util/PossibleRolls";
import { SurgeAttackProperty, FixedAttackProperty } from "../util/AttackProperty";
import { DefenseProperty } from "../util/DefenseProperty";
import { Dice } from "../util/Dice";
import { ProbabilityChart } from "../components/probability-chart";
import { LoadDialog } from "../components/load-dialog";
import { Config } from "../util/Config";
import { SaveDialog, SaveOptions } from "../components/save-dialog";
import { ConfigStorage } from "../util/ConfigStorage";
import { AttackType } from "../util/AttackType";
import { RerollOption, Rerolls } from "../util/Rerolls";

export class AttackCalc {
    private _dialogService: DialogService;
    diceCount: Dice<number>;
    rerollOptions: Rerolls;

    surgeAbilities: SurgeAttackProperty[];
    fixedAttackAbility: FixedAttackProperty;
    fixedDefenseAbility: DefenseProperty;
    attackType: AttackType;
    attackTypeString: string;
    range: number;
    showRerolls: boolean;

    probabilityChart: ProbabilityChart;

    constructor( @inject dialogService: DialogService) {
        this.diceCount = new Dice<number>();
        this.rerollOptions = new Rerolls();
        this.resetAttackDice();
        this.resetDefenseDice();
        this.surgeAbilities = [];
        this.selectAttackType('melee');
        this._dialogService = dialogService;
        this.showRerolls = false;
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip({ container: "body", delay: { show: 500 } });
    }

    selectAttackType(type: string) {
        this.attackTypeString = type;
        this.attackType = AttackType[type];
        if (this.attackType == AttackType.melee) {
            this.range = 0;
        } else if (this.attackType == AttackType.range) {
            this.range++;
        }
    }

    addAttackProperty(surge: FixedAttackProperty, type: string) {
        surge[type]++;
    }

    addDie(type: string) {
        this.diceCount[type]++;
        this.showRerolls = true;
    }

    addNewRerollOption() {
        this.rerollOptions.addNewOption();
    }

    hasDie(type: string) {
        if (typeof this.diceCount[type] != "undefined" && this.diceCount[type] > 0) {
             return true;
        }
        else {
            return false;
        }
    }

    hasAnyDie() {
        return this.hasDie('red') || this.hasDie('green') || this.hasDie('blue') || this.hasDie('yellow')
            || this.hasDie('black') || this.hasDie('white');
    }

    removeRerollOption(option: RerollOption) {
        this.rerollOptions.removeOption(option);
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
        this.loadAttackDice(new Config())
        this.showRerolls = this.hasAnyDie();
        if (!this.showRerolls) {
            this.rerollOptions.resetRerolls();
        }
    }

    resetDefenseDice() {
        this.loadDefenseDice(new Config())
        this.showRerolls = this.hasAnyDie();
        if (!this.showRerolls) {

            this.rerollOptions.resetRerolls();
        }
    }

    private loadAttackDice(config: Config) {
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
        this.diceCount.green_reroll_0D = config.diceCount.green_reroll_0D;
        this.diceCount.green_reroll_0D_1D = config.diceCount.green_reroll_0D_1D;
        this.diceCount.green_reroll_0S = config.diceCount.green_reroll_0S;
        this.diceCount.green_reroll_1A = config.diceCount.green_reroll_1A;
        this.diceCount.yellow_reroll_0A = config.diceCount.yellow_reroll_0A;
        this.diceCount.yellow_reroll_0D = config.diceCount.yellow_reroll_0D;
        this.diceCount.yellow_reroll_0S = config.diceCount.yellow_reroll_0S;
    }

    private loadDefenseDice(config: Config) {
        this.diceCount.black = config.diceCount.black;
        this.diceCount.white = config.diceCount.white;
        this.fixedDefenseAbility = config.fixedDefenseAbility;
        
        this.diceCount.black_reroll_3B = config.diceCount.black_reroll_3B;
        this.diceCount.black_reroll_3B_2B = config.diceCount.black_reroll_3B_2B;
        this.diceCount.white_reroll_D = config.diceCount.white_reroll_D;
        this.diceCount.white_reroll_D_1B1E = config.diceCount.white_reroll_D_1B1E;

    }

    private loadConfig(config: Config) {
        if (config.hasAttackConfig) {
            this.loadAttackDice(config);

            this.surgeAbilities = config.surgeAbilities;
            this.attackTypeString = AttackType[config.attackType];
            this.attackType = config.attackType;
            this.range = config.range;
        }
        if (config.hasDefenseConfig) {
            this.loadDefenseDice(config);
        }
    }

    private saveConfig(saveOptions: SaveOptions) {
        let config = new Config();

        config.attackType = this.attackType;
        config.range = this.range;

        config.diceCount = this.diceCount;
        config.fixedAttackAbility = this.fixedAttackAbility;
        config.surgeAbilities = this.surgeAbilities;
        config.fixedDefenseAbility = this.fixedDefenseAbility;
        
        config.name = saveOptions.name;
        config.hasAttackConfig = saveOptions.includeAttack;
        config.hasDefenseConfig = saveOptions.includeDefense;

        ConfigStorage.saveConfig(config.name, config);
    }

    calculateResult() {

        let selectedDice = $.extend(true, {}, this.diceCount);

        if (this.rerollOptions.selected.length > 0) {
            this.applyRerolls(selectedDice);
        }
        let possibleRolls = new PossibleRolls();
        possibleRolls.applyAllRolls(selectedDice);

        possibleRolls.showProb();

        let damageResults = possibleRolls.getEffectiveDamage(this.surgeAbilities, this.fixedAttackAbility, this.fixedDefenseAbility, this.range);
        this.probabilityChart.addChartData(damageResults);
    }

    load() {
        this._dialogService
            .open({ viewModel: LoadDialog, model: {}, lock: true })
            .whenClosed((response: DialogCloseResult) => {
                if (!response.wasCancelled) {
                    this.loadConfig(response.output);
                }
            });
    }

    save() {
        this._dialogService
            .open({ viewModel: SaveDialog, model: {}, lock: true })
            .whenClosed((response: DialogCloseResult) => {
                if (!response.wasCancelled) {
                    this.saveConfig(response.output);
                }
            });
    }

    applyRerolls(dice: Dice<number>) {

        for (let option of this.rerollOptions.selected) {
            if (dice[option.replace] > 0 && option.die !== null) {
                dice[option.replace]--;
                dice[option.die]++;
            }
        }

    }

    rerollChoice(option: RerollOption, die: string) {

        option.die = die;
        return true;

    }
}



