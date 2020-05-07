import DataR from "../DataR";

export default class DataRLOG extends DataR {
    
    public setPointsLine(coef: number[]): void {
        let yline: number[] = [];
        this.getXPoints().forEach((element: number) => {
            yline.push(  coef[0] + coef[1]*Math.log(element) );
        });
        this.setYLine(yline);
    }

}