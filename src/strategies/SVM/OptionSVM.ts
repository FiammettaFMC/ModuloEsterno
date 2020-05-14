/**
 * Project: Predire in Grafana
 * File: OptionSVM.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-04-24
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing OptionSVM class for the algortihm SVM.
 */

import Option from "../Option";

export default class OptionSVM implements Option {
    private C: number = 1.0;
    private maxiter: number = 10000;
    private numpass: number = 10;

    public getC(): number {
        return this.C;
    }

    public getMaxIter(): number {
        return this.maxiter;
    }

    public getNumPass(): number {
        return this.numpass;
    }

    public setC(c: number): void {
        this.C = c;
    }

    public setMaxIter(m: number): void {
        this.maxiter = m;
    }

    public setNumPass(n: number): void {
        this.numpass = n;
    }

    public setValueFile(config: string): void {
        try {
            let predictor = JSON.parse(config);
            this.C = predictor.opt.C;
            this.maxiter = predictor.opt.maxiter;
            this.numpass = predictor.opt.numpass;
        } catch (e){
            throw new Error('Predictor bad formatted');
        }
    }

}