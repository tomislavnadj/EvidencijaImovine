import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/Oprema")
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch(() => {});
}

async function getBySifra(sifra) {
    return await HttpService.get("/Oprema/" + sifra)
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch(() => {});
}

async function dodaj(oprema) {
    return HttpService.post("/Oprema", oprema)
        .then(() => {
            return { greska: false, poruka: "Dodano" };
        })
        .catch(() => {
            return { greska: true, poruka: "Problem kod dodavanja" };
        });
}

async function promjena(sifra, oprema) {
    return HttpService.put("/Oprema/" + sifra, oprema)
        .then(() => {
            return { greska: false, poruka: "Promjenjeno" };
        })
        .catch(() => {
            return { greska: true, poruka: "Problem kod promjene" };
        });
}

async function obrisi(sifra) {
    return HttpService.delete("/Oprema/" + sifra)
        .then(() => {
            return { greska: false, poruka: "Obrisano" };
        })
        .catch(() => {
            return { greska: true, poruka: "Problem kod brisanja" };
        });
}

export default {
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi,
};
