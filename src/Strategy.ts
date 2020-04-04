export default interface Strategy {
    train(dataset: number[][],options: any): any;
    setParams(params: any): any;
    parseDatatoChart(dataset: number[][]): any;
    parseDatatoLine(graph: any,coefficients: number[]): any;
}