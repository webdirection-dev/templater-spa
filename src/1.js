// const CopyMarkdown = ({
//                           isDataForCard = Object.prototype,
//                           isTimeForCard = Object.prototype,
//                           isTimeForClosing = Object.prototype,
//
//                           isChooseInside = false,
//                           isProblem = '',
//                           isOpsNumber = '',
//                           isWhoNotify = '',
//                           isNotes = '',
//
//
//                           isDataNotes = null,
//                           isPerson = null,
//                           isNotesForPerson = null,
//                           isUpdate = null,
//                           isClosingTime = {hourClosing: '', minuteClosing: ''},
//                           isNotesClosingOut = null,
//                       }) => {
//
//     const {
//         qualities,
//         stand,
//         tg,
//         priority,
//         effect,
//     } = isDataForCard
//
//     let inside = ''
//     if (isChooseInside) inside = `**ВНУТРЕННИЙ**\n`
//
//     // готовим данные из массива объектов для одной строки
//     let tgForTable = ''
//     if (tg !== undefined && tg !== null) {
//         const arr = []
//         tg.forEach(item => {
//             arr.push(item.value)
//         })
//         tgForTable = arr.join(', ')
//     }
//
//     let standOut = ''
//     if (stand !== null) standOut = `${stand}`
//     let qualitiesOut = ''
//     if (qualities !== null) qualitiesOut = ` ${qualities}`
//
//     let hourClosingOut = ''
//     if (isClosingTime.hourClosing !== '') hourClosingOut = `${isClosingTime.hourClosing}час. `
//     let minuteClosingOut = ''
//     if (isClosingTime.minuteClosing !== '') minuteClosingOut = `${isClosingTime.minuteClosing}мин.`
//
//     const strOpening = (
//         `${inside}` +
//         `**Инцидент ОТКРЫТ**` +
//         `\n**${standOut}${qualitiesOut}**` +
//         `\n` +
//         `\n**${isProblem}**` +
//         `\n**ТГ:** ${tgForTable}` +
//         `\n` +
//         `\n**Приоритет:** ${priority}` +
//         `\n**Степень влияния:** ${effect}` +
//         `\nhttps://jira.crpt.ru/browse/OPS-${isOpsNumber}` +
//         `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute}` +
//         `\n**Кто оповещён:** ${isWhoNotify}` +
//         `\n` +
//         `\n**Примечание:** ${isNotes}`
//     )
//
//     const strClosing = (
//         `${inside}` +
//         `**Инцидент ЗАКРЫТ**` +
//         `\n**${standOut}${qualitiesOut}**` +
//         `\n` +
//         `\n**${isProblem}**` +
//         `\n**ТГ:** ${tgForTable}` +
//         `\n` +
//         `\n**Приоритет:** ${priority}` +
//         `\n**Степень влияния:** ${effect}` +
//         `\nhttps://jira.crpt.ru/browse/OPS-${isOpsNumber}` +
//         `\n**Время инцидента:** ${isTimeForCard.hour}:${isTimeForCard.minute} - ${isTimeForClosing.hourClosing}:${isTimeForClosing.minuteClosing} (${hourClosingOut}${minuteClosingOut})` +
//         `\n**Кто оповещён:** ${isWhoNotify}` +
//         `\n` +
//         `\n**Примечание:** ${isNotes}`
//     )
//
//     console.log(strClosing)
//
//
//     const strNotify = (
//         `${isPerson}` +
//         `\n${isNotesForPerson}`
//     )
//
//     const strUpdate = (
//         `${inside}` +
//         `**Инцидент в работе**` +
//         `\n**${standOut}${qualitiesOut}**` +
//         `\n` +
//         `\n${isUpdate}`
//     )
// }
//
// export default CopyMarkdown
//
// // if (flagOpening) navigator.clipboard.writeText(isCopyOpening)
// // if (!flagOpening) navigator.clipboard.writeText(isCopyClosing)
//
// // document.execCommand("copy")