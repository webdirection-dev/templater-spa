// import {useState, useEffect} from "react";

const useDateHook = (value) => {
    // const [isValue, setValue] = useState(value)

    const options = {
        // era: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // weekday: 'short',
        // timezone: 'UTC',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric'
    };

    // useEffect(() => {
    //     setValue(value)
    //     console.log(value.toLocaleString('ru', options))
    //
    //     // return value.toLocaleString('ru', options)
    // // eslint-disable-next-line
    // }, [])

    return value.toLocaleString('ru', options)
}

export default useDateHook;