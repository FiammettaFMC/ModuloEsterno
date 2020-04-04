import Strategy from "./Strategy";
import regression, { DataPoint } from 'regression';

export default class StrategyRL implements Strategy{
    
    public static parseArrayDataPoint(data: number[][]) {
        let datapoint: DataPoint[] = [];
        data.forEach( (p) => {
            let point: DataPoint = [0,0];
            point[0] = p[0];
            point[1] = p[1];
            datapoint.push(point);
        });
        return datapoint;
    }
    
    train(dataset: number[][],options: any) {
        const datapoint = StrategyRL.parseArrayDataPoint(dataset);
        return {
            algorithm: 'Regressione Lineare',
            coefficients: regression.linear(datapoint, options).equation,
            function: regression.linear(datapoint, options).string,
            options: options,
            accuracy: {}
        };
    }

    /* Options:
        {
            order: numero di paramerti
            precision: numero di cifre dopo la virgola
        }
     */
    setParams(params: any) {
        return {order: params[0], precision: params[1]};
    }

    /** Data parsed from Array to point of the graph */
    parseDatatoChart(data: number[][]){
        let xR: number[] = [];
        let yR: number[] = [];       
        data.forEach((couple) => {
            xR.push(couple[0]);
            yR.push(couple[1]);
        });
        const colorR: string = 'orange';
        return {
                pointXR: xR,
                pointYR: yR,
                pointXW: [],
                pointYW: [],
                pointLineX: [],
                pointLineY: [],
                colorR: colorR,
                colorW: ''
        };
    }

    /** Data parsed from Array to point of a straight line of the graph */
    parseDatatoLine(graph: any,coefficients: number[]) {
        let lineY: number[] = [];
        graph.pointXR.forEach((element: number) => {
            lineY.push( ( coefficients[0] * element) + coefficients[1] );
        });
        return {
            pointXR: graph.pointXR,
            pointYR: graph.pointYR,
            pointXW: graph.pointXW,
            pointYW: graph.pointYW,
            pointLineX: graph.pointXR,
            pointLineY: lineY,
            colorR: graph.colorR,
            colorW: graph.colorW
        };
    }
    
}