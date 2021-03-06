import { DataPoint } from "regression";
import Data from "../Data";

export default class DataRegression implements Data {
    private points: DataPoint[] = [];
    private xpoints: number[] = [];
    private ypoints: number[] = [];
    private yline: number[] = [];

    public setValue(dataset: number[][]): void{
        this.points = [];
        this.xpoints = []; 
        this.ypoints = [];
        dataset.forEach( (p) => {
            let point: DataPoint = [0,0];
            point[0] = p[0];
            point[1] = p[1];
            this.points.push(point);
            this.xpoints.push(p[0]);
            this.ypoints.push(p[1]);
        });
    }

    public setPointsLine(coef: number[]): void {}

    public getPoints(): DataPoint[] {
        return this.points;
    }

    public getXPoints(): number[] {
        return this.xpoints;
    }

    public getYPoints(): number[] {
        return this.ypoints;
    }

    public getYLine(): number[] {
        return this.yline;
    }

    public setYLine(line: number[]): void {
        this.yline = line;
    }

}