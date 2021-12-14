import useDateHook from "../hooks/getDate";

const CopyMarkdown = ({
                          flagCard = '',

                          isChooseInside = false,
                          isInside = false,

                          isProblem = '',
                          isProblemForAllCards,

                          isOpsNumber = '',
                          isOpsNumberAllCards = '',

                          isDataForCard = Object.prototype,

                          isWhoNotify = '',
                          isWhoNotifyForClosing = '',

                          isNotes = '',
                          isNotesClosing = '',

                          isNotesUpdate = '',
                          txtForCopy = '',
                          personNotify = '',

                          hoursStartDate = null,
                          minutesStartDate = null,

                          isGetTimeStart = {startHour: null, startMinute: null},
                          hoursEndDate = null,
                          minutesEndDate = null,
                          durationIncOut = '',

                          isStartDay = '',
                          dayClose = '',

                      }) => {
    const {
        qualities,
        stand,
        tg,
        priority,
        effect,
    } = isDataForCard

    let insideOpen = ''
    if (isChooseInside) insideOpen = `**ВНУТРЕННИЙ**\n`

    let inside = ''
    if (isInside) inside = `**ВНУТРЕННИЙ**\n`

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

    //Логика для отрисовки дня начала и дня окончания
    let dayStart = ''
    let dayEnd = ''
    const start = useDateHook(isStartDay)
    const end = useDateHook(dayClose)

    if (start < end) {
        dayStart = ` ${start}`
        dayEnd = `${end} `
    }

    const strOpening = (
        `${insideOpen}` +
        `**Инцидент ОТКРЫТ**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n**${isProblem}**` +
        `\n**ТГ:** ${tgForTable}` +
        `\n` +
        `\n**Приоритет:** ${priority}` +
        `\n**Степень влияния:** ${effect}` +
        `\nhttps://jira.crpt.ru/browse/OPS-${isOpsNumber}` +
        `\n**Время инцидента:** ${hoursStartDate}:${minutesStartDate}` +
        `\n**Кто оповещён:** ${isWhoNotify}` +
        `\n` +
        `\n**Примечание:** ${isNotes}`
    )

    const strClosing = (
        `${inside}` +
        `**Инцидент ЗАКРЫТ**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n**${isProblemForAllCards}**` +
        `\n**ТГ:** ${tgForTable}` +
        `\n` +
        `\n**Приоритет:** ${priority}` +
        `\n**Степень влияния:** ${effect}` +
        `\nhttps://jira.crpt.ru/browse/OPS-${isOpsNumberAllCards}` +
        `\n**Время инцидента:**${dayStart} ${isGetTimeStart.startHour}:${isGetTimeStart.startMinute} - ${dayEnd}${hoursEndDate}:${minutesEndDate} (${durationIncOut})` +
        `\n**Кто оповещён:** ${isWhoNotifyForClosing}` +
        `\n` +
        `\n**Примечание:** ${isNotesClosing}`
    )

    const strNotify = (
        `${personNotify}` +
        `\n${txtForCopy}`
    )

    const strUpdate = (
        `${inside}` +
        `**Инцидент в работе**` +
        `\n**${standOut}${qualitiesOut}**` +
        `\n` +
        `\n${isNotesUpdate}`
    )

    if (flagCard === 'opening') navigator.clipboard.writeText(strOpening)
    if (flagCard === 'closing') navigator.clipboard.writeText(strClosing)
    if (flagCard === 'update') navigator.clipboard.writeText(strUpdate)
    if (flagCard === 'notify') navigator.clipboard.writeText(strNotify)

    document.execCommand("copy")
}

export default CopyMarkdown