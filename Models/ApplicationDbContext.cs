using Microsoft.EntityFrameworkCore;

namespace Cuttlefish.Models
{
    public class ApplicationDbContext: DbContext 
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {
        }

        public DbSet<TeamMember> TeamMembers { get; set; }

        
    }
}
