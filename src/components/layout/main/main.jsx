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




// import {useEffect, useState} from "react";
// import ControlPanel from "../../controlPanel";
// import CardsList from "../../cardsList";
// import Table from "../../table";
// import DataForItem from "../../../data/dataForItem";
//
// const Main = () => {
//
//     const [isDataForCard, setDataForCard] = useState({})
//     const [isTimeForCard, setTimeForCard] = useState({})
//     const [isTimeForClosing, setTimeForClosing] = useState({})
//     const [isNotifyPerson, setNotifyPerson] = useState([])
//     const [isToggleShowTable, setToggleShowTable] = useState(false)
//
//     // Данные для вывода в markdown
//     const [isFlagInside, setFlagInside] = useState(false)
//     const [isDataProblem, setDataProblem] = useState(null)
//     const [isDataWhoNotify, setDataWhoNotify] = useState(null)
//     const [isDataNotes, setDataNotes] = useState(null)
//     const [isDataOps, setDataOps] = useState(null)
//     const [isPerson, setPerson] = useState(null)
//     const [isNotesForPerson, setNotesForPerson] = useState(null)
//     const [isUpdate, setUpdate] = useState(null)
//     const [isClosingTime, setClosingTime] = useState({hourClosing: '', minuteClosing: ''})
//     const [isNotesClosingOut, setNotesClosingOut] = useState(null)
//
//     // Данные для копирования по кнопке на карточке-конструкторе
//     const [isCopyOpening, setCopyOpening] = useState('')
//     const [isCopyClosing, setCopyClosing] = useState('')
//     const [isCopyNotify, setCopyNotify] = useState('')
//     const [isCopyUpdate, setCopyUpdate] = useState('')
//
//     const toGetDataFromPanel = (obj) => {
//         setDataForCard(obj)
//     }
//
//     const toGetTimeFromPanel = (obj) => {
//         setTimeForCard(obj)
//     }
//
//     const toGetTimeClosing = (obj) => {
//         setTimeForClosing(obj)
//     }
//
//     const toGetNotifyPerson = (obj) => {
//         // обрабатываем объект из панели оповещения и отправляем userName в массив isNotifyPerson
//         const arr = []
//
//         DataForItem.notifyPerson.forEach(item => {
//             if (obj[item.name]) arr.push(item.userName)
//         })
//
//         setNotifyPerson(arr)
//     }
//
//     const toToggleShowTable = () => {
//         setToggleShowTable(!isToggleShowTable)
//     }
//
//     // Получить данные о ВНУТРЕННИЙ
//     const toGetFlagInside = (flag)  => {
//         setFlagInside(flag)
//     }
//
//     // Получить данные с описанием проблемы
//     const toGetDataProblem = (str)  => {
//         setDataProblem(str)
//     }
//
//     // Получить данные кто оповещен
//     const toGetDataWhoNotify = (str)  => {
//         setDataWhoNotify(str)
//     }
//
//     // Получить данные Примечание
//     const toGetDataNotes = (str)  => {
//         setDataNotes(str)
//     }
//
//     // Получить данные JIRA
//     const toGetDataOPS = (num)  => {
//         setDataOps(num)
//     }
//
//     // Получить данные об оповещаемых персонах
//     const toGetPerson = (arr)  => {
//         setPerson(arr.join(' '))
//     }
//
//     // Получить данные об оповещаемых персонах
//     const toGetNotesForPerson = (str)  => {
//         setNotesForPerson(str)
//     }
//
//     // Получить UPDATE
//     const toGetDataUpdate = (str)  => {
//         setUpdate(str)
//     }
//
//     // Получить время закрытия
//     const toGetDurationIncident = (obj)  => {
//         setClosingTime(obj)
//     }
//
//     // Получить время закрытия
//     const toNotesClosingOut = (str)  => {
//         setNotesClosingOut(str)
//     }
//
//     // Получить данные для копирования по кнопке на карточках
//     const toGetCopyOpeningFromTable = (str) => {
//         setCopyOpening(str)
//     }
//
//     const toGetCopyClosingFromTable = (str) => {
//         setCopyClosing(str)
//     }
//
//     const toGetCopyNotifyFromTable = (str) => {
//         setCopyNotify(str)
//     }
//
//     const toGetCopyUpdateFromTable = (str) => {
//         setCopyUpdate(str)
//     }
//
//     //componentDidUpdate
//     //остановить прокрутку тега body при открытом окне markdown
//     useEffect(() => {
//         if (isToggleShowTable) document.body.style.overflow = "hidden"
//         else document.body.style.overflow = "visible"
//
//     }, [isToggleShowTable])
//
//     return(
//         <>
//             <ControlPanel
//                 toGetDataFromPanel={toGetDataFromPanel}
//                 toGetTimeFromPanel={toGetTimeFromPanel}
//                 toGetTimeClosing={toGetTimeClosing}
//                 toGetNotifyPerson={toGetNotifyPerson}
//             />
//
//             <div className='content container'>
//                 <CardsList
//                     isDataForCard={isDataForCard}
//                     isTimeForCard={isTimeForCard}
//                     isTimeForClosing={isTimeForClosing}
//                     isNotifyPerson={isNotifyPerson}
//
//                     toGetFlagInside={toGetFlagInside}
//                     toGetDataProblem={toGetDataProblem}
//                     toGetDataWhoNotify={toGetDataWhoNotify}
//                     toGetDataNotes={toGetDataNotes}
//                     toGetDataOPS={toGetDataOPS}
//                     toGetPerson={toGetPerson}
//                     toGetNotesForPerson={toGetNotesForPerson}
//                     toGetDataUpdate={toGetDataUpdate}
//                     toGetDurationIncident={toGetDurationIncident}
//                     toNotesClosingOut={toNotesClosingOut}
//
//                     isCopyOpening={isCopyOpening}
//                     isCopyClosing={isCopyClosing}
//                     isCopyNotify={isCopyNotify}
//                     isCopyUpdate={isCopyUpdate}
//                 />
//
//                 {/*<button*/}
//                 {/*    className="btn-floating btn-large main__btn-showTable"*/}
//                 {/*    onClick={toToggleShowTable}*/}
//                 {/*>*/}
//                 {/*    <i className="material-icons main__icon-showTable">create</i>*/}
//                 {/*</button>*/}
//             </div>
//
//             {/*<Table*/}
//             {/*    isDataForCard={isDataForCard}*/}
//             {/*    isTimeForCard={isTimeForCard}*/}
//             {/*    isTimeForClosing={isTimeForClosing}*/}
//             {/*    isToggleShowTable={isToggleShowTable}*/}
//
//             {/*    isFlagInside={isFlagInside}*/}
//             {/*    isDataProblem={isDataProblem}*/}
//             {/*    isDataWhoNotify={isDataWhoNotify}*/}
//             {/*    isDataNotes={isDataNotes}*/}
//             {/*    isDataOps={isDataOps}*/}
//             {/*    isPerson={isPerson}*/}
//             {/*    isNotesForPerson={isNotesForPerson}*/}
//             {/*    isUpdate={isUpdate}*/}
//             {/*    isClosingTime={isClosingTime}*/}
//             {/*    isNotesClosingOut={isNotesClosingOut}*/}
//
//             {/*    toToggleShowTable={toToggleShowTable}*/}
//
//             {/*    toGetCopyOpeningFromTable={toGetCopyOpeningFromTable}*/}
//             {/*    toGetCopyClosingFromTable={toGetCopyClosingFromTable}*/}
//             {/*    toGetCopyNotifyFromTable={toGetCopyNotifyFromTable}*/}
//             {/*    toGetCopyUpdateFromTable={toGetCopyUpdateFromTable}*/}
//             {/*/>*/}
//         </>
//
//     )
// };
//
// export default Main;