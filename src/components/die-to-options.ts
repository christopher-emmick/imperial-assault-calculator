import { AllRerollOptions } from "../util/Rerolls"

export class dieToOptionsValueConverter {
    allRerollOptions: AllRerollOptions;

    toView(die: string) {
        this.allRerollOptions = new AllRerollOptions();
        return this.allRerollOptions.options[die];
    }
}