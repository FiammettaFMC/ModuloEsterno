
export default class Predictor {
    algorithm: string;
    coefficients: number[];
    function: string;
    options?: any;

    constructor(alg: string, coef: number[],func: string, opt: any) {
        this.algorithm = alg;
        this.coefficients = coef;
        this.function = func;
        this.options = opt;
    }

    toJSON(): string {
        const textFile = 
        `{
            "Algorithm": "${this.algorithm}",
            "Coefficients": "${this.coefficients}",
            "Function": "${this.function}",
            "Options": "${this.options ? this.options : ''}",
        }`; // string output
        return textFile;
    }
}