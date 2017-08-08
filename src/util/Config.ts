import { SurgeAttackProperty, FixedAttackProperty } from "../util/AttackProperty";
import { DefenseProperty } from "../util/DefenseProperty";
import { Dice } from "../util/Dice";
import { AttackType } from "./AttackType";

export class Config {
    constructor() {
        this.diceCount = {
            red: 0,
            blue: 0,
            green: 0,
            yellow: 0,
            black: 0,
            white: 0,
            black_reroll_3B: 0,
            black_reroll_3B_2B: 0,
            white_reroll_D: 0,
            white_reroll_D_1B1E: 0,
            red_reroll_1D: 0,
            red_reroll_1D_2D: 0,
            blue_reroll_2A: 0,
            blue_reroll_0D: 0,
            blue_reroll_0S: 0,
            green_reroll_0S: 0,
            green_reroll_0D_1D: 0,
            green_reroll_1A: 0,
            yellow_reroll_0S: 0,
            yellow_reroll_0D: 0,
            yellow_reroll_0A: 0
        };
        this.rerollCount = {
            red: 0,
            blue: 0,
            green: 0,
            yellow: 0,
            black: 0,
            white: 0,
            black_reroll_3B: 0,
            black_reroll_3B_2B: 0,
            white_reroll_D: 0,
            white_reroll_D_1B1E: 0,
            red_reroll_1D: 0,
            red_reroll_1D_2D: 0,
            blue_reroll_2A: 0,
            blue_reroll_0D: 0,
            blue_reroll_0S: 0,
            green_reroll_0S: 0,
            green_reroll_0D_1D: 0,
            green_reroll_1A: 0,
            yellow_reroll_0S: 0,
            yellow_reroll_0D: 0,
            yellow_reroll_0A: 0
        };
        this.surgeAbilities = [];
        this.fixedAttackAbility = {
            damage: 0,
            pierce: 0,
            accuracy: 0,
            surge: 0
        };
        this.fixedDefenseAbility = {
            block: 0,
            evade: 0
        };
        this.attackType = AttackType.melee;
        this.range = 0;
    }

    name: string;

    diceCount: Dice<number>;
    rerollCount: Dice<number>;
    surgeAbilities: SurgeAttackProperty[];
    fixedAttackAbility: FixedAttackProperty;
    fixedDefenseAbility: DefenseProperty;
    attackType: AttackType;
    range: number;

    hasAttackConfig: boolean;
    hasDefenseConfig: boolean;
}