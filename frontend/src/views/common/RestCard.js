import './rest-card.scss';
import { useState } from "react";
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

const RestCard=(props)=>{
    const [isFav, setisFav] = useState(false);
    // const setFavValue = () => {
    //     console.log('Click happened');
    //     return !isFav;
    // }
    console.log(props.data);
    return (
        <div className="rest-card-container">
            <div className="image-container">
            </div>
            <div className="rest-name-container">
                <h3 className="rest-name-container--title">{props.data.name}</h3>
                <div onClick={() => setisFav(!isFav)}>
                {isFav ? <FavoriteTwoToneIcon /> : <FavoriteBorderTwoToneIcon />}
                </div>
            </div>
        </div>
    )
}

export default RestCard;