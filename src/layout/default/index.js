import classNames from 'classnames'
import styles from './default.module.scss'
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import Footer from "../../components/Footer/Footer.js";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return ( 
        <>
            <IndexNavbar />
            { children }
            <Footer />
        </>
    );
}

export default DefaultLayout;