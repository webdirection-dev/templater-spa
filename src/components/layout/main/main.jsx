import {useState} from "react";
import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";

const Main = () => {
    const [isDataForCard, setDataForCard] = useState({})
    const [isTimeForCard, setTimeForCard] = useState({})

    const toGetDataFromPanel = (obj) => {
        setDataForCard(obj)
    }

    const toGetTimeFromPanel = (obj) => {
        setTimeForCard(obj)
    }

    return(
        <>
            <ControlPanel
                toGetDataFromPanel={toGetDataFromPanel}
                toGetTimeFromPanel={toGetTimeFromPanel}
            />

            <div className='content container'>
                <CardsList
                    isDataForCard={isDataForCard}
                    isTimeForCard={isTimeForCard}
                />
            </div>
        </>

    )
};

export default Main;