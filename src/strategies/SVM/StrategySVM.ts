/**
 * Project: Predire in Grafana
 * File: StrategySVM.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-25
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing StrategySVM class for the algortihm SVM.
 */

import Strategy from "./../Strategy";
import Predictor from "../../Predictor";
import DataSVM from "./DataSVM";
import OptionSVM from "./OptionSVM";

export default class StrategySVM implements Strategy{

    /** SVM predictor: 
        {
         N: numero di punti
         D: dimensione dei punti (es. 2,3..)
         b: c della retta in forma implicita
         kernerlType: tipo di kernel
         w: a e b della retta in forma implicita
        }    
    */
    train(dataset: DataSVM,options: OptionSVM): Predictor {
        const svm = require('svm');
        const SVM = new svm.SVM();
        SVM.train(dataset.getPoints(),dataset.getLabels(),{C: options.getC(), maxiter: options.getMaxIter(), numpass: options.getNumPass()});
        const pred = SVM.predict(dataset.getPoints());
        let CM =[[0,0],[0,0]];
        for(let i=0;i<dataset.getLabels().length;i++){
            if(pred[i]>0){ //predicted positive
                if(dataset.getLabels()[i]===1) { //is positive
                    CM[0][0]++;
                }
                else{ //is negative
                    CM[0][1]++;
                }
            }
            else{ //predicted negative
                if(dataset.getLabels()[i]===1) { //is positive
                    CM[1][0]++;
                }
                else{ //is negative
                    CM[1][1]++;
                }
            }
        }
        let tp,fp,fn;
        tp = CM[0][0];
        // tn = CM[1][1];
        fp = CM[0][1];
        fn = CM[1][0];
        //precision
        let precision = tp/(tp+fp);
        //recall/sensitivity
        let recall = tp/(tp+fn);
        //F-measure
        let fMeasure = 2*(precision*recall)/(precision+recall);
        if( (tp+fp) === 0 || (tp+fn) === 0)
            fMeasure = 0;
        return new Predictor( 'SVM', 
                              [SVM.b,SVM.w[0],SVM.w[1]], // [ w0, w1, w2 ] = [ c, a, b ]
                              `y = ${-SVM.w[0]/SVM.w[1]}x + ${-SVM.b/SVM.w[0]}`,
                              options,
                              fMeasure
                            );
    }
    
}