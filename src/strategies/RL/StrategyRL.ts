import Strategy from "./../Strategy";
import regression, { DataPoint } from 'regression';

export default class StrategyRL implements Strategy{
    
    static parseArrayDataPoint(data: number[][]) {
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
        return {order: params.order, precision: params.precision};
    }

    /** Data parsed from Array to point of the graph */
    parseDatatoChart(data: number[][]){
        let xR: number[] = [];
        let yR: number[] = [];       
        data.forEach((couple) => {
            xR.push(couple[0]);
            yR.push(couple[1]);
        });
        return {
                pointsX: xR,
                pointsY: yR,
                pointsLineY: []
        };
    }

    /** Data parsed from Array to point of a straight line of the graph */
    parseDatatoLine(graph: any,coefficients: number[]) {
        let lineY: number[] = [];
        graph.pointsX.forEach((element: number) => {
            lineY.push( ( coefficients[0] * element) + coefficients[1] );
        });
        return {
            pointsX: graph.pointsX,
            pointsY: graph.pointsY,
            pointsLineY: lineY
        };
    }
    
}