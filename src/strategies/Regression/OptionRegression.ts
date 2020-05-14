/**
 * Project: Predire in Grafana
 * File: OptionRegression.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-04-24
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing OptionRegression class for the algortihm Regression-like.
 */

import Option from "../Option";

export default class OptionRegression implements Option {
    private order: number = 2;
    private precision: number = 2;

    public getOrder(): number {
        return this.order;
    }

    public getPrecision(): number {
        return this.precision;
    }

    public setPrecision(p: number): void {
        this.precision = p;
    }

    public setValueFile(config: string): void {
        try {
            let predictor = JSON.parse(config);
            this.order = predictor.opt.order;
            this.precision = predictor.opt.precision;
        } catch (e){
            throw new Error('Predictor bad formatted');
        }
    }
}