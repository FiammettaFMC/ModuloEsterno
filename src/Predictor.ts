import Option from "./strategies/Option";
import { opt } from "./strategies/Strategies";

export default class Predictor {
    private algorithm: string;
    private coefficients: number[];
    private predFun: string;
    private opt?: Option;

    constructor(alg?: string, coef?: number[], func?: string, opt?: Option) {
        this.algorithm = alg ? alg : '';
        this.coefficients = coef ? coef: [];
        this.predFun = func ? func : '';
        if(opt) this.opt = opt;
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
        this.opt?.setValueFile(conf);
    }

    toJSON(): string {
        const textFile = 
`{
    "algorithm": "${this.algorithm}",
    "coefficients": [${this.coefficients}],
    "predFun": "${this.predFun}",
    "opt": ${JSON.stringify(this.opt)}
}`; // string output
        return textFile;
    }
}