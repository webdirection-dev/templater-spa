import ControlPanel from "../../controlPanel";
import CardsList from "../../cardsList";

const Main = () => {
    return(
        <>
            <ControlPanel />

            <div className='content container'>
                <CardsList />
            </div>
        </>

    )
};

export default Main;