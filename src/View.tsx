import React, { ChangeEvent } from 'react';
import './App.css';

interface Actions {
    selectAlg: (event: any) => void,
    buttonSelectAlg: () => void,
    buttonInputData: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonInputOpt: (event: ChangeEvent<HTMLInputElement>) => void,
    data: number[][],
    buttonTrain: () => void,
    predictor: string,
    buttonDownload: () => void,
    AlgView?: typeof React.Component,
    options: {},
    setConf: (config: object) => void,
    graphPt: number[][]
}

export default class View extends React.Component<Actions> {

    renderAlgView(){
        if(this.props.AlgView)
            return (<this.props.AlgView 
                        options = {this.props.options}
                        setConf = {this.props.setConf}
                        graphPt = {this.props.graphPt}
                    />);
        else
            return (<div></div>);
    }

    render(){
        const { buttonSelectAlg, selectAlg, buttonInputData, buttonInputOpt,
                data, buttonTrain, predictor, buttonDownload} = this.props;
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
                <button onClick={buttonSelectAlg}>Confirm definitively</button>
                
                <br></br>
                
                <input
                    type="file"
                    name="data"
                    id="data"
                    onChange={buttonInputData} 
                />

                <br></br>
                
                <input
                    type="file"
                    name="opt"
                    id="opt"
                    onChange={buttonInputOpt} 
                />


                <p>{data}</p>

                {this.renderAlgView()}

                <input
                    type="button"
                    value="Train 🚂"
                    onClick={buttonTrain}
                />

                <p></p>
                <input
                    type="button"
                    value="Reset"
                    onClick={() => {window.location.reload(false)}}
                />

                <p>Function: {predictor}</p>

                <input
                    type="button"
                    value="Download JSON"
                    id = "download"
                    onClick={buttonDownload}
                />
            </main>
        </div>
    );
  }
}
