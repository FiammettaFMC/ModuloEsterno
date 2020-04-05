import React from 'react';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    setConf: (conf: any) => void,
    graphPt: {
        pointsXR: [],
        pointsYR: [],
        pointsXW: [],
        pointsYW: [],
        pointsLineX: [],
        pointsLineY: []
    }
}

export default class AlgViewSVM extends React.Component<Actions> {
    
    private config: {
        C: number,
        maxiter: number,
        numpass: number
    } = {
        C: 1.0,
        maxiter: 10000,
        numpass: 10
    };

    render() {
        const { setConf, graphPt } = this.props;
        return (
            <div>

                <Plot
                    data={[
                        {
                            x: graphPt.pointsXR,
                            y: graphPt.pointsYR,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: `green` },
                            name: 'Punti',
                        },
                        {
                            x: graphPt.pointsXW,
                            y: graphPt.pointsYW,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: `red` },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt.pointsLineX,
                            y: graphPt.pointsLineY,
                            type: 'lines',
                            mode: 'lines',
                            line: {color: 'blue'},
                            name: 'Retta',
                        }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
               
                <h3 id="options" >Choose the algorithm options (if you want)</h3>
                <form id="SVMopt">
                    <label>C:</label>
                    <input type="number" id="C" defaultValue="1.0" onChange={(event) => {this.config.C = Number(event.target.value)}} /> 
                    <label>Tollerance:</label>
                    <input type="number" id="tol" defaultValue="1e-4" disabled={true}/> 
                    <label>Alpha Tollerance:</label>
                    <input type="number" id="atol" defaultValue="1e-7" disabled={true}/> 
                    <label>Max iterations:</label>
                    <input type="number" id="maxiter" defaultValue="10000" onChange={(event) => {this.config.maxiter = Number(event.target.value)}} />
                    <label>Kernel type:</label>
                    <input type="text" id="kernel" defaultValue="linear" disabled={true}/>
                    <label>Number passes:</label>
                    <input type="number" id="numpas" defaultValue="10" onChange={(event) => {this.config.numpass = Number(event.target.value)}} />
                    <button onClick= {() => setConf(this.config)}>Confirm options</button>
                </form>
            </div>
        );
    }
}