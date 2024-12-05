import { useEffect, useState } from "react"
import Plot from "react-plotly.js"

export default function CorrelationChart({setLoadingCorrelationChart}) {
	const [correlationData, setCorrelationData] = useState({})
	const sources = ['Coal', 'Hydro', 'Natural Gas', 'Nuclear', 'Solar', 'Total']
	const getCorrelationData = async () => {
		const response = await fetch('http://localhost:3000/get-correlation-data')
		const data = await response.json()
		if (response.ok) {
			setCorrelationData({sources, data})
			setLoadingCorrelationChart(true)
		}
	}

	useEffect(() => {
		getCorrelationData()
		const interval = setInterval(() => {
			getCorrelationData()
		}, 60000)
		return () => clearInterval(interval)
	}, [])

  const corrMatrix = correlationData?.data

  return (
    <div style={{position: 'relative'}}>
			<h3 style={{fontWeight: 600, position: 'absolute', zIndex: 10, top: 20, left: 20}}>Correlation Matrix</h3>
			<Plot
				data={[
					{
						z: corrMatrix,
						x: sources,
						y: sources,
						type: 'heatmap',
						colorscale: 'RdBu',
						colorbar: {
							title: 'Correlation'
						}
					}
				]}
				layout={{
					xaxis: {
						title: 'Energy Sources',
						tickmode: 'array',
						tickvals: sources,
						ticktext: sources
					},
					yaxis: {
						title: '',
						tickmode: 'array',
						tickvals: sources,
						ticktext: sources
					}
				}}
				style={{width: '500px', height: '500px', margin: 'auto'}}
			/>
		</div>
  )
}