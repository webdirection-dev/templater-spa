import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";

const UpdateCard = (props) => {
    const {stand, qualities} = props.isDataForCard
    const {isInside} = props

    const [isNotesUpdate, setNotesUpdate] = useState('')

    let inside = null
    let classesForCardInside = 'hide'

    if (isInside) {
        inside = 'ВНУТРЕННИЙ'
        classesForCardInside = 'card-title'
    }

    const onWriteInputUpdate = (event) => {
        let {value} = event.target

        setNotesUpdate(value)
    }

    return(
        <div className="card blue-grey darken-1">
            <div className="card-content white-text summary-head">
                <div className="">
                    <span className={classesForCardInside}>{inside}</span>
                    <span className="card-title">Инцидент в работе</span>
                </div>

                <span className="card-title"><span>{stand}</span> <span>{qualities}</span></span>
            </div>
            <div className="card-action">
                <TextareaAutosize
                    className='summary__area'
                    value={isNotesUpdate}
                    name="notesUpdate"
                    placeholder='Update...'
                    onChange={onWriteInputUpdate}
                />
            </div>
        </div>
    )
}
export default UpdateCard