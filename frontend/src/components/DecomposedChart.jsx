import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function DecomposedChart({setLoadingDecomposedChart}) {
	const [decomposedData, setDecomposedData] = useState([])
	const getDecomposedData = async () => {
		const response = await fetch('http://localhost:3000/get-decomposed-data')
		const data = await response.json()
		if (response.ok) {
			const processedData = data[0]?.map((_, colIndex) => {
				if (colIndex === 0) {
					return data.map(row => new Date(row[colIndex]))
				}
				return data.map(row => row[colIndex])
			})
			setDecomposedData(processedData)
			setLoadingDecomposedChart(true)
		}
	}
	useEffect(() => {
		getDecomposedData()
	}, [])

  const resampleTrace = {
		x: decomposedData[0],
		y: decomposedData[1],
		mode: 'lines',
		line: {
			width: 2,
			color: '#86be49'
		},
		xaxis: 'x1',
		yaxis: 'y1',
	}
	const trendTrace = {
		x: decomposedData[0],
		y: decomposedData[2],
		mode: 'lines',
		line: {
			width: 2,
			color: '#86be49'
		},
		xaxis: 'x2',
		yaxis: 'y2'
	}
	const seasonalTrace = {
		x: decomposedData[0],
		y: decomposedData[3],
		mode: 'lines',
		line: {
			width: 2,
			color: '#86be49'
		},
		xaxis: 'x3',
		yaxis: 'y3'
	}
	const residTrace = {
		x: decomposedData[0],
		y: decomposedData[4],
		mode: 'markers',
		type: 'scatter',
		xaxis: 'x4',
		yaxis: 'y4'
	}

	const chartData = [resampleTrace, trendTrace, seasonalTrace, residTrace]

	const axis = {
		showline: true,
		zeroline: false,
		showgrid: true,
		mirror: true,
		ticklen: 4,
		gridcolor: '#ffffff',
		tickfont: {size: 10}
	}

	const xaxisResample = {
		domain: [0, 1],
		anchor: 'y1',
		showticklabels: false
	}
	const yaxisResample = {domain: [0.765, 1], anchor: 'x1'}
	const xaxisTrend = {
		domain: [0, 1],
		anchor: 'y2',
		showticklabels: false
	}
	const yaxisTrend = {domain: [0.51, 0.745], anchor: 'x2'}
	const xaxisSeasonal = {
		domain: [0, 1],
		anchor: 'y3',
		showticklabels: false
	}
	const yaxisSeasonal = {domain: [0.255, 0.49], anchor: 'x3'}
	const xaxisResid = {
		domain: [0, 1],
		anchor: 'y4',
		showticklabels: true
	}
	const yaxisResid = {domain: [0, 0.235], anchor: 'x4'}

	const layout = {
		showlegend: false,
		xaxis1: {...xaxisResample, ...axis},
		yaxis1: {...yaxisResample, ...axis, title: 'Resample'},
		xaxis2: {...xaxisTrend, ...axis},
		yaxis2: {...yaxisTrend, ...axis, title: 'Trend'},
		xaxis3: {...xaxisSeasonal, ...axis},
		yaxis3: {...yaxisSeasonal, ...axis, title: 'Seasonal'},
		xaxis4: {...xaxisResid, ...axis},
		yaxis4: {...yaxisResid, ...axis, title: 'Resid'},
		paper_bgcolor: '#f4f8fb'
	}
  return (
    <Plot
			data={chartData}
			layout={layout}
			style={{width: '100%', height: '100vh'}}
			config={{responsive: true}}
		/>
  )
}