import Strategy from './strategies/Strategy';
import { observable } from 'mobx';
import { strategies } from './strategies/Strategies';
import Predictor from './Predictor';    

export default class Model {
    
    @observable private data: number[][] = [];
    @observable private predictor: Predictor = new Predictor();
    private strategy?: Strategy;
   
    public getData(): number[][] {
        return this.data;
    }

    public getPredictor(): Predictor {
        return this.predictor;
    }

    /** Load file and save it in data */
    public setData(input: number[][]): void {
        this.data = input;
    }

    /** Set the algorithm to use thanks to the Context*/
    public setAlgorithm(alg: string): void {
        this.predictor.algorithm = alg;
        this.strategy = strategies[alg];
    }

    public setOptions(params: object): void {
        this.predictor.opt = params;
    }

    public datatoChart(array: number[][]): number[][] | undefined {
        return this.strategy?.datatoChart(array);
    }

    /** Save the predictor in function */
    public train(): void {
        if(this.strategy)
            this.predictor = this.strategy.train(this.data, this.predictor.opt);
    }

    public datatoLine(graph: number[][]): number[][] | undefined {
        return this.strategy?.datatoLine(graph,this.predictor.coefficients);
    }

    /** Download predictor as JSON */
    public downloadPredictor(): void {
        const FileSaver = require('file-saver'); // import file saver
        const text = this.predictor.toJSON();
        const file = new File([text], 'Training.json', { type: 'text/json;charset=utf-8' });
        FileSaver.saveAs(file); // download
    }
}