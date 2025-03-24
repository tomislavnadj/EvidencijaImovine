import { useEffect, useState } from "react";
import OpremaService from "../../services/OpremaService";
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function OpremePregled() {
    const [oprema, setOpreme] = useState();
    const navigate = useNavigate();

    async function dohvatiOpreme() {
        const odgovor = await OpremaService.get();
        setOpreme(odgovor);
    }

    useEffect(() => {
        dohvatiOpreme();
    }, []);

    function formatirajDatum(datum) {
        if (datum == null) {
            return "Nije definirano";
        }
        return moment.utc(datum).format("DD. MM. YYYY.");
    }

    function obrisi(sifra) {
        if (!confirm("Sigurno obrisati")) {
            return;
        }
        brisanjeOpreme(sifra);
    }

    async function brisanjeOpreme(sifra) {
        const odgovor = await OpremaService.obrisi(sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiOpreme();
    }

    return (
        <>
            <Link to={RouteNames.OPREMA_NOVI} className="btn btn-success siroko">
                Dodaj novu opremu
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Serijski Broj</th>
                        <th>Datum nabave</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {oprema &&
                        oprema.map((oprema, index) => (
                            <tr key={index}>
                                <td>{oprema.naziv}</td>
                                <td>{oprema.tip}</td>
                                <td>{oprema.serijskiBroj}</td>
                                <td>{formatirajDatum(oprema.datumNabave)}</td>
                                <td>
                                    <Button onClick={() => navigate(`/opreme/${oprema.sifra}`)}>Promjena</Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => obrisi(oprema.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
