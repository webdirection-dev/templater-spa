import Header from "../layout/header";
import Main from "../layout/main";
import Footer from "../layout/footer";
import './App.css';

import santa from './img/santa.png'

function App() {
    return (
        <>
            <Header />
            <Main />
            <Footer />

            <Snows />
        </>
    );
}

export default App;

const Snows = () => {
    function garland() {
        let nums = document.getElementById('nums_1').innerHTML

        if(nums === '1') {
            document.getElementById('garland').className='garland_1';
            document.getElementById('nums_1').innerHTML='2'
        }

        if(nums === '2') {
            document.getElementById('garland').className='garland_2';
            document.getElementById('nums_1').innerHTML='3'
        }

        if(nums === '3') {
            document.getElementById('garland').className='garland_3';
            document.getElementById('nums_1').innerHTML='4'
        }

        if(nums === '4') {
            document.getElementById('garland').className='garland_4';
            document.getElementById('nums_1').innerHTML='1'
        }
    }

    setInterval(function(){garland()}, 600)

    return(
        <>
            <div id="garland" className="garland_4">
                <div id="nums_1">1</div>
            </div>

            <div className="newYear">
                <div className="newYear__date">
                    2022
                    <img src={santa} alt="santa" className='newYear__santa'/>
                    <div className="newYear__2">
                        2
                    </div>
                </div>
            </div>
        </>
    )
}