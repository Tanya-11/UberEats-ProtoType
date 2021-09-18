import './App.css';
import Axios from "axios";

function App() {
  const name = 'ellen';
  const dob = '1998-09-09';
  const email = 'ellen1@gmail.com';
  const phoneNo = 6689989999;
  const city = 'San Jose';
  const state = 'California';
  const country = 'United States';
  const imageUrl = ' ';


  const addCustomerData = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      dob: dob,
      email: email,
      phoneNo: phoneNo,
      city: city,
      state: state,
      country: country,
      imageUrl: imageUrl
    }).then(()=>{
      console.log("Success");
    })
  }
  return (
    <div onClick  ={addCustomerData}>
      <h1>Hi</h1>
    </div>
  );
}

export default App;
