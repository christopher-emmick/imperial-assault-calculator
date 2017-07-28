export class RerollOption {

    die_types: { value: string, name: string }[] =
    [
        {
            value: 'attack',
            name: 'Favoring Attacker'
        },
        {
            value: 'defense',
            name: 'Favoring Defender'
        }
    ];

    rerollable_dice: { value: string, name: string }[] =
    [
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


    constructor(
        public type: string = 'attack',
        public label: string = "Select Die",
        public die: string = null,
        public replace: string = null
    ) {}

};

export class AllAttackRerollOptions {
    options: { [key: string]: RerollOption[] } =
    {
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

export class AllDefenseRerollOptions {
    options: { [key: string]: RerollOption[] } =
        {
            red: [
                new RerollOption('defense', 'on 1 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D', 'red'),
                new RerollOption('defense', 'on 1 or 2 <img class="img-icon-damage" src="images/damage.png" />', 'red_reroll_1D_2D', 'red')
            ],
            yellow: [
                new RerollOption('defense', 'on 0 A', 'yellow_reroll_0A', 'yellow'),
                new RerollOption('defense', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'yellow_reroll_0S', 'yellow'),
                new RerollOption('defense', 'on 0 <img class="img-icon-damage" src="images/damage.png" />', 'yellow_reroll_0D', 'yellow')
            ],
            green: [
                new RerollOption('defense', 'on 1 A', 'green_reroll_1A', 'green'),
                new RerollOption('defense', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'green_reroll_0S', 'green'),
                new RerollOption('defense', 'on 0 or 1 <img class="img-icon-damage" src="images/damage.png" />', 'green_reroll_0D_1D', 'green')
            ],
            blue: [
                new RerollOption('defense', 'on 2 A', 'blue_reroll_2A', 'blue'),
                new RerollOption('defense', 'on 0 <img class="img-icon-surge" src="images/surge.png" />', 'blue_reroll_0S', 'blue'),
                new RerollOption('defense', 'on 0 <img class="img-icon-damage" src="images/damage.png" />', 'blue_reroll_0D', 'blue')
            ],
            black: [
                new RerollOption('defense', 'on 3 <img class="img-icon-defense" src="images/block.png" />', 'black_reroll_3B', 'black'),
                new RerollOption('defense', 'on 3 or 2 <img class="img-icon-defense" src="images/block.png" />', 'black_reroll_3B_2B', 'black')
            ],
            white: [
                new RerollOption('defense', 'on <img class="img-icon-dodge" src="images/dodge.png" />', 'white_reroll_D', 'white'),
                new RerollOption('defense', 'on <img class="img-icon-dodge" src="images/dodge.png" /> or 1 <img class="img-icon-damage" src="images/damage.png" />/<img class="img-icon-evade" src="images/evade.png" />', 'white_reroll_D_1B1E', 'white')
            ]
        };
}

export class Rerolls {

    selected: RerollOption[];
    allAttackOptions: AllAttackRerollOptions;
    allDefenseOptions: AllDefenseRerollOptions;

    constructor( public previous: RerollOption[] = []) {
            this.selected = previous;
            this.allAttackOptions = new AllAttackRerollOptions();
            this.allDefenseOptions = new AllDefenseRerollOptions();
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
        console.log(option.die_types);
        if(option.die_types.some(x=>x.value == type)) {
            option.type = type;
            this.selected.push(option);
        }
    }

}