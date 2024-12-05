import { IoChevronDown, IoNotificationsOutline, IoSearch } from "react-icons/io5";
import usFlag from '../../assets/us_flag.png'
import avatar from '../../assets/react.svg'
export default function Header() {
  return <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', height: '90px', padding: '0 20px'}}>
    <h1 style={{fontWeight: 600}}>Dashboard</h1>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#f9fafb', transition: 'all .3s', padding: '10px 16px', borderRadius: '8px'}}>
      <IoSearch style={{fontSize: '20px', color: 'var(--primary-color)'}}/>
      <input type="text" placeholder="Search here..." style={{border: 'none', fontSize: '17px', outline: 'none', backgroundColor: 'transparent', width: '400px'}}/>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <img src={usFlag} alt="" style={{width: '30px'}}/>
      <span style={{fontWeight: 600}}>Eng (US)</span>
      <IoChevronDown />
    </div>
    <div style={{backgroundColor: '#fffaf1', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '8px', position: 'relative'}}>
      <IoNotificationsOutline style={{fontSize: '24px', color: '#ffaf2e'}}/>
      <div style={{width: '8px', height: '8px', borderRadius: '100%', backgroundColor: '#eb5757', position: 'absolute', top: 5, right: 5}}></div>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15}}>
      <img src={avatar} alt="" />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{fontWeight: 500}}>Hygge Group</span>
        <span style={{fontWeight: 300}}>Admin</span>
      </div>
      <IoChevronDown />
    </div>
  </div>
}