// import Axios from 'axios';
// import { Component } from 'react';
// import RestCard from './../common/RestCard';
// import { useState, useEffect } from "react";


// const Dashboard=()=>{
//     // state = {
//     //     restData: []
//     // }
//     // constructor() {
//     //     super();
//     //    // this.getrestData();
//     // }

//     // componentDidMount(){
//     //     this.getrestData();
//     // }




//         let resData=[];
//         useEffect(()=>{
//             () => {
//                 let data =  Axios.get('http://localhost:3001/dashboard')
//                     .then(({ data }) => data);
//                     resData = data;

//             }
//            // getrestData();
//         },[]);
//         return (
//             <>
//             <div>{resData.length }</div>
//                 {
//                         resData.map(data => {
//                         return (
//                             <>
//                                 <h1>{data.city}</h1>
//                                 {/* <RestCard /> */}
//                             </>
//                         )

//                     })
//                 }
//             </>
//         )

// };

// export default Dashboard;


//!!!!!!!!!!!!!!!!!!!!!!!!!
/**
 * two APIS will be called
 * one will be to fetch dashboard data based on fiilters
 * second to fetch fav based on loggedin User
 * there will be one big array of object created
 */
// /**
//  * dashboard
//  *
//  * header (delibery mode search tab), profile
//  * sidebar (static content)
//  * maincontent-- tiles(rest db)
//  *
//  *
//  *
//  *
//  */


import { useState, useEffect } from 'react';
import Axios from 'axios';
import RestCard from '../common/RestCard';
import Header from './Header';

const Dashboard = () => {
  const [restData, setrestData] = useState([]);
  const [favRest, setfavRest] = useState(false);


  // + adding the use
  useEffect(() => {
    // we will use async/await to fetch this data
    getrestData(); //uncomment later, commented to check fav data
    getfavData();

    //setfavRest();
  }, []); // <- you may need to put the setBooks function in this array
  const getrestData = async () => {
    let response = [];
    try {
      response = await Axios.post("http://localhost:3001/getDataBySearchTabTextForRest",
        {
          city: 'San Jose',
          mode: '',
        searchTabText: 'king',
        })
        .then((result) => {
          console.log("Api res-", result);
          return result.data;
        }
          // ({ data }) => data
        );
    }
    catch (err) {
      throw err;
    }
    // store the data into our books variable
    setrestData(response);

  }
  const getfavData = async () => {
    let response = [];
    try {
      response = await Axios.post('http://localhost:3001/get-favorites', {
        user: 'liam@gmail.com',
        restaurant: 'ch-king@gmail.com'
      })
        .then((res) => {
          console.log("getfavData", res);
          if (res.status === 200 && res.data.length > 0) {
            setfavRest(true);
            console.log('Hey')
          }
          else {
            console.log('bye')
            setfavRest(false);
          }
        })
    }
    catch (err) {
      throw err;
    }
  }
  return (
    <>
      <Header></Header>
      {restData.map((item, index) => {
        return (
          <>
            <RestCard key={index} data={item} fav={favRest}></RestCard>
          </>
        )
      })}
    </>
  )
}

export default Dashboard;