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

import { useState, useEffect } from 'react'
import Axios from 'axios'
import RestCard from '../common/RestCard'
import Header from './Header'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const [restData, setrestData] = useState([])
    const [favRest, setfavRest] = useState(false);
    const customer = useSelector(state => state.userLogin.text.user);
    Axios.defaults.withCredentials = true;

    // + adding the use
    useEffect(() => {
        Promise.all([getRestData, getFavData])
            .then((res) => {
                console.log("Promise" + JSON.stringify(res[1].data));
                res[0].data.map(el => {
                    res[1].data.map(item => {
                        if (el.restId === item.restId) {
                            console.log("favvvvv" + item.restId);
                            el['fav'] = true;
                        }
                    }
                    )
                })
                setrestData(res[0].data)
            })
            .catch((err) => {
                throw err;
            })
    }, [])


    const getRestData =
        Axios.post('http://localhost:3001/getDataForRest', {
            city: 'San Jose',
            mode: '',
            searchTabText: 'dom',
        });

    const getFavData =
        Axios.post('http://localhost:3001/get-favorites', {
            user: customer,
        })

    return (
        <div>
            {
                restData.map((result, i) => (
                    <RestCard key={i} data={result}></RestCard>
                ))
            }


        </div>
    )
}

export default Dashboard
