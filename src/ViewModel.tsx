import React from 'react';
import './App.css';
import View from './View';
import Model from './Model';
import { observer } from "mobx-react";

@observer
export default class ViewModel extends React.Component {
    
    private model: Model = new Model();
    private algorithm: string = 'Regressione Lineare';
    private prec: number = 2;
    private C: number = 1.0;
    private tol: number = 1e-4;
    private atol: number = 1e-7;
    private maxiter: number = 10000;
    private numpass: number = 10;
    private kernel: string = 'linear';
    state = {
        graph: {
            pointXR: [],
            pointYR: [],
            pointXW: [],
            pointYW: [],
            pointLineX: [],
            pointLineY: [],
            colorR: '',
            colorW: ''
        }
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
        document.getElementById('alg')?.setAttribute('disabled','true');
        if( this.algorithm === 'Regressione Lineare')
            document.getElementById('RLopt')?.setAttribute('style','display: block');
        else
            document.getElementById('SVMopt')?.setAttribute('style','display: block');
    }

    setPrec(i: number) {
        this.prec = i;
        this.clickSelectPrec();
    }

    setC(i: number) {
        this.C = i;
        this.clickSelectSVMop();
    }

    setTol(i: number) {
        this.tol = i;
        this.clickSelectSVMop();
    }

    setAtol(i: number) {
        this.atol = i;
        this.clickSelectSVMop();
    }

    setMacit(i: number) {
        this.maxiter = i;
        this.clickSelectSVMop();
    }

    setKernel(i: string) {
        this.kernel = i;
        this.clickSelectSVMop();
    }

    setNumpas(i: number) {
        this.numpass = i;
        this.clickSelectSVMop();
    }

    clickSelectPrec() {
        this.model.setOptions([2,this.prec]);
    }

    clickSelectSVMop() {
        this.model.setOptions({ 
            C: this.C,
            tol: this.tol,
            alphatol: this.atol,
            maxiter: this.maxiter,
            kernel: this.kernel,
            numpasses: this.numpass
        });
    }

    buttonTrain() {
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
                    selectPrec = {(event) => {this.setPrec(event.target.value)}}
                    selectC = {(event) => {this.setC(event.target.value)}}
                    selectTol = {(event) => {this.setC(event.target.value)}}
                    selectAtol = {(event) => {this.setC(event.target.value)}}
                    selectMaxit = {(event) => {this.setC(event.target.value)}}
                    selectKernel = {(event) => {this.setC(event.target.value)}}
                    selectNumpas = {(event) => {this.setC(event.target.value)}}
                    data = {this.model.getData()}
                    xPointsR = {this.state.graph.pointXR}
                    yPointsR = {this.state.graph.pointYR}
                    xPointsW = {this.state.graph.pointXW}
                    yPointsW = {this.state.graph.pointYW}
                    colorR = {this.state.graph.colorR}
                    colorW = {this.state.graph.colorW}
                    buttonTrain = {() => this.buttonTrain()}
                    predictor = {this.model.getPredictor().function}
                    newxPoints = {this.state.graph.pointLineX}
                    newyPoints = {this.state.graph.pointLineY}
                    buttonDownload = {() => {this.model.downloadPredictor()}}
                />
            </div>
        );
    }
}