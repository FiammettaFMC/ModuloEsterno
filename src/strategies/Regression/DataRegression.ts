/**
 * Project: Predire in Grafana
 * File: DataRegression.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing DataRegression class for the algortihm Regression-like.
 */

import { DataPoint } from "regression";
import Data from "../Data";

export default class DataRegression implements Data {
    private points: DataPoint[] = [];
    private xpoints: number[] = [];
    private ypoints: number[] = [];
    private yline: number[] = [];

    public setValue(dataset: number[][]): void{
        this.points = [];
        this.xpoints = []; 
        this.ypoints = [];
        dataset.forEach( (p) => {
            let point: DataPoint = [0,0];
            point[0] = p[0];
            point[1] = p[1];
            this.points.push(point);
            this.xpoints.push(p[0]);
            this.ypoints.push(p[1]);
        });
    }

    public setPointsLine(coef: number[]): void {}

    public getPoints(): DataPoint[] {
        return this.points;
    }

    public getXPoints(): number[] {
        return this.xpoints;
    }

    public getYPoints(): number[] {
        return this.ypoints;
    }

    public getYLine(): number[] {
        return this.yline;
    }

    public setYLine(line: number[]): void {
        this.yline = line;
    }

}