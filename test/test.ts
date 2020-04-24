import 'jest';
import Predictor from '../src/Predictor';
import Model from '../src/Model';
import { DataPoint } from 'regression';
import StrategyRL from '../src/strategies/RL/StrategyRL';
import StrategySVM from '../src/strategies/SVM/StrategySVM';
import ViewModel from '../src/ViewModel';

jest.mock('react-plotlyjs-ts',()=>{});

let model: Model;
let vm: ViewModel; 
beforeAll(() => {
    model = new Model();
    vm = new ViewModel({});
    window.alert = jest.fn(()=>{});
    jest.mock('file-saver', ()=>({saveAs: jest.fn()}));
});


//TEST PREDICTOR

test('construnctor', ()=> {
    let pred = new Predictor('RL',[1,2],'y = 2x +4',{ord: 2, prec: 3});
    expect(pred.getAlg()).toBe('RL');    
    expect(pred.getCoef()).toEqual([1,2]);    
    expect(pred.getFun()).toBe('y = 2x +4');    
    expect(pred.getOpt()).toEqual({ord: 2, prec: 3});    
});

test('parsePredictorFromJSONtoObjectAndReturnOpt', ()=> {
    expect(Predictor.fromJSON('{ "opt": 2 }')).toBe(2);
});

test('parsePredictorFromJSONtoObjectThrowError', ()=> {
    expect(() => {Predictor.fromJSON('opt": 2 }')}).toThrowError(new Error('Predictor bad formatted'));
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
    expect(model.getPredictor().getAlg()).toBe('RL');
});

test('setAlgorithmOptions', ()=> {
    model.setOptions({"ord": 2, "pre": 2});
    expect(model.getPredictor().getOpt()).toEqual({"ord": 2, "pre": 2});
});

test('setData', ()=> {
    model.setData([[1,1],[2,2]]);
    expect(model.getData()).toEqual([[1,1],[2,2]]);
});

test('trainOnModel', ()=> {
    let mod = new Model();
    mod.train();
    model.train();
    expect(model.getPredictor()).toEqual(new Predictor('RL',[1,0],'y = 1x',{"ord": 2, "pre": 2}));
});

test('dataToChartOnModel', ()=> {
    let mod0 = new Model();
    mod0.datatoChart([[1,2],[3,4]]);
    expect(model.datatoChart(model.getData())).toEqual([[1,2],[1,2],[]]); //RL
    let mod = new Model();
    mod.setAlgorithm('SVM');
    mod.setData([[0,1,1],[1,0,-1]]);
    expect(mod.datatoChart(mod.getData())).toEqual([[0],[1],[1],[0],[],[]]); //SVM
});

test('dataToLineModel', ()=> {
    let mod0 = new Model();
    mod0.datatoLine([[1,2],[3,4]]);
    expect(model.datatoLine([[1,2],[1,2],[]])).toEqual([[1,2],[1,2],[1,2]]); //RL
    let mod = new Model();
    mod.setAlgorithm('SVM');
    mod.setData([[0,1,1],[1,0,-1]]);
    mod.setOptions({});
    mod.train();
    expect(mod.datatoLine([[0],[1],[1],[0],[],[]])).toEqual([[0],[1],[1],[0],[0,1],[0,1]]); //SVM
});

test('downloadPredictor',()=>{
    model.downloadPredictor();
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
    expect(rl.datatoLine([[1,2],[1,2],[]],model.getPredictor().getCoef())).toEqual([[1,2],[1,2],[1,2]]);
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


//TEST VIEWMODEL

test('validateFile',() => {
    ViewModel.validateFile('1,2\n3,4');
    expect(() => {ViewModel.validateFile('dass')}).toThrowError(new Error('Data has wrong formattation!'));
});

test('parseCSVtoData',() => {
    expect(ViewModel.parseCSVtoData('1,2\n3,4')).toEqual([[1,2],[3,4]]);
});

test('loadDataOnViewMOdel',()=>{
    const blob: any = new Blob(['1,2\n3,4'], { type: "text/html" });
    blob.lastModifiedDate = new Date();
    blob.name = "filename";
    const file = blob as File;
    const blob1: any = new Blob(['asas'], { type: "text/html" });
    blob1.lastModifiedDate = new Date();
    blob1.name = "filename";
    const file1 = blob1 as File;
    vm.loadData(file);
    vm.loadData(null);
    vm.loadData(file1);
});

test('setAlgorithm',() => {
    vm.setAlgorithm('RL');    
});

test('selecttAlgorithm',() => {
    vm.selectAlgorithm();    
});

test('setConfig',() => {
    vm.setConfig({ord: 2, prec: 2});    
});

test('loadOptOnViewMOdel',()=>{ 
    const blob: any = new Blob(['{ "opt": 2 }'], { type: "text/html" });
    blob.lastModifiedDate = new Date();
    blob.name = "training.json";
    const file = blob as File;
    vm.loadOpt(file);
    vm.loadOpt(null);
});

test('Render',() => {
    vm.render();
});

// test('trainOnViewModel',() => {
//     const blob: any = new Blob(['1,2\n3,4'], { type: "text/html" });
//     blob.lastModifiedDate = new Date();
//     blob.name = "filename";
//     const file = blob as File;
//     vm.selectAlgorithm();
//     vm.loadData(file);
//     vm.train();
// });