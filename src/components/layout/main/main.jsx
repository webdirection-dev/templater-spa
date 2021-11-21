import {useState} from "react";
import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";

const Main = () => {
    const [isDataForCard, setDataForCard] = useState({})
    const [isTimeForCard, setTimeForCard] = useState({})
    const [isTimeForClosing, setTimeForClosing] = useState({})

    const toGetDataFromPanel = (obj) => {
        setDataForCard(obj)
    }

    const toGetTimeFromPanel = (obj) => {
        setTimeForCard(obj)
    }

    const toGetTimeClosing = (obj) => {
        setTimeForClosing(obj)
    }

    return(
        <>
            <ControlPanel
                toGetDataFromPanel={toGetDataFromPanel}
                toGetTimeFromPanel={toGetTimeFromPanel}
                toGetTimeClosing={toGetTimeClosing}
            />

            <div className='content container'>
                <CardsList
                    isDataForCard={isDataForCard}
                    isTimeForCard={isTimeForCard}
                    isTimeForClosing={isTimeForClosing}
                />
            </div>
        </>

    )
};

export default Main;