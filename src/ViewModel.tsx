/**
 * Project: Predire in Grafana
 * File: ViewModel.tsx
 * Author: Igor Biolcati Rinaldi
 * Created: 2020-02-20
 * Version: 3.0.0-1.9
 * -----------------------------------------------------------------------------------------
 * Copyright 2020 ProApesGroup.
 * Licensed under the MIT License. See LICENSE in the project root for license informations.
 * -----------------------------------------------------------------------------------------
 * Changelog:
 * 3.0.0-1.9 - Writing ViewModel class for manage the Model and the View.
 */

import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";
import { algview, opt, data } from './strategies/Strategies';

@observer
export default class ViewModel extends React.Component {
    
    private model: Model;
    private algorithm: string;
    state = {
        algView: undefined,
        graphPt: undefined,
        options: {}
    }

    constructor(props: any) {
        super(props);
        this.model = new Model();
        this.algorithm = 'RL';
    }

    // Check if the the file with dataset is right formatted
    static validateFile(text: string): void{
        const fileReg = /^[-?\d.\d?,-?\d.\d?\n]+/;
        if(!text.match(fileReg)) {
            throw new Error('Data has wrong formattation!');
        }
    }

    // Data parsed from string to Array
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

    // Load the file with dataset and save in the model
    loadData(input: File | null): void {
        const reader = new FileReader(); // declare file reader
        if(input) {
            reader.readAsText(input); // read file
            try {
                reader.onload = (event) => { // when loaded
                    ViewModel.validateFile(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' )
                    const dat = ViewModel.parseCSVtoData(event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                    this.model.setData(dat);
                    this.setState({graphPt: this.model.getData()});
                    let t = document.getElementById('train');
                    if(t) t.setAttribute('style','display: block');
                };
            } catch(e){
                alert(e);
            }
        }
    }

    // Load the file with a predictor for extract the options and save them in the model
    loadOpt(input: File | null): void {
        if(input) {
            const reader = new FileReader(); // declare file reader
            const exstension: string | undefined = input.name.split('.').pop();
            if(exstension === 'json') {
                reader.readAsText(input); // read file
                try {
                    reader.onload = (event) => { // when loaded
                        const config: string = (event.target ? (event.target.result ? event.target.result.toString() : '' ): '' );
                        this.model.setPredictorOptions(config);
                        this.setState({options: this.model.getPredictor().getOpt()});
                    };
                } catch (e) {
                    alert(e);
                }
            } else
                alert('File extension is not json!');
        }
    }
    
    // Set the algorithm on ViewModel on user changes
    setAlgorithm(alg: string): void{
        this.algorithm = alg;
    }
    
    // Set the algorithm choosen to the model
    selectAlgorithm(): void {
        this.model.setAlgorithm(this.algorithm);
        this.setState({ algView: algview[this.algorithm] });
        this.setState({ options: opt[this.algorithm] });
        this.setState({ graphPt: data[this.algorithm] });
        let a = document.getElementById('alg');
        if(a) a.setAttribute('disabled','true');
        let i = document.getElementById('import');
        if(i) i.setAttribute('style','display: block');
    }
    
    // Call the train method on model
    train(): void {
        if(this.model.getData()){
            this.model.train();
            if(!this.model.getPredictor().getFun().match(/NaN/)){
                this.setState({graphPt: this.model.getData()});
                let f = document.getElementsByClassName('function');
                if(f[0] && f[1]) {
                    f[0].setAttribute('style','display: block');
                    f[1].setAttribute('style','display: block');
                }
                let r = document.getElementById('reset');
                if(r) r.setAttribute('style','display: block');
                let d = document.getElementById('download');
                if(d) d.setAttribute('style','display: block');
            } else 
                alert('Dataset is not relevant to the algortihm!');
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
                    predictor = {this.model.getPredictor().getFun()}
                    nameAcc = {this.algorithm === 'RL' || 'RLOG' || 'REXP' ? 'R^2' : 'F-Measure'}
                    accuracy = {this.model.getPredictor().getAcc()}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                    AlgView = {this.state.algView}
                    options = {this.state.options}
                    graphPt = {this.state.graphPt}
                    line = {this.algorithm === 'RLOG' || 'REXP' ? { color: "red", width: 3, shape: "spline" } : {color:"red",width:3}}
                />
        );
    }
}