import {useState} from "react";
import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";
import DataForItem from "../../../data/dataForItem";

const Main = () => {
    const [isDataForCard, setDataForCard] = useState({})
    const [isTimeForCard, setTimeForCard] = useState({})
    const [isTimeForClosing, setTimeForClosing] = useState({})
    const [isNotifyPerson, setNotifyPerson] = useState([])

    const toGetDataFromPanel = (obj) => {
        setDataForCard(obj)
    }

    const toGetTimeFromPanel = (obj) => {
        setTimeForCard(obj)
    }

    const toGetTimeClosing = (obj) => {
        setTimeForClosing(obj)
    }

    const toGetNotifyPerson = (obj) => {
        // обрабатываем объект из панели оповещения и отправляем userName в массив isNotifyPerson
        const arr = []

        DataForItem.notifyPerson.forEach(item => {
            if (obj[item.name]) arr.push(item.userName)
        })

        setNotifyPerson(arr)
    }

    return(
        <>
            <ControlPanel
                toGetDataFromPanel={toGetDataFromPanel}
                toGetTimeFromPanel={toGetTimeFromPanel}
                toGetTimeClosing={toGetTimeClosing}
                toGetNotifyPerson={toGetNotifyPerson}
            />

            <div className='content container'>
                <CardsList
                    isDataForCard={isDataForCard}
                    isTimeForCard={isTimeForCard}
                    isTimeForClosing={isTimeForClosing}
                    isNotifyPerson={isNotifyPerson}
                />
            </div>
        </>

    )
};

export default Main;