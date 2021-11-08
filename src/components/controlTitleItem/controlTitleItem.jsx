import {useState} from "react";
import DataForItem from "../../data/dataForItem";

import './controlTitleItem.css'

const ControlTitleItem = ({getNameAction, nameAction}) => {
    const [namePanel, setNamePanel] = useState(null);

    const onShowPanelItem = event => {
        const nameAction = event.target.lastChild.textContent
        setNamePanel(nameAction);
        getNameAction(nameAction);
    };

    return(
        <View
            onShowPanelItem={onShowPanelItem}
            namePanel={namePanel}
            nameAction={nameAction}
        />
    )
};

export default ControlTitleItem;

const View = ({onShowPanelItem, namePanel, nameAction}) => {
    return(
        DataForItem.map(item => {
            let classPanel = 'control-title__item ';
            if (item.name === namePanel || (nameAction === 'Открытие' && item.name === 'Открытие')) classPanel = classPanel + 'control-title__active'

            return(
                <li
                    key={item.name}
                    className={classPanel}
                    onClick={(event) => onShowPanelItem(event)}
                >
                    <div className="collapsible-header control-title__header"><
                        i className="material-icons">{item.icon}</i>
                        {item.name}
                    </div>
                </li>
            )
        })
    )
};