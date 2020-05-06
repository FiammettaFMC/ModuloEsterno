import Data from "../Data";

export default class DataSVM implements Data {
    private points: number[][] = [];
    private labels: number[] = [];
    private xRpoints: number[] = [];
    private yRpoints: number[] = [];
    private xWpoints: number[] = [];
    private yWpoints: number[] = [];
    private xline: number[] = [];
    private yline: number[] = [];

    public setValue(dataset: number[][]): void{
        dataset.forEach((triple) => {
            this.points.push([triple[0],triple[1]]);
            this.labels.push(triple[2]);
        });
        dataset.forEach((couple) => {
            if(couple[2] === 1){
                this.xRpoints.push(couple[0]);
                this.yRpoints.push(couple[1]);
            } else { // couple[2] === -1
                this.xWpoints.push(couple[0]);
                this.yWpoints.push(couple[1]);
            }
        });
    }

    public setPointsLine(coef: number[]): void {
        this.xline = [...this.xRpoints, ...this.xWpoints];
        this.xline.forEach((element) => {
            this.yline.push( ( -coef[1]/coef[2] * element) + -coef[0]/coef[2] );
        });
    }

    public getPoints(): number[][] {
        return this.points;
    }

    public getLabels(): number[] {
        return this.labels;
    }

    public getXRPoints(): number[] {
        return this.xRpoints;
    }
    
    public getXWPoints(): number[] {
        return this.xWpoints;
    }
    
    public getYRPoints(): number[] {
        return this.yRpoints;
    }
    
    public getYWPoints(): number[] {
        return this.yWpoints;
    }
    
    public getXLine(): number[] {
        return this.xline;
    }

    public getYLine(): number[] {
        return this.yline;
    }
}