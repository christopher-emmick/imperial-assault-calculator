export class RerollOption {

    die_types: ['attack','defense'];
    attack_dice: ['red','blue','green','yellow'];
    defense_dice: ['black','white'];

    constructor(
        public type: string = 'attack',
        public label: string = "Select Die",
        public die: string = null,
        public replace: string = null
    ) {}

};

export class AllRerollOptions {
    options: { [key: string]: RerollOption[] } =
    {
        red: [
            new RerollOption('attack', 'on 1 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D', 'red'),
            new RerollOption('attack', 'on 1 or 2 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D_2D', 'red')
        ]
    };
}

export class Rerolls {

    selected: RerollOption[];

    constructor() {
        this.resetRerolls();
    }

    resetRerolls() {
        for (let option of this.selected) {
            this.removeOption(option);
        }
    }

    removeOption(option: RerollOption) {
        this.selected = this.selected.filter(p => p != option);
    }

    addOption(type: string) {
        let option = new RerollOption();
        if(option.die_types.some(x=>x == type)) {
            option.type = type;
            this.selected.push(option);
        }
    }

}