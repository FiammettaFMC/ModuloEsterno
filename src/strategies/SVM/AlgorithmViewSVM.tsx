import React from 'react';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    options: {
        C: number,
        maxiter: number,
        numpass: number
    },
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
    state = {
        opt: 0
    }

    render() {
        const { options, setConf, graphPt } = this.props;
        return (
            <div>

                <Plot
                    data={[
                        {
                            x: graphPt[0],
                            y: graphPt[1],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'green', size: 7 },
                            name: 'Punti',
                        },
                        {
                            x: graphPt[2],
                            y: graphPt[3],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red', size: 7 },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt[4],
                            y: graphPt[5],
                            type: 'lines',
                            mode: 'lines',
                            line: {color: 'blue', width: 2},
                            name: 'Retta',
                        }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
               
                <h3 id="options" >Choose the algorithm options (if you want)</h3>
                <label>Kernel type: linear</label>
                <br></br>
                <label>Alpha Tollerance: 1e-7</label>
                <br></br>
                <label>Tollerance: 1e-4</label>
                <br></br>
                <div id="SVMopt">
                    <label>C:</label>
                    <input type="number" id="C" value={options.C} onChange={(event) => {options.C = Number(event.target.value); this.setState({prec: options.C})}} /> 
                    <label>Max iterations:</label>
                    <input type="number" id="maxiter" value={options.maxiter} onChange={(event) => {options.maxiter = Number(event.target.value); this.setState({prec: options.maxiter})}} />
                    <label>Number passes:</label>
                    <input type="number" id="numpas" value={options.numpass} onChange={(event) => {options.numpass = Number(event.target.value); this.setState({prec: options.numpass})}} />
                    <br></br>
                    <button onClick= {() => {setConf(options)}}>Confirm options</button>
                </div>
            </div>
        );
    }
}