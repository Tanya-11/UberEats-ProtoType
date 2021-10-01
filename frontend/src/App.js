import Axios from 'axios'
import { Routes } from './Routes'
import SignUpPage from './views/auth/SignUpPage'
import './App.scss'
import Dashboard from './views/dashboard/Dashboard'

function App() {
    const name = 'ellen'
    const dob = '1998-09-09'
    const email = 'ellen1@gmail.com'
    const phoneNo = 6689989999
    const city = 'San Jose'
    const state = 'California'
    const country = 'United States'
    const imageUrl = ' '

    const addCustomerData = () => {
        // Axios.post("http://18.220.7.192:3001/signup", {
        //   name: name,
        //   dob: dob,
        //   email: email,
        //   phoneNo: phoneNo,
        //   city: city,
        //   state: state,
        //   country: country,
        //   imageUrl: imageUrl
        // }).then(()=>{
        //   console.log("Success");
        // })
        Axios.get('http://18.220.7.192:3001/login').then((res) => {
            console.log('success', res)
        })
    }
    return (
        // <div onClick  ={addCustomerData}>
        //   <h1>Hi</h1>
        // </div>
        <div className="parent-container">
            {/* <SignUpPage></SignUpPage> */}
            <Routes />
            {/* <Dashboard></Dashboard> */}
            {/* <Dashboard></Dashboard>
       <Dashboard></Dashboard>
       <Dashboard></Dashboard>
       <Dashboard></Dashboard>
       <Dashboard></Dashboard> */}
        </div>
    )
}

export default App
