import Strategy from "../../Strategy";
import regression from 'regression';
import Predictor from "../../../Predictor";
import DataRLOG from "./DataRLOG";
import OptionR from "../OptionR";

export default class StrategyRLOG implements Strategy{
    
    train(dataset: DataRLOG,options: OptionR): Predictor {
        return new Predictor( 'RL', 
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).equation, 
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).string,
                              options,
                              regression.logarithmic(dataset.getPoints(), {order: options.getOrder(), precision: options.getPrecision()}).r2
                            );
    }
    
}