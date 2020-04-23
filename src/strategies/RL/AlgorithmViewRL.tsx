import React from 'react';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    options: {
        order: number,
        precision: number
    },
    setConf: (conf: object) => void,
    graphPt: number[][]
        // 0: pointsX,
        // 1: pointsY,
        // 2: pointsLineY
}

export default class AlgorithmViewRL extends React.Component<Actions> {

    state = {
        prec: 2
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
                            marker: {color: 'orange', size: 7 },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt[0],
                            y: graphPt[2],
                            type: 'lines',
                            mode: 'lines',
                            line: {color: 'blue', width: 2},
                            name: 'Retta',
                        }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
                
                <h3>Choose the algorithm options (if you want)</h3>
                <div id="RLopt">
                    <span>Choose the precision: </span>
                    <select value={options.precision} onChange={(event) => {options.precision = Number(event.target.value); this.setState({prec: options.precision})}} >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    <button onClick= {() => {setConf(options)}}>Confirm options</button>
                </div>
            </div>
        );
    }
}