/* eslint-disable */
import {useEffect, useState} from "react";
import './currentTime.css';

const chooseHour = [];
const chooseMinute = [];

for (let i = 0; i < 60; i++) {
    if (i < 10) {
        chooseHour.push(`0${i}`)
        chooseMinute.push(`0${i}`)
    } else if (i < 24) {
        chooseHour.push(i)
        chooseMinute.push(i)
    } else chooseMinute.push(i)
}

// Инициализация времени открытия
const hourOpeningInit = new Date().getHours()
const minuteOpeningInit = new Date().getMinutes()

// Инициализация времени закрытия
const hourClosingInit = new Date().getHours()
const minuteClosingInit = new Date().getMinutes()

const CurrentTime = (props) => {
    const {
        showSetTime = false,
        isShowSetTimeClosing = false,
        onShowSetTime = Function.prototype,
        onShowSetTimeClosing = Function.prototype,
        toGetTimeFromPanel = Function.prototype,
        toGetTimeClosing = Function.prototype,
        flagClosing = false
    } = props;

    const [nowDate, setNowDate] = useState({hour: hourOpeningInit, minute: minuteOpeningInit});
    const [isClassHour, setClassHour] = useState(null)
    const [isClassMinute, setClassMinute] = useState(null)
    const [isCloseChooseHour, setCloseChooseHour] = useState(false)
    const [isCloseChooseMinute, setCloseChooseMinute] = useState(false)
    const [isTimeClosing, setTimeClosing] = useState({hourClosing: hourClosingInit +1, minuteClosing: minuteClosingInit})

    // Время открытия
    let hour = nowDate.hour,
        minute = nowDate.minute;

    // Время закрытия
    let hourClosing = isTimeClosing.hourClosing,
        minuteClosing = isTimeClosing.minuteClosing;

    const onChooseHour = (event) => {
        const {className, textContent} = event.target;

        if (flagClosing && className === 'choose-time__item') {
            let newObj = {
                ...isTimeClosing,
                hourClosing: textContent
            }
            setTimeClosing(newObj)
            setClassHour(textContent)
        }

        if (!flagClosing && className === 'choose-time__item') {
            let newObj = {
                ...nowDate,
                hour: textContent
            }
            setNowDate(newObj)
            setClassHour(textContent)
        }
    };

    const onChooseMinute = (event) => {
        const {className, textContent} = event.target;

        if (flagClosing && className === 'choose-time__item') {
            let newObj = {
                ...isTimeClosing,
                minuteClosing: textContent
            }
            setTimeClosing(newObj)
            setClassMinute(textContent)
        }

        if (!flagClosing && className === 'choose-time__item') {
            let newObj = {
                ...nowDate,
                minute: textContent
            }
            setNowDate(newObj)
            setClassMinute(textContent)
        }
    };

    const onCloseChooseHour = () => {
        setCloseChooseHour(true)
    };

    const onCloseChooseMinute = () => {
        setCloseChooseMinute(true)
    };

    //componentDidMount
    // Инициализация времени открытия
    useEffect(() => {
        if (hour < 10 && typeof hour === 'number') {
            let newObj = {
                ...nowDate,
                hour: `0${hour}`
            }
            setNowDate(newObj)
        }

        if (minute < 10 && typeof hour === 'number') {
            let newObj = {
                ...nowDate,
                minute: `0${minute}`
            }
            setNowDate(newObj)
        }
    }, []);

    // componentDidMount
    // Инициализация времени закрытия
    useEffect(() => {
        if (hourClosing < 10 && typeof hour === 'number') {
            let newObj = {
                ...nowDate,
                hourClosing: `0${hour +1}`
            }
            setTimeClosing(newObj)
        }

        if (minuteClosing < 10 && typeof hour === 'number') {
            let newObj = {
                ...nowDate,
                minuteClosing: `0${minute}`
            }
            setTimeClosing(newObj)
        }
    }, []);

    //componentDidUpdate
    // Закрывает панель выбора времени по крестикам
    useEffect(() => {
        if (showSetTime || isShowSetTimeClosing) {
            setCloseChooseHour(false)
            setCloseChooseMinute(false)
        }
    }, [showSetTime, isShowSetTimeClosing])

    // Закрыть панель с выбором часа и минуты во вкладке открытие
    useEffect(() => {
        if (isCloseChooseHour && isCloseChooseMinute) onShowSetTime()
    }, [isCloseChooseHour, isCloseChooseMinute])

    // Закрыть панель с выбором часа и мнуты во вкладке Закрытие
    useEffect(() => {
        if (isCloseChooseHour && isCloseChooseMinute) onShowSetTimeClosing()
    }, [isCloseChooseHour, isCloseChooseMinute])

    // Поднять наерх время открытия
    useEffect(() => {
        toGetTimeFromPanel(nowDate)
    }, [nowDate])

    // Поднять наерх время закрытия
    useEffect(() => {
        toGetTimeClosing(isTimeClosing)
    }, [isTimeClosing])

    return(
        <View
            hour={hour}
            minute={minute}
            hourClosing={hourClosing}
            minuteClosing={minuteClosing}

            showSetTime={showSetTime}
            isShowSetTimeClosing={isShowSetTimeClosing}

            onChooseHour={onChooseHour}
            onChooseMinute={onChooseMinute}

            isClassHour={isClassHour}
            isClassMinute={isClassMinute}

            onCloseChooseHour={onCloseChooseHour}
            onCloseChooseMinute={onCloseChooseMinute}

            isCloseChooseHour={isCloseChooseHour}
            isCloseChooseMinute={isCloseChooseMinute}

            flagClosing={flagClosing}
        />
    )
};

export default CurrentTime;

const View = (props) => {
    const {
        hour,
        minute,
        hourClosing,
        minuteClosing,

        showSetTime,
        isShowSetTimeClosing,
        isClassHour,
        isClassMinute,
        isCloseChooseHour,
        isCloseChooseMinute,

        onChooseHour,
        onChooseMinute,
        onCloseChooseHour,
        onCloseChooseMinute,

        flagClosing
    } = props;

    let classesShowChooseTime = 'hide'
    if (showSetTime || isShowSetTimeClosing) classesShowChooseTime = 'choose-time'
    if ((showSetTime || isShowSetTimeClosing) && isCloseChooseMinute && !isCloseChooseHour) classesShowChooseTime = 'choose-time choose-time-without-minute'

    let classesCloseChooseHour = 'hide'
    if (!isCloseChooseHour) classesCloseChooseHour = 'choose-time__content'

    let classesCloseChooseMinute = 'hide'
    if (!isCloseChooseMinute) classesCloseChooseMinute = 'choose-time__content'

    let classesForClock = 'control-panel__data blue-text text-accent-1'
    let showHour = hour
    let showMinute = minute
    if (flagClosing) {
        showHour = hourClosing
        showMinute = minuteClosing
        classesForClock = 'control-panel__data red-text text-accent-1'
    }

    return(
        <>
            <div className={classesForClock}>
                <span>{showHour}</span>
                <span>:</span>
                <span>{showMinute}</span>
            </div>

            <div className={classesShowChooseTime}>
                <div
                    className={classesCloseChooseHour}
                    onClick={(event) => onChooseHour(event)}
                >
                    <i
                        className="small material-icons right choose-time__content-icon"
                        onClick={onCloseChooseHour}
                    >clear</i>
                    <div className='choose-time__title'>Часы</div>
                    <div className="choose-time__elems">
                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseHour.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (item === isClassHour) classesItem = classesItem + ' choose-time__item-color'

                                    if (index < 10) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{String(item)}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseHour.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassHour) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 9 && index < 20) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items'>
                            {
                                chooseHour.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassHour) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 19) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>
                    </div>
                </div>

                <div
                    className={classesCloseChooseMinute}
                    onClick={(event) => onChooseMinute(event)}
                >
                    <i
                        className="small material-icons right choose-time__content-icon"
                        onClick={onCloseChooseMinute}
                    >clear</i>
                    <div className='choose-time__title'>Минуты</div>
                    <div className="choose-time__elems">
                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (item === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index < 10) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{String(item)}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 9 && index < 20) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 19 && index < 30) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 29 && index < 40) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 39 && index < 50) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>

                        <div className='choose-time__items choose-time__item-group'>
                            {
                                chooseMinute.map((item, index) => {
                                    let classesItem = 'choose-time__item'
                                    if (String(item) === isClassMinute) classesItem = classesItem + ' choose-time__item-color'

                                    if (index > 49) {
                                        return(
                                            <div
                                                key={index}
                                                className={classesItem}
                                            >{item}</div>
                                        )
                                    } else return null
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};