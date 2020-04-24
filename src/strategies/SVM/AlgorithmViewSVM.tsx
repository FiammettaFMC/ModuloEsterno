import React from 'react';
import Plot from 'react-plotlyjs-ts';
import DataSVM from './DataSVM';
import OptionSVM from './OptionSVM';

interface Actions {
    options: OptionSVM,
    graphPt: DataSVM
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
        const { options, graphPt } = this.props;
        return (
            <div>

                <Plot
                    data={[
                        {
                            x: graphPt.getXRPoints(),
                            y: graphPt.getYRPoints(),
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'green', size: 7 },
                            name: 'Punti',
                        },
                        {
                            x: graphPt.getXWPoints(),
                            y: graphPt.getYWPoints(),
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red', size: 7 },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt.getXLine(),
                            y: graphPt.getYLine(),
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
                    <input type="number" id="C" value={options.getC()} onChange={(event) => {options.setC(Number(event.target.value)); this.setState({opt: options.getC()})}} /> 
                    <label>Max iterations:</label>
                    <input type="number" id="maxiter" value={options.getMaxIter()} onChange={(event) => {options.setMaxIter(Number(event.target.value)); this.setState({opt: options.getMaxIter()})}} />
                    <label>Number passes:</label>
                    <input type="number" id="numpas" value={options.getNumPass()} onChange={(event) => {options.setNumPass(Number(event.target.value)); this.setState({opt: options.getNumPass()})}} />
                </div>
            </div>
        );
    }
}