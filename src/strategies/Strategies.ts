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

export const options: { [index: string]: any} = {
    '': {},
    'RL': {
        order: 2,
        precision: 2
    },
    'SVM': {
        C: 1.0,
        maxiter: 10000,
        numpass: 10
    }
};