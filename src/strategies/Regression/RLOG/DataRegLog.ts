import DataRegression from "../DataRegression";

export default class DataRegLog extends DataRegression {
    
    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push(  coef[0] + coef[1]*Math.log(element) );
        });
        this.setYLine(yline);
    }

}