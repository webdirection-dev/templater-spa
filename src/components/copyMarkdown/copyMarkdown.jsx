const CopyMarkdown = ({
                          flagCard = '',

                          isChooseInside = false,
                          isInside = false,

                          isProblem = '',
                          isProblemForAllCards,

                          isOpsNumber = '',
                          isOpsNumberAllCards = '',

                          isDataForCard = Object.prototype,
                          isTimeForCard = Object.prototype,
                          isTimeForClosing = Object.prototype,

                          isWhoNotify = '',
                          isWhoNotifyForClosing = '',

                          isNotes = '',
                          isNotesClosing = '',

                          isInputHourForClosing = '',
                          isInputMinuteForClosing = '',

                          isNotesUpdate = '',
                          txtForCopy = '',
                          personNotify = '',
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

    let hourClosingOut = ''
    if (isInputHourForClosing !== '') hourClosingOut = `${isInputHourForClosing}час. `
    let minuteClosingOut = ''
    if (isInputMinuteForClosing !== '') minuteClosingOut = `${isInputMinuteForClosing}мин.`

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
        `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute}` +
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
        `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute} - ${isTimeForClosing.hourClosing}:${isTimeForClosing.minuteClosing} (${hourClosingOut}${minuteClosingOut})` +
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