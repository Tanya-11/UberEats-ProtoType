import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import RestCard from '../common/RestCard'
import { useHistory } from 'react-router';

export const Favorites = (props) => {

    Axios.defaults.withCredentials = true;
    const [restData, setRestData] = useState([]);
    const [noDataMsg, setNoDataMsg] = useState('');

    useEffect(() => {
        getFavRestaurant();
    }, [])

    const getFavRestaurant = () => {
        const response = Axios.post('http://localhost:3001/get-favorites', {
            email: props.data
        });
        response
            .then((res) => {
                console.log(res);
                let data = [];
                res.data.forEach((el) => {
                    data.push(Axios.post('http://localhost:3001/get-rest-data', {
                        restId: el.restId
                    }))
                });
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(el => {
                        console.log(el);
                        el.then(res => {
                            console.log(res);
                            res.data[0]['fav'] = null
                            setRestData(prev => [...prev, res.data[0]]);
                        })
                    })
                }
                else {
                    setNoDataMsg('No Favorite Restaurant');
                }

            })
            .catch(err => {
                throw err;
            })
    }

    return (
        <div>
            {noDataMsg && <p>{noDataMsg}</p>}
            {
                restData.map((result, i) => (
                    <RestCard key={i} data={result} disabled></RestCard>
                ))
            }
        </div>
    )
}