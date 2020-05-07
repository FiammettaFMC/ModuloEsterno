import Strategy from './Strategy';
import StrategyRL from './RL/StrategyRL';
import StrategySVM from './SVM/StrategySVM';
import AlgViewRL from './RL/AlgorithmViewRL';
import AlgViewSVM from './SVM/AlgorithmViewSVM';
import React from 'react';
import DataRL from './RL/DataRL';
import DataSVM from './SVM/DataSVM';
import Data from './Data';
import OptionRL from './RL/OptionRL';
import OptionSVM from './SVM/OptionSVM';
import Option from './Option';


export const strategies: { [index: string]: Strategy } = {
    'RL': new StrategyRL(),
    'SVM': new StrategySVM()
};

export const algview: { [index: string]: typeof React.Component } = {
    'RL': AlgViewRL,
    'SVM': AlgViewSVM
};

export const data: { [index: string]: Data } = {
    'RL': new DataRL(),
    'SVM': new DataSVM()
};

export const opt: { [index: string]: Option } = {
    'RL': new OptionRL(),
    'SVM': new OptionSVM()
};