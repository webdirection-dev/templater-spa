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

const CurrentTime = (props) => {
    const {
        showSetTime,
        onShowSetTime = Function.prototype
    } = props;

    const [nowDate, setNowDate] = useState({hour: new Date().getHours(), minute: new Date().getMinutes()});
    const [isClassHour, setClassHour] = useState(null)
    const [isClassMinute, setClassMinute] = useState(null)
    const [isCloseChooseHour, setCloseChooseHour] = useState(false)
    const [isCloseChooseMinute, setCloseChooseMinute] = useState(false)

    console.log(nowDate)

    let hour = nowDate.hour,
        minute = nowDate.minute;

    const onChooseHour = (event) => {
        const {className, textContent} = event.target;

        if (className === 'choose-time__item') {
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

        if (className === 'choose-time__item') {
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

    //componentDidUpdate
    useEffect(() => {
        if (showSetTime) setCloseChooseHour(false)
        if (showSetTime) setCloseChooseMinute(false)
    }, [showSetTime])

    useEffect(() => {
        if (isCloseChooseHour && isCloseChooseMinute) onShowSetTime()
    }, [isCloseChooseHour, isCloseChooseMinute])

    return(
        <View
            hour={hour}
            minute={minute}
            showSetTime={showSetTime}
            onChooseHour={onChooseHour}
            onChooseMinute={onChooseMinute}
            isClassHour={isClassHour}
            isClassMinute={isClassMinute}
            onCloseChooseHour={onCloseChooseHour}
            onCloseChooseMinute={onCloseChooseMinute}
            isCloseChooseHour={isCloseChooseHour}
            isCloseChooseMinute={isCloseChooseMinute}
        />
    )
};

export default CurrentTime;

const View = (props) => {
    const {
        hour,
        minute,
        showSetTime,
        onChooseHour,
        isClassHour,
        onChooseMinute,
        isClassMinute,
        onCloseChooseHour,
        onCloseChooseMinute,
        isCloseChooseHour,
        isCloseChooseMinute
    } = props;

    let classesShowChooseTime = 'hide'
    if (showSetTime) classesShowChooseTime = 'choose-time'
    if (showSetTime && isCloseChooseMinute &&  !isCloseChooseHour) classesShowChooseTime = 'choose-time choose-time-without-minute'

    let classesCloseChooseHour = 'hide'
    if (!isCloseChooseHour) classesCloseChooseHour = 'choose-time__content'

    let classesCloseChooseMinute = 'hide'
    if (!isCloseChooseMinute) classesCloseChooseMinute = 'choose-time__content'

    return(
        <>
            <div className="control-panel__data">
                <span>{hour}</span>
                <span>:</span>
                <span>{minute}</span>
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