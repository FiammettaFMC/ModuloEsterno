import DataR from "../DataR";

export default class DataREXP extends DataR {
    
    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push( coef[0]*Math.exp(coef[1]*element) );
        });
        this.setYLine(yline);
    }

}