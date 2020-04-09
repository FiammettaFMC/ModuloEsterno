import 'jest';
import Predictor from '../src/Predictor';
import Model from '../src/Model';
import { DataPoint } from 'regression';
import StrategyRL from '../src/strategies/RL/StrategyRL';
import StrategySVM from '../src/strategies/SVM/StrategySVM';

jest.mock('react-plotlyjs-ts',()=>{});

let model: Model;
beforeAll(() => {
    model = new Model();
});


//TEST PREDICTOR

test('construnctor', ()=> {
    let pred = new Predictor('RL',[1,2],'y = 2x +4',{ord: 2, prec: 3});
    expect(pred.algorithm).toBe('RL');    
    expect(pred.coefficients).toEqual([1,2]);    
    expect(pred.predFun).toBe('y = 2x +4');    
    expect(pred.opt).toEqual({ord: 2, prec: 3});    
});

test('parsePredictorFromJSONtoObjectAndReturnOpt', ()=> {
    expect(Predictor.fromJSON('{ "opt": 2 }')).toBe(2);
});

test('parseStringtoJSONPredictor', ()=> {
    let pred = new Predictor('RL',[1,2],'y=2x+1',{ord:2,prec:2});
    expect(pred.toJSON()).toBe(
`{
    "algorithm": "RL",
    "coefficients": [1,2],
    "predFun": "y=2x+1",
    "opt": {"ord":2,"prec":2}
}`);
});


//TEST MODEL

test('setPredictorAlgorithm', ()=> {
    model.setAlgorithm('RL');
    expect(model.getPredictor().algorithm).toBe('RL');
});

test('setAlgorithmOptions', ()=> {
    model.setOptions({"ord": 2, "pre": 2});
    expect(model.getPredictor().opt).toEqual({"ord": 2, "pre": 2});
});

test('setData', ()=> {
    model.setData([[1,1],[2,2]]);
    expect(model.getData()).toEqual([[1,1],[2,2]]);
});

test('trainOnModel', ()=> {
    model.train();
    expect(model.getPredictor()).toEqual(new Predictor('RL',[1,0],'y = 1x',{"ord": 2, "pre": 2}));
});

//TEST STRATEGYRL

test('parseArrayToDataPointOnStrategyRL', ()=> {
    let datap: DataPoint[] = [];
    datap.push([1,1],[2,2]);
    expect(StrategyRL.parseArrayToDataPoint(model.getData())).toEqual(datap);
});

test('trainOnStrategyRL', ()=> {
    let rl = new StrategyRL();
    expect(rl.train(model.getData(),{})).toEqual(new Predictor('RL',[1,0],'y = 1x'));
    expect(rl.train(model.getData(),{"ord": 2, "pre": 2})).toEqual(new Predictor('RL',[1,0],'y = 1x',{"ord": 2, "pre": 2}));
});

test('datatoChartOnStrategyRL', ()=> {
    let rl = new StrategyRL();
    expect(rl.datatoChart(model.getData())).toEqual([[1,2],[1,2],[]]);
});

test('datatoLineOnStrategyRL', ()=> {
    let rl = new StrategyRL();
    expect(rl.datatoLine([[1,2],[1,2],[]],model.getPredictor().coefficients)).toEqual([[1,2],[1,2],[1,2]]);
});

//TEST STRATEGYSVM

test('trainOnStrategySVM', ()=> {
    let svm = new StrategySVM();
    expect(svm.train([[0,1,1],[1,0,-1]],{})).toEqual(new Predictor('SVM',[0,-1,1],'y = 1x + 0'));
    expect(svm.train([[0,1,1],[1,0,-1]],{"C": 1, "maxiter": 10000, "numpass": 10})).toEqual(new Predictor('SVM',[0,-1,1],'y = 1x + 0',{"C": 1, "maxiter": 10000, "numpass": 10}));
});

test('datatoChartOnStrategySVM', ()=> {
    let svm = new StrategySVM();
    expect(svm.datatoChart([[0,1,1],[1,0,-1]])).toEqual([[0],[1],[1],[0],[],[]]);
});

test('datatoLineOnStrategySVM', ()=> {
    let svm = new StrategySVM();
    expect(svm.datatoLine([[0],[1],[1],[0],[],[]],[0,-1,1])).toEqual([[0],[1],[1],[0],[0,1],[0,1]]);
});
