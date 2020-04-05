import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";
import { options, algview, graph } from './strategies/Strategies';

@observer
export default class ViewModel extends React.Component {
    
    private model: Model = new Model();
    private algorithm: string = 'RL';
    state = {
        algView: algview[''], 
        config: options[''],
        graph: graph['']
    }

    static validateFile(text: string){
        const fileReg = /[\d+.\d*,\d+.\d*\n]+/;
        if(text.match(fileReg))
            return true;
        else
            return false;
    }

    /** Data parsed from string to Array */
    static parseCSV(text: string) {
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

    buttonInput(input: any) {
        const reader = new FileReader(); // declare file reader
        let array: number[][] = [];
        reader.readAsText(input.files[0]); // read file
        reader.onload = (event) => { // when loaded (async?)
            const goodFormation: boolean = ViewModel.validateFile(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
            if(goodFormation){
                array = ViewModel.parseCSV(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                this.model.loadData(array);
                this.setState({ graph: this.model.parseDatatoChart(array) });
            } else{
                alert('Dati non formattati correttamente!');
            }
        };
    }

    setAlgorithm(alg: string){
        this.algorithm = alg;
    }

    clickSelectAlg() {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ config: options[this.algorithm] });
        this.setState({ algView: algview[this.algorithm] });
        this.setState({ graph: graph[this.algorithm] });
        document.getElementById('alg')?.setAttribute('disabled','true');
    }

    setConfOpt(conf: any) {
        this.setState({config: conf});
    }
    
    buttonTrain() {
        this.model.setOptions(this.state.config);
        this.model.train();
        this.setState({ graph: this.model.parseDatatoLine(this.state.graph) });
    }
    
    render() {
        return (
            <div>
                <View 
                    selectAlg = { (event) => {this.setAlgorithm(event.target.value)} }
                    buttonSelectAlg = {() => {this.clickSelectAlg()} }
                    buttonInput = {(event) => {this.buttonInput(event.target)}} 
                    data = {this.model.getData()}
                    buttonTrain = {() => this.buttonTrain()}
                    predictor = {this.model.getPredictor().function}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                    AlgView = {this.state.algView}
                    setConf = {this.setConfOpt.bind(this)}
                    graphPt = {this.state.graph}
                />
            </div>
        );
    }
}