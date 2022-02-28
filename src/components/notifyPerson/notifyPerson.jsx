import './notifyPerson.css'
import {useEffect} from "react";
import CopyMarkdown from "../copyMarkdown";
import {useSelector} from "react-redux";

const NotifyPerson = (props) => {
    const isInsideIncident = useSelector(state => state.notifyReducer.isInsideIncident)

    const {
        isNotifyPerson = Array.prototype,
        isDataForCard = Object.prototype,
        toGetNotesForPerson = Function.prototype,
        toGetAlert = Function.prototype
    } = props

    const inside = isInsideIncident ? ' внутреннем' : ''

    let priority = null
    let effect = ''
    let pre = 'о'

    if (isDataForCard.priority === 'Критический') priority = 'критическом'
    if (isDataForCard.priority === 'Высокий') priority = 'высоком'
    if (isDataForCard.priority === 'Средний') priority = 'среднем'

    if (isDataForCard.effect === 'Массовое') effect = 'массовом'
    if (isDataForCard.effect === 'Групповое') effect = 'групповом'
    if (isDataForCard.effect === 'Одиночное') effect = 'одиночном'

    if (priority === null) pre = 'об'
    if ((priority === null &&  effect !== '') || inside) pre = 'о'

    const toCopyMarkdown = (flagCard) => {
        const personNotify = isNotifyPerson.join(' ')

        let priorityOut = ''
        let effectOut = ''

        if (priority !== null) priorityOut = ` ${priority}`
        if (effect !== '') effectOut = ` ${effect}`

        const txtForCopy = `Оповещаем ${pre}${inside}${priorityOut}${effectOut} инциденте`

        toGetAlert()
        CopyMarkdown({
            flagCard,
            isDataForCard,
            txtForCopy,
            personNotify
        })
    }

    //componentDidUpdate
    //передадим наверх строку сообщения для великой четверки
    useEffect(() => {
        let priorityOut = ''
        let effectOut = ''

        if (priority !== null) priorityOut = ` ${priority}`
        if (effect !== '') effectOut = ` ${effect}`

        toGetNotesForPerson(`Оповещаем ${pre}${priorityOut}${effectOut} инциденте`)
    // eslint-disable-next-line
    }, [pre, priority, effect])


    return(
        <div className="card blue-grey darken-1">
            <div className="card-content white-text summary-head summary__notifyPerson-items">
                {
                    isNotifyPerson.map(item => {
                        return (
                            <span
                                key={item}
                                className='summary__notifyPerson-item'
                            >{item}</span>
                        )
                    })
                }
            </div>
            <div className="card-action summary__notifyPerson-txt">
                <p>Оповещаем {pre}{inside} {priority} {effect} инциденте</p>
            </div>

            <div className="txt-out__card-footer">
                <button
                    className="btn-floating waves-effect waves-light main__action-btn-green"
                    onClick={() => {toCopyMarkdown('notify')}}
                >
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
    )
}

export default NotifyPerson;

// import './notifyPerson.css'
// import {useEffect} from "react";
// import CopyMarkdown from "../copyMarkdown";
//
// const NotifyPerson = (props) => {
//     const {
//         isNotifyPerson = Array.prototype,
//         isDataForCard = Object.prototype,
//         toGetNotesForPerson = Function.prototype,
//
//         // isCopyNotify = '',
//         toGetAlert = Function.prototype
//     } = props
//
//     let priority = null
//     let effect = null
//     let pre = 'о'
//
//     if (isDataForCard.priority === 'Критический') priority = 'критическом'
//     if (isDataForCard.priority === 'Высокий') priority = 'высоком'
//     if (isDataForCard.priority === 'Средний') priority = 'среднем'
//
//     if (isDataForCard.effect === 'Массовое') effect = 'массовом'
//     if (isDataForCard.effect === 'Групповое') effect = 'групповом'
//
//     if (priority === null) pre = 'об'
//     if (priority === null &&  effect !== null) pre = 'о'
//
//     const toCopyMarkdown = (flagCard) => {
//         const personNotify = isNotifyPerson.join(' ')
//
//         let priorityOut = ''
//         let effectOut = ''
//
//         if (priority !== null) priorityOut = ` ${priority}`
//         if (effect !== null) effectOut = ` ${effect}`
//
//         const txtForCopy = `Оповещаем ${pre}${priorityOut}${effectOut} инциденте`
//
//         toGetAlert()
//         CopyMarkdown({
//             flagCard,
//             isDataForCard,
//             txtForCopy,
//             personNotify
//         })
//     }
//
//     //componentDidUpdate
//     //передадим наверх строку сообщения для великой четверки
//     useEffect(() => {
//         let priorityOut = ''
//         let effectOut = ''
//
//         if (priority !== null) priorityOut = ` ${priority}`
//         if (effect !== null) effectOut = ` ${effect}`
//
//         toGetNotesForPerson(`Оповещаем ${pre}${priorityOut}${effectOut} инциденте`)
//     // eslint-disable-next-line
//     }, [pre, priority, effect])
//
//
//     return(
//         <div className="card blue-grey darken-1">
//             <div className="card-content white-text summary-head summary__notifyPerson-items">
//                 {
//                     isNotifyPerson.map(item => {
//                         return (
//                             <span
//                                 key={item}
//                                 className='summary__notifyPerson-item'
//                             >{item}</span>
//                         )
//                     })
//                 }
//             </div>
//             <div className="card-action summary__notifyPerson-txt">
//                 <p>Оповещаем {pre} {priority} {effect} инциденте</p>
//             </div>
//
//             <div className="txt-out__card-footer">
//                 <button
//                     className="btn-floating waves-effect waves-light main__action-btn-green"
//                     onClick={() => {toCopyMarkdown('notify')}}
//                 >
//                     <i className="material-icons">content_copy</i>
//                 </button>
//             </div>
//         </div>
//     )
// }
//
// export default NotifyPerson;