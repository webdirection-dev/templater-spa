import {useState} from "react";
import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";
import DataForItem from "../../../data/dataForItem";

const Main = () => {

    const [isDataForCard, setDataForCard] = useState({})
    const [isNotifyPerson, setNotifyPerson] = useState([])

    const toGetDataFromPanel = (obj) => {
        setDataForCard(obj)
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
                toGetNotifyPerson={toGetNotifyPerson}
            />

            <div className='content container'>
                <CardsList
                    isDataForCard={isDataForCard}
                    isNotifyPerson={isNotifyPerson}
                />
            </div>
        </>

    )
};

export default Main;