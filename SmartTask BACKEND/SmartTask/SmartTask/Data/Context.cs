using Microsoft.EntityFrameworkCore;
using SmartTask.Model;

namespace SmartTask.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        public DbSet<ProjectItem> Projects { get; set; }

        public DbSet<TaskItem> Tasks { get; set; }

    }
}
