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

    toJSON(): string {
        const textFile = 
`{
    "GroupName": "ProApes",
    "Version": "1.5",
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