using System.ComponentModel.DataAnnotations.Schema;

namespace EvidencijaImovine.Models
{
    public class Oprema : Entitet
    {
        public string Naziv { get; set; } = "";
        public string Tip { get; set; } = "";
        public string SerijskiBroj { get; set; } = "";
        public DateTime? DatumNabave { get; set; }
    }
}
