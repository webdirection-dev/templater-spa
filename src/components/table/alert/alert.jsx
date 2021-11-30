import './alert.css'

const Alert = (props) => {
    const {
        isAlert = false
    } = props

    let classesForShowAlert = 'hide'
    if (isAlert) classesForShowAlert = 'main__alert'

    return(
        <div id="toast-container" className={classesForShowAlert}>
            <div className="toast">
                Скопировано в буфер!
            </div>
        </div>
    )
}

export default Alert;