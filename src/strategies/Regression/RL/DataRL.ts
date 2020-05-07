import DataR from "../DataR";

export default class DataRL extends DataR {

    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push( ( coef[0] * element) + coef[1] );
        });
        this.setYLine(yline);
    }

}