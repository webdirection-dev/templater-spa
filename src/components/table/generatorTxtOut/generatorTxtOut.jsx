import TextareaAutosize from "react-textarea-autosize";
import {useEffect, useState} from "react";

const GeneratorTxtOut = (props) => {
    const {
        flagOpening = false,
        flagClosing = false,
        flagUpdate = false,
        flagNotify = false,

        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        isTimeForClosing = Object.prototype,

        isFlagInside = false,
        isDataProblem = null,
        isDataWhoNotify = null,
        isDataNotes = null,
        isDataOps = null,
        isPerson = null,
        isNotesForPerson = null,
        isUpdate = null,
        isClosingTime = {hourClosing: '', minuteClosing: ''},
        isNotesClosingOut = null,

        toGetAlert = Function.prototype
    } = props

    const {
        qualities,
        stand,
        tg,
        priority,
        effect,
    } = isDataForCard

    const [isOpeningOut, setOpeningOut] = useState('')
    const [isClosingOut, setClosingOut] = useState('')
    const [isUpdateOut, setUpdateOut] = useState('')
    const [isNotifyOut, setNotifyOut] = useState('')

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

    const strOpening = (
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
        `\n**Примечание:** ${isDataNotes}`
    )

    const strClosing = (
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

    const strNotify = (
        `${isPerson}` +
        `\n${isNotesForPerson}`
    )

    const strUpdate = (
        `${inside}` +
        `**Инцидент в работе**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n${isUpdate}`
    )

    const toCopyTable = () => {
        if (name === 'opening') navigator.clipboard.writeText(isOpeningOut)
        if (name === 'closing') navigator.clipboard.writeText(isClosingOut)
        if (name === 'update') navigator.clipboard.writeText(isUpdateOut)
        if (name === 'notify') navigator.clipboard.writeText(isNotifyOut)
        document.execCommand("copy")

        toGetAlert()
    }

    // внести изменения из INPUT в сформированную таблицу данных
    const onWriteTxt = (event) => {
        let {name, value} = event.target

        if (name === 'opening') setOpeningOut(value)
        if (name === 'closing') setClosingOut(value)
        if (name === 'update') setUpdateOut(value)
        if (name === 'notify') setNotifyOut(value)
    }

    // обновим содержание страницы в соответсвие с данными вносимыми в карточки
    useEffect(() => {
        setOpeningOut(strOpening)
    }, [strOpening])

    useEffect(() => {
        setClosingOut(strClosing)
    }, [strClosing])

    useEffect(() => {
        setUpdateOut(strUpdate)
    }, [strUpdate])

    useEffect(() => {
        setNotifyOut(strNotify)
    }, [strNotify])

    let isForm = ''
    let name = ''

    if (flagOpening) {
        isForm = isOpeningOut
        name = 'opening'
    }

    if (flagClosing) {
        isForm = isClosingOut
        name = 'closing'
    }

    if (flagUpdate) {
        isForm = isUpdateOut
        name = 'update'
    }

    if (flagNotify) {
        isForm = isNotifyOut
        name = 'notify'
    }

    return(
        <div className="txt-out__card-body">
            <TextareaAutosize
                className='txt-out__card'
                value={isForm}
                name={name}
                onChange={onWriteTxt}
            />

            <div className='txt-out__card-footer'>
                <button
                    className="btn-floating waves-effect waves-light main__action-btn main__action-btn-green"
                    onClick={toCopyTable}
                >
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
    )
}

export default GeneratorTxtOut;
