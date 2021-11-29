import {useEffect, useState} from "react";
import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";
import DataForItem from "../../../data/dataForItem";
import TextareaAutosize from 'react-textarea-autosize';

import './main.css'

const Main = () => {

    const [isDataForCard, setDataForCard] = useState({})
    const [isTimeForCard, setTimeForCard] = useState({})
    const [isTimeForClosing, setTimeForClosing] = useState({})
    const [isNotifyPerson, setNotifyPerson] = useState([])
    const [isToggleShowTable, setToggleShowTable] = useState(false)
    const [isFlagInside, setFlagInside] = useState(false)
    const [isDataProblem, setDataProblem] = useState(null)
    const [isDataWhoNotify, setDataWhoNotify] = useState(null)
    const [isDataNotes, setDataNotes] = useState(null)
    const [isDataOps, setDataOps] = useState(null)
    const [isWriteTxt, setWriteTxt] = useState('')
    const [isPerson, setPerson] = useState(null)
    const [isNotesForPerson, setNotesForPerson] = useState(null)
    const [isUpdate, setUpdate] = useState(null)
    const [isClosingTime, setClosingTime] = useState({hourClosing: '', minuteClosing: ''})
    const [isNotesClosingOut, setNotesClosingOut] = useState(null)
    const [isAlert, setAlert] = useState(false)

    const {
        qualities,
        stand,
        tg,
        priority,
        effect,
    } = isDataForCard

    let inside = ''
    if (isFlagInside) inside = `**ВНУТРЕННИЙ**\n`

    // готовим данные из массива объектов для одной строки
    let tgForTable = ''
    if (tg !== undefined && tg !== null) {
        const arr = []
        tg.forEach(item => {
            arr.push(item.value)
        })
        tgForTable = arr.join(', ')
    }

    let standOut = ''
    if (stand !== null) standOut = `${stand}`
    let qualitiesOut = ''
    if (qualities !== null) qualitiesOut = ` ${qualities}`

    let hourClosingOut = ''
    if (isClosingTime.hourClosing !== '') hourClosingOut = `${isClosingTime.hourClosing}час. `
    let minuteClosingOut = ''
    if (isClosingTime.minuteClosing !== '') minuteClosingOut = `${isClosingTime.minuteClosing}мин.`

    const str = (
        `${inside}` +
        `**Инцидент ОТКРЫТ**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n**${isDataProblem}**` +
        `\n**ТГ:** ${tgForTable}` +
        `\n` +
        `\n**Приоритет:** ${priority}` +
        `\n**Степень влияния:** ${effect}` +
        `\nhttps://jira.crpt.ru/browse/OPS-${isDataOps}` +
        `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute}` +
        `\n**Кто оповещён:** ${isDataWhoNotify}` +
        `\n` +
        `\n**Примечание:** ${isDataNotes}` +
        `\n` +
        `\n_________________________________________________________________________________` +
        `\n` +
        `\n` +
        `\n${isPerson}` +
        `\n${isNotesForPerson}` +
        `\n` +
        `\n_________________________________________________________________________________` +
        `\n` +
        `\n` +
        `${inside}` +
        `**Инцидент в работе**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n${isUpdate}` +
        `\n` +
        `\n_________________________________________________________________________________` +
        `\n` +
        `\n` +
        `${inside}` +
        `**Инцидент ЗАКРЫТ**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n**${isDataProblem}**` +
        `\n**ТГ:** ${tgForTable}` +
        `\n` +
        `\n**Приоритет:** ${priority}` +
        `\n**Степень влияния:** ${effect}` +
        `\nhttps://jira.crpt.ru/browse/OPS-${isDataOps}` +
        `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute} - ${isTimeForClosing.hourClosing}:${isTimeForClosing.minuteClosing} (${hourClosingOut}${minuteClosingOut})` +
        `\n**Кто оповещён:** ${isDataWhoNotify}` +
        `\n` +
        `\n**Примечание:** ${isNotesClosingOut}`
    )

    // внести изменения из INPUT в сформированную таблицу данных
    const onWriteTxt = (event) => {
        let {value} = event.target
        setWriteTxt(value)
    }

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

    const toToggleShowTable = () => {
        setToggleShowTable(!isToggleShowTable)
    }

    const toHideTable = (event) => {
        setToggleShowTable(false)
    }

    const toCopyTable = () => {
        navigator.clipboard.writeText(isWriteTxt);
        document.execCommand("copy")
        // setAlert(!isAlert)
        setAlert(true)
    }

    // Получить данные о ВНУТРЕННИЙ
    const toGetFlagInside = (flag)  => {
        setFlagInside(flag)
    }

    // Получить данные с описанием проблемы
    const toGetDataProblem = (str)  => {
        setDataProblem(str)
    }

    // Получить данные кто оповещен
    const toGetDataWhoNotify = (str)  => {
        setDataWhoNotify(str)
    }

    // Получить данные Примечание
    const toGetDataNotes = (str)  => {
        setDataNotes(str)
    }

    // Получить данные JIRA
    const toGetDataOPS = (num)  => {
        setDataOps(num)
    }

    // Получить данные об оповещаемых персонах
    const toGetPerson = (arr)  => {
        setPerson(arr.join(' '))
    }

    // Получить данные об оповещаемых персонах
    const toGetNotesForPerson = (str)  => {
        setNotesForPerson(str)
    }

    // Получить UPDATE
    const toGetDataUpdate = (str)  => {
        setUpdate(str)
    }

    // Получить время закрытия
    const toGetDurationIncident = (obj)  => {
        setClosingTime(obj)
    }

    // Получить время закрытия
    const toNotesClosingOut = (str)  => {
        setNotesClosingOut(str)
    }

    const closeAlert = () => {
        // setAlert(!isAlert)
        setAlert(false)
    }

    // обновим содержание страницы в соответсвие с данными вносимыми в карточки
    useEffect(() => {
        setWriteTxt(str)
        // eslint-disable-next-line
    }, [str])

    // componentDidUpdate
    // изчезновение алерта Скопировано в буфер
    useEffect(() => {
        const timerId = setTimeout(() => closeAlert(), 3000);

        // componentDidUnmount
        return () => clearTimeout(timerId)
        // eslint-disable-next-line
    }, [isAlert]);

    let classesForShowTable = 'hide'
    if (isToggleShowTable) classesForShowTable = 'main__table'

    let classesForShowAlert = 'hide'
    if (isAlert) classesForShowAlert = 'main__alert'

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
                    toGetFlagInside={toGetFlagInside}
                    toGetDataProblem={toGetDataProblem}
                    toGetDataWhoNotify={toGetDataWhoNotify}
                    toGetDataNotes={toGetDataNotes}
                    toGetDataOPS={toGetDataOPS}
                    toGetPerson={toGetPerson}
                    toGetNotesForPerson={toGetNotesForPerson}
                    toGetDataUpdate={toGetDataUpdate}
                    toGetDurationIncident={toGetDurationIncident}
                    toNotesClosingOut={toNotesClosingOut}
                />
            </div>

            <button
                className="btn-floating btn-large pulse main__btn-showTable"
                onClick={toToggleShowTable}
            >
                <i className="material-icons main__icon-showTable">create</i>
            </button>

            <div
                id='dataTable'
                className={classesForShowTable}
            >

                <TextareaAutosize
                    className='main__data'
                    value={isWriteTxt}
                    name="dataForTable"
                    onChange={onWriteTxt}
                />

                <div className="main__action">
                    <button
                        className="btn-floating btn-large waves-effect waves-light main__action-btn"
                        onClick={toHideTable}
                    >
                        <i className="material-icons">close</i>
                    </button>

                    <button
                        className="btn-floating btn-large waves-effect waves-light main__action-btn main__action-btn-green"
                        onClick={toCopyTable}
                    >
                        <i className="material-icons">content_copy</i>
                    </button>
                </div>

                <div id="toast-container" className={classesForShowAlert}>
                    <div className="toast">
                        Скопировано в буфер!
                    </div>
                </div>
            </div>
        </>

    )
};

export default Main;