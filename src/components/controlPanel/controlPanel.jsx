import {useEffect, useState} from "react";
import ControlTitleItem from "../controlTitleItem";
import CurrentTime from "../currentTime";
import './controlPanel.css'

import Select from 'react-select';
import DataForItem from "../../data/dataForItem";
const ControlPanel = (props) => {
    const {
        toGetDataFromPanel = Function.prototype,
        toGetTimeFromPanel = Function.prototype,
        toGetTimeClosing = Function.prototype,
    } = props

    const [isQualities, setQualities] = useState(null);
    const [isStand, setStand] = useState(null);
    const [isSelectTG, setSelectTG] = useState(null);
    const [isSelectPriority, setSelectPriority] = useState(null);
    const [isSelectEffect, setSelectEffect] = useState(null);


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

    const openControl = (item) => {
        return(
            <FormToSummary
                item={item}

                onShowSetTime={onShowSetTime}
                onShowSetTimeClosing={onShowSetTimeClosing}

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

                toGetTimeFromPanel={toGetTimeFromPanel}
                toGetTimeClosing={toGetTimeClosing}
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

        onShowSetTime,
        onShowSetTimeClosing,

        showSetTime,
        isQualities,
        isStand,
        isSelectTG,
        isSelectPriority,
        isSelectEffect,
        isShowSetTimeClosing,

        toGetTimeFromPanel,
        toGetTimeClosing
    } = props;

    let classesOpen = 'hide';
    let classesNotify = 'hide';
    let classesClose = 'hide';

    if (item === 'Открытие') classesOpen = 'control-panel__main'
    if (item === 'Оповещение') classesNotify = 'test'
    if (item === 'Закрытие') classesClose = 'control-panel__main'

    let buttonTitle = 'Время открытия'
    let classesButton = 'btn-large'
    if (showSetTime) {
        buttonTitle = 'Свернуть выбор'
        classesButton = classesButton + ' btn__color-orange'
    }

    let buttonTitleClosing = 'Время закрытия'
    let classesButtonClosing = 'btn-large'
    if (isShowSetTimeClosing) {
        buttonTitleClosing = 'Свернуть выбор'
        classesButtonClosing = classesButtonClosing + ' btn__color-orange'
    }

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
                        > Страна </label>

                        <Select
                            isClearable
                            name='country'
                            className='select-react'
                            onChange={setQualities}
                            options={DataForItem.qualities}
                            placeholder='Страна'
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

                    <div className="control-panel__time">
                        <button
                            id='btnOpening'
                            className={classesButton}
                            onClick={onShowSetTime}
                        >{buttonTitle}</button>

                        <CurrentTime
                            showSetTime={showSetTime}
                            onShowSetTime={onShowSetTime}
                            toGetTimeFromPanel={toGetTimeFromPanel}
                        />
                    </div>
                </div>
            </div>

            <div className={classesNotify}>Оповещение</div>
            <div className={classesClose}>
                <div className="control-panel__footer control-panel__footer-closing">
                    <div className="control-panel__time">
                        <button
                            id='btnClosing'
                            className={classesButtonClosing}
                            onClick={onShowSetTimeClosing}
                        >{buttonTitleClosing}</button>

                        <CurrentTime
                            onShowSetTimeClosing={onShowSetTimeClosing}
                            isShowSetTimeClosing={isShowSetTimeClosing}
                            toGetTimeClosing={toGetTimeClosing}
                            flagClosing={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};