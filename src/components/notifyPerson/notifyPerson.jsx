import './notifyPerson.css'
import {useEffect} from "react";

const NotifyPerson = (props) => {
    const {
        isNotifyPerson = Array.prototype,
        isDataForCard = Object.prototype,
        toGetNotesForPerson = Function.prototype
    } = props

    let priority = null
    let effect = null
    let pre = 'о'

    if (isDataForCard.priority === 'Критический') priority = 'критическом'
    if (isDataForCard.priority === 'Высокий') priority = 'высоком'
    if (isDataForCard.priority === 'Средний') priority = 'среднем'

    if (isDataForCard.effect === 'Массовое') effect = 'массовом'
    if (isDataForCard.effect === 'Групповое') effect = 'групповом'

    if (priority === null) pre = 'об'
    if (priority === null &&  effect !== null) pre = 'о'

    //componentDidUpdate
    //передадим наверх строку сообщения для великой четверки
    useEffect(() => {
        let priorityOut = ''
        let effectOut = ''

        if (priority !== null) priorityOut = ` ${priority}`
        if (effect !== null) effectOut = ` ${effect}`

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
                <p>Оповещаем {pre} {priority} {effect} инциденте</p>
            </div>
        </div>
    )
}

export default NotifyPerson;