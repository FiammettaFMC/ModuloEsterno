import Strategy from "./Strategy";

export default class StrategySVM implements Strategy{

    private svm = require('svm');
    private SVM = new this.svm.SVM();

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
        let data: number[][] = [];
        let labels: number[] = [];
        dataset.forEach((triple) => {
            data.push([triple[0],triple[1]]);
            labels.push(triple[2]);
        });
        this.SVM.train(data,labels,options);
        return {
            algorithm: 'Support Vector Machine',
            coefficients: [this.SVM.b,this.SVM.w[0],this.SVM.w[1]], // [ w0, w1, w2 ] = [ c, a, b ]
            function: `y = ${-this.SVM.w[0]/this.SVM.w[1]}x + ${-this.SVM.b/this.SVM.w[0]}`,
            options: options,
            accuracy: {}
        };
    }
    
/** Options:
    {
        C = 1.0; For C, Higher = you trust your data more. Lower = more regularization. Should be in range of around 1e-2 ... 1e5 at most.
        tol = 1e-4; // do not touch this unless you're pro
        alphatol = 1e-7; // used for pruning non-support vectors. do not touch unless you're pro
        maxiter // if you have a larger problem, you may need to increase this
        kernel // kernel type
        numpasses = 10; // increase this for higher precision of the result. (but slower)
    }
*/
    setParams(params: any) {
        return {
            C: params.C,
            tol: params.tol,
            alphatol: params.alphatol,
            maxiter: params.maxiter,
            kernel: params.kernel,
            numpasses: params.numpasses
        };
    }

    // Data parsed from Array to point of the graph 
    parseDatatoChart(data: number[][]){
        let xR: number[] = [];
        let yR: number[] = [];
        let xW: number[] = [];
        let yW: number[] = [];
        let colorR: string = 'green';
        let colorW: string = 'red';
        data.forEach((couple) => {
            if(couple[2] === 1){
                xR.push(couple[0]);
                yR.push(couple[1]);
            } else { // couple[2] === -1
                xW.push(couple[0]);
                yW.push(couple[1]);
            }
        });
        return {
                pointXR: xR,
                pointYR: yR,
                pointXW: xW,
                pointYW: yW,
                pointLineX: [],
                pointLineY: [],
                colorR: colorR,
                colorW: colorW
        };
    }

    // Data parsed from Array to point of a straight line of the graph
    parseDatatoLine(graph: any,coefficients: number[]) {
        let lineY: number[] = [];
        const lineX: number[] = [...graph.pointXR, ...graph.pointXW];
        lineX.forEach((element) => {
            lineY.push( ( -coefficients[1]/coefficients[2] * element) + -coefficients[0]/coefficients[2] );
        });
        return {
            pointXR: graph.pointXR,
            pointYR: graph.pointYR,
            pointXW: graph.pointXW,
            pointYW: graph.pointYW,
            pointLineX: lineX,
            pointLineY: lineY,
            colorR: graph.colorR,
            colorW: graph.colorW
        };
    }
    
}