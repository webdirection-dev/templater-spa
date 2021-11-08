import {useState} from "react";

import ControlTitleItem from "../controlTitleItem";
import './controlPanel.css'

const ControlPanel = () => {
    const [isInside, setInside] = useState(false);
    const [isStand, setStand] = useState('prod');

    const [nameAction, setNameAction] = useState('Открытие');

    const onCheckBox = () => {
        setInside(!isInside)
    }

    const onChangeInput = (event) => {
        const {value} = event.target;
        setStand(value);
    };

    const getNameAction = (item) => {
        setNameAction(item)
    };

    const openControl = (item) => {
        let content = null;
        if (item === 'Открытие') {
            content = (
                <>
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

                    <div className="summary-radio">
                        <div>
                            <label>
                                <input
                                    name="stand"
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
                                    name="stand"
                                    value='demo'
                                    type="radio"
                                    checked={isStand === 'demo'}
                                    onChange={onChangeInput}
                                />
                                <span className='summary-title summary-title-radio ml-15'>Демо</span>
                            </label>
                        </div>
                    </div>
                </>
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