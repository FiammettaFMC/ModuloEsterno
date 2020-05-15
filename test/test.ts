import 'jest';
import Predictor from '../src/Predictor';
import Model from '../src/Model';
import StrategyRL from '../src/strategies/Regression/RL/StrategyRL';
import StrategySVM from '../src/strategies/SVM/StrategySVM';
import ViewModel from '../src/ViewModel';
import OptionRegression from '../src/strategies/Regression/OptionRegression';
import DataRL from '../src/strategies/Regression/RL/DataRL';
import OptionSVM from '../src/strategies/SVM/OptionSVM';
import DataSVM from '../src/strategies/SVM/DataSVM';
import StrategyRegLog from '../src/strategies/Regression/RLOG/StrategyRegLog';
import DataRegLog from '../src/strategies/Regression/RLOG/DataRegLog';
import DataRegExp from '../src/strategies/Regression/REXP/DataRegExp';
import StrategyRegExp from '../src/strategies/Regression/REXP/StrategyRegExp';
import DataRegression from '../src/strategies/Regression/DataRegression';

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
    let pred = new Predictor('RL',[1,2],'y = 2x +4',new OptionRegression(),0.3);
    expect(pred.getAlg()).toBe('RL');    
    expect(pred.getCoef()).toEqual([1,2]);    
    expect(pred.getFun()).toBe('y = 2x +4');    
    expect(pred.getOpt()).toEqual(new OptionRegression());
    expect(pred.getAcc()).toBe(0.3);
});

test('setPredictor',()=>{
    let pred = new Predictor();
    pred.setOpt('{}');
    pred.setAlg('RL');
    pred.setCoef([1,2]);
    pred.setFun('y = 2x +4');
    pred.setOpt(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"order":2,"precision":2}
    }`);
    expect(pred.getAlg()).toBe('RL');    
    expect(pred.getCoef()).toEqual([1,2]);    
    expect(pred.getFun()).toBe('y = 2x +4');    
    expect(pred.getOpt()).toEqual(new OptionRegression());
});

test('parseStringtoJSONPredictor', ()=> {
    let pred = new Predictor('RL',[1,2],'y=2x+1',new OptionRegression(),0.3);
    expect(pred.toJSON()).toEqual(
`{
    "GroupName": "ProApes",
    "Version": "3.0.0-1.9",
    "PluginName": "PredireInGrafana",
    "algorithm": "RL",
    "coefficients": [1,2],
    "predFun": "y=2x+1",
    "opt": {"order":2,"precision":2},
    "accuracy": "0.3"
}`);
});


//TEST MODEL

test('setPredictorAlgorithm', ()=> {
    model.setAlgorithm('RL');
    expect(model.getPredictor().getAlg()).toBe('RL');
});

test('setPredictorOptions', ()=> {
    model.setPredictorOptions(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"order":2,"precision":2}
    }`);
    expect(model.getPredictor().getOpt()).toEqual(new OptionRegression());
});

test('setData', ()=> {
    let mod = new Model();
    mod.setData([[1,2]]);
    model.setData([[1,1],[2,2]]);
    let dat = new DataRL();
    dat.setValue([[1,1],[2,2]]);
    expect(model.getData()).toEqual(dat);
});

test('trainOnModel', ()=> {
    let mod = new Model();
    mod.train();
    model.train();
    expect(model.getPredictor()).toEqual(new Predictor('RL',[1,0],'y = 1x',new OptionRegression(),1));
});

test('downloadPredictor',()=>{
    model.downloadPredictor();
});

// TEST DATAREGRESSION
test('getDataRegression',()=>{
    let dat = new DataRegression();
    dat.setPointsLine([0,0]);
});


// TEST DATARL
test('DataRL',()=>{
    let dat = new DataRL();
    dat.setValue([[1,1],[2,2]]);
    expect(dat.getXPoints()).toEqual([1,2]);
    expect(dat.getYPoints()).toEqual([1,2]);
    dat.setPointsLine([1,0]);
    expect(dat.getYLine()).toEqual([1,2]);
});

// TEST DATARLOG
test('DataRLOG',()=>{
    let dat = new DataRegLog();
    dat.setValue([[1,0],[2,Math.log(2)]]);
    expect(dat.getXPoints()).toEqual([1,2]);
    expect(dat.getYPoints()).toEqual([0,Math.log(2)]);
    dat.setPointsLine([0,1]);
    expect(dat.getYLine()).toEqual([0,Math.log(2)]);
});

// TEST DATAREXP
test('DataREXP',()=>{
    let dat = new DataRegExp();
    dat.setValue([[0,1],[1,Math.E]]);
    expect(dat.getXPoints()).toEqual([0,1]);
    expect(dat.getYPoints()).toEqual([1,Math.E]);
    dat.setPointsLine([1,1]);
    expect(dat.getYLine()).toEqual([1,Math.E]);
});

// TEST DATASVM
test('DataSVM',()=>{
    let dat = new DataSVM();
    dat.setValue([[0,1,1],[1,0,-1]]);
    expect(dat.getXRPoints()).toEqual([0]);
    expect(dat.getXWPoints()).toEqual([1]);
    expect(dat.getYRPoints()).toEqual([1]);
    expect(dat.getYWPoints()).toEqual([0]);
    expect(dat.getPoints()).toEqual([[0,1],[1,0]]);
    expect(dat.getLabels()).toEqual([1,-1]);
    dat.setPointsLine([0,-1,1]);
    expect(dat.getXLine()).toEqual([0,1]);
    expect(dat.getYLine()).toEqual([0,1]);
});

// TEST OPTIONREGRESSION

test('setAndgetPrecRegression',()=>{
    let op = new OptionRegression();
    op.setPrecision(3);
    expect(op.getPrecision()).toBe(3);
    expect(op.getOrder()).toBe(2);
});

test('importJSONErrorRegression',()=>{
    let op = new OptionRegression();
    expect(() => {op.setValueFile('{"opt}')}).toThrowError(new Error('Predictor bad formatted'));    
});

// TEST OPTIONSVM

test('setAndgetPrecSVM',()=>{
    let op = new OptionSVM();
    op.setC(2);
    op.setMaxIter(10100);
    op.setNumPass(14);
    expect(op.getC()).toBe(2);
    expect(op.getMaxIter()).toBe(10100);
    expect(op.getNumPass()).toBe(14);
});

test('importJSONSVM',()=>{
    let op = new OptionSVM();
    expect(() => {op.setValueFile('{"opt}')}).toThrowError(new Error('Predictor bad formatted'));    
    op.setValueFile(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"C":2,"maxiter":10100,"numpass":12}
    }`);
    expect(op.getC()).toBe(2);
    expect(op.getMaxIter()).toBe(10100);
    expect(op.getNumPass()).toBe(12);
});

//TEST STRATEGYRL

test('trainOnStrategyRL', ()=> {
    let rl = new StrategyRL();
    let dat = new DataRL();
    dat.setValue([[1,1],[2,2]]);
    expect(rl.train(dat,new OptionRegression())).toEqual(new Predictor('RL',[1,0],'y = 1x', new OptionRegression(),1));
});

//TEST STRATEGYRLOG

test('trainOnStrategyRLOG', ()=> {
    let rl = new StrategyRegLog();
    let dat = new DataRegLog();
    dat.setValue([[1,0],[2,Math.log(2)]]);
    expect(rl.train(dat,new OptionRegression())).toEqual(new Predictor('RLOG',[0,1],'y = 0 + 1 ln(x)', new OptionRegression(),1));
});

//TEST STRATEGYREXP

test('trainOnStrategyREXP', ()=> {
    let rl = new StrategyRegExp();
    let dat = new DataRegExp();
    dat.setValue([[0,1],[1,Math.E]]);
    expect(rl.train(dat,new OptionRegression())).toEqual(new Predictor('REXP',[1,1],'y = 1e^(1x)', new OptionRegression(),1));
});

//TEST STRATEGYSVM

test('trainOnStrategySVM', ()=> {
    let svm = new StrategySVM();
    let dat0 = new DataSVM();
    let dat1 = new DataSVM();
    let dat2 = new DataSVM();
    dat0.setValue([[0,1,1],[1,0,-1]]);
    expect(svm.train(dat0,new OptionSVM())).toEqual(new Predictor('SVM',[0,-1,1],'y = 1x + 0', new OptionSVM(),1));
    dat1.setValue([[0,1,-1],[1,2,1],[2,1,-1],[-1,0,1],[0,-1,-1],[1,0,1]]);
    let option = new OptionSVM();
    option.setNumPass(15);
    expect(svm.train(dat1,option)).toEqual(new Predictor('SVM',[0,-1,1],'y = 1x + 0', option,2/3));
    dat2.setValue([[0,1,-1],[1,2,-1],[2,1,-1],[-1,0,-1],[0,-1,-1],[1,0,-1],[0,0,-1],[1,1,-1],[2,2,-1],[10,-10,-1]]);
    expect(svm.train(dat2,new OptionSVM())).toEqual(new Predictor('SVM',[0,0,0],'y = NaNx + NaN', new OptionSVM(),0));
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

test('loadOptOnViewMOdel',()=>{ 
    const blob: any = new Blob(['{ "opt": 2 }'], { type: "text/html" });
    const blob2: any = new Blob(['{ "opt": 2 }'], { type: "text/html" });
    blob.lastModifiedDate = new Date();
    blob.name = "training.json";
    blob2.lastModifiedDate = new Date();
    blob2.name = "training.txt";
    const file = blob as File;
    const file2 = blob2 as File;
    vm.loadOpt(null);
    vm.loadOpt(file2);
    vm.loadOpt(file);
});

test('Render',() => {
    vm.render();
});

test('trainOnViewModel',() => {
    const blob: any = new Blob(['1,2\n3,4'], { type: "text/html" });
    blob.lastModifiedDate = new Date();
    blob.name = "filename";
    const file = blob as File;
    const blob1: any = new Blob(['0.2,-5\n0.3,-4\n0.4,-3\n0.6,-2\n1,0\n2,0.6\n3,1.2\n4,1.8\n6,2.6'], { type: "text/html" });
    blob1.lastModifiedDate = new Date();
    blob1.name = "filename";
    const file1 = blob as File;
    vm.setAlgorithm('RL');
    vm.selectAlgorithm();
    vm.loadData(file1);
    vm.train();
    vm.loadData(file);
    vm.train();
});