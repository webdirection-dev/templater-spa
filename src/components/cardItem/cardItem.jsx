import './cardItem.css'
import {useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';

const CardItem = (props) => {
    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
    } = props

    const [isChooseInside, setChooseInside] = useState(false)
    const [isOpsNumber, setOpsNumber] = useState('')
    const [isProblem, setProblem] = useState('')
    const [isChangeHeight, setChangeHeight] = useState(false)

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
        if (value === '') setOpsNumber(value)

        if (name === 'problem') {
            setProblem(value)

            // if (value.length > 100) setChangeHeight(true)
            // else setChangeHeight(false)
        }
    }

    let inside = null
    let classesForCheckBox = 'summary__checkBox'
    let classesForCardInside = 'hide'
    let classesForLabelInput = 'summary__chooseInsideLabel'
    if (isChooseInside) {
        inside = 'ВНУТРЕННИЙ'
        classesForCheckBox = classesForCheckBox + ' summary__checkBox-topCheckBox'
        classesForCardInside = 'card-title amber-text text-lighten-3'
        classesForLabelInput = classesForLabelInput + ' mt-7'
    }

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
                        placeholder='Описание проблемы'
                        onChange={onWriteInput}
                    />

                    <p>4. Приоритет: <span>{priority}</span></p>
                    <p>5. Степень влияния: <span>{effect}</span></p>

                    <div className="summary__ops">
                        <p>6. https://jira.crpt.ru/browse/OPS-</p>
                        <input
                            value={isOpsNumber}
                            name='ops'
                            className='form__input orange darken-1 summary__ops-input'
                            placeholder='00000'
                            type="text"
                            onChange={onWriteInput}
                        />
                    </div>

                    <p>7. Время открытия: <span className='blue-text text-accent-1'><b>{hour}:{minute}</b></span></p>
                    <p>8. Планируемое время решения: 1 час</p>
                    <p>9. Примечание:</p>
                </div>
            </div>
        </div>
    )
};

export default CardItem;