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
import './dashboard.scss';

const Dashboard = () => {
    const [restData, setrestData] = useState([])
    const [favRest, setfavRest] = useState(false);
    const customer = useSelector(state => state.userLogin.text.user);
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('');
    const [searchData, setSearchData] = useState({
        city: 'San Jose',
        mode: 'pick',
        category: '',
        searchTabText: '',
    });
    Axios.defaults.withCredentials = true;

    // + adding the use
    useEffect(() => {
        Promise.all([getRestData, getFavData])
            .then((res) => {
                console.log("Promise" + JSON.stringify(res));
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
    }, [searchData])




    const getRestData =
        Axios.post('http://localhost:3001/getDataBySearchTabTextForDish', {
            ...searchData
        });

    const getFavData =
        Axios.post('http://localhost:3001/get-favorites', {
            email: customer,
        })

    const handleChange = (e) => {
        console.log(e.target.name);
        const { name, value } = e.target;
        // const
        setSearchData(prevSate => ({
            ...prevSate,
            [name]: value,
        }))
        console.log(searchData);
    }
    const changeDeliveryMode = (event) => {
        console.log(event.target.value);
        setSearchData({
            mode: event.target.value
        })
        //  setDeliveryMode(event.target.value)
    }
    return (
        <div className="dashboardContent">
            <div className="leftContent">
                <div className="mode" onChange={(e) => handleChange(e)}>
                    <label>
                        <input type="radio" value="delivery" name="mode" />
                        Delivery
                    </label>
                    <label>
                        <input type="radio" value="pick" name="mode" />
                        Pick Up
                    </label>
                </div>
                <div className="location">
                    <input
                        type="text"
                        name="city"
                        value={searchData.city}
                        onChange={(e) => handleChange(e)}
                        placeholder="search City"
                    />
                </div>
                <div className="category" onChange={(e) => handleChange(e)}>
                    <label>
                        <input type="radio" value="Veg" name="category" />
                        Veg
                    </label>
                    <label>
                        <input type="radio" value="Non-Veg" name="category" />
                        Non-Veg
                    </label>
                </div>
                <div className="search">
                    <input
                        type="text"
                        name="searchTabText"
                        value={searchData.searchTabText}
                        onChange={(e) => handleChange(e)}
                        placeholder="search Restaurant"
                    />
                </div>



            </div>
            <div className="rightContent">
                {
                    restData.map((result, i) => (
                        <RestCard key={i} data={result}></RestCard>
                    ))
                }
            </div>
        </div >
    )
}

export default Dashboard
