import React, { useEffect, useState } from 'react'
import styles from './RestCardDetail.module.scss';
import Axios from 'axios';
import RestDishCard from '../RestDishCard/RestDishCard';
const RestCardDetail = () => {
    // const [restName, setRestName] = useState('hi');
    // const [desc, setDesc] = useState('');
    // const [addressLine, setAddressLine] = useState('');
    // const [dishId, setDishId] = useState(0);
    // const [dishName, setDishName] = useState('');
    // const [ingredients, setIngredients] = useState('');
    // const [openHrs, setOpenHrs] = useState('');
    // const [price, setPrice] = useState('');
    // const [restId, setRestId] = useState('');
    const [dish, setDish] = useState([])

    useEffect(() => {
        if (localStorage.getItem('RestCardDetails')) {
            //   setName(localStorage.getItem('RestCardDetails').restName);
            console.log(dish);
            getRestDishDetails(JSON.parse(localStorage.getItem('RestCardDetails')).restId);
        }
    }, []);

    const getRestDishDetails = async (restId) => {
        console.log(restId);
        let api = 'http://18.220.7.192:3001/getDataForRestDish'
        let response = []
        try {
            response = await Axios.post(api, {
                city: 'San Jose',
                mode: '',
                searchTabText: restId,
            }).then((res) => {

                // res.data.forEach(element => {
                //     setDish(element);
                //     console.log(dish);
                // setRestName(res.data.restName);
                // setDesc(res.data.description);
                // setAddressLine(res.data.addressLine);
                // setDishId(res.data.dishId)
                // setDishName(res.data.dishName);
                // setIngredients(res.data.ingredients);
                // setOpenHrs(res.data.openHrs);
                // setPrice(res.data.price);
                // setRestId(res.data.restId);
                //  });
                setDish(res.data);
                // res.data.map((ele) => {
                //     console.log('Card-', ele)
                // })

                return res;
            })
        } catch (err) {
            throw err
        }
    }

    // const clickcall = () => {
    //     console.log(dish);
    //     if (!localStorage.getItem('OrderCount')) {
    //         localStorage.setItem('OrderCount',
    //             0
    //         )
    //     }
    //     let count = parseInt(localStorage.getItem('OrderCount'));
    //     localStorage.setItem('OrderCount',
    //         count + 1
    //     )
    // }

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
                // onClick={clickcall}
                >
                    <div className={styles.dishcards}>
                        {
                            dish.map((element) => {
                                return (
                                    <div>
                                        <RestDishCard data={element} />
                                    </div>
                                )
                            })
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
