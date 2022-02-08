import {useEffect, useState} from "react";
import ControlTitleItem from "../controlTitleItem";
import './controlPanel.css'

import Select from 'react-select';
import DataForItem from "../../data/dataForItem";
const ControlPanel = (props) => {
    const {
        toGetDataFromPanel = Function.prototype,
        toGetNotifyPerson = Function.prototype,
    } = props

    const [isQualities, setQualities] = useState(null);
    const [isStand, setStand] = useState(null);
    const [isSelectTG, setSelectTG] = useState(null);
    const [isSelectPriority, setSelectPriority] = useState(null);
    const [isSelectEffect, setSelectEffect] = useState(null);
    const [isEven, setEven] = useState(true);
    const [isNotifyPerson, setNotifyPerson] = useState({
        sokolov: true,
        balamutin: true,
        zalygin: true,
        novak: true,
        suprun: false,
    });

    const [nameAction, setNameAction] = useState('');
    const [showSetTime, setShowSetTime] = useState(false);
    const [isShowSetTimeClosing, setShowSetTimeClosing] = useState(false);

    const getNameAction = (item) => {
        setNameAction(item)
    };

    const onShowSetTime = () => {
        setShowSetTime(!showSetTime)
    };

    const onShowSetTimeClosing = () => {
        setShowSetTimeClosing(!isShowSetTimeClosing)
    };

    const onChangeInput = (event) => {
        setEven(!isEven)
    }

    const onCheckBox = (event) => {
        const {name} = event.target
        const newObj = {
            ...isNotifyPerson,
            [name]: !isNotifyPerson[name]
        }

        setNotifyPerson(newObj)
    }

    const openControl = (item) => {
        return(
            <FormToSummary
                item={item}

                onShowSetTime={onShowSetTime}
                onShowSetTimeClosing={onShowSetTimeClosing}
                onChangeInput={onChangeInput}
                onCheckBox={onCheckBox}

                setQualities={setQualities}
                setStand={setStand}
                setSelectTG={setSelectTG}
                setSelectPriority={setSelectPriority}
                setSelectEffect={setSelectEffect}

                showSetTime={showSetTime}

                isQualities={isQualities}
                isStand={isStand}
                isSelectTG={isSelectTG}
                isSelectPriority={isSelectPriority}
                isSelectEffect={isSelectEffect}
                isShowSetTimeClosing={isShowSetTimeClosing}
                isEven={isEven}
                isNotifyPerson={isNotifyPerson}
            />
        )
    };

    // componentDidUpdate
    useEffect(() => {
        toGetDataFromPanel(
            {
                qualities: isQualities && isQualities.value,
                stand: isStand && isStand.value,
                tg: isSelectTG && isSelectTG,
                priority: isSelectPriority && isSelectPriority.value,
                effect: isSelectEffect && isSelectEffect.value,
            }
        )
        // eslint-disable-next-line
    }, [isQualities, isStand, isSelectTG, isSelectPriority, isSelectEffect])

    // componentDidUpdate
    // Контролирует состояние персон оповещения в зависимости от чет/нечет
    useEffect(() => {
        let newObj = {}

        if (isEven) {
             newObj = {
                ...isNotifyPerson,
                suprun: false,
                novak: true
            }
        } else {
            newObj = {
                ...isNotifyPerson,
                suprun: true,
                novak: false
            }
        }

        setNotifyPerson(newObj)
    // eslint-disable-next-line
    }, [isEven])

    // componentDidUpdate
    // передать наверх данные об оповещаемых персонах
    useEffect(() => {
        toGetNotifyPerson(isNotifyPerson)
    // eslint-disable-next-line
    }, [isNotifyPerson])

    return(
        <div className='control-panel'>
            <ul className="collapsible control-title__list">
                <ControlTitleItem
                    getNameAction={getNameAction}
                    nameAction={nameAction}
                />
            </ul>
            {openControl(nameAction)}
        </div>
    )
};

export default ControlPanel;

const FormToSummary = (props) => {
    const {
        item,

        setQualities,
        setStand,
        setSelectTG,
        setSelectPriority,
        setSelectEffect,

        onChangeInput,
        onCheckBox,

        isQualities,
        isStand,
        isSelectTG,
        isSelectPriority,
        isSelectEffect,

        isEven,
        isNotifyPerson,
    } = props;

    let classesOpen = 'hide';
    let classesNotify = 'hide';

    if (item === 'Открытие') classesOpen = 'control-panel__main'
    if (item === 'Оповещение') classesNotify = 'control-panel__main'

    let classesForLabelCountry = 'hide';
    if (isQualities !== null) classesForLabelCountry = 'control-panel__label'

    let classesForLabelStand = 'hide';
    if (isStand !== null) classesForLabelStand = 'control-panel__label'

    let classesForLabelTg = 'hide';
    if (isSelectTG && isSelectTG.length > 0) classesForLabelTg = 'control-panel__label'

    let classesForLabelPriority = 'hide';
    if (isSelectPriority !== null) classesForLabelPriority = 'control-panel__label'

    let classesForLabelEffect = 'hide';
    if (isSelectEffect !== null) classesForLabelEffect = 'control-panel__label'

    let classesForNotifyPersonEven = 'hide';
    if (isEven) classesForNotifyPersonEven = 'control-panel__footer-even'

    let classesForNotifyPersonEdd = 'hide';
    if (!isEven) classesForNotifyPersonEdd = 'control-panel__footer-even'

    return (
        <div className='control-panel__actions'>

            <div className={classesOpen}>
                <div className="control-panel__footer">
                    <div className="control-panel__select">
                        <label
                            htmlFor='stand'
                            className={classesForLabelStand}
                        > Контур </label>

                        <Select
                            isClearable
                            name='stand'
                            className='select-react'
                            onChange={setStand}
                            options={DataForItem.stand}
                            placeholder='Контур'
                            noOptionsMessage={() => 'Не найдено'}
                        />
                    </div>

                    <div className="control-panel__select">
                        <label
                            htmlFor='country'
                            className={classesForLabelCountry}
                        > ЕАЭС </label>

                        <Select
                            isClearable
                            name='country'
                            className='select-react'
                            onChange={setQualities}
                            options={DataForItem.qualities}
                            placeholder='ЕАЭС'
                            noOptionsMessage={() => 'Не найдено'}
                        />
                    </div>

                    <div className="control-panel__select">
                        <label
                            htmlFor='tg'
                            className={classesForLabelTg}
                        > ТГ </label>

                        <Select
                            isMulti
                            className='select-react'
                            onChange={setSelectTG}
                            options={DataForItem.tg}
                            placeholder='Выбрать ТГ'
                            noOptionsMessage={() => 'ТГ не найдена'}
                        />
                    </div>
                </div>

                <div className="control-panel__footer">
                    <div className="control-panel__select">
                        <label
                            htmlFor='priority'
                            className={classesForLabelPriority}
                        > Приоритет </label>

                        <Select
                            isClearable
                            name='priority'
                            className='select-react'
                            onChange={setSelectPriority}
                            options={DataForItem.priority}
                            placeholder='Приоритет'
                        />
                    </div>

                    <div className="control-panel__select">
                        <label
                            htmlFor='effect'
                            className={classesForLabelEffect}
                        > Влияние </label>

                        <Select
                            isClearable
                            name='effect'
                            className='select-react'
                            onChange={setSelectEffect}
                            options={DataForItem.effect}
                            placeholder='Влияние'
                        />
                    </div>

                    <div className="control-panel__select">
                        <p className='hide'>1</p>
                    </div>
                </div>
            </div>

            <div className={classesNotify}>
                <div className="control-panel__footer control-panel__footer-notify">
                    <div className='control-panel__footer-radio'>
                        <label>
                            <input
                                name="whoNotify"
                                type="radio"
                                checked={isEven}
                                value='even'
                                onChange={onChangeInput}
                            />
                            <span>Чётные дни</span>
                        </label>
                    </div>
                    <div className='control-panel__footer-radio'>
                        <label>
                            <input
                                name="whoNotify"
                                type="radio"
                                checked={!isEven}
                                value='odd'
                                onChange={onChangeInput}
                            />
                            <span>Нечётные дни</span>
                        </label>
                    </div>
                </div>

                <div className="control-panel__footer control-panel__footer-notify control-panel__footer-even">
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            name='sokolov'
                            checked={isNotifyPerson.sokolov}
                            onChange={onCheckBox}
                        />
                        <span>Василий Марков</span>
                        {/*<span>Андрей Соколов</span>*/}
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            name='balamutin'
                            checked={isNotifyPerson.balamutin}
                            onChange={onCheckBox}
                        />
                        <span>Анатолий Баламутин</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            name='zalygin'
                            checked={isNotifyPerson.zalygin}
                            onChange={onCheckBox}
                        />
                        <span>Михаил Залыгин</span>
                    </label>

                    <label className={classesForNotifyPersonEven}>
                        <input
                            type="checkbox"
                            className="filled-in"
                            name='novak'
                            checked={isNotifyPerson.novak}
                            onChange={onCheckBox}
                        />
                        <span>Владислав Новак</span>
                    </label>

                    <label className={classesForNotifyPersonEdd}>
                        <input
                            type="checkbox"
                            className="filled-in"
                            name='suprun'
                            checked={isNotifyPerson.suprun}
                            onChange={onCheckBox}
                        />
                        <span>Иван Супрун</span>
                    </label>
                </div>
                </div>
        </div>
    )
};