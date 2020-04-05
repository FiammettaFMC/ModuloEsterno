import React from 'react';
import Plot from 'react-plotlyjs-ts';

interface Actions {
    setConf: (conf: any) => void,
    graphPt: {
        pointsX: [],
        pointsY: [],
        pointsLineY: []
    }
}

export default class AlgViewRL extends React.Component<Actions> {
    private config: {
        order: number,
        precision: number
    } = {
        order: 2,
        precision: 2
    };

    render() {
        const { setConf, graphPt } = this.props;
        return (
            <div>  
                
                <Plot
                    data={[
                        {
                            x: graphPt.pointsX,
                            y: graphPt.pointsY,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'orange' },
                            name: 'Punti',
                        },
                        {   
                            x: graphPt.pointsX,
                            y: graphPt.pointsLineY,
                            type: 'lines',
                            mode: 'lines',
                            line: {color: 'blue'},
                            name: 'Retta',
                        }
                    ]}
                    layout={ {width: 700, height: 400, title: 'Grafico'} }
                />
                
                <h3>Choose the algorithm options (if you want)</h3>
                <div id="RLopt">
                    <span>Choose the precision: </span>
                    <select defaultValue={2} onChange={(event) => {this.config.precision = Number(event.target.value)}} >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    <button onClick= {() => setConf(this.config)}>Confirm options</button>
                </div>
            </div>
        );
    }
}