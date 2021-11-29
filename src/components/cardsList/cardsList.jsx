import {useEffect, useState} from "react";

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
        toGetFlagInside = Function.prototype,
        toGetDataProblem = Function.prototype,
        toGetDataWhoNotify = Function.prototype,
        toGetDataNotes = Function.prototype,
        toGetDataOPS = Function.prototype,
        toGetPerson = Function.prototype,
        toGetNotesForPerson = Function.prototype,
        toGetDataUpdate = Function.prototype,
        toGetDurationIncident = Function.prototype,
        toNotesClosingOut = Function.prototype,
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

    //componentDidUpdate
    //Передать наверх состояние INSIDE
    useEffect(() => {
        toGetFlagInside(isInside)
        // eslint-disable-next-line
    }, [isInside])

    //Передать наверх состояние ОПИСАНИЕ ПРОБЛЕМЫ
    useEffect(() => {
        toGetDataProblem(isProblemForAllCards)
        // eslint-disable-next-line
    }, [isProblemForAllCards])

    //Передать наверх состояние кто оповещен
    useEffect(() => {
        toGetDataWhoNotify(isWhoNotifyForClosing)
        // eslint-disable-next-line
    }, [isWhoNotifyForClosing])

    //Передать наверх тикет JIRA
    useEffect(() => {
        toGetDataOPS(isOpsNumberAllCards)
        // eslint-disable-next-line
    }, [isOpsNumberAllCards])

    //Передать наверх Великая четверка
    useEffect(() => {
        toGetPerson(isNotifyPerson)
        // eslint-disable-next-line
    }, [isNotifyPerson])

    return(
        <div className="summary-forms">
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
                onCheckInside={onCheckInside}
                getProblemForAllCards={getProblemForAllCards}
                getOpsNumberForAllCards={getOpsNumberForAllCards}
                getWhoNotify={getWhoNotify}
                toGetDataNotes={toGetDataNotes}
            />

            <div className="summary summary__helpers">
                <UpdateCard
                    isDataForCard={isDataForCard}
                    isInside={isInside}
                    toGetDataUpdate={toGetDataUpdate}
                />

                <NotifyPerson
                    isNotifyPerson={isNotifyPerson}
                    isDataForCard={isDataForCard}
                    toGetNotesForPerson={toGetNotesForPerson}
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
                toGetDurationIncident={toGetDurationIncident}
                toNotesClosingOut={toNotesClosingOut}
            />
        </div>
    )
};

export default CardsList;