import './timeDuration.css'

const TimeDuration = ({isGetDataTime = {}, isEndDate = {}}) => {
    const addZero = num => num <= 9 ? "0" + num : num;

    const duration = Date.parse(isEndDate) - Date.parse(isGetDataTime),
        // seconds = addZero(Math.floor((duration / 1000) % 60)), // секунды делим на 60 секунд, остаток = кол-во секунд
        minutes = addZero(Math.ceil((duration / 1000 / 60) % 60)), // секунды / секунды / минуты, остаток минуты
        hours = addZero(Math.floor((duration / (1000 * 60 * 60)) % 24)), // милисек/(1000* 60*60) отстаток от 24 часов
        days = addZero(Math.floor(duration / (1000 * 60 * 60 * 24))); // остаток дней

    if (duration < 0) {
        return {
            durationDay: 0,
            durationHour: 0,
            durationMinute: 0,
        }
    }

    return {
        durationDay: days,
        durationHour: hours,
        durationMinute: minutes,
    }
}

export default TimeDuration;