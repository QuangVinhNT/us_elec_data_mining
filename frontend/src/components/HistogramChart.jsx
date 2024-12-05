import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function HistogramChart({setLoadingHistogramChart}) {
	const [pivotData, setPivotData] = useState([])
	const getPivotData = async () => {
		const response = await fetch('http://localhost:3000/get-pivot-data-w')
		const data = await response.json()
		if (response.ok) {
			const dataByFuel = {
				'Produce Time': Object.keys(data?.produce_time).map((value) => new Date(data?.produce_time[value])),
				'Coal': Object.keys(data?.Coal).map((value) => data?.Coal[value]),
				'Hydro': Object.keys(data?.Hydro).map((value) => data?.Hydro[value]),
				'Natural Gas': Object.keys(data?.['Natural Gas']).map((value) => data?.['Natural Gas'][value]),
				'Nuclear': Object.keys(data?.Nuclear).map((value) => data?.Nuclear[value]),
				'Solar': Object.keys(data?.Solar).map((value) => data?.Solar[value])
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
			setLoadingHistogramChart(true)
		}
	}
	useEffect(() => {
		getPivotData()
		const interval = setInterval(() => {
			getPivotData()
		}, 60000)
		return () => clearInterval(interval)
	}, [])

  const coalTrace = {
		x: pivotData[1],
		type: 'histogram',
		opacity: 0.5,
		name: 'Coal',
		marker: {color: '#000000'}
	}
	const hydroTrace = {
		x: pivotData[2],
		type: 'histogram',
		opacity: 0.5,
		name: 'Hydro',
		marker: {color: '#56b8e7'}
	}
	const naturalGasTrace = {
		x: pivotData[3],
		type: 'histogram',
		opacity: 0.5,
		name: 'Natural Gas',
		marker: {color: '#86be49'}
	}
	const nuclearTrace = {
		x: pivotData[4],
		type: 'histogram',
		opacity: 0.5,
		name: 'Nuclear',
		marker: {color: '#e7d750'}
	}
	const solarTrace = {
		x: pivotData[5],
		type: 'histogram',
		opacity: 0.5,
		name: 'Solar',
		marker: {color: '#f75900'}
	}
	const chartData = [
		coalTrace,
		hydroTrace,
		naturalGasTrace,
		nuclearTrace,
		solarTrace,
	]
  return (
    <div style={{position: 'relative'}}>
			<h3 style={{fontWeight: 600, position: 'absolute', zIndex: 10, top: 20, left: 20}}>Distribute electricity output by Fuel</h3>
			<Plot
				data={chartData}
				layout={{
					showlegend: true,
					barmode: 'overlay',
					xaxis: {title: 'Productive (megawatts - MW)'},
					yaxis: {title: 'Frequency'}
				}}
				style={{width: '100%', height: '70vh'}}
			/>
		</div>
  )
}