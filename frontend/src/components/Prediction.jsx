import { useEffect, useState } from "react"

export default function Prediction({setLoadingPrediction}) {
  const [predictionData, setPredictionData] = useState([])
  const getPredictionData = async () => {
    const response = await fetch('http://localhost:3000/get-prediction-data')
    const data = await response.json()
    if (response.ok) {
      setPredictionData(data)
      setLoadingPrediction(true)
    }
    console.log(data)
  }
  useEffect(() => {
    getPredictionData()
  }, [])
  return
}