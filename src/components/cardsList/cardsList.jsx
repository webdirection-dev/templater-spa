import {useState} from "react";

import './cardsList.css';
import CardItem from "../cardItem";
import NotifyPerson from "../notifyPerson";
import UpdateCard from "../updateCard";

const CardsList = (props) => {

    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        isTimeForClosing = Object.prototype,
        isNotifyPerson = Array.prototype,
    } = props

    const [isInside, setInside] = useState(false)
    const [isProblemForAllCards, setProblemForAllCards] = useState(null)
    const [isOpsNumberAllCards, setOpsNumberAllCards] = useState(null)
    const [isWhoNotifyForClosing, setWhoNotifyForClosing] = useState(null)

    const onCheckInside = (flag) => {
        setInside(flag)
    }

    const getProblemForAllCards = (text) => {
        setProblemForAllCards(text)
    }

    const getOpsNumberForAllCards = (num) => {
        setOpsNumberAllCards(num)
    }

    const getWhoNotify = (txt) => {
        setWhoNotifyForClosing(txt)
    }

    return(
        <div className="summary-forms">
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                onCheckInside={onCheckInside}
                getProblemForAllCards={getProblemForAllCards}
                getOpsNumberForAllCards={getOpsNumberForAllCards}
                getWhoNotify={getWhoNotify}
            />

            <div className="summary summary__helpers">
                <UpdateCard
                    isDataForCard={isDataForCard}
                    isInside={isInside}
                />

                <NotifyPerson
                    isNotifyPerson={isNotifyPerson}
                    isDataForCard={isDataForCard}
                />
            </div>

            {/*Закрытие*/}
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                isInside={isInside}
                flagOpening={false}
                isProblemForAllCards={isProblemForAllCards}
                isOpsNumberAllCards={isOpsNumberAllCards}
                isTimeForClosing={isTimeForClosing}
                isWhoNotifyForClosing={isWhoNotifyForClosing}
            />
        </div>
    )
};

export default CardsList;