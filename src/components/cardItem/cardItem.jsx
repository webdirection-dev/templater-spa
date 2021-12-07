import './cardItem.css'
import {useEffect, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimeDuration from "../../timeDuration/timeDuration";
import CopyMarkdown from "../copyMarkdown";

const addZero = num => num <= 9 ? "0" + num : num;

const CardItem = (props) => {
    const {
        flagOpening = true,

        isDataForCard = Object.prototype,

        onCheckInside = Function.prototype,
        isInside = false,
        getProblemForAllCards = Function.prototype,
        isProblemForAllCards = null,
        getOpsNumberForAllCards = Function.prototype,
        isOpsNumberAllCards = null,
        getWhoNotify = Function.prototype,
        isWhoNotifyForClosing = null,
        toGetDataNotes = Function.prototype,
        toGetDurationIncident = Function.prototype,
        toNotesClosingOut = Function.prototype,

        toGetAlert = Function.prototype,
        toGetTimeStart = Function.prototype,
        toGetDataTime = Function.prototype,
        isGetDataTime = {},
        isGetTimeStart = {},
    } = props

    const [isChooseInside, setChooseInside] = useState(false)
    const [isOpsNumber, setOpsNumber] = useState('')
    const [isProblem, setProblem] = useState('')
    const [isNotes, setNotes] = useState('')
    const [isWhoNotify, setWhoNotify] = useState('')
    const [isNotesClosing, setNotesClosing] = useState('')
    const [isWarning, setWarning] = useState(false)
    const [isPrimary, setPrimary] = useState(false)
    const [isInputHourForClosing, setInputHourForClosing] = useState('')
    const [isInputMinuteForClosing, setInputMinuteForClosing] = useState('')

    // React Datepicker
    const [isStartDate, setStartDate] = useState(new Date());
    const [isEndDate, setEndDate] = useState(new Date());

    const hoursStartDate = addZero(isStartDate.getHours())
    const minutesStartDate = addZero(isStartDate.getMinutes())
    const hoursEndDate = addZero(isEndDate.getHours())
    const minutesEndDate = addZero(isEndDate.getMinutes())

    const durationIncident = TimeDuration({isGetDataTime, isEndDate})

    let dayForPrint = ''
    let hourForPrint = ''
    let minuteForPrint = ''
    if (durationIncident.durationDay !== '00') dayForPrint = `${durationIncident.durationDay}дн.`
    if (durationIncident.durationHour !== '00') hourForPrint = `${durationIncident.durationHour}ч.`
    if (durationIncident.durationMinute !== '00') minuteForPrint = `${durationIncident.durationMinute}мин.`
    if (durationIncident.durationMinute === 60) {
        hourForPrint = `${addZero(+durationIncident.durationHour + 1)}ч.`
        minuteForPrint = ``
    }
    let durationIncOut = `${dayForPrint} ${hourForPrint} ${minuteForPrint}`.trim()

    //Передаем время начала открытия в компонент cardList
    useEffect(() => {
        toGetTimeStart(
            {
                startHour: addZero(isStartDate.getHours()),
                startMinute: addZero(isStartDate.getMinutes()),
            }
        )

        toGetDataTime(isStartDate)
        // eslint-disable-next-line
    }, [isStartDate])

    const toCopyMarkdown = (flagCard) => {
        toGetAlert()
        CopyMarkdown({
            flagCard,

            isChooseInside,
            isInside,

            isProblem,
            isProblemForAllCards,

            isDataForCard,


            isOpsNumber,
            isOpsNumberAllCards,

            isWhoNotify,
            isWhoNotifyForClosing,

            isNotes,
            isNotesClosing,

            isGetTimeStart,

            hoursStartDate,
            minutesStartDate,
            hoursEndDate,
            minutesEndDate,
            durationIncOut
        })
    }

    const {
        qualities,
        stand,
        tg,
        priority,
        effect
    } = isDataForCard

    // Обработка входящего массива с ТГ
    let tgOut = null

    if (tg && tg.length === 1) {
        tgOut = tg.map(i => i.value)
    }

    if (tg && tg.length > 1) {
        tgOut = tg.map((i, index) => {
            if (index < tg.length - 1) return `${i.value}, `
            return i.value
        })
    }

    const onChooseInside = () => {
        setChooseInside(!isChooseInside)
    }

    const onWriteInput = (event) => {
        let {name, value} = event.target

        if (name === 'ops' && Number(value) && value.length < 6) setOpsNumber(value)
        if (name === 'ops' && value.length === 5) {
            setWarning(false)
            setPrimary(true)
        }
        if (name === 'ops' && value.length < 5) setPrimary(false)
        if (name === 'ops' && value === '') setOpsNumber(value)

        if (name === 'problem') {
            setProblem(value)
        }

        if (name === 'notes') {
            setNotes(value)
        }

        if (name === 'whoIsNotify') {
            setWhoNotify(value)
        }

        if (name === 'notesClosing') {
            setNotesClosing(value)
        }

        if (name === 'hourInputForClosing') {
            setInputHourForClosing(value)
        }

        if (name === 'minuteInputForClosing') {
            setInputMinuteForClosing(value)
        }
    }

    const onWarningForOps = (event) => {
        let {value} = event.target
        if (value.length < 5) setWarning(true)
    }



    let classesForCheckBox = 'summary__checkBox'
    let classesForCardInside = 'hide'
    let classesForLabelInput = 'summary__chooseInsideLabel'

    let inside = null
    if (isChooseInside) {
        inside = 'ВНУТРЕННИЙ'
        classesForCheckBox = classesForCheckBox + ' summary__checkBox-topCheckBox'
        classesForCardInside = 'card-title amber-text text-lighten-3'
        classesForLabelInput = classesForLabelInput + ' mt-7'
    }

    let classesIfWarning = ''
    if (isWarning) classesIfWarning = 'red lighten-1'

    let classesIfPrimary = 'form__input orange darken-1 summary__ops-input'
    if (isPrimary) classesIfPrimary = 'form__input summary__ops-input summary__ops-input-colors'

    if (isInside) {
        inside = 'ВНУТРЕННИЙ'
        classesForCardInside = 'card-title'
    }

    // componentDidUpdate
    // Поднять наверх ВНУТРЕННИЙ или нет
    useEffect(() => {
        onCheckInside(isChooseInside)
    // eslint-disable-next-line
    }, [isChooseInside])

    //Передать наверх данные из поля ПРОБЛЕМА
    // componentDidUpdate
    useEffect(() => {
        getProblemForAllCards(isProblem)
    // eslint-disable-next-line
    }, [isProblem])

    //Передать наверх данные из поля КТО ОПОВЕЩЕН
    // componentDidUpdate
    useEffect(() => {
        getWhoNotify(isWhoNotify)
    // eslint-disable-next-line
    }, [isWhoNotify])

    //Передать наверх данные из поля OPS
    // componentDidUpdate
    useEffect(() => {
        getOpsNumberForAllCards(isOpsNumber)
    // eslint-disable-next-line
    }, [isOpsNumber])


    //Передать наверх данные из поля Примечание Открытия
    useEffect(() => {
        toGetDataNotes(isNotes)
    // eslint-disable-next-line
    }, [isNotes])

    //Передать наверх длительность инцидента
    useEffect(() => {
        toGetDurationIncident({hourClosing: isInputHourForClosing, minuteClosing: isInputMinuteForClosing})
        // eslint-disable-next-line
    }, [isInputHourForClosing, isInputMinuteForClosing])

    //Передать наверх примечание Закрытия
    useEffect(() => {
        toNotesClosingOut(isNotesClosing)
        // eslint-disable-next-line
    }, [isNotesClosing])

    if (flagOpening) {
        return(
            <ViewOpening

                inside={inside}
                stand={stand}
                tgOut={tgOut}
                priority={priority}
                effect={effect}
                qualities={qualities}

                isChooseInside={isChooseInside}
                isProblem={isProblem}
                isOpsNumber={isOpsNumber}
                isNotes={isNotes}
                isWhoNotify={isWhoNotify}

                onChooseInside={onChooseInside}
                onWriteInput={onWriteInput}
                onWarningForOps={onWarningForOps}

                classesForCheckBox={classesForCheckBox}
                classesForCardInside={classesForCardInside}
                classesForLabelInput={classesForLabelInput}
                classesIfWarning={classesIfWarning}
                classesIfPrimary={classesIfPrimary}

                toCopyMarkdown={toCopyMarkdown}

                isStartDate={isStartDate}
                setStartDate={setStartDate}
            />
        )
    }

    return(
        <ViewClosing

            inside={inside}
            stand={stand}
            tgOut={tgOut}
            priority={priority}
            effect={effect}
            qualities={qualities}

            isChooseInside={isChooseInside}
            isNotesClosing={isNotesClosing}
            isProblemForAllCards={isProblemForAllCards}
            isOpsNumberAllCards={isOpsNumberAllCards}
            isWhoNotifyForClosing={isWhoNotifyForClosing}

            onWriteInput={onWriteInput}

            classesForCardInside={classesForCardInside}

            toCopyMarkdown={toCopyMarkdown}
            isGetTimeStart={isGetTimeStart}

            isEndDate={isEndDate}
            setEndDate={setEndDate}
            durationIncOut={durationIncOut}
        />
    )

};

export default CardItem;

const ViewOpening = (props) => {
    const {
        inside,
        stand,
        qualities,
        tgOut,
        priority,
        effect,

        isChooseInside,
        isProblem,
        isOpsNumber,
        isNotes,
        isWhoNotify,

        onChooseInside,
        onWriteInput,
        onWarningForOps,

        classesForCheckBox,
        classesForCardInside,
        classesForLabelInput,
        classesIfWarning,
        classesIfPrimary,

        toCopyMarkdown,

        isStartDate,
        setStartDate,
    } = props

    return(
        <div className="card blue-grey darken-1 summary">
            <div className="card-content white-text summary-head">

                <div className={classesForCheckBox}>
                    <div className="summary__checkbox-content">
                        <span className={classesForCardInside}>{inside}</span>
                        <span className="card-title">Инцидент ОТКРЫТ</span>
                    </div>

                    <label className={classesForLabelInput}>
                        <input
                            type="checkbox"
                            name='inside'
                            className="filled-in summary__chooseInside"
                            checked={isChooseInside}
                            onChange={onChooseInside}
                        />
                        <span>Внутренний</span>
                    </label>
                </div>

                <span className="card-title"><span className='red-text text-lighten-3 colorCoral'>{stand}</span> <span className='colorAqua'>{qualities}</span></span>
            </div>

            <div className="card-action">
                <div className="summary__body">

                    <TextareaAutosize
                        className='summary__area'
                        value={isProblem}
                        name="problem"
                        placeholder='Описание проблемы...'
                        onChange={onWriteInput}
                    />

                    <p>ТГ: <span>{tgOut}</span></p>

                    <p>Приоритет: <span>{priority}</span></p>
                    <p>Степень влияния: <span>{effect}</span></p>

                    <div className="summary__ops">
                        <p className={classesIfWarning}>https://jira.crpt.ru/browse/OPS-</p>
                        <input
                            value={isOpsNumber}
                            name='ops'
                            className={classesIfPrimary}
                            placeholder='00000'
                            type="text"
                            onChange={onWriteInput}
                            onBlur={onWarningForOps}
                        />
                    </div>

                    <div className='summary__time'>
                        <div className='summary__time-title'>Время инцидента:</div>
                        <DatePicker
                            selected={isStartDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="dd.MM.yyyy HH:mm"
                            timeFormat={"HH:mm"}
                        />
                    </div>

                    <div className='summary__whoIsNotify'>
                        <div className='summary__whoIsNotify-title'>Кто оповещён:</div>
                        <TextareaAutosize
                        className='summary__area'
                        value={isWhoNotify}
                        name="whoIsNotify"
                        onChange={onWriteInput}
                    /></div>

                    <p>Примечание:</p>

                    <TextareaAutosize
                        className='summary__area'
                        value={isNotes}
                        name="notes"
                        placeholder='Решение проблемы...'
                        onChange={onWriteInput}
                    />
                </div>
            </div>

            <div className="txt-out__card-footer">
                <button
                    className="btn-floating waves-effect waves-light main__action-btn-green"
                    onClick={() => {toCopyMarkdown('opening')}}
                >
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
    )
}

const ViewClosing = (props) => {
    const {
        inside,
        stand,
        qualities,
        tgOut,
        priority,
        effect,

        isNotesClosing,
        isProblemForAllCards,
        isOpsNumberAllCards,

        isWhoNotifyForClosing,

        onWriteInput,

        classesForCardInside,

        toCopyMarkdown,
        isGetTimeStart,

        isEndDate,
        setEndDate,

        durationIncOut,
    } = props

    return(
        <div className="card blue-grey darken-1 summary">
            <div className="card-content white-text summary-head">

                <div className="summary__checkbox-content">
                    <span className={classesForCardInside}>{inside}</span>
                    <span className="card-title">Инцидент ЗАКРЫТ</span>
                </div>

                <span className="card-title"><span>{stand}</span> <span>{qualities}</span></span>
            </div>

            <div className="card-action">
                <div className="summary__body summary__body-closing">
                    <p>{isProblemForAllCards}</p>

                    <p>ТГ: <span>{tgOut}</span></p>

                    <p>Приоритет: <span>{priority}</span></p>
                    <p>Степень влияния: <span>{effect}</span></p>
                    <p>https://jira.crpt.ru/browse/OPS-{isOpsNumberAllCards}</p>

                    {/*<p>Начало: <span className='blue-text text-accent-1'>{isGetTimeStart.startHour}:{isGetTimeStart.startMinute}</span></p>*/}

                    <div className='summary__time m0'>
                        <div className='summary__time-title'>Окончание инцидента:</div>
                        <DatePicker
                            selected={isEndDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="dd.MM.yyyy HH:mm"
                            timeFormat={"HH:mm"}
                        />
                    </div>

                    <p>Длительность: <span className='blue-text text-accent-1'>{durationIncOut}</span></p>

                    <p>Кто оповещен: <span>{isWhoNotifyForClosing}</span></p>

                    <p>Примечание:</p>
                    <TextareaAutosize
                        className='summary__area'
                        value={isNotesClosing}
                        name="notesClosing"
                        placeholder='Решение проблемы...'
                        onChange={onWriteInput}
                    />
                </div>
            </div>

            <div className="txt-out__card-footer">
                <button
                    className="btn-floating waves-effect waves-light main__action-btn-green"
                    onClick={() => {toCopyMarkdown('closing')}}
                >
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
    )
}