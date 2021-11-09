const CardItem = () => {
    // const [isInside, setInside] = useState(false);
    // const [isStand, setStand] = useState('prod');
    //
    // const onCheckBox = () => {
    //     setInside(!isInside)
    // }
    //
    // const onChangeInput = (event) => {
    //     const {value} = event.target;
    //     setStand(value);
    // };

    return(
        <>
            <div className="card blue-grey darken-1 summary">
                <div className="card-content white-text summary-head">
                    <span className="card-title">Открытие инцидента</span>
                    {/*<p>*/}
                    {/*    <label>*/}
                    {/*        <input*/}
                    {/*            name='inside'*/}
                    {/*            type="checkbox"*/}
                    {/*            className="filled-in"*/}
                    {/*            // onChange={onCheckBox}*/}
                    {/*        />*/}
                    {/*        <span className='summary-title'>Внутренний</span>*/}
                    {/*    </label>*/}
                    {/*</p>*/}
                </div>

                <div className="card-action">
                    {/*<div className="summary-radio">*/}
                    {/*    <p>*/}
                    {/*        <label>*/}
                    {/*            <input*/}
                    {/*                name="stand"*/}
                    {/*                value='prod'*/}
                    {/*                type="radio"*/}
                    {/*                // checked={isStand === 'prod'}*/}
                    {/*                // onChange={onChangeInput}*/}
                    {/*            />*/}
                    {/*            <span className='summary-title summary-title-radio'>Прод</span>*/}
                    {/*        </label>*/}
                    {/*    </p>*/}
                    {/*    <p>*/}
                    {/*        <label>*/}
                    {/*            <input*/}
                    {/*                name="stand"*/}
                    {/*                value='demo'*/}
                    {/*                type="radio"*/}
                    {/*                // checked={isStand === 'demo'}*/}
                    {/*                // onChange={onChangeInput}*/}
                    {/*            />*/}
                    {/*            <span className='summary-title summary-title-radio ml-15'>Демо</span>*/}
                    {/*        </label>*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="card blue-grey darken-1 summary">
                <div className="card-content white-text">
                    <span className="card-title">Закрытие инцидента</span>
                    {/*<p>I am a very simple card. I am good at containing small bits of information.*/}
                    {/*    I am convenient because I require little markup to use effectively.</p>*/}
                </div>
                <div className="card-action">
                    {/*<a href="#!">This is a link</a>*/}
                    {/*<a href="#!">This is a link</a>*/}
                </div>
            </div>
        </>
    )
};

export default CardItem;