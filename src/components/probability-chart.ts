﻿import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import 'jquery';
import 'chartjs';

type ChartData = { [damage: number]: number };

export class ProbabilityChart {
    @bindable title: string;
    @bindable xLabel: string;

    legend: LegendInfo[];
    combineIcon1: LegendInfo;
    combineIcon2: LegendInfo;

    private _maxDatasets: number = 8;

    private _chartMaxDamage: number;
    private _chart: LinearInstance;
    private _datasets: any[];
    private _labels: string[];
    private _rawChartData: ChartData[];
    private _element: Element;

    constructor( @inject element: Element) {
        this._element = element;
        this.resetChart();
    }

    private setChartDisplay(val: boolean) {
        let chartContainer = $(this._element).find("#chartContainer").get(0);
        if (chartContainer !== undefined) {
            chartContainer.style.display = val ? "block" : "none";
        }
    }

    private _currentColor: number = 0;
    private _colors: any[][] = [
        [220, 0, 0, "white"],
        [0, 220, 0, "white"],
        [0, 0, 220, "white"],
        [220, 220, 0, "black"],
        [0, 220, 220, "black"],
        [220, 0, 220, "white"]
    ]

    private getColor(alpha: number): string {
        let i = this._currentColor % this._colors.length;
        let color = this._colors[i];
        let r = color[0];
        let g = color[1];
        let b = color[2];
        return `rgba(${r},${g},${b},${alpha})`;
    }

    private getTextColor(): string {
        let i = this._currentColor % this._colors.length;
        let color = this._colors[i];
        return color[3];
    }

    private refreshChart() {
        let ctx = <CanvasRenderingContext2D>(<HTMLCanvasElement>$(this._element).find("#damageChart").get(0)).getContext("2d");
        this._chart = new Chart(ctx).Line({
            labels: this._labels,
            datasets: this._datasets
        });
    }

    private removeDataset() {
        this._datasets.pop();
        this._rawChartData.pop();
        this.legend.pop();
        this.setCombineIcons();
        this._currentColor--;
    }

    private setCombineIcons() {
        if (this.legend.length > 1) {
            this.combineIcon1 = this.legend[this.legend.length - 2];
            this.combineIcon2 = this.legend[this.legend.length - 1];
        }
    }

    resetChart() {
        this._chartMaxDamage = 0;
        this._currentColor = 0;
        this._datasets = [];
        this._rawChartData = [];
        this.legend = [];
        this.setChartDisplay(false);

        if (this._chart !== undefined) {
            this._chart.destroy();
        }
    }

    combineChartData() {
        let total = this._rawChartData.length;
        let chartData1 = this._rawChartData[total-2];
        let chartData2 = this._rawChartData[total-1];

        let combinedChartData: ChartData = {};
        for (let v1 in chartData1) {
            for (let v2 in chartData2) {
                let totalValue = Number(v1) + Number(v2);
                let prob = chartData1[v1] * chartData2[v2];

                let currentProb = combinedChartData[totalValue];
                if (currentProb === undefined) {
                    combinedChartData[totalValue] = prob;
                } else {
                    combinedChartData[totalValue] = currentProb + prob;
                }
            }
        }
        this.removeDataset();
        this.removeDataset();
        this.addChartData(combinedChartData);
    }

    addChartData(newChartData: ChartData) {
        if (this._datasets.length == this._maxDatasets) {
            return;
        }

        this._rawChartData.push(newChartData);

        let minValue = 1;
        let maxValue = this._chartMaxDamage;
        for (let v in newChartData) {
            maxValue = Math.max(maxValue, Number(v));
        }

        this._chartMaxDamage = maxValue;

        if (maxValue == 0) {
            return;
        }

        this.setChartDisplay(true);

        let labels = [];
        let data = [];
        let cumulativeProb = 0;
        for (let i = maxValue; i >= minValue; i--) {
            cumulativeProb += (newChartData[i] === undefined) ? 0 : newChartData[i];
            data.unshift(Math.round(cumulativeProb * 100));
            labels.unshift(i);
        }

        this._labels = labels;
        this._datasets.push({
            fillColor: this.getColor(0.2),
            strokeColor: this.getColor(1),
            pointColor: this.getColor(1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: this.getColor(1),
            data: data
        });

        for (let ds of this._datasets) {
            while (ds.data.length < maxValue) {
                ds.data.push(0);
            }
        }

        let newLegendIcon = {
            value: this._datasets.length,
            color: this.getColor(1),
            textColor: this.getTextColor()
        };
        this.legend.push(newLegendIcon);
        this.setCombineIcons();

        this._currentColor++;

        if (this._chart !== undefined) {
            this._chart.destroy();
        }

        this.refreshChart();
    }
}

export class LegendInfo {
    value: number;
    color: string;
    textColor: string;
}
