import Predictor from "../Predictor";
import Data from "./Data";
import Option from "./Option";

export default interface Strategy {
    train(dataset: Data,options: Option): Predictor;
}