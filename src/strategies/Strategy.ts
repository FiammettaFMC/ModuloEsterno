/**
 * Project: Predire in Grafana
 * File: Strategy.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-25
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing Strategy interface for the implementation of the relative pattern.
 */

import Predictor from "../Predictor";
import Data from "./Data";
import Option from "./Option";

export default interface Strategy {
    train(dataset: Data,options: Option): Predictor; // Train the algortihm 
}