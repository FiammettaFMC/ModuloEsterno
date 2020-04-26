import { DataPoint } from "regression";
import Data from "../Data";

export default class DataRL implements Data {
    private points: DataPoint[] = [];
    private xpoints: number[] = [];
    private ypoints: number[] = [];
    private yline: number[] = [];

    public setValue(dataset: number[][]): void{
        dataset.forEach( (p) => {
            let point: DataPoint = [0,0];
            point[0] = p[0];
            point[1] = p[1];
            this.points.push(point);
            this.xpoints.push(p[0]);
            this.ypoints.push(p[1]);
        });
    }

    public setPointsLine(coef: number[]): void {
        this.xpoints.forEach((element: number) => {
            this.yline.push( ( coef[0] * element) + coef[1] );
        });
    }

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

};