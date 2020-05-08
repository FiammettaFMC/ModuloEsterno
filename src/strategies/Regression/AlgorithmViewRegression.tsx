import React from 'react';
import Plot from 'react-plotlyjs-ts';
import DataRL from './RL/DataRL';
import OptionRegression from './OptionRegression';

interface Actions {
    options: OptionRegression,
    graphPt: DataRL,
    line: any
}

export default class AlgorithmViewRegression extends React.Component<Actions> {

    state = {
        prec: 2
    }
    
    render() {
        const { options, graphPt, line } = this.props;
        return (
            <div className="graph-container">  
                
				<div className="text-center">
					<h3>Grafico</h3>
				</div>
				
                <Plot
                    data={[
                        {
                            x: graphPt.getXPoints(),
                            y: graphPt.getYPoints(),
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'orange', size: 7 },
                            name: '<span style="color: #d8d9da">Punti</span>',
                        },
                        {   
                            x: graphPt.getXPoints(),
                            y: graphPt.getYLine(),
                            type: 'lines',
                            mode: 'lines',
                            line: line,
                            name: '<span style="color: #d8d9da">Retta</span>',
                        }
                    ]}
                    layout={
						{
                            xaxis: {
                                gridcolor: '#d8d9da',
								zerolinecolor: '#d8d9da',
								tickfont: {
                                    size: 14,
									color: '#d8d9da'
								},
							},
							yaxis: {
                                gridcolor: '#d8d9da',
								zerolinecolor: '#d8d9da',
								tickfont: {
                                    size: 14,
									color: '#d8d9da'
								},
							},
							margin: {
                                l: 50,
								r: 35,
								b: 50,
								t: 25,
								pad: 4
							},
							autosize: true,
							responsive: true,
							plot_bgcolor: '#161719',
							paper_bgcolor: '#161719'							
						}
					}
                />
                
				<div className="text-center">
					<h3>Choose the algorithm options (if you want)</h3>
				</div>
				
                <div id="RLopt">
				
					<div className="form">
						<span className="form-label"><strong>Precision</strong>: </span>
						<select value={options.getPrecision()} onChange={(event) => {options.setPrecision(Number(event.target.value)); this.setState({prec: options.getPrecision()})}} >
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
						</select><br></br>
					</div>
					
                </div>
				
            </div>
        );
    }
}