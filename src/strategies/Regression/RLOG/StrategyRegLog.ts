import Strategy from "../../Strategy";
import regression from 'regression';
import Predictor from "../../../Predictor";
import DataRegLog from "./DataRegLog";
import OptionRegression from "../OptionRegression";

export default class StrategyRegLog implements Strategy{
    
    train(dataset: DataRegLog,options: OptionRegression): Predictor {
        return new Predictor( 'RLOG', 
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).equation, 
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).string,
                              options,
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).r2
                            );
    }
    
}