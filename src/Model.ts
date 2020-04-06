import Strategy from './strategies/Strategy';
import { observable } from 'mobx';
import { strategies } from './strategies/Strategies';
import Predictor from './Predictor';

export default class Model {
    
    @observable private data: number[][] = [];
    @observable private predictor: Predictor = new Predictor('',[],'',{});
    private strategy?: Strategy;
   
    public getData() {
        return this.data;
    }

    public getPredictor() {
        return this.predictor;
    }

    /** Set the algorithm to use thanks to the Context*/
    public setAlgorithm(alg: string){
        this.predictor.algorithm = alg;
        this.strategy = strategies[alg];
    }

    /** Load file and save it in data */
    public setData(input: number[][]) {
        this.data = input;
    }

    public setOptions(params: any) {
        this.predictor.options = params;
    }

    public parseDatatoChart(array: number[][]){
        return this.strategy?.datatoChart(array);
    }

    /** Save the predictor in function */
    public train() {
        if(this.strategy)
            this.predictor = this.strategy.train(this.data, this.predictor.options);
    }

    public parseDatatoLine(graph: number[][]){
        return this.strategy?.datatoLine(graph,this.predictor.coefficients);
    }

    /** Download predictor as JSON */
    public downloadPredictor() {
        const FileSaver = require('file-saver'); // import file saver
        const text = this.predictor.toJSON();
        const file = new File([text], 'Training.json', { type: 'text/json;charset=utf-8' });
        FileSaver.saveAs(file); // download
    }
}