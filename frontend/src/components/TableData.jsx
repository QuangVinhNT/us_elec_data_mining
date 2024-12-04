import Plot from 'react-plotly.js'
import DateFormat from '../utils/DateFormat'
import { useEffect, useState } from 'react'
export default function TableData({setLoadingTable}) {	
	const [pivotData, setPivotData] = useState([])
	const getPivotData = async () => {
		const response = await fetch('http://localhost:3000/get-pivot-data')
		const data = await response.json()
		if (response.ok) {
			const dataByFuel = {
				'Produce Time': Object.keys(data.produce_time).map((value) => DateFormat(new Date(data.produce_time[value]))),
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
			setLoadingTable(true)
		}
	}
	useEffect(() => {
		getPivotData()
	}, [])

  // console.log(`Table: ${pivotData}`)
	return (
		<Plot
			style={{width: '100%', height: '80vh'}}
			data={[
				{
					type: 'table',
					header: {
						values: [
							['<b>Produce Time</b>'],
							['<b>Coal</b>'],
							['<b>Hydro</b>'],
							['<b>Natural Gas</b>'],
							['<b>Nuclear</b>'],
							['<b>Solar</b>']
						],
						align: 'center',
						line: {width: 1, color: '#e6eaed'},
						fill: {color: '#f4f8fb'},
						font: {family: 'Arial', size: 15, color: 'black'}
					},
					cells: {
						values: pivotData,
						align: 'center',
						valign: 'middle',
						line: {color: '#e6eaed', width: 1},
						fill: {
							color: '#f4f8fb'
						},
						font: {family: 'Arial', size: 14, color: ['#78797b']},
						height: 47
					}
				}
			]}
			layout={{
				paper_bgcolor: '#f4f8fb'
			}}
		/>
	)
}
