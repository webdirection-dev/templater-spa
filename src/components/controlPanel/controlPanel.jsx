import {useState} from "react";
import ControlTitleItem from "../controlTitleItem";
import './controlPanel.css'

import Select from 'react-select';
import DataForItem from "../../data/dataForItem";
const ControlPanel = () => {
    const [isInside, setInside] = useState(false);
    const [isStand, setStand] = useState('prod');
    const [, setSelectTG] = useState(null);
    const [, setSelectPriority] = useState(null);

    const [nameAction, setNameAction] = useState('Открытие');

    const onCheckBox = () => {
        setInside(!isInside)
    }

    const onChangeInput = (event) => {
        const {name, value} = event.target;
        if (name === 'isStand') setStand(value);
    };

    const getNameAction = (item) => {
        setNameAction(item)
    };

    const openControl = (item) => {
        return(
            <FormToSummary
                item={item}
                isInside={isInside}
                isStand={isStand}
                onCheckBox={onCheckBox}
                onChangeInput={onChangeInput}
                setSelectTG={setSelectTG}
                setSelectPriority={setSelectPriority}
            />
        )
    };

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

const FormToSummary = ({item, isInside, isStand, onCheckBox, onChangeInput, setSelectTG, setSelectPriority}) => {
    let classesOpen = 'hide';
    let classesNotify = 'hide';
    let classesClose = 'hide';

    if (item === 'Открытие') classesOpen = 'control-panel__main'
    if (item === 'Оповещение') classesNotify = 'test'
    if (item === 'Закрытие') classesClose = 'test2'

    return (
        <div className='control-panel__actions'>

            <div className={classesOpen}>
                <div className="control-panel__header">
                    <div>
                        <label>
                            <input
                                checked={isInside}
                                name='inside'
                                type="checkbox"
                                className="filled-in"
                                onChange={onCheckBox}
                            />
                            <span className='summary-title'>Внутренний</span>
                        </label>
                    </div>

                    <div className="control-panel__radio">
                        <div>
                            <label>
                                <input
                                    name="isStand"
                                    value='prod'
                                    type="radio"
                                    checked={isStand === 'prod'}
                                    onChange={onChangeInput}
                                />
                                <span className='summary-title summary-title-radio'>Прод</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    name="isStand"
                                    value='demo'
                                    type="radio"
                                    checked={isStand === 'demo'}
                                    onChange={onChangeInput}
                                />
                                <span className='summary-title summary-title-radio ml-15'>Демо</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="control-panel__footer">
                    <Select
                        isMulti
                        className='select-react'
                        onChange={setSelectTG}
                        options={DataForItem.tg}
                        placeholder='Выбрать ТГ'
                        noOptionsMessage={() => 'ТГ не найдена'}
                    />

                    <Select
                        className='select-react'
                        onChange={setSelectPriority}
                        options={DataForItem.priority}
                        placeholder='Приоритет'
                    />

                    <Select
                        className='select-react'
                        onChange={setSelectPriority}
                        options={DataForItem.effect}
                        placeholder='Влияние'
                    />
                </div>
            </div>

            <div className={classesNotify}>Оповещение</div>
            <div className={classesClose}>Закрытие</div>
        </div>
    )
};