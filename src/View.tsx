import React from 'react';
import './App.css';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    selectAlg: (event: any) => void,
    buttonSelectAlg: () => void,
    buttonInput: (event: any) => void,
    selectPrec: (avent: any) => void,
    selectC: (avent: any) => void,
    selectTol: (avent: any) => void,
    selectAtol: (avent: any) => void,
    selectMaxit: (avent: any) => void,
    selectKernel: (avent: any) => void,
    selectNumpas: (avent: any) => void,
    data: number[][],
    xPointsR: number[],
    yPointsR: number[],
    xPointsW: number[],
    yPointsW: number[],
    colorR: string,
    colorW: string,
    buttonTrain: () => void,
    predictor: string,
    newxPoints: number[],
    newyPoints: number[],
    buttonDownload: () => void
}

export default class View extends React.Component<Actions> {
    render(){
        const { buttonSelectAlg, selectAlg, buttonInput, selectPrec,
                selectC, selectTol, selectAtol, selectMaxit, selectKernel, selectNumpas,
                data, xPointsR, yPointsR, xPointsW, yPointsW, colorR, colorW,
                buttonTrain, predictor, newxPoints, newyPoints, buttonDownload } = this.props;
        return (
            <div className="App">
            <header className="App-header">
                <h1>Training Module</h1>
            </header>
            <main>
                <span>Choose the algorithm to use for the training: </span>
                <select disabled={false} id="alg" onChange={selectAlg}>
                    <option value="Regressione Lineare">Regressione Lineare (RL)</option>
                    <option value="Support Vector Machine">Support Vector Machine (SVM)</option>
                </select>
                <button onClick={buttonSelectAlg}>Confirm definitively</button>
                
                <p></p>
                
                <input
                    type="file"
                    name="data"
                    id="data"
                    onChange={buttonInput} 
                />

                <p>{data}</p>
                
                
                <Plot
                    data={[
                    {
                        x: xPointsR,
                        y: yPointsR,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: `${colorR}` },
                        name: 'Punti',
                    },
                    {
                        x: xPointsW,
                        y: yPointsW,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: `${colorW}` },
                        name: 'Punti',
                    },
                    {   x: newxPoints,
                        y: newyPoints,
                        type: 'lines',
                        mode: 'lines',
                        line: {color: 'blue'},
                        name: 'Retta',
                    }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
                
                
                <h3 id="options" style={{display: 'none'}}>Choose the algorithm options (if you want)</h3>
                <div id="RLopt" style={{display: 'none'}}>
                    <span>Choose the precision: </span>
                    <select disabled={false} defaultValue={2} id="prec" onChange={selectPrec}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <form id="SVMopt" style={{display: 'none'}}>
                    <label>C:</label>
                    <input type="number" id="C" defaultValue="1.0" onChange={selectC}/> 
                    <label>Tollerance:</label>
                    <input type="number" id="tol" defaultValue="1e-4" onChange={selectTol}/> 
                    <label>Alpha Tollerance:</label>
                    <input type="number" id="atol" defaultValue="1e-7" onChange={selectAtol}/> 
                    <label>Max iterations:</label>
                    <input type="number" id="maxiter" defaultValue="10000" onChange={selectMaxit}/>
                    <label>Kernel type:</label>
                    <input type="text" id="kernel" defaultValue="linear" onChange={selectKernel}/>
                    <label>Number passes:</label>
                    <input type="number" id="numpas" defaultValue="10" onChange={selectNumpas}/>
                </form>

                <p></p>

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
