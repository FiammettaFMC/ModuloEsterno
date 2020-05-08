import Strategy from "../../Strategy";
import regression from 'regression';
import Predictor from "../../../Predictor";
import DataRL from "./DataRL";
import OptionRegression from "../OptionRegression";

export default class StrategyRL implements Strategy{
    
    train(dataset: DataRL,options: OptionRegression): Predictor {
        return new Predictor( 'RL', 
                              regression.linear(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).equation, 
                              regression.linear(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).string,
                              options,
                              regression.linear(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).r2
                            );
    }
    
}