import Strategy from "../../Strategy";
import regression from 'regression';
import Predictor from "../../../Predictor";
import DataREXP from "./DataREXP";
import OptionR from "../OptionR";

export default class StrategyRLEXP implements Strategy{
    
    train(dataset: DataREXP,options: OptionR): Predictor {
        return new Predictor( 'RL', 
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).equation, 
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).string,
                              options,
                              regression.exponential(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).r2
                            );
    }
    
}