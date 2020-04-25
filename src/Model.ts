import Strategy from './strategies/Strategy';
import { observable } from 'mobx';
import { strategies, data } from './strategies/Strategies';
import Predictor from './Predictor';    
import Data from './strategies/Data';


export default class Model {
    @observable private data?: Data;
    @observable private predictor: Predictor = new Predictor();
    private strategy?: Strategy;
   
    public getData(): Data | undefined {
        return this.data;
    }

    public getPredictor(): Predictor {
        return this.predictor;
    }

    /** Load file and save it in data */
    public setData(input: number[][]): void {
        this.data?.setValue(input);
    }

    /** Set the algorithm to use thanks to the Context*/
    public setAlgorithm(alg: string): void {
        this.predictor.setAlg(alg);
        this.strategy = strategies[alg];
        this.data = data[alg];
    }

    public setPredictorOptions(config: string): void {
        this.predictor.setOpt(config);
    }

    /** Save the predictor in function */
    public train(): void {
        const opt = this.predictor.getOpt();
        if(this.strategy && this.data && opt){
            this.predictor = this.strategy.train(this.data, opt);
            this.data.setPointsLine(this.predictor.getCoef());
        }    
    }

    /** Download predictor as JSON */
    public downloadPredictor(): void {
        const FileSaver = require('file-saver'); // import file saver
        const text = this.predictor.toJSON();
        const file = new File([text], 'Training.json', { type: 'text/json;charset=utf-8' });
        FileSaver.saveAs(file); // download
    }

}