import { SyncLoader } from "react-spinners";
export default function Loading() {
  return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <SyncLoader color="#2472c8" size={10}/>
    <span style={{fontSize: '20px', fontWeight: '500', marginTop: '10px'}}>Loading site...</span>
  </div>
}