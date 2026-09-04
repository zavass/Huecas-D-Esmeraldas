import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

import "./Layout.css";

function Layout({ children }) {
    return (
        <>
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}

export default Layout;