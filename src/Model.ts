/**
 * Project: Predire in Grafana
 * File: Model.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-20
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Model class for incpsulation of buisness logic.
 */

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

    // Save import data array in the correct form of data
    public setData(input: number[][]): void {
        if(this.data) this.data.setValue(input);
    }

    // Set the algorithm to use and create the correct Strategy and Data objects
    public setAlgorithm(alg: string): void {
        this.predictor.setAlg(alg);
        this.strategy = strategies[alg];
        this.data = data[alg];
    }

    public setPredictorOptions(config: string): void {
        this.predictor.setOpt(config);
    }

    // Train the algortihm with the data and the option, it saves in the predictor and call the method for creating the line
    public train(): void {
        const opt = this.predictor.getOpt();
        if(this.strategy && this.data && opt){
            this.predictor = this.strategy.train(this.data, opt);
            this.data.setPointsLine(this.predictor.getCoef());
        }    
    }

    // Download predictor as JSON
    public downloadPredictor(): void {
        const FileSaver = require('file-saver'); // import file saver
        const text = this.predictor.toJSON();
        const file = new File([text], 'Training.json', { type: 'text/json;charset=utf-8' });
        FileSaver.saveAs(file); // download
    }

}