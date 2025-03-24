using EvidencijaImovine.Data;
using EvidencijaImovine.Models;
using Microsoft.AspNetCore.Mvc;

namespace EvidencijaImovine.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OpremaController : ControllerBase
    {
        // koristimo dependency injection
        // 1. definiramo privatno svojstvo
        private readonly EvidencijaImovineContext _context;


        // 2. u konstruktoru postavljamo vrijednost
        public OpremaController(EvidencijaImovineContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Opreme);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new {poruka= "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var oprema = _context.Opreme.Find(sifra);
                if (oprema == null)
                {
                    return NotFound(new { poruka = $"Oprema s šifrom {sifra} ne postoji" });
                }
                return Ok(oprema);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        public IActionResult Post(Oprema oprema)
        {
            try
            {
                _context.Opreme.Add(oprema);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, oprema);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Oprema oprema)
        {
            try
            {

                var opremaBaza = _context.Opreme.Find(sifra);
                if (opremaBaza == null)
                {
                    return NotFound(new { poruka = $"Oprema s šifrom {sifra} ne postoji" });
                }

                // rucni mapping - kasnije automatika
                opremaBaza.Naziv = oprema.Naziv;
                opremaBaza.Tip = oprema.Tip;
                opremaBaza.SerijskiBroj = oprema.SerijskiBroj;
                opremaBaza.DatumNabave = oprema.DatumNabave;

                _context.Opreme.Update(opremaBaza);
                _context.SaveChanges();
                return Ok(opremaBaza);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var oprema = _context.Opreme.Find(sifra);
                if (oprema == null)
                {
                    return NotFound(new { poruka = $"Oprema s šifrom {sifra} ne postoji" });
                }
                _context.Opreme.Remove(oprema);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
