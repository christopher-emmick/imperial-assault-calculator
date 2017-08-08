import { inject } from 'aurelia-dependency-injection';
import { DialogController, DialogService, DialogCloseResult } from 'aurelia-dialog';
import { Config } from '../util/Config';
import { ConfigStorage } from "../util/ConfigStorage";
import { DeleteDialog } from "./delete-dialog";

export class LoadDialog {
    private _dialogService: DialogService;
    controller: DialogController;
    configurations: Config[];
    deleteMode: boolean;

    constructor( @inject controller: DialogController, @inject dialogService: DialogService) {
        this._dialogService = dialogService;
        this.controller = controller;
        this.deleteMode = false;
    }

    private loadConfigs() {
        this.configurations = [];
        for (let config of ConfigStorage.getConfigs()) {
            this.configurations.push(config);
        }

        this.configurations = this.configurations.sort((a,b) => this.compareInsensitive(a.name, b.name))
    }

    private compareInsensitive(a: string, b: string): number {
        let al = a.toLocaleLowerCase();
        let bl = b.toLocaleLowerCase();
        if (al < bl) {
            return -1;
        }
        if (al > bl) {
            return 1;
        }
        return 0;
    }

    activate() {
        this.loadConfigs();
    }



    toggleDelete() {
        this.deleteMode = !this.deleteMode;
    }

    deleteConfig(config: Config) {
        this._dialogService
            .open({ viewModel: DeleteDialog, model: config, lock: true })
            .whenClosed((response: DialogCloseResult) => {
                if (!response.wasCancelled) {
                    ConfigStorage.deleteConfig(config.name);
                    this.loadConfigs();
                }
            });
    }
}

