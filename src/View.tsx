import React, { ChangeEvent } from 'react';
import './App.css';

interface Actions {
    selectAlg: (event: any) => void,
    buttonSelectAlg: () => void,
    buttonInputData: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonInputOpt: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonTrain: () => void,
    predictor: string,
    nameAcc: string,
    accuracy: number | undefined,
    buttonDownload: () => void,
    AlgView?: typeof React.Component,
    options: any,
    graphPt: any,
    line: any
}

export default class View extends React.Component<Actions> {

    renderAlgorithmView(){
        if(this.props.AlgView)
            return (<this.props.AlgView 
                        options = {this.props.options}
                        graphPt = {this.props.graphPt}
                        line = {this.props.line}
                    />);
        else
            return (<div></div>);
    }

    render(){
        const { buttonSelectAlg, selectAlg, buttonInputData, buttonInputOpt,
                buttonTrain, predictor, nameAcc, accuracy, buttonDownload} = this.props;
        return (
            <div className="App">
            
                <header className="App-header">
                    <h1>Training Module</h1>
                </header>
                
                <main>
                
                    <div className="choose-section">
                        <div className="container-50">
                            <div className="form">
                                <span className="form-label">Choose the algorithm to use for the training: </span>
                                <select className="form-input" disabled={false} id="alg" onChange={selectAlg}>
                                    <option value="RL">Regressione Lineare (RL)</option>
                                    <option value="SVM">Support Vector Machine (SVM)</option>
                                    <option value="REXP">Regressione Esponenziale (REXP)</option>
                                    <option value="RLOG">Regressione Logaritmica (RLOG)</option>
                                </select><br></br>
                            </div>
                            <button onClick={buttonSelectAlg}>Confirm</button>
                        </div>
                    </div>
                                
                    <div id='import' style={{display: 'none'}}>

                        <div className="import-section">
                            <div className="container">
                                <div className="row">
                                
                                    <div className="col-lg-6">
                                        <div className="properties">
                                        
                                        <div className="text-center">
                                            <h3 id="options" >Editor</h3>
                                        </div>
                                            
                                            <div className="form">
                                                <span className="form-label">Import data (.csv):</span>
                                                <input
                                                    className="form-input"
                                                    type="file"
                                                    name="data"
                                                    id="data"
                                                    onChange={buttonInputData}
                                                    accept=".csv,.txt"
                                                />
                                            </div>
                                            
                                            <div className="form">
                                                <span className="form-label">Import previous options (.json)</span>
                                                <input
                                                    className="form-input"
                                                    type="file"
                                                    name="opt"
                                                    id="opt"
                                                    onChange={buttonInputOpt}
                                                    accept=".json"
                                                />
                                            </div>
                                                
                                            <input
                                                id='train'
                                                type="button"
                                                value="Train 🚂"
                                                onClick={buttonTrain}
                                                style={{display: 'none'}}
                                            />

                                            <p></p>
                                            
                                            <p className='function'  style={{display: 'none'}}>Function: {predictor}</p>
                                            <p className='function'  style={{display: 'none'}}>{nameAcc}: {accuracy}</p>

                                            <div className="button-row">
                                                <input
                                                    type="button"
                                                    value="Download Predictor"
                                                    id = "download"
                                                    onClick={buttonDownload}
                                                    style={{display: 'none'}}
                                                />
                                                
                                                <input
                                                    id='reset'
                                                    type="button"
                                                    value="Reset"
                                                    onClick={() => {window.location.reload(false)}}
                                                    style={{display: 'none'}}
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6">
                                        <div className="graph">
                                            {this.renderAlgorithmView()}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                            

                    </div>
                
                </main>
                
            </div>
        );
    }
}
