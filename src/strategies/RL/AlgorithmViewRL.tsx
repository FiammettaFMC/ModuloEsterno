import React from 'react';
import Plot from 'react-plotlyjs-ts';
import DataRL from './DataRL';
import OptionRL from './OptionRL';

interface Actions {
    options: OptionRL,
    graphPt: DataRL
}

export default class AlgorithmViewRL extends React.Component<Actions> {

    state = {
        prec: 2
    }

    render() {
        const { options, graphPt } = this.props;
        return (
            <div>  
                
                <Plot
                    data={[
                        {
                            x: graphPt.getXPoints(),
                            y: graphPt.getYPoints(),
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'orange', size: 7 },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt.getXPoints(),
                            y: graphPt.getYLine(),
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
                    <select value={options.getPrecision()} onChange={(event) => {options.setPrecision(Number(event.target.value)); this.setState({prec: options.getPrecision()})}} >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
            </div>
        );
    }
}