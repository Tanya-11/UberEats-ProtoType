import './rest-card.scss';
import { useEffect, useState } from "react";
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const RestCard = (props) => {
    const [isFav, setisFav] = useState(props.fav);
    const history = useHistory();
    console.log("restcard", props);
    /**
     * TODO: send logged in user for setfavdata in useeffect
     */
    useEffect(() => {
     //   setisFav(getfavData());
        }, []);

    const setfavData = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setisFav(!isFav);
        let api = '';
        if (isFav) api = 'http://localhost:3001/favorites-add'
        else api = 'http://localhost:3001/favorites-delete'
        let response = [];
        try {
            response = await Axios.post(api,
                {
                    user: 'liam@gmail.com',
                    restaurant: ''
                })
                .then((data) => {
                    console.log("Api res-", data);
                    return data;
                }
                );
        }
        catch (err) {
            throw err;
        }
        // store the data into our books variable
    }

    const goToRestCardDetails = (e) => {
        e.preventDefault();
        history.push('/dashboard/restaurant-details');
    }


    return (
        <div className="rest-card-container" onClick={goToRestCardDetails}>
            <div className="image-container">
            </div>
            <div className="rest-name-container">
                <h3 className="rest-name-container--title">{props.data.restName}</h3>
                <div onClick={setfavData}>
                    {isFav ? <FavoriteTwoToneIcon /> :
                    <FavoriteBorderTwoToneIcon />
                     }
                </div>
            </div>
        </div>
    )
}

export default RestCard;