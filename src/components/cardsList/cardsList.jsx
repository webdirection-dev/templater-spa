import {useEffect, useState} from "react";

import './cardsList.css';
import CardItem from "../cardItem";
import NotifyPerson from "../notifyPerson";
import UpdateCard from "../updateCard";
import Alert from "../table/alert";

const CardsList = (props) => {

    const {
        isDataForCard = Object.prototype,
        isNotifyPerson = Array.prototype,
    } = props

    const [isInside, setInside] = useState(false)
    const [isProblemForAllCards, setProblemForAllCards] = useState(null)
    const [isOpsNumberAllCards, setOpsNumberAllCards] = useState(null)
    const [isWhoNotifyForClosing, setWhoNotifyForClosing] = useState(null)
    const [isAlert, setAlert] = useState(false)
    const [isGetDataTime, setGetDataTime] = useState({})
    const [isGetTimeStart, setGetTimeStart] = useState({})

    const toGetDataTime = (start) => {
        setGetDataTime(start)
    }

    const toGetTimeStart = (start) => {
        setGetTimeStart(start)
    }

    const toGetAlert = () => {
        setAlert(true)
    }

    const closeAlert = () => {
        setAlert(false)
    }

    // componentDidUpdate
    // изчезновение алерта Скопировано в буфер
    useEffect(() => {
        const timerId = setTimeout(() => closeAlert(), 3000);

        // componentDidUnmount
        return () => clearTimeout(timerId)
        // eslint-disable-next-line
    }, [isAlert]);

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
                onCheckInside={onCheckInside}
                getProblemForAllCards={getProblemForAllCards}
                getOpsNumberForAllCards={getOpsNumberForAllCards}
                getWhoNotify={getWhoNotify}

                toGetAlert={toGetAlert}
                toGetDataTime={toGetDataTime}
                toGetTimeStart={toGetTimeStart}
            />

            <div className="summary summary__helpers">
                <UpdateCard
                    isDataForCard={isDataForCard}
                    isInside={isInside}

                    toGetAlert={toGetAlert}
                />

                <NotifyPerson
                    isNotifyPerson={isNotifyPerson}
                    isDataForCard={isDataForCard}

                    toGetAlert={toGetAlert}
                />
            </div>

            {/*Закрытие*/}
            <CardItem
                flagOpening={false}

                isDataForCard={isDataForCard}

                isInside={isInside}
                isProblemForAllCards={isProblemForAllCards}
                isOpsNumberAllCards={isOpsNumberAllCards}

                isWhoNotifyForClosing={isWhoNotifyForClosing}

                toGetAlert={toGetAlert}

                isGetTimeStart={isGetTimeStart}
                isGetDataTime={isGetDataTime}
            />

            <Alert
                isAlert={isAlert}
            />
        </div>
    )
};

export default CardsList;