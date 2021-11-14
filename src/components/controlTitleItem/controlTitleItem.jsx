import {useState} from "react";
import DataForItem from "../../data/dataForItem";

import './controlTitleItem.css'

const ControlTitleItem = ({getNameAction, nameAction}) => {
    const [namePanel, setNamePanel] = useState(null);
    const [isIconForTab, setIconForTab] = useState(null);

    const onShowPanelItem = event => {
        const namePanelTarget = event.target.lastChild.textContent;
        const iconText = event.target.parentNode.lastChild.textContent;

        setNamePanel(namePanelTarget);
        setIconForTab(iconText);

        if (namePanelTarget[0] === 'l') getNameAction(iconText)
        else getNameAction(namePanelTarget)
    };

    const onClosePanel = () => {
        getNameAction(null)
    };

    return(
        <View
            onShowPanelItem={onShowPanelItem}
            namePanel={namePanel}
            isIconForTab={isIconForTab}
            onClosePanel={onClosePanel}
        />
    )
};

export default ControlTitleItem;

const View = ({onShowPanelItem, namePanel, isIconForTab, onClosePanel}) => {

    return(
        DataForItem.summary.map(item => {
            let classPanel = 'control-title__item ';
            let classesIconClose = 'hide'

            if (item.name === namePanel || item.name === isIconForTab) {
                classPanel = classPanel + 'control-title__active';
                classesIconClose = 'small material-icons control-title__close'
            }

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
                    <i
                        className={classesIconClose}
                        onClick={onClosePanel}
                    >clear</i>
                </li>
            )
        })
    )
};