/**
 * Project: Predire in Grafana
 * File: Strategies.ts
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-25
 * Version: 3.0.0-1.10
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.10 - Writing dynamic array for the construction of the right class base to the algorithm.
 */

import Strategy from './Strategy';
import StrategyRL from './Regression/RL/StrategyRL';
import StrategySVM from './SVM/StrategySVM';
import AlgorithmViewSVM from './SVM/AlgorithmViewSVM';
import React from 'react';
import DataRL from './Regression/RL/DataRL';
import DataSVM from './SVM/DataSVM';
import Data from './Data';
import OptionSVM from './SVM/OptionSVM';
import Option from './Option';
import StrategyRegLog from './Regression/RLOG/StrategyRegLog';
import DataRegLog from './Regression/RLOG/DataRegLog';
import DataRegExp from './Regression/REXP/DataRegExp';
import OptionRegression from './Regression/OptionRegression';
import StrategyRegExp from './Regression/REXP/StrategyRegExp';
import AlgorithmViewRegression from './Regression/AlgorithmViewRegression';


export const strategies: { [index: string]: Strategy } = {
    'RL': new StrategyRL(),
    'SVM': new StrategySVM(),
    'RLOG': new StrategyRegLog(),
    'REXP': new StrategyRegExp()
};

export const algview: { [index: string]: typeof React.Component } = {
    'RL': AlgorithmViewRegression,
    'SVM': AlgorithmViewSVM,
    'RLOG': AlgorithmViewRegression,
    'REXP': AlgorithmViewRegression
};

export const data: { [index: string]: Data } = {
    'RL': new DataRL(),
    'SVM': new DataSVM(),
    'RLOG': new DataRegLog(),
    'REXP': new DataRegExp()
};

export const opt: { [index: string]: Option } = {
    'RL': new OptionRegression(),
    'REXP': new OptionRegression(),
    'RLOG': new OptionRegression(),
    'SVM': new OptionSVM()
};