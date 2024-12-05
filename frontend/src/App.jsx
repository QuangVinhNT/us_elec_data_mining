import './App.css'
import TableData from './components/TableData'
import GeneralLineChart from './components/GeneralLineChart'
import HistogramChart from './components/HistogramChart'
import DecomposedChart from './components/DecomposedChart'
import CorrelationChart from './components/CorrelationChart'
import Prediction from './components/Prediction'
import SpiderChart from './components/SpiderChart'
import { useState } from 'react'
import Loading from './components/common/Loading'
import Header from './components/common/Header'
import Sidebar from './components/common/Sidebar'

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
		<div style={{maxHeight: '100vh', overflow: 'hidden'}}>					
			{!isLoadingDone && <Loading />}				
			<div style={{visibility: `${isLoadingDone ? 'unset' : 'hidden'}`, margin: '0 auto', display: 'flex'}}>
				<Sidebar />
				<div style={{width: '100%'}}>
					<Header/>
					<div
						style={{
							display: `flex`,						
							flexDirection: 'column',
							width: 'calc(100vw - 300px)',
							padding: '30px 0',
							height: '100vh',
							overflowY: 'auto',
							backgroundColor: '#f7fafc'
						}}
					>
						<div style={{display: 'flex', width: '100%'}}>
							<div style={{width: '60%', marginLeft: '30px'}}>
								<GeneralLineChart setLoadingLineChart={setLoadingLineChart} loadingLineChart={loadingLineChart} />							
							</div>
							<div style={{width: '40%', marginLeft: '30px', marginRight: '30px'}}>
								<Prediction setLoadingPrediction={setLoadingPrediction} loadingPrediction={loadingPrediction} />
							</div>
						</div>
						<div style={{display: 'flex', width: '100%', marginTop: '30px'}}>
							<div style={{width: '50%', marginLeft: '30px', backgroundColor: '#fff', paddingBottom: '30px', borderRadius: '20px', overflow: 'hidden'}}>
								<HistogramChart setLoadingHistogramChart={setLoadingHistogramChart} loadingHistogramChart={loadingHistogramChart} />
							</div>
							<div style={{width: '50%', marginLeft: '30px', marginRight: '30px', backgroundColor: '#fff', paddingBottom: '30px', borderRadius: '20px', overflow: 'hidden'}}>
								<CorrelationChart setLoadingCorrelationChart={setLoadingCorrelationChart} loadingCorrelationChart={loadingCorrelationChart} />
							</div>
						</div>
						<div style={{display: 'flex', width: '100%', marginTop: '30px'}}>
							<div style={{width: '100%', margin: '0 30px', backgroundColor: '#fff', paddingBottom: '30px', borderRadius: '20px', overflow: 'hidden'}}>
								<DecomposedChart setLoadingDecomposedChart={setLoadingDecomposedChart} loadingDecomposedChart={loadingDecomposedChart} />
							</div>
						</div>
						<div style={{display: 'flex', width: '100%', marginTop: '30px'}}>
							<div style={{width: '100%', margin: '0 30px', backgroundColor: '#fff', paddingBottom: '30px', borderRadius: '20px', overflow: 'hidden'}}>
								<SpiderChart setLoadingSpiderChart={setLoadingSpiderChart} loadingSpiderChart={loadingSpiderChart} />
							</div>
						</div>						
						<div style={{display: 'flex', width: '100%', marginTop: '30px'}}>
							<div style={{width: '100%', margin: '0 30px', backgroundColor: '#fff', paddingBottom: '30px', borderRadius: '20px', overflow: 'hidden'}}>
								<TableData setLoadingTable={setLoadingTable} loadingTable={loadingTable} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
