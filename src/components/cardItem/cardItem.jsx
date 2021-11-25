import './cardItem.css'
import {useEffect, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';

const CardItem = (props) => {
    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        isTimeForClosing = Object.prototype,

        onCheckInside = Function.prototype,
        flagOpening = true,
        isInside = false,
        getProblemForAllCards = Function.prototype,
        isProblemForAllCards = null,
        getOpsNumberForAllCards = Function.prototype,
        isOpsNumberAllCards = null,
        getWhoNotify = Function.prototype,
        isWhoNotifyForClosing = null
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

    const {
        qualities,
        stand,
        tg,
        priority,
        effect
    } = isDataForCard

    const {hour, minute} = isTimeForCard
    const {hourClosing, minuteClosing} = isTimeForClosing

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

    if (flagOpening) {
        return(
            <ViewOpening
                hour={hour}
                minute={minute}

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
            />
        )
    }

    return(
        <ViewClosing
            hour={hour}
            minute={minute}
            hourClosing={hourClosing}
            minuteClosing={minuteClosing}

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
            isInputHourForClosing={isInputHourForClosing}
            isInputMinuteForClosing={isInputMinuteForClosing}
            isWhoNotifyForClosing={isWhoNotifyForClosing}

            onWriteInput={onWriteInput}

            classesForCardInside={classesForCardInside}
        />
    )

};

export default CardItem;

const ViewOpening = (props) => {
    const {
        hour,
        minute,

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

                    <p>Время инцидента: <span className='blue-text text-accent-1'><b>{hour}:{minute}</b></span></p>

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
        </div>
    )
}

const ViewClosing = (props) => {
    const {
        hour,
        minute,
        hourClosing,
        minuteClosing,

        inside,
        stand,
        qualities,
        tgOut,
        priority,
        effect,

        isNotesClosing,
        isProblemForAllCards,
        isOpsNumberAllCards,
        isInputHourForClosing,
        isInputMinuteForClosing,
        isWhoNotifyForClosing,

        onWriteInput,

        classesForCardInside,
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

                    <div>Время инцидента: <span>{hour}:{minute}</span> - <span className='red-text text-accent-1'><b>{hourClosing}:{minuteClosing}</b></span> (<ViewTmeClosing
                        isInputHourForClosing={isInputHourForClosing}
                        isInputMinuteForClosing={isInputMinuteForClosing}
                        onWriteInput={onWriteInput}
                    />)</div>

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
        </div>
    )
}

const ViewTmeClosing = (props) => {
    const {
        isInputHourForClosing,
        isInputMinuteForClosing,

        onWriteInput
    } = props

    return(
        <div className='summary__time-inputs'>
            <input
                type="text"
                value={isInputHourForClosing}
                name='hourInputForClosing'
                className='browser-default summary__time-input'
                onChange={onWriteInput}
            /> час.
            <input
                type="text"
                value={isInputMinuteForClosing}
                name='minuteInputForClosing'
                className='browser-default summary__time-input'
                onChange={onWriteInput}
            /> мин.
        </div>
    )
}