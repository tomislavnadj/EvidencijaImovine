import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import NavBarEvidencijaImovine from "./components/NavBarEvidencijaImovine";
import { Route, Routes } from "react-router-dom";
import { RouteNames } from "./constants";
import Pocetna from "./pages/Pocetna";
import OpremePregled from "./pages/opreme/OpremePregled";
import OpremeDodaj from "./pages/opreme/OpremeDodaj";
import OpremePromjena from "./pages/opreme/OpremePromjena";
import moment from "moment";

function App() {
    function trenutnaGodina() {
        return moment().year();
    }

    return (
        <>
            <Container>
                <NavBarEvidencijaImovine />
                <Routes>
                    <Route path={RouteNames.HOME} element={<Pocetna />} />
                    <Route path={RouteNames.OPREMA_PREGLED} element={<OpremePregled />} />
                    <Route path={RouteNames.OPREMA_NOVI} element={<OpremeDodaj />} />
                    <Route path={RouteNames.OPREMA_PROMJENA} element={<OpremePromjena />} />
                </Routes>
                <hr />
                &copy; Evidencija Imovine {trenutnaGodina()}
            </Container>
        </>
    );
}

export default App;
