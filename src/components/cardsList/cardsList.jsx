import {useState} from "react";

import './cardsList.css';
import CardItem from "../cardItem";

const CardsList = (props) => {

    const [isInside, setInside] = useState(false)

    const onCheckInside = (flag) => {
        setInside(flag)
    }

    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
    } = props

    return(
        <div className="summary-forms">
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                onCheckInside={onCheckInside}
            />

            <CardItem />

            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                isInside={isInside}
                flagOpening={false}
            />
        </div>
    )
};

export default CardsList;