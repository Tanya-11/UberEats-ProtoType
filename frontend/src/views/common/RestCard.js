import './rest-card.scss'
import { useEffect, useState } from 'react'
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const RestCard = (props) => {
    const [isFav, setisFav] = useState(false)
    const history = useHistory()
    console.log('restcard', props)

    useEffect(() => {
        setisFav(props.data.fav)
    }, [props.data])

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
    }

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
                <h3 className="rest-name-container--title"> {props.data.restName}</h3>
                <div
                    onClick={setfavData}
                >{isFav !== null && <>
                    {isFav === true ? <div><FavoriteTwoToneIcon /></div> :
                        <div><FavoriteBorderTwoToneIcon /></div>
                    }
                </>
                    }
                </div>
            </div>
        </div>
    )
}

export default RestCard
