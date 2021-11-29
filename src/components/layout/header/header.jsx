import './header.css'

const Header = () => {
    return(
        <nav className='blue-grey darken-2 header'>
            <div className="nav-wrapper">
                <a href="./" className="brand-logo">DUTY</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://jira.crpt.ru/secure/CreateIssue!default.jspa" target="_blank" rel="noreferrer">Создать в JIRA</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;