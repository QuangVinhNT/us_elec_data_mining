import { useEffect, useState } from "react"
import { MdOnlinePrediction } from "react-icons/md"
import { TbLabelFilled } from "react-icons/tb";

export default function Prediction({setLoadingPrediction}) {
  const [predictionData, setPredictionData] = useState([])
  const getPredictionData = async () => {
    const response = await fetch('http://localhost:3000/get-prediction-data')
    const data = await response.json()
    if (response.ok) {
      setPredictionData(data)
      setLoadingPrediction(true)
    }
  }
  useEffect(() => {
    getPredictionData()    
		const interval = setInterval(() => {
      getPredictionData()    
		}, 60000)
		return () => clearInterval(interval)
  }, [])
  return <div style={{backgroundColor: '#fff', height: '100%', position: 'relative', borderRadius: '20px', overflow: 'hidden', padding: '20px'}}>
    <div style={{display: 'flex', paddingBottom: '20px', justifyContent: 'space-between', alignItems: 'center'}}>
      <h3 style={{fontWeight: 600}}>Prediction</h3>
      <button style={{backgroundColor: 'var(--primary-color)', border: 'none', color: '#fff', padding: '10px', borderRadius: '10px', cursor: 'pointer', transition: 'all .3s'}} className="predictBtn">Calculate</button>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#fff4de', borderRadius: '15px', padding: '20px'}}>
        <div style={{backgroundColor: '#ff947a', color: '#fff', width: '40px', height: '40px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MdOnlinePrediction style={{fontSize: '30px'}}/>
        </div>
        <span style={{marginTop: '20px', fontSize: '16px'}}>Electricity output tomorrow:{' '}
          <span style={{fontWeight: 600}}>{typeof predictionData[0] === 'undefined' ? 0 : predictionData[0][0].toFixed(2)} (MW)</span>
        </span>
        <span style={{color: 'var(--primary-color)', fontSize: '14px'}}>Accuracy: {typeof predictionData[0] === 'undefined' ? 0 : (predictionData[0][1]*100).toFixed(0)}%</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#dcfce7', borderRadius: '15px', padding: '20px'}}>
        <div style={{backgroundColor: '#3cd856', color: '#fff', width: '40px', height: '40px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TbLabelFilled style={{fontSize: '30px'}}/>
        </div>
        <div style={{marginTop: '20px'}}>
          <input type="text" placeholder="Enter electricity value (MW)" style={{border: 'none', width: '250px', padding: '5px 7px', outline: 'none'}}/>
        </div>
        <span style={{fontSize: '14px', marginTop: '5px'}}>Predict % electricity output: <span style={{fontWeight: 600}}>{`None`}</span></span>
      </div>
    </div>
  </div>
}