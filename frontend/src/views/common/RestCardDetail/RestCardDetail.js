import React, { useEffect, useState } from 'react'
import styles from './RestCardDetail.module.scss';
import Axios from 'axios';
import RestDishCard from '../RestDishCard/RestDishCard';
const RestCardDetail = () => {
    const [dish, setDish] = useState([])

    useEffect(() => {
        if (localStorage.getItem('RestCardDetails')) {
            getRestDishDetails(JSON.parse(localStorage.getItem('RestCardDetails')).restId);
        }
    }, []);

    const getRestDishDetails = async (restId) => {
        let api = 'http://localhost:3001/getDataForRestDish'
        let response = []
        try {
            response = await Axios.post(api, {
                city: 'San Jose',
                mode: '',
                searchTabText: restId,
            }).then((res) => {
                setDish(res.data);
                return res;
            })
        } catch (err) {
            throw err
        }
    }

    return (
        <div className={styles.RestCardDetail} data-testid="RestCardDetail">
            <div className={styles.RestImg} />
            <div className={styles.RestdescWrapper}>
                <div className={styles.Restdesc}>
                    <div className="name">
                        {dish[0]?.restName}(  {dish[0]?.addressLine})
                    </div>
                    <div className="desc">
                        {dish[0]?.description}
                    </div>
                    <div className="open-hrs">
                        {dish[0]?.openHrs}
                    </div>
                </div>
                <div className={styles.dishcardWrapper}
                >
                    <div className={styles.dishcards}>
                        {
                            dish.map((result, i) => (
                                <RestDishCard key={i} data={result}></RestDishCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestCardDetail

/**
 * todo: get restdetails(rest,dish) by refID
 */
