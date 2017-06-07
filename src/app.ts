﻿import 'jquery';
import {FastClick} from 'fastclick';

export class App {
    public router: any;

    configureRouter(config, router) {
        config.title = 'Imperial Assault';
        config.map([
            { route: ['', 'attack-calc'], name: 'attack-calc', moduleId: 'pages/attack-calc', nav: true, title: 'Attack' },
            { route: 'attribute-test', name: 'attribute-test', moduleId: 'pages/attribute-test', nav: true, title: 'Attribute Test' },
            { route: 'attack-range', name: 'attack-range', moduleId: 'pages/attack-range', nav: true, title: 'Attack (Multiple Ranges)' }
        ]);

        this.router = router;
    }

    attached() {
        FastClick.attach(document.body);
    }
}