import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

export default function GeneralLineChart({setLoadingLineChart}) {
	const [pivotData, setPivotData] = useState([])
	const getPivotData = async () => {
		const response = await fetch('http://localhost:3000/get-pivot-data')
		const data = await response.json()
		if (response.ok) {
			const dataByFuel = {
				'Produce Time': Object.keys(data.produce_time).map((value) => new Date(data.produce_time[value])),
				'Coal': Object.keys(data.Coal).map((value) => data.Coal[value]),
				'Hydro': Object.keys(data.Hydro).map((value) => data.Hydro[value]),
				'Natural Gas': Object.keys(data['Natural Gas']).map((value) => data['Natural Gas'][value]),
				'Nuclear': Object.keys(data.Nuclear).map((value) => data.Nuclear[value]),
				'Solar': Object.keys(data.Solar).map((value) => data.Solar[value])
			}
			const cellDatas = [
				dataByFuel['Produce Time'],
				dataByFuel['Coal'],
				dataByFuel['Hydro'],
				dataByFuel['Natural Gas'],
				dataByFuel['Nuclear'],
				dataByFuel['Solar']
			]
			setPivotData(cellDatas)
			setLoadingLineChart(true)
		}
	}
	useEffect(() => {
		getPivotData()
	}, [])

	// console.log(`Line chart: ${pivotData}`)

	const lineWidth = 2
	const coalTrace = {
		x: pivotData[0],
		y: pivotData[1],
		mode: 'lines',
		line: {
			width: lineWidth,
			color: '#000000'
		},
		xaxis: 'x1',
		yaxis: 'y1',
		name: 'Coal'
	}
	const hydroTrace = {
		x: pivotData[0],
		y: pivotData[2],
		mode: 'lines',
		line: {
			width: lineWidth,
			color: '#56b8e7'
		},
		xaxis: 'x2',
		yaxis: 'y2',
		name: 'Hydro'
	}
	const naturalGasTrace = {
		x: pivotData[0],
		y: pivotData[3],
		mode: 'lines',
		line: {
			width: lineWidth,
			color: '#86be49'
		},
		xaxis: 'x3',
		yaxis: 'y3',
		name: 'Natural Gas'
	}
	const nuclearTrace = {
		x: pivotData[0],
		y: pivotData[4],
		mode: 'lines',
		line: {
			width: lineWidth,
			color: '#e7d750'
		},
		xaxis: 'x4',
		yaxis: 'y4',
		name: 'Nuclear'
	}
	const solarTrace = {
		x: pivotData[0],
		y: pivotData[5],
		mode: 'lines',
		line: {
			width: lineWidth,
			color: '#f75900'
		},
		xaxis: 'x5',
		yaxis: 'y5',
		name: 'Solar'
	}
	const chartData = [
		coalTrace,
		hydroTrace,
		naturalGasTrace,
		nuclearTrace,
		solarTrace
	]
  const axis = {
		showline: true,
		zeroline: false,
		showgrid: true,
		mirror: true,
		ticklen: 4,
		gridcolor: '#ffffff',
		tickfont: {size: 10}
	}
  const xaxisCoal = {domain: [0, 1], anchor: 'y1', showticklabels: false}
	const yaxisCoal = {domain: [0.825, 1], anchor: 'x1'}
	const xaxisHydro = {domain: [0, 1], anchor: 'y2', showticklabels: false}
	const yaxisHydro = {domain: [0.625, 0.8], anchor: 'x2'}
	const xaxisNaturalGas = {domain: [0, 1], anchor: 'y3', showticklabels: false}
	const yaxisNaturalGas = {domain: [0.425, 0.6], anchor: 'x3'}
	const xaxisNuclear = {domain: [0, 1], anchor: 'y4', showticklabels: false}
	const yaxisNuclear = {domain: [0.225, 0.4], anchor: 'x4'}
  const xaxisSolar = {domain: [0, 1], anchor: 'y5', showticklabels: true}
	const yaxisSolar = {domain: [0.025, 0.2], anchor: 'x5'}
  const layout = {
		showlegend: true,
		paper_bgcolor: '#f4f8fb',
		xaxis1: {...xaxisCoal, ...axis},
		yaxis1: {...yaxisCoal, ...axis},
		xaxis2: {...xaxisHydro, ...axis},
		yaxis2: {...yaxisHydro, ...axis},
		xaxis3: {...xaxisNaturalGas, ...axis},
		yaxis3: {...yaxisNaturalGas, ...axis},
		xaxis4: {...xaxisNuclear, ...axis},
		yaxis4: {...yaxisNuclear, ...axis},
		xaxis5: {...xaxisSolar, ...axis},
		yaxis5: {...yaxisSolar, ...axis},
	}
	return (
		<Plot
			data={chartData}
			layout={layout}
			style={{width: '100%', height: '80vh'}}
			config={{responsive: true}}
		/>
	)
}
