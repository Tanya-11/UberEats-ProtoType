import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import DishCard from './DishCards'
import './Profile.scss'

const ViewOrder = () => {
    const restaurant = useSelector((state) => state.restLogin.text.user)
    const [dishData, setDishData] = useState([])
    // const addCardObj = {
    //     dishId: 0,
    //     dishName: '',
    //     ingredients: '',
    //     price: '',
    //     description: '',
    //     category: '',
    //     restRef: restaurant,
    // }
    useEffect(() => {
        getDishData()
    }, [])

    const getDishData = () => {
        Axios.post('/get-dishes', {
            restId: restaurant,
        })
            .then((res) => {
                console.log(res)
                setDishData(res.data)
            })
            .catch((err) => {
                throw err
            })
    }
    const addCard = () => {
        const addCardObj = {
            dishName: '',
            ingredients: '',
            price: '',
            description: '',
            category: 'Veg',
            restRef: restaurant,
        }
        setDishData((prev) => [...prev, addCardObj])
        console.log(dishData)
    }

    return (
        <>
            <div>
                <button className="add" onClick={addCard}>
                    +
                </button>
            </div>
            {dishData.length > 0 &&
                dishData.map((el, index) => <DishCard key={index} data={el}></DishCard>)}
        </>
    )
}

export default ViewOrder
