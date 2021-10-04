import './rest-card.scss'
import { useEffect, useState } from 'react'
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const RestCard = (props) => {
    const [isFav, setisFav] = useState(props.data.fav)
    const history = useHistory()
    console.log('restcard', props)

    useEffect(() => {
        console.log("@@@", props.data);
        setisFav(isFav)
        console.log('jjj' + isFav);
        // getfavData('');
    }, [props.data])
    /**
     * TODO: send logged in user for setfavdata in useeffect
     */
    // useEffect(() => {
    //     //   setisFav(getfavData());
    // }, [])


    const setfavData = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("isFav", isFav);
        setisFav(!isFav)
        console.log("isFav", isFav);
        let api = ''
        if (!isFav) api = 'http://localhost:3001/favorites-add'
        else api = 'http://localhost:3001/favorites-delete';
        console.log(api + '' + isFav);
        let response = []
        try {
            response = await Axios.post(api, {
                user: 'liam@gmail.com',
                restaurant: props.data.restId,
            }).then((data) => {
                console.log('Api res-', data)
                return data
            })
        } catch (err) {
            throw err
        }
        // store the data into our books variable
    }

    // const getRestCardDetails = async () => {
    //     // e.preventDefault();
    //     let api = 'http://localhost:3001/getDataBySearchTabTextForRest'
    //     let response = []
    //     try {
    //         response = await Axios.post(api, {
    //             city: 'San Jose',
    //             mode: 'pick',
    //             searchTabText: props.data.restRef,
    //         }).then((data) => {
    //             console.log('Card-', data)
    //             return data
    //         })
    //     } catch (err) {
    //         throw err
    //     }
    //     // store the data into our books variable
    // }

    const goToRestCardDetails = (e) => {
        e.preventDefault()
        history.push('/dashboard/restaurant-details');
        localStorage.setItem('RestCardDetails', JSON.stringify(props.data));
    }

    return (
        <div className="rest-card-container"
            onClick={goToRestCardDetails}
        >
            <div className="image-container"></div>
            <div className="rest-name-container">
                {/* {isFav === false && <div > <h1>hi</h1></div>} */}
                {/* {isFav === true && <div > <h1>bye</h1></div>} */}
                <h3 className="rest-name-container--title"> {props.data.restName}</h3>
                <div
                    onClick={setfavData}
                >{isFav === true ?
                    <div><FavoriteTwoToneIcon /></div>
                    :
                    <div><FavoriteBorderTwoToneIcon /></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RestCard
