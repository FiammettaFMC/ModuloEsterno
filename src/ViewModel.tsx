import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";
import { algview, opt } from './strategies/Strategies';
import Predictor from './Predictor';

@observer
export default class ViewModel extends React.Component {
    
    private model: Model;
    private algorithm: string;
    state = {
        algView: undefined, 
        graph: [],
        options: {}
    }

    constructor(props: any) {
        super(props);
        this.model = new Model();
        this.algorithm = 'RL';
    }

    static validateFile(text: string): void{
        const fileReg = /^[-?\d.\d?,-?\d.\d?\n]+/;
        if(!text.match(fileReg)) {
            throw new Error('Data has wrong formattation!');
        }
    }

    /** Data parsed from string to Array */
    static parseCSVtoData(text: string): number[][] {
        /* csv delimiters */
        let row = "\n";
        let field = ",";
        let result: number[][] = []; //output

        text
            .trim() //remove white spaces
            .split(row) //separate rows
            .forEach((element) => {
                let sPoint = element.split(field);
                let point: number[] = [];
                sPoint.forEach((e) => { point.push(parseFloat(e)); })
                result.push(point);
            });
        return result;
    }

    loadData(input: File | null): void {
        const reader = new FileReader(); // declare file reader
        if(input) {
            reader.readAsText(input); // read file
            reader.onload = (event) => { // when loaded
                try {
                    ViewModel.validateFile(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' )
                    const data: number[][] = ViewModel.parseCSVtoData(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                    this.model.setData(data);
                    this.setState({ graph: this.model.datatoChart(data) });
                    document.getElementById('train')?.setAttribute('style','display: block');
                } catch(e){
                    alert(e);
                }
            };
        }
    }

    loadOpt(input: File | null): void {
        if(input) {
            const reader = new FileReader(); // declare file reader
            const exstension: string | undefined = input.name.split('.').pop();
            if(exstension === 'json') {
                reader.readAsText(input); // read file
                reader.onload = (event) => { // when loaded
                    try {
                        const config = Predictor.fromJSON(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                        this.model.setOptions(config);
                        this.setState({options: config});
                    } catch (e) {
                        alert(e);
                    }
                };
            } else
                alert('File extension is not json!');
        }
    }
    
    setAlgorithm(alg: string): void{
        this.algorithm = alg;
    }
    
    selectAlgorithm(): void {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ algView: algview[this.algorithm] });
        this.setState({ options: opt[this.algorithm] });
        this.setConfig(opt[this.algorithm]);
        let a = document.getElementById('alg');
        if(a) a.setAttribute('disabled','true');
        document.getElementById('import')?.setAttribute('style','display: block');
    }
    
    setConfig(conf: object): void {
        this.model.setOptions(conf);
    }
    
    train(): void {
        if(this.model.getData()){
            this.model.train();
            this.setState({ graph: this.model.datatoLine(this.state.graph) });
            document.getElementsByClassName('function')[0]?.setAttribute('style','display: block');
            document.getElementById('reset')?.setAttribute('style','display: block');
            document.getElementById('download')?.setAttribute('style','display: block');
        }
    }
    
    render() {
        return (
                <View 
                    selectAlg = { (event) => {this.setAlgorithm(event.target.value)} }
                    buttonSelectAlg = {() => {this.selectAlgorithm()} }
                    buttonInputData = {(e) => {this.loadData(e.target ? (e.target.files ? e.target.files[0]: null) : null )}} 
                    buttonInputOpt = {(e) => {this.loadOpt(e.target ? (e.target.files ? e.target.files[0]: null) : null )}} 
                    buttonTrain = {() => this.train()}
                    predictor = {this.model.getPredictor().predFun}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                    AlgView = {this.state.algView}
                    options = {this.state.options}
                    setConf = {this.setConfig.bind(this)}
                    graphPt = {this.state.graph}
                />
        );
    }
}