import './cardsList.css';
import CardItem from "../cardItem";

const CardsList = (props) => {
    const {
        isDataForCard = Object.prototype,
        isTimeForCard = Object.prototype,
    } = props

    return(
        <div className="summary-forms">
            <CardItem
                isDataForCard={isDataForCard}
                isTimeForCard={isTimeForCard}
            />
            <CardItem />
            <CardItem />
        </div>
    )
};

export default CardsList;