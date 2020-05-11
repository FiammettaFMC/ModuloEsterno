/**
 * Project: Predire in Grafana
 * File: StrategyRL.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-25
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing StrategyRL class for the algortihm Linear Regression.
 */


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