import React, { ChangeEvent } from 'react';
import './App.css';

interface Actions {
    selectAlg: (event: any) => void,
    buttonSelectAlg: () => void,
    buttonInputData: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonInputOpt: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonTrain: () => void,
    predictor: string,
    buttonDownload: () => void,
    AlgView?: typeof React.Component,
    options: any,
    graphPt: any
}

export default class View extends React.Component<Actions> {

    renderAlgorithmView(){
        if(this.props.AlgView)
            return (<this.props.AlgView 
                        options = {this.props.options}
                        graphPt = {this.props.graphPt}
                    />);
        else
            return (<div></div>);
    }

    render(){
        const { buttonSelectAlg, selectAlg, buttonInputData, buttonInputOpt,
                buttonTrain, predictor, buttonDownload} = this.props;
        return (
            <div className="App">
            <header className="App-header">
                <h1>Training Module</h1>
            </header>
            <main>
                <span>Choose the algorithm to use for the training: </span>
                <select disabled={false} id="alg" onChange={selectAlg}>
                    <option value="RL">Regressione Lineare (RL)</option>
                    <option value="SVM">Support Vector Machine (SVM)</option>
                </select>
                <button onClick={buttonSelectAlg}>Confirm</button>
                
                <br></br>
                
                <div id='import' style={{display: 'none'}}>

                    <span>Import data with a csv file: </span>
                    <input
                        type="file"
                        name="data"
                        id="data"
                        onChange={buttonInputData}
                        accept=".csv,.txt"
                    />

                    <br></br>
                    
                    <span>Import algorithm options with a json file: </span>
                    <input
                        type="file"
                        name="opt"
                        id="opt"
                        onChange={buttonInputOpt}
                        accept=".json"
                    />

                </div>

                {this.renderAlgorithmView()}

                <input
                    id='train'
                    type="button"
                    value="Train 🚂"
                    onClick={buttonTrain}
                    style={{display: 'none'}}
                />

                <p></p>
                <input
                    id='reset'
                    type="button"
                    value="Reset"
                    onClick={() => {window.location.reload(false)}}
                    style={{display: 'none'}}
                />

                <p className='function'  style={{display: 'none'}}>Function: {predictor}</p>

                <input
                    type="button"
                    value="Download Predictor"
                    id = "download"
                    onClick={buttonDownload}
                    style={{display: 'none'}}
                />
            </main>
        </div>
    );
  }
}
