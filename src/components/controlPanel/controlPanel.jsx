import {useState} from "react";
import ControlTitleItem from "../controlTitleItem";
import './controlPanel.css'

import Select from 'react-select';
import DataForTG from "../../data/dataForTG";

const ControlPanel = () => {
    const [isInside, setInside] = useState(false);
    const [isStand, setStand] = useState('prod');
    const [isSelectTG, setSelectTG] = useState(null);

    if (isSelectTG !== null) {
        console.log(isSelectTG)
    }

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

const FormToSummary = ({item, isInside, isStand, onCheckBox, onChangeInput, setSelectTG}) => {
        let content = null;

        if (item === 'Открытие') {
            content = (
                <div className='control-panel__main'>
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
                            options={DataForTG}
                            placeholder='Выбрать ТГ'
                            noOptionsMessage={() => 'ТГ не найдена'}
                        />
                    </div>
                </div>
            )
        }

        if (item === 'Оповещение') {
            content = (
                <div>Оповещение</div>
            )
        }

        if (item === 'Апдейт') {
            content = (
                <div>Апдейт</div>
            )
        }

        if (item === 'Закрытие') {
            content = (
                <div>Закрытие</div>
            )
        }

        return(
            <div className='control-panel__actions'>
                {content}
            </div>
        )
};