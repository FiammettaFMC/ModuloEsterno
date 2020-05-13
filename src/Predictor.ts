/**
 * Project: Predire in Grafana
 * File: Predictor.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-21
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing Predictor class for incpsulation of predioctor info.
 */

import Option from "./strategies/Option";
import { opt } from "./strategies/Strategies";

export default class Predictor {
    private algorithm: string;
    private coefficients: number[];
    private predFun: string;
    private opt?: Option;
    private accuracy?: number;

    constructor(alg?: string, coef?: number[], func?: string, option?: Option, acc?: number) {
        this.algorithm = alg ? alg : '';
        this.coefficients = coef ? coef: [];
        this.predFun = func ? func : '';
        if(option) this.opt = option;
        if(acc) this.accuracy = acc;
    }

    getAlg(): string {
        return this.algorithm;
    }

    getCoef(): number[] {
        return this.coefficients;
    }
    
    getFun(): string {
        return this.predFun;
    }
    
    getOpt(): Option | undefined {
        return this.opt;
    }

    getAcc(): number | undefined {
        return this.accuracy;
    }

    setAlg(alg: string) {
        this.algorithm = alg;
        this.opt = opt[alg];
    }

    setCoef(coef: number[]) {
        this.coefficients = coef;
    }
    
    setFun(fun: string) {
        this.predFun = fun;
    }
    
    setOpt(conf: string){
        if(this.opt) this.opt.setValueFile(conf);
    }

    // Write the predictor class as a JSON and return the relative string
    toJSON(): string {
        const textFile = 
`{
    "GroupName": "ProApes",
    "Version": "3.0.0-1.9",
    "PluginName": "PredireInGrafana",
    "algorithm": "${this.algorithm}",
    "coefficients": [${this.coefficients}],
    "predFun": "${this.predFun}",
    "opt": ${JSON.stringify(this.opt)},
    "accuracy": "${this.accuracy}"
}`; // string output
        return textFile;
    }
}