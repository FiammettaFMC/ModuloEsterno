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