import './App.css'
import TableData from './components/TableData'
import GeneralLineChart from './components/GeneralLineChart'
import HistogramChart from './components/HistogramChart'
import DecomposedChart from './components/DecomposedChart'
import CorrelationChart from './components/CorrelationChart'
import Prediction from './components/Prediction'
import SpiderChart from './components/SpiderChart'
import { useState } from 'react'
import Loading from './components/Loading'

function App() {
	const [loadingTable, setLoadingTable] = useState(false)
	const [loadingLineChart, setLoadingLineChart] = useState(false)
	const [loadingHistogramChart, setLoadingHistogramChart] = useState(false)
	const [loadingDecomposedChart, setLoadingDecomposedChart] = useState(false)
	const [loadingCorrelationChart, setLoadingCorrelationChart] = useState(false)
	const [loadingSpiderChart, setLoadingSpiderChart] = useState(false)
	const [loadingPrediction, setLoadingPrediction] = useState(false)
	
	const isLoadingDone = [loadingTable, loadingLineChart, loadingHistogramChart, loadingDecomposedChart, loadingCorrelationChart, loadingSpiderChart, loadingPrediction].every(loadingComponent => loadingComponent)
	return (
		<div style={{maxHeight: '100vh', overflow: `${isLoadingDone ? 'auto' : 'hidden'}`}}>					
			{!isLoadingDone && <Loading />}				
			<div
				style={{
					display: `flex`,
					visibility: `${isLoadingDone ? 'unset' : 'hidden'}`,
					flexDirection: 'column',
					gap: 30,
					maxWidth: '1280px',
					margin: '0 auto',
					paddingBottom: '50px'
				}}
			>
				<TableData setLoadingTable={setLoadingTable} loadingTable={loadingTable} />
				<GeneralLineChart setLoadingLineChart={setLoadingLineChart} loadingLineChart={loadingLineChart} />
				<HistogramChart setLoadingHistogramChart={setLoadingHistogramChart} loadingHistogramChart={loadingHistogramChart} />
				<DecomposedChart setLoadingDecomposedChart={setLoadingDecomposedChart} loadingDecomposedChart={loadingDecomposedChart} />
				<CorrelationChart setLoadingCorrelationChart={setLoadingCorrelationChart} loadingCorrelationChart={loadingCorrelationChart} />
				<SpiderChart setLoadingSpiderChart={setLoadingSpiderChart} loadingSpiderChart={loadingSpiderChart} />
				<Prediction setLoadingPrediction={setLoadingPrediction} loadingPrediction={loadingPrediction} />
			</div>
		</div>
	)
}

export default App
