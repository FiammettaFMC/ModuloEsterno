import Strategy from './Strategy';
import StrategyRL from './Regression/RL/StrategyRL';
import StrategySVM from './SVM/StrategySVM';
import AlgViewR from './Regression/AlgorithmViewR';
import AlgViewSVM from './SVM/AlgorithmViewSVM';
import React from 'react';
import DataRL from './Regression/RL/DataRL';
import DataSVM from './SVM/DataSVM';
import Data from './Data';
import OptionR from './Regression/OptionR';
import OptionSVM from './SVM/OptionSVM';
import Option from './Option';
import StrategyRLOG from './Regression/RLOG/StrategyRLOG';
import StrategyREXP from './Regression/REXP/StrategyREXP';
import DataRLOG from './Regression/RLOG/DataRLOG';
import DataREXP from './Regression/REXP/DataREXP';


export const strategies: { [index: string]: Strategy } = {
    'RL': new StrategyRL(),
    'SVM': new StrategySVM(),
    'RLOG': new StrategyRLOG(),
    'REXP': new StrategyREXP()
};

export const algview: { [index: string]: typeof React.Component } = {
    'RL': AlgViewR,
    'SVM': AlgViewSVM,
    'RLOG': AlgViewR,
    'REXP': AlgViewR
};

export const data: { [index: string]: Data } = {
    'RL': new DataRL(),
    'SVM': new DataSVM(),
    'RLOG': new DataRLOG(),
    'REXP': new DataREXP()
};

export const opt: { [index: string]: Option } = {
    'RL': new OptionR(),
    'REXP': new OptionR(),
    'RLOG': new OptionR(),
    'SVM': new OptionSVM()
};