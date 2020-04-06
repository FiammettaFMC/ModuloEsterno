import Strategy from './Strategy';
import StrategyRL from './RL/StrategyRL';
import StrategySVM from './SVM/StrategySVM';
import AlgViewRL from './RL/AlgorithmViewRL';
import AlgViewSVM from './SVM/AlgorithmViewSVM';
import React from 'react';

export const strategies: { [index: string]: Strategy } = {
    'RL': new StrategyRL(),
    'SVM': new StrategySVM()
};

export const algview: { [index: string]: typeof React.Component } = {
    'RL': AlgViewRL,
    'SVM': AlgViewSVM
};