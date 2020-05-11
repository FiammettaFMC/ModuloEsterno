/**
 * Project: Predire in Grafana
 * File: StrategyRegExp.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-05-07
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing StrategyRegExp class for the algortihm Exponential Regression.
 */

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