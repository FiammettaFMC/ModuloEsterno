import Option from "../Option";

export default class OptionRL implements Option {
    private order: number = 2;
    private precision: number = 2;

    public getOrder(): number {
        return this.order;
    }

    public getPrecision(): number {
        return this.precision;
    }

    public setPrecision(p: number): void {
        this.precision = p;
    }

    public setValueFile(config: string): void {
        try {
            let predictor = JSON.parse(config);
            this.order = predictor.opt.order;
            this.precision = predictor.opt.precision;
        } catch (e){
            throw new Error('Predictor bad formatted');
        }
    }
}