import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";
import { options, algview } from './strategies/Strategies';

@observer
export default class ViewModel extends React.Component {
    
    private model: Model = new Model();
    private algorithm: string = 'RL';
    state = {
        algView: undefined, 
        config: options[''],
        graph: []
    }

    static validateFile(text: string){
        const fileReg = /[\d+.\d*,\d+.\d*\n]+/;
        if(text.match(fileReg))
            return true;
        else
            return false;
    }

    /** Data parsed from string to Array */
    static parseCSVtoData(text: string) {
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

    loadData(input: any) {
        const reader = new FileReader(); // declare file reader
        let array: number[][] = [];
        reader.readAsText(input.files[0]); // read file
        reader.onload = (event) => { // when loaded (async?)
            const goodFormation: boolean = ViewModel.validateFile(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
            if(goodFormation){
                array = ViewModel.parseCSVtoData(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                this.model.setData(array);
                this.setState({ graph: this.model.parseDatatoChart(array) });
            } else{
                alert('Dati non formattati correttamente!');
            }
        };
    }

    setAlgorithm(alg: string){
        this.algorithm = alg;
    }

    selectAlgorithm() {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ config: options[this.algorithm] });
        this.setState({ algView: algview[this.algorithm] });
        // this.setState({ graph: graph[this.algorithm] });
        document.getElementById('alg')?.setAttribute('disabled','true');
    }

    setConfig(conf: any) {
        this.setState({config: conf});
    }
    
    train() {
        this.model.setOptions(this.state.config);
        this.model.train();
        this.setState({ graph: this.model.parseDatatoLine(this.state.graph) });
    }
    
    render() {
        return (
            <div>
                <View 
                    selectAlg = { (event) => {this.setAlgorithm(event.target.value)} }
                    buttonSelectAlg = {() => {this.selectAlgorithm()} }
                    buttonInput = {(event) => {this.loadData(event.target)}} 
                    data = {this.model.getData()}
                    buttonTrain = {() => this.train()}
                    predictor = {this.model.getPredictor().function}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                    AlgView = {this.state.algView}
                    setConf = {this.setConfig.bind(this)}
                    graphPt = {this.state.graph}
                />
            </div>
        );
    }
}