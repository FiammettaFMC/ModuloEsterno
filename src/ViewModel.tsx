import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";
import { algview, opt } from './strategies/Strategies';
import Predictor from './Predictor';

@observer
export default class ViewModel extends React.Component {
    
    private model: Model = new Model();
    private algorithm: string = 'RL';
    state = {
        algView: undefined, 
        graph: [],
        options: {}
    }

    private static validateFile(text: string): void{
        const fileReg = /^[\d.\d,\d.\d\n]+/; 
        if(!text.match(fileReg)) {
            throw new Error('Data has wrong formattation!');
        }
    }

    /** Data parsed from string to Array */
    private static parseCSVtoData(text: string): number[][] {
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
                sPoint.forEach((e) => { point.push(parseInt(e)); })
                result.push(point);
            });
        return result;
    }

    private loadData(input: FileList | null): void {
        const reader = new FileReader(); // declare file reader
        if(input) {
            reader.readAsText(input[0]); // read file
            reader.onload = (event) => { // when loaded
                try {
                    ViewModel.validateFile(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' )
                    const data: number[][] = ViewModel.parseCSVtoData(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                    this.model.setData(data);
                    this.setState({ graph: this.model.datatoChart(data) });
                } catch(e){
                    alert(e);
                }
            };
        }
    }

    private loadOpt(input: FileList | null): void {
        if(input) {
            const reader = new FileReader(); // declare file reader
            const exstension: string | undefined = input[0].name.split('.').pop();
            if(exstension === 'json') {
                reader.readAsText(input[0]); // read file
                reader.onload = (event) => { // when loaded
                    try {
                        const opt = Predictor.fromJSON(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                        this.model.setOptions(opt);
                        this.setState({options: opt});
                    } catch (e) {
                        alert(e);
                    }
                };
            } else
                alert('File extension is not json!');
        }
    }
    
    private setAlgorithm(alg: string): void{
        this.algorithm = alg;
    }
    
    private selectAlgorithm(): void {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ algView: algview[this.algorithm] });
        this.setState({ options: opt[this.algorithm] });
        document.getElementById('alg')?.setAttribute('disabled','true');
    }
    
    private setConfig(conf: object): void {
        this.model.setOptions(conf);
    }
    
    private train(): void {
        this.model.train();
        this.setState({ graph: this.model.datatoLine(this.state.graph) });
    }
    
    render() {
        return (
            <div>
                <View 
                    selectAlg = { (event) => {this.setAlgorithm(event.target.value)} }
                    buttonSelectAlg = {() => {this.selectAlgorithm()} }
                    buttonInputData = {(event) => {this.loadData(event.target.files)}} 
                    buttonInputOpt = {(event) => {this.loadOpt(event.target.files)}} 
                    data = {this.model.getData()}
                    buttonTrain = {() => this.train()}
                    predictor = {this.model.getPredictor().predFun}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                    AlgView = {this.state.algView}
                    options = {this.state.options}
                    setConf = {this.setConfig.bind(this)}
                    graphPt = {this.state.graph}
                />
            </div>
        );
    }
}