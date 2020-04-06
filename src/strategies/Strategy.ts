import Predictor from "../Predictor";

export default interface Strategy {
    train(dataset: number[][],options: any): Predictor;
    datatoChart(dataset: number[][]): number[][];
    datatoLine(graph: number[][],coefficients: number[]): number[][];
}