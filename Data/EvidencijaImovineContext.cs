using EvidencijaImovine.Models;
using Microsoft.EntityFrameworkCore;

namespace EvidencijaImovine.Data
{
    public class EvidencijaImovineContext : DbContext
    {

        public EvidencijaImovineContext(DbContextOptions<EvidencijaImovineContext> opcije) : base(opcije)
        {
            //ovdje se  mogu fino postaviti opcije, ali ne za sada
        }

        public DbSet<Oprema> Opreme { get; set; }
    }
}
