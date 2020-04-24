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
        return new Predictor( 'SVM', 
                              [SVM.b,SVM.w[0],SVM.w[1]], // [ w0, w1, w2 ] = [ c, a, b ]
                              `y = ${-SVM.w[0]/SVM.w[1]}x + ${-SVM.b/SVM.w[0]}`,
                              options);
    }
    
}