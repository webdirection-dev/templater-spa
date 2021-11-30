const Footer = () => {
    return(
        <footer className="page-footer blue-grey darken-4">
            <div className="footer-copyright">
                <div className="container">
                    DUTY © {new Date().getFullYear()}
                    <a className="grey-text text-lighten-4 right" href="https://confluence.crpt.ru/pages/viewpage.action?pageId=142367287" target="_blank" rel="noreferrer">Confluence</a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;