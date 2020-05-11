/**
 * Project: Predire in Grafana
 * File: DataRegLog.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing DataRegLog class for the algortihm Logarithmic Regression.
 */


import DataRegression from "../DataRegression";

export default class DataRegLog extends DataRegression {
    
    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push(  coef[0] + coef[1]*Math.log(element) );
        });
        this.setYLine(yline);
    }

}