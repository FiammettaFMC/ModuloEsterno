import Strategy from "../../Strategy";
import regression from 'regression';
import Predictor from "../../../Predictor";
import DataRegExp from "./DataRegExp";
import OptionRegression from "../OptionRegression";

export default class StrategyRegExp implements Strategy{
    
    train(dataset: DataRegExp,options: OptionRegression): Predictor {
        return new Predictor( 'REXP', 
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).equation, 
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).string,
                              options,
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).r2
                            );
    }
    
}