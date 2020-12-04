using System;
using Microsoft.EntityFrameworkCore;

namespace Library
{
    public class GradeContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=Library.db");
        
        public DbSet<Grade> Grades { get; set; }
    }
}