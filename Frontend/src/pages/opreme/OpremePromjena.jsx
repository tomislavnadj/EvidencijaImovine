import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import OpremaService from "../../services/OpremaService";
import { useEffect, useState } from "react";

export default function OpremePromjena() {
    const navigate = useNavigate();
    const [oprema, setOprema] = useState({});
    const routeParams = useParams();

    async function dohvatiOpremu() {
        const odgovor = await OpremaService.getBySifra(routeParams.sifra);

        if (odgovor.datumNabave != null) {
            odgovor.datumNabave = moment.utc(odgovor.datumNabave).format("yyyy-MM-DD");
        }

        setOprema(odgovor);
    }

    useEffect(() => {
        dohvatiOpremu();
    }, []);

    async function promjena(oprema) {
        const odgovor = await OpremaService.promjena(routeParams.sifra, oprema);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.OPREMA_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();

        let podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get("naziv"),
            tip: podaci.get("tip"),
            serijskiBroj: podaci.get("serijskiBroj"),
            datumNabave: moment.utc(podaci.get("datumNabave")),
        });
    }

    return (
        <>
            Promjena opreme
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required defaultValue={oprema.naziv} />
                </Form.Group>

                <Form.Group controlId="tip">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control type="text" name="tip" required defaultValue={oprema.tip} />
                </Form.Group>

                <Form.Group controlId="serijskiBroj">
                    <Form.Label>Serijski Broj</Form.Label>
                    <Form.Control type="text" name="serijskiBroj" required defaultValue={oprema.serijskiBroj} />
                </Form.Group>

                <Form.Group controlId="datumNabave">
                    <Form.Label>Datum nabave</Form.Label>
                    <Form.Control type="date" name="datumNabave" defaultValue={oprema.izvodiSeOd} />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                        <Link to={RouteNames.OPREMA_PREGLED} className="btn btn-danger siroko">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Promjeni opremu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
