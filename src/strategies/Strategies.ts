import Strategy from './Strategy';
import StrategyRL from './RL/StrategyRL';
import StrategySVM from './SVM/StrategySVM';
import AlgViewRL from './RL/AlgViewRL';
import AlgViewSVM from './SVM/AlgViewSVM';
import React from 'react';
import AlgView from './AlgView';

export const strategies: { [index: string]: Strategy } = {
    'RL': new StrategyRL(),
    'SVM': new StrategySVM()
};

export const algview: { [index: string]: typeof React.Component } = {
    '': AlgView,
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

export const graph: { [index: string]: any} = {
    '': {},
    'RL': {
        pointsX: [],
        pointsY: [],
        pointsLineY: []
    },
    'SVM': {
        pointsXR: [],
        pointsYR: [],
        pointsXW: [],
        pointsYW: [],
        pointsLineX: [],
        pointsLineY: []
    }
};