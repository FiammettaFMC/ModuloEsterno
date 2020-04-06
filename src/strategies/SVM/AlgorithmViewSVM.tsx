import React from 'react';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    setConf: (conf: any) => void,
    graphPt: number[][] 
        // 0: pointsXR,
        // 1: pointsYR,
        // 2: pointsXW,
        // 3: pointsYW,
        // 4: pointsLineX,
        // 5: pointsLineY
}

export default class AlgrithmViewSVM extends React.Component<Actions> {
    
    /** Options:
    {
        C = 1.0; For C, Higher = you trust your data more. Lower = more regularization. Should be in range of around 1e-2 ... 1e5 at most.
        tol = 1e-4; // do not touch this unless you're pro
        alphatol = 1e-7; // used for pruning non-support vectors. do not touch unless you're pro
        maxiter // if you have a larger problem, you may need to increase this
        kernel // kernel type
        numpasses = 10; // increase this for higher precision of the result. (but slower)
    }
    */
    private options: {
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
                            x: graphPt[0],
                            y: graphPt[1],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: `green` },
                            name: 'Punti',
                        },
                        {
                            x: graphPt[2],
                            y: graphPt[3],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: `red` },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt[4],
                            y: graphPt[5],
                            type: 'lines',
                            mode: 'lines',
                            line: {color: 'blue'},
                            name: 'Retta',
                        }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
               
                <h3 id="options" >Choose the algorithm options (if you want)</h3>
                <div id="SVMopt">
                    <label>C:</label>
                    <input type="number" id="C" defaultValue="1.0" onChange={(event) => {this.options.C = Number(event.target.value)}} /> 
                    <label>Tollerance:</label>
                    <input type="number" id="tol" defaultValue="1e-4" disabled={true}/> 
                    <label>Alpha Tollerance:</label>
                    <input type="number" id="atol" defaultValue="1e-7" disabled={true}/> 
                    <label>Max iterations:</label>
                    <input type="number" id="maxiter" defaultValue="10000" onChange={(event) => {this.options.maxiter = Number(event.target.value)}} />
                    <label>Kernel type:</label>
                    <input type="text" id="kernel" defaultValue="linear" disabled={true}/>
                    <label>Number passes:</label>
                    <input type="number" id="numpas" defaultValue="10" onChange={(event) => {this.options.numpass = Number(event.target.value)}} />
                    <button onClick= {() => {setConf(this.options)}}>Confirm options</button>
                </div>
            </div>
        );
    }
}