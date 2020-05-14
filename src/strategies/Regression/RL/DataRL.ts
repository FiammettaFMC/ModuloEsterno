/**
 * Project: Predire in Grafana
 * File: DataRL.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-04-24
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing DataRL class for the algortihm Linear Regression.
 */


import DataRegression from "../DataRegression";

export default class DataRL extends DataRegression {

    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push( ( coef[0] * element) + coef[1] );
        });
        this.setYLine(yline);
    }

}