import './cardItem.css'
import {useEffect, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';

const CardItem = (props) => {
    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        onCheckInside = Function.prototype,
        flagOpening = true,
        isInside = false,
    } = props

    const [isChooseInside, setChooseInside] = useState(false)
    const [isOpsNumber, setOpsNumber] = useState('')
    const [isProblem, setProblem] = useState('')
    const [isNotes, setNotes] = useState('')
    const [isNotesClosing, setNotesClosing] = useState('')
    const [isWarning, setWarning] = useState(false)

    const {
        qualities,
        stand,
        tg,
        priority,
        effect
    } = isDataForCard

    const {hour, minute} = isTimeForCard

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
        if (name === 'ops' && value.length === 5) setWarning(false)
        if (value === '') setOpsNumber(value)

        if (name === 'problem') {
            setProblem(value)
        }

        if (name === 'notes') {
            setNotes(value)
        }

        if (name === 'notesClosing') {
            setNotesClosing(value)
        }
    }

    const onWarningForOps = (event) => {
        let {value} = event.target
        if (value.length < 5) setWarning(true)
        // if (value.length === 5) setWarning(false)

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

    if (isInside) {
        inside = 'ВНУТРЕННИЙ'
        classesForCardInside = 'card-title'
    }

    // componentDidUpdate
    useEffect(() => {
        onCheckInside(isChooseInside)
    // eslint-disable-next-line
    }, [isChooseInside])

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

                onChooseInside={onChooseInside}
                onWriteInput={onWriteInput}
                onWarningForOps={onWarningForOps}

                classesForCheckBox={classesForCheckBox}
                classesForCardInside={classesForCardInside}
                classesForLabelInput={classesForLabelInput}
                classesIfWarning={classesIfWarning}
            />
        )
    }

    return(
        <ViewClosing
            hour={hour}
            minute={minute}

            inside={inside}
            stand={stand}
            tgOut={tgOut}
            priority={priority}
            effect={effect}
            qualities={qualities}

            isChooseInside={isChooseInside}
            isNotesClosing={isNotesClosing}

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

        onChooseInside,
        onWriteInput,
        onWarningForOps,

        classesForCheckBox,
        classesForCardInside,
        classesForLabelInput,
        classesIfWarning
    } = props

    return(
        <div className="card blue-grey darken-1 summary">
            <div className="card-content white-text summary-head">

                <div className={classesForCheckBox}>
                    <div className="summary__checkbox-content">
                        <span className={classesForCardInside}>{inside}</span>
                        <span className="card-title">НОВЫЙ Инцидент</span>
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
                    <p>1. Инициатор: Деп. эксплуатации</p>
                    <p>2. ТГ: <span>{tgOut}</span></p>

                    <p>3. Проблема: </p>

                    <TextareaAutosize
                        className='summary__area'
                        value={isProblem}
                        name="problem"
                        placeholder='Добавить описание...'
                        onChange={onWriteInput}
                    />

                    <p>4. Приоритет: <span>{priority}</span></p>
                    <p>5. Степень влияния: <span>{effect}</span></p>

                    <div className="summary__ops">
                        <p className={classesIfWarning}>6. https://jira.crpt.ru/browse/OPS-</p>
                        <input
                            value={isOpsNumber}
                            name='ops'
                            className='form__input orange darken-1 summary__ops-input'
                            placeholder='00000'
                            type="text"
                            onChange={onWriteInput}
                            onBlur={onWarningForOps}
                        />
                    </div>

                    <p>7. Время открытия: <span className='blue-text text-accent-1'><b>{hour}:{minute}</b></span></p>
                    <p>8. Планируемое время решения: 1 час</p>

                    <p>9. Примечание:</p>
                    <TextareaAutosize
                        className='summary__area'
                        value={isNotes}
                        name="notes"
                        placeholder='Добавить описание...'
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

        inside,
        stand,
        qualities,
        tgOut,
        priority,
        effect,

        isNotesClosing,

        onWriteInput,

        classesForCardInside,
    } = props

    return(
        <div className="card blue-grey darken-1 summary">
            <div className="card-content white-text summary-head">

                <div className="summary__checkbox-content">
                    <span className={classesForCardInside}>{inside}</span>
                    <span className="card-title">Инцидент закрыт</span>
                </div>

                <span className="card-title"><span>{stand}</span> <span>{qualities}</span></span>
            </div>

            <div className="card-action">
                <div className="summary__body summary__body-closing">
                    <p>1. Инициатор: Деп. эксплуатации</p>
                    <p>2. ТГ: <span>{tgOut}</span></p>

                    <p>3. Проблема: </p>

                    <p>4. Приоритет: <span>{priority}</span></p>
                    <p>5. Степень влияния: <span>{effect}</span></p>
                    <p>6. https://jira.crpt.ru/browse/OPS-</p>

                    <p>7. Время открытия: <span>{hour}:{minute}</span></p>
                    <p>8. Длительность: 00ч. 00мин.</p>
                    <p>9. Время закрытия: <span className='blue-text text-accent-1'><b>{hour}:{minute}</b></span></p>

                    <p>10. Примечание:</p>
                    <TextareaAutosize
                        className='summary__area'
                        value={isNotesClosing}
                        name="notesClosing"
                        placeholder='Добавить описание...'
                        onChange={onWriteInput}
                    />
                </div>
            </div>
        </div>
    )
}