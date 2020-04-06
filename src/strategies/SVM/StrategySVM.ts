import Strategy from "./../Strategy";
import Predictor from "../../Predictor";

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
    train(dataset: number[][],options: any) {
        const svm = require('svm');
        const SVM = new svm.SVM();
        let data: number[][] = [];
        let labels: number[] = [];
        dataset.forEach((triple) => {
            data.push([triple[0],triple[1]]);
            labels.push(triple[2]);
        });
        SVM.train(data,labels,options);
        return new Predictor( 'Support Vector Machine', 
                              [SVM.b,SVM.w[0],SVM.w[1]], // [ w0, w1, w2 ] = [ c, a, b ]
                              `y = ${-SVM.w[0]/SVM.w[1]}x + ${-SVM.b/SVM.w[0]}`,
                              options);
    }

    // Data parsed from Array to point of the graph 
    datatoChart(data: number[][]){
        let xR: number[] = [];
        let yR: number[] = [];
        let xW: number[] = [];
        let yW: number[] = [];
        data.forEach((couple) => {
            if(couple[2] === 1){
                xR.push(couple[0]);
                yR.push(couple[1]);
            } else { // couple[2] === -1
                xW.push(couple[0]);
                yW.push(couple[1]);
            }
        });
        return [xR,yR,xW,yW,[],[]];
    }

    // Data parsed from Array to point of a straight line of the graph
    datatoLine(graph: number[][],coefficients: number[]) {
        let lineY: number[] = [];
        const lineX: number[] = [...graph[0], ...graph[2]];
        lineX.forEach((element) => {
            lineY.push( ( -coefficients[1]/coefficients[2] * element) + -coefficients[0]/coefficients[2] );
        });
        return [ graph[0], graph[1], graph[2], graph[3], lineX, lineY ];
    }
    
}