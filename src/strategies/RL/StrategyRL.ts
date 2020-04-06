import Strategy from "./../Strategy";
import regression, { DataPoint } from 'regression';
import Predictor from "../../Predictor";

export default class StrategyRL implements Strategy{
    
    static parseArrayToDataPoint(data: number[][]) {
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
        const datapoint = StrategyRL.parseArrayToDataPoint(dataset);
        return new Predictor( 'Regressione Lineare', 
                              regression.linear(datapoint, options).equation, 
                              regression.linear(datapoint, options).string,
                              options);
    
    }

    /** Data parsed from Array to point of the graph */
    datatoChart(data: number[][]){
        let xR: number[] = [];
        let yR: number[] = [];       
        data.forEach((couple) => {
            xR.push(couple[0]);
            yR.push(couple[1]);
        });
        return [xR, yR, []];
    }

    /** Data parsed from Array to point of a straight line of the graph */
    datatoLine(graph: number[][],coefficients: number[]) {
        let lineY: number[] = [];
        graph[0].forEach((element: number) => {
            lineY.push( ( coefficients[0] * element) + coefficients[1] );
        });
        return [graph[0], graph[1], lineY];
    }
    
}