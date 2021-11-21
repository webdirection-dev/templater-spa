import {useState} from "react";

import './cardsList.css';
import CardItem from "../cardItem";

const CardsList = (props) => {

    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        isTimeForClosing = Object.prototype,
    } = props

    const [isInside, setInside] = useState(false)
    const [isProblemForAllCards, setProblemForAllCards] = useState(null)
    const [isOpsNumberAllCards, setOpsNumberAllCards] = useState(null)

    const onCheckInside = (flag) => {
        setInside(flag)
    }

    const getProblemForAllCards = (text) => {
        setProblemForAllCards(text)
    }

    const getOpsNumberForAllCards = (num) => {
        setOpsNumberAllCards(num)
    }

    return(
        <div className="summary-forms">
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                onCheckInside={onCheckInside}
                getProblemForAllCards={getProblemForAllCards}
                getOpsNumberForAllCards={getOpsNumberForAllCards}
            />

            <CardItem />

            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                isInside={isInside}
                flagOpening={false}
                isProblemForAllCards={isProblemForAllCards}
                isOpsNumberAllCards={isOpsNumberAllCards}
                isTimeForClosing={isTimeForClosing}
            />
        </div>
    )
};

export default CardsList;