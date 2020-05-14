/**
 * Project: Predire in Grafana
 * File: DataRegExp.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing DataRegExp class for the algortihm Exponential Regression.
 */

import DataRegression from "../DataRegression";

export default class DataRegExp extends DataRegression {
    
    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push( coef[0]*Math.exp(coef[1]*element) );
        });
        this.setYLine(yline);
    }

}