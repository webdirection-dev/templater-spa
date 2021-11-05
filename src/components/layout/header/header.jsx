import './header.css'

const Header = () => {
    return(
        <nav className='blue-grey darken-2 header'>
            <div className="nav-wrapper">
                <a href="!#" className="brand-logo">Шаблонизатор</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://jira.crpt.ru/browse/OSISDUTY-167">JIRA</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;