using Microsoft.EntityFrameworkCore;
using Cuttlefish.Models;

namespace Cuttlefish.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<Sprints> Sprints { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Labels> Labels { get; set; }
        public DbSet<TeamMembers> TeamMembers { get; set; }
        public DbSet<LabelsToTasks> LabelsToTasks { get; set; }
        public DbSet<TasksToTasks> TasksToTasks { get; set; }
        public DbSet<TeamMembersToProjects> TeamMembersToProjects { get; set; }
        public DbSet<Comments> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
