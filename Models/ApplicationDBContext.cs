using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Cuttlefish.Models;

namespace Cuttlefish.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {

        private readonly DbContextOptions _options;
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
            : base(options)
        {
            _options = options;
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