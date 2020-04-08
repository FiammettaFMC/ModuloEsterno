
export default class Predictor {
    algorithm: string;
    coefficients: number[];
    predFun: string;
    opt: object;

    constructor(alg?: string, coef?: number[], func?: string, opt?: any) {
        this.algorithm = alg ? alg : '';
        this.coefficients = coef ? coef: [];
        this.predFun = func ? func : '';
        this.opt = opt ? opt : {};
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

    public static fromJSON(input: string) {
        let predictor: Predictor = JSON.parse(input);
        if(predictor)
            return predictor.opt;
        else
            throw new Error('Predictor bad formatted');
    }
}