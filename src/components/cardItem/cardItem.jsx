import './cardItem.css'
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {handlerSetIsInsideIncident} from "../../store/notifySlice";

import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimeDuration from "../../timeDuration/timeDuration";
import CopyMarkdown from "../copyMarkdown";

const addZero = num => num <= 9 ? "0" + num : num;

const CardItem = (props) => {
    const dispatch = useDispatch()
    const isInsideIncident = useSelector(state => state.notifyReducer.isInsideIncident)

    const {
        flagOpening = true,

        isDataForCard = Object.prototype,

        onCheckInside = Function.prototype,
        // isInside = false,
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

        getStartDay = Function.prototype,
        isStartDay = ''
    } = props

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
    const [isStartDate, setStartDate] = useState(new Date())
    const [isEndDate, setEndDate] = useState(new Date())

    const dayClose = isEndDate

    //???????????????? ???????????? ???????? ????????????????
    useEffect(() => {
        getStartDay(isStartDate)
        // eslint-disable-next-line
    }, [isStartDate])

    const hoursStartDate = addZero(isStartDate.getHours())
    const minutesStartDate = addZero(isStartDate.getMinutes())
    const hoursEndDate = addZero(isEndDate.getHours())
    const minutesEndDate = addZero(isEndDate.getMinutes())

    const durationIncident = TimeDuration({isGetDataTime, isEndDate})

    let dayForPrint = ''
    let hourForPrint = ''
    let minuteForPrint = ''
    if (durationIncident.durationDay !== '00') dayForPrint = `${durationIncident.durationDay}????.`
    if (durationIncident.durationHour !== '00') hourForPrint = `${durationIncident.durationHour}??.`
    if (durationIncident.durationMinute !== '00') minuteForPrint = `${durationIncident.durationMinute}??????.`
    if (durationIncident.durationMinute === 60) {
        hourForPrint = `${addZero(+durationIncident.durationHour + 1)}??.`
        minuteForPrint = ``
    }
    let durationIncOut = `${dayForPrint} ${hourForPrint} ${minuteForPrint}`.trim()

    //???????????????? ?????????? ???????????? ???????????????? ?? ?????????????????? cardList
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

            isInsideIncident,
            // isInside,

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
            durationIncOut,

            isStartDay,
            dayClose,
        })
    }

    const {
        qualities,
        stand,
        tg,
        priority,
        effect
    } = isDataForCard

    // ?????????????????? ?????????????????? ?????????????? ?? ????
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
    if (isInsideIncident) {
        inside = '????????????????????'
        classesForCheckBox = classesForCheckBox + ' summary__checkBox-topCheckBox'
        classesForCardInside = 'card-title amber-text text-lighten-3'
        classesForLabelInput = classesForLabelInput + ' mt-7'
    }

    let classesIfWarning = ''
    if (isWarning) classesIfWarning = 'red lighten-1'

    let classesIfPrimary = 'form__input orange darken-1 summary__ops-input'
    if (isPrimary) classesIfPrimary = 'form__input summary__ops-input summary__ops-input-colors'

    // componentDidUpdate

    useEffect(() => {
        onCheckInside(isInsideIncident)
    // eslint-disable-next-line
    }, [isInsideIncident])

    //???????????????? ???????????? ???????????? ???? ???????? ????????????????
    // componentDidUpdate
    useEffect(() => {
        getProblemForAllCards(isProblem)
    // eslint-disable-next-line
    }, [isProblem])

    //???????????????? ???????????? ???????????? ???? ???????? ?????? ????????????????
    // componentDidUpdate
    useEffect(() => {
        getWhoNotify(isWhoNotify)
    // eslint-disable-next-line
    }, [isWhoNotify])

    //???????????????? ???????????? ???????????? ???? ???????? OPS
    // componentDidUpdate
    useEffect(() => {
        getOpsNumberForAllCards(isOpsNumber)
    // eslint-disable-next-line
    }, [isOpsNumber])


    //???????????????? ???????????? ???????????? ???? ???????? ???????????????????? ????????????????
    useEffect(() => {
        toGetDataNotes(isNotes)
    // eslint-disable-next-line
    }, [isNotes])

    //???????????????? ???????????? ???????????????????????? ??????????????????
    useEffect(() => {
        toGetDurationIncident({hourClosing: isInputHourForClosing, minuteClosing: isInputMinuteForClosing})
        // eslint-disable-next-line
    }, [isInputHourForClosing, isInputMinuteForClosing])

    //???????????????? ???????????? ???????????????????? ????????????????
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

                isInsideIncident={isInsideIncident}
                isProblem={isProblem}
                isOpsNumber={isOpsNumber}
                isNotes={isNotes}
                isWhoNotify={isWhoNotify}

                dispatch={dispatch}
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

            isInsideIncident={isInsideIncident}
            isNotesClosing={isNotesClosing}
            isProblemForAllCards={isProblemForAllCards}
            isOpsNumberAllCards={isOpsNumberAllCards}
            isWhoNotifyForClosing={isWhoNotifyForClosing}

            onWriteInput={onWriteInput}

            classesForCardInside={classesForCardInside}

            toCopyMarkdown={toCopyMarkdown}
            // isGetTimeStart={isGetTimeStart}

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

        isInsideIncident,
        isProblem,
        isOpsNumber,
        isNotes,
        isWhoNotify,

        dispatch,
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
                        <span className="card-title">???????????????? ????????????</span>
                    </div>

                    <label className={classesForLabelInput}>
                        <input
                            type="checkbox"
                            name='inside'
                            className="filled-in summary__chooseInside"
                            checked={isInsideIncident}
                            onChange={() => dispatch(handlerSetIsInsideIncident())}
                        />
                        <span>????????????????????</span>
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
                        placeholder='???????????????? ????????????????...'
                        onChange={onWriteInput}
                    />

                    <p>????: <span>{tgOut}</span></p>

                    <p>??????????????????: <span>{priority}</span></p>
                    <p>?????????????? ??????????????: <span>{effect}</span></p>

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
                        <div className='summary__time-title'>???????????? ??????????????????:</div>
                        <DatePicker
                            selected={isStartDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="dd.MM.yyyy HH:mm"
                            timeFormat={"HH:mm"}
                        />
                    </div>

                    <div className='summary__whoIsNotify'>
                        <div className='summary__whoIsNotify-title'>?????? ????????????????:</div>
                        <TextareaAutosize
                        className='summary__area'
                        value={isWhoNotify}
                        name="whoIsNotify"
                        onChange={onWriteInput}
                    /></div>

                    <p>????????????????????:</p>

                    <TextareaAutosize
                        className='summary__area'
                        value={isNotes}
                        name="notes"
                        placeholder='?????????????? ????????????????...'
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
        // isGetTimeStart,

        isEndDate,
        setEndDate,

        durationIncOut,
    } = props

    return(
        <div className="card blue-grey darken-1 summary">
            <div className="card-content white-text summary-head">

                <div className="summary__checkbox-content">
                    <span className={classesForCardInside}>{inside}</span>
                    <span className="card-title">???????????????? ????????????</span>
                </div>

                <span className="card-title"><span>{stand}</span> <span>{qualities}</span></span>
            </div>

            <div className="card-action">
                <div className="summary__body summary__body-closing">
                    <p>{isProblemForAllCards}</p>

                    <p>????: <span>{tgOut}</span></p>

                    <p>??????????????????: <span>{priority}</span></p>
                    <p>?????????????? ??????????????: <span>{effect}</span></p>
                    <p>https://jira.crpt.ru/browse/OPS-{isOpsNumberAllCards}</p>

                    {/*<p>????????????: <span className='blue-text text-accent-1'>{isGetTimeStart.startHour}:{isGetTimeStart.startMinute}</span></p>*/}

                    <div className='summary__time m0'>
                        <div className='summary__time-title'>?????????????????? ??????????????????:</div>
                        <DatePicker
                            selected={isEndDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="dd.MM.yyyy HH:mm"
                            timeFormat={"HH:mm"}
                        />
                    </div>

                    <p>????????????????????????: <span className='blue-text text-accent-1'>{durationIncOut}</span></p>

                    <p>?????? ????????????????: <span>{isWhoNotifyForClosing}</span></p>

                    <p>????????????????????:</p>
                    <TextareaAutosize
                        className='summary__area'
                        value={isNotesClosing}
                        name="notesClosing"
                        placeholder='?????????????? ????????????????...'
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