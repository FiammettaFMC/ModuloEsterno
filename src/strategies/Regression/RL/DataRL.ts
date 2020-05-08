import DataRegression from "../DataRegression";

export default class DataRL extends DataRegression {

    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push( ( coef[0] * element) + coef[1] );
        });
        this.setYLine(yline);
    }

}