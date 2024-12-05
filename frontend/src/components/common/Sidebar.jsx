import { RiDashboardFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import logo from '../../assets/react.svg'
export default function Sidebar() {
  return <div style={{height: '100vh'}}>
    <div style={{width: '300px', height: '90px', display: 'flex', alignItems: 'center', gap: 10, padding: '30px 20px', fontWeight: '500'}}>
      <img src={logo} alt="" style={{width: '50px'}}/>
      <span style={{fontSize: '30px'}}>Hygge</span>
    </div>
    <div style={{width: '300px', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: 10}}>
      <div style={{backgroundColor: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <RiDashboardFill style={{fontSize: '24px'}}/>
        <span style={{fontSize: '18px', fontWeight: 600}}>Dashboard</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <FaShieldAlt style={{color: '#3f51b5'}}/>
        <span>Authentication</span>
        <IoChevronDown />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <MdLeaderboard style={{color: '#3f51b5'}}/>
        <span>Leaderboard</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <HiDocumentReport style={{color: '#3f51b5'}}/>
        <span>Report</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <MdMessage style={{color: '#3f51b5'}}/>
        <span>Message</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRadius: '10px'}}>
        <IoMdSettings style={{color: '#3f51b5'}}/>
        <span>Setting</span>
      </div>
    </div>
  </div>
}