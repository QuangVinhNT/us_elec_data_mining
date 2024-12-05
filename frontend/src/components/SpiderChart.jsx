import { useEffect, useState } from "react"
import Plot from "react-plotly.js"

export default function SpiderChart({setLoadingSpiderChart}) {
  const [clusteringData, setClusteringData] = useState([])
	const getClusteringData = async () => {
		const response = await fetch('http://localhost:3000/get-clustering-data')
		const data = await response.json()
		if (response.ok) {
			const processedData = data[0]?.map((_, colIndex) => {
				if (colIndex === 0) {
					return data?.map(row => new Date(row[colIndex]).getFullYear())
				}
				return data?.map(row => row[colIndex])
			})			
			setClusteringData(processedData)
			setLoadingSpiderChart(true)
		}
	}

	useEffect(() => {
		getClusteringData()
		const interval = setInterval(() => {
			getClusteringData()
		}, 60000)
		return () => clearInterval(interval)
	}, [])


	let elecDataByYear = {}
	const years = clusteringData[0]?.filter(
		(value, index, self) => self.indexOf(value) === index
	)
	let i = 0
	years?.forEach((value) => {
		const numOfDay = clusteringData[0]?.filter((year) => year === +value)?.length
		
		let result = {
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}

		const limit = i + numOfDay
		for (let j = i; j < limit; j++) {
			result[clusteringData[2]?.at(j)] += +clusteringData[1]?.at(j)
		}
		elecDataByYear[value] = [result[0], result[1], result[2], result[3]]
		i += numOfDay
	})
	const season = ['Spring', 'Summer', 'Autumn', 'Winter', 'Spring']
	
	const chartDatas = Object.keys(elecDataByYear).map((year) => [
		{
			type: 'scatterpolar',
			r: elecDataByYear[year]?.concat(elecDataByYear[year].at(0)),
			theta: season,
			fill: 'toself'
		}
	])
	const chartLayout = {
		polar: {
			radialaxis: {
				visible: true,
				range: [0, 3500000]
			}
		},
		showlegend: false,
	}

	return (
		<div style={{position: 'relative'}}>
			<h3 style={{fontWeight: 600, position: 'absolute', zIndex: 10, top: 20, left: 20}}>Spider chart by Year (2019 - 2024)</h3>
			<div
				style={{
					display: 'flex',
					width: '100%',
					flexWrap: 'wrap',
					paddingBottom: '50px',
					gap: 40
				}}
			>
				{chartDatas?.map((chartData, index) => {
					return (
						<div key={index} style={{position: 'relative'}}>
							<Plot
								data={chartData}
								layout={chartLayout}
								style={{width: '350px', height: '350px'}}
							/>
							<h5 style={{position: 'absolute', zIndex: 10, bottom: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '20px', fontWeight: 500}}>{`${2019 + index}`}</h5>
						</div>
					)
				})}
			</div>
		</div>
	)
}
