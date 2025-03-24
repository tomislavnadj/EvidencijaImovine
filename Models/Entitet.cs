using System.ComponentModel.DataAnnotations;

namespace EvidencijaImovine.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
