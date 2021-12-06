import TextareaAutosize from "react-textarea-autosize";
import {useEffect, useState} from "react";
import CopyMarkdown from "../copyMarkdown";

const UpdateCard = (props) => {
    const {
        toGetDataUpdate = Function.prototype,
        isDataForCard,
        isInside,

        toGetAlert = Function.prototype,
    } = props

    const {stand, qualities} = isDataForCard

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

    const toCopyMarkdown = (flagCard) => {
        toGetAlert()
        CopyMarkdown({
            flagCard,
            isDataForCard,
            isInside,
            isNotesUpdate
        })
    }

    //componentDidUpdate
    //передать наверх данные из INPUT update
    useEffect(() => {
        toGetDataUpdate(isNotesUpdate)
    // eslint-disable-next-line
    }, [isNotesUpdate])

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

            <div className="txt-out__card-footer">
                <button
                    className="btn-floating waves-effect waves-light main__action-btn-green"
                    onClick={() => {toCopyMarkdown('update')}}
                >
                    <i className="material-icons">content_copy</i>
                </button>
            </div>
        </div>
    )
}
export default UpdateCard

// import TextareaAutosize from "react-textarea-autosize";
// import {useEffect, useState} from "react";
// import CopyMarkdown from "../copyMarkdown";
//
// const UpdateCard = (props) => {
//     const {
//         toGetDataUpdate = Function.prototype,
//         // isCopyUpdate = '',
//
//         isDataForCard,
//         isInside,
//
//         toGetAlert = Function.prototype,
//     } = props
//
//     const {stand, qualities} = isDataForCard
//
//     const [isNotesUpdate, setNotesUpdate] = useState('')
//
//     let inside = null
//     let classesForCardInside = 'hide'
//
//     if (isInside) {
//         inside = 'ВНУТРЕННИЙ'
//         classesForCardInside = 'card-title'
//     }
//
//     const onWriteInputUpdate = (event) => {
//         let {value} = event.target
//
//         setNotesUpdate(value)
//     }
//
//     const toCopyMarkdown = (flagCard) => {
//         toGetAlert()
//         CopyMarkdown({
//             flagCard,
//             isDataForCard,
//             isInside,
//             isNotesUpdate
//         })
//     }
//
//     //componentDidUpdate
//     //передать наверх данные из INPUT update
//     useEffect(() => {
//         toGetDataUpdate(isNotesUpdate)
//     // eslint-disable-next-line
//     }, [isNotesUpdate])
//
//     return(
//         <div className="card blue-grey darken-1">
//             <div className="card-content white-text summary-head">
//                 <div className="">
//                     <span className={classesForCardInside}>{inside}</span>
//                     <span className="card-title">Инцидент в работе</span>
//                 </div>
//
//                 <span className="card-title"><span>{stand}</span> <span>{qualities}</span></span>
//             </div>
//             <div className="card-action">
//                 <TextareaAutosize
//                     className='summary__area'
//                     value={isNotesUpdate}
//                     name="notesUpdate"
//                     placeholder='Update...'
//                     onChange={onWriteInputUpdate}
//                 />
//             </div>
//
//             <div className="txt-out__card-footer">
//                 <button
//                     className="btn-floating waves-effect waves-light main__action-btn-green"
//                     onClick={() => {toCopyMarkdown('update')}}
//                 >
//                     <i className="material-icons">content_copy</i>
//                 </button>
//             </div>
//         </div>
//     )
// }
// export default UpdateCard