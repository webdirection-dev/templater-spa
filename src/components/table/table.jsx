import {useEffect, useState} from "react";
import Alert from "./alert";
import GeneratorTxtOut from "./generatorTxtOut";
import './table.css'

const Table = (props) => {
    const {
        toToggleShowTable = Function.prototype,
        isToggleShowTable = false,

        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
        isTimeForClosing = Object.prototype,

        isFlagInside = false,

        isDataProblem = null,
        isDataWhoNotify = null,
        isDataNotes = null,
        isDataOps = null,
        isPerson = null,
        isNotesForPerson = null,
        isUpdate = null,
        isClosingTime = {hourClosing: '', minuteClosing: ''},
        isNotesClosingOut = null,

        toGetCopyOpeningFromTable = Function.prototype,
        toGetCopyClosingFromTable = Function.prototype,
        toGetCopyNotifyFromTable = Function.prototype,
        toGetCopyUpdateFromTable = Function.prototype,
    } = props

    const [isAlert, setAlert] = useState(false)

    const toGetAlert = () => {
        setAlert(true)
    }

    const closeAlert = () => {
        setAlert(false)
    }

    // componentDidUpdate
    // изчезновение алерта Скопировано в буфер
    useEffect(() => {
        const timerId = setTimeout(() => closeAlert(), 3000);

        // componentDidUnmount
        return () => clearTimeout(timerId)
        // eslint-disable-next-line
    }, [isAlert]);

    let classesForShowTable = 'hide'
    if (isToggleShowTable) classesForShowTable = 'main__table'

    return (
        <div
            id='dataTable'
            className={classesForShowTable}
        >
            <div className="txt-out">
                <div className="txt-out__helper">
                    <GeneratorTxtOut
                        flagOpening={true}
                        isDataForCard={isDataForCard}
                        isTimeForCard={isTimeForCard}

                        isFlagInside={isFlagInside}
                        isDataProblem={isDataProblem}
                        isDataWhoNotify={isDataWhoNotify}
                        isDataNotes={isDataNotes}
                        isDataOps={isDataOps}

                        toGetAlert={toGetAlert}

                        toGetCopyOpeningFromTable={toGetCopyOpeningFromTable}
                    />
                </div>

                <div className="txt-out__helper">
                    <GeneratorTxtOut
                        flagUpdate={true}
                        isDataForCard={isDataForCard}
                        isTimeForCard={isTimeForCard}
                        isFlagInside={isFlagInside}
                        isUpdate={isUpdate}

                        toGetAlert={toGetAlert}

                        toGetCopyUpdateFromTable={toGetCopyUpdateFromTable}
                    />

                    <GeneratorTxtOut
                        flagNotify={true}
                        isPerson={isPerson}
                        isNotesForPerson={isNotesForPerson}

                        toGetAlert={toGetAlert}

                        toGetCopyNotifyFromTable={toGetCopyNotifyFromTable}
                    />
                </div>

                <div className="txt-out__helper">
                    <GeneratorTxtOut
                        flagClosing={true}
                        isDataForCard={isDataForCard}
                        isTimeForCard={isTimeForCard}
                        isTimeForClosing={isTimeForClosing}

                        isFlagInside={isFlagInside}
                        isDataProblem={isDataProblem}
                        isDataWhoNotify={isDataWhoNotify}
                        isDataNotes={isDataNotes}
                        isDataOps={isDataOps}

                        isClosingTime={isClosingTime}
                        isNotesClosingOut={isNotesClosingOut}

                        toGetAlert={toGetAlert}

                        toGetCopyClosingFromTable={toGetCopyClosingFromTable}
                    />
                </div>
            </div>

            <div className="main__action">
                <button
                    className="btn-floating btn-large waves-effect waves-light main__action-btn"
                    onClick={toToggleShowTable}
                >
                    <i className="material-icons">close</i>
                </button>
            </div>

            <Alert
                isAlert={isAlert}
            />
        </div>
    )
}

export default Table;